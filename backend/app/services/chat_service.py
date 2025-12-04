import re
from typing import List, Dict, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import Article, LandmarkCase, Procedure
from app.schemas import ArticleResponse


class ChatService:
    """Service for handling chatbot logic."""
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def search_articles(self, query: str) -> List[Dict]:
        """
        Search for articles based on keywords or article number.
        Returns list of articles with relevance scores.
        """
        query_lower = query.lower().strip()
        results = []
        
        # Extract article number if present
        article_match = re.search(r'article\s*(\d+[a-z]?)', query_lower)
        
        # Get all articles from database
        result = await self.db.execute(select(Article))
        articles = result.scalars().all()
        
        for article in articles:
            score = 0
            
            # Direct article number match (highest priority)
            if article_match and article_match.group(1) == article.number.lower():
                results.append({
                    'article': article,
                    'score': 100.0
                })
                continue
            
            # Keyword matching with weighted scoring
            for keyword in article.keywords:
                if keyword.lower() in query_lower:
                    score += 2
            
            # Title matching (high priority)
            title_words = article.title.lower().split()
            query_words = query_lower.split()
            title_match_count = sum(1 for word in query_words if word in title_words)
            if title_match_count > 0:
                score += title_match_count * 3
            
            # Category matching
            if article.category.lower() in query_lower:
                score += 2
            
            # Description matching (lower priority but still useful)
            desc_words = article.description.lower().split()
            desc_match_count = sum(1 for word in query_words if word in desc_words and len(word) > 3)
            if desc_match_count > 0:
                score += desc_match_count * 0.5
            
            # Normalize score
            if score > 0:
                normalized_score = score / max(len(query_words), 1)
                results.append({
                    'article': article,
                    'score': normalized_score
                })
        
        # Sort by score
        results.sort(key=lambda x: x['score'], reverse=True)
        return results[:3]  # Return top 3 matches
    
    def get_smart_fallback(self, query: str) -> str:
        """Generate contextual fallback message based on query keywords."""
        query_lower = query.lower()
        
        # Detect query intent
        if any(word in query_lower for word in ['right', 'freedom', 'equality', 'liberty']):
            return """I don't have specific information about that query, but here are related constitutional topics:

**Fundamental Rights (Part III):**
• Right to Equality (Articles 14-18)
• Right to Freedom (Articles 19-22)
• Right against Exploitation (Articles 23-24)
• Right to Freedom of Religion (Articles 25-28)
• Cultural and Educational Rights (Articles 29-30)
• Right to Constitutional Remedies (Article 32)

Try asking about a specific article number or right!"""
        
        elif any(word in query_lower for word in ['duty', 'duties', 'responsibility']):
            return """**Fundamental Duties (Article 51A):**
Every citizen has duties including:
• Respect the Constitution, National Flag & Anthem
• Uphold sovereignty and integrity of India
• Protect the environment
• Develop scientific temper
• Safeguard public property

Ask "What is Article 51A?" for complete details!"""
        
        elif any(word in query_lower for word in ['president', 'governor', 'executive', 'prime minister', 'minister']):
            return """**Union Executive (Part V):**
• President of India (Articles 52-62)
• Vice-President (Articles 63-73)
• Council of Ministers (Articles 74-75)
• Attorney-General (Article 76)

Try asking about a specific article!"""
        
        elif any(word in query_lower for word in ['parliament', 'lok sabha', 'rajya sabha', 'legislature']):
            return """**Parliament (Part V):**
• Constitution of Parliament (Article 79)
• Lok Sabha - House of the People (Article 81)
• Rajya Sabha - Council of States (Article 80)
• Money Bills (Article 110)
• Budget (Article 112)
• Ordinances (Article 123)

Ask about specific articles for detailed information!"""
        
        elif any(word in query_lower for word in ['court', 'judge', 'judiciary', 'justice', 'supreme court', 'high court']):
            return """**Judiciary:**
• Supreme Court (Articles 124-147)
• High Courts (Articles 214-231)
• Writs (Articles 32, 226)
• Judicial Review (Article 13)

Try asking "What is Article 32?" or "What is Article 226?"!"""
        
        else:
            return """I couldn't find specific information about that query. 

**Try asking about:**
• Specific article numbers (e.g., "What is Article 21?")
• Fundamental Rights, Duties, or Directive Principles
• Parliament, President, Supreme Court
• Legal procedures (e.g., "How to file PIL?")
• Landmark cases (e.g., "Kesavananda Bharati case")

Type your question and I'll help you find the relevant constitutional provision!"""
    
    async def process_chat_message(self, message: str) -> Dict:
        """
        Process a chat message and return appropriate response.
        """
        query_lower = message.lower()
        
        # Check for procedure queries
        if any(word in query_lower for word in ['how to', 'procedure', 'process', 'file', 'filing']):
            result = await self.db.execute(select(Procedure))
            procedures = result.scalars().all()
            for proc in procedures:
                if any(kw in query_lower for kw in proc.keywords):
                    response = f"📋 **{proc.name}**\n\n"
                    response += f"**Description:**\n{proc.description}\n\n"
                    response += f"**Procedure:**\n{proc.procedure}\n\n"
                    return {'success': True, 'message': response}
        
        # Check for landmark case queries
        if any(word in query_lower for word in ['case', 'judgment', 'judgement', 'kesavananda', 'maneka', 'puttaswamy']):
            result = await self.db.execute(select(LandmarkCase))
            cases = result.scalars().all()
            for case in cases:
                if any(kw in query_lower for kw in case.keywords) or case.name.lower() in query_lower:
                    response = f"⚖️ **{case.name}**\n\n"
                    response += f"**Year:** {case.year}\n\n"
                    response += f"**Significance:**\n{case.significance}\n\n"
                    response += f"**Key Points:**\n"
                    for point in case.key_points:
                        response += f"• {point}\n"
                    return {'success': True, 'message': response}
        
        # Search for relevant articles
        results = await self.search_articles(message)
        
        # If no results or low confidence, use smart fallback
        if not results or results[0]['score'] < 1.5:
            return {
                'success': True,
                'message': self.get_smart_fallback(message)
            }
        
        # Format response with article details
        best_match = results[0]['article']
        response = f"📜 **Article {best_match.number}: {best_match.title}**\n\n"
        response += f"**Category:** {best_match.category}\n\n"
        response += f"**Description:**\n{best_match.description}\n\n"
        
        related_articles = []
        if len(results) > 1 and results[1]['score'] > 1.0:
            response += "\n**Related Articles:**\n"
            for result in results[1:]:
                if result['score'] > 1.0:
                    art = result['article']
                    response += f"• Article {art.number}: {art.title}\n"
                    related_articles.append(art)
        
        return {
            'success': True,
            'message': response,
            'related_articles': related_articles
        }
