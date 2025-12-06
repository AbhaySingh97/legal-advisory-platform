import json
import os
from typing import Dict, List, Any

class Database:
    _instance = None
    _data = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance._load_data()
        return cls._instance

    def _load_data(self):
        """Load data from JSON file into memory."""
        try:
            # Path to data file relative to this file
            base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            data_file = os.path.join(base_dir, 'data', 'constitution_data.json')
            
            with open(data_file, 'r', encoding='utf-8') as f:
                self._data = json.load(f)
                
            print(f"[SUCCESS] Loaded {len(self._data.get('articles', []))} articles from JSON")
            print(f"[SUCCESS] Loaded {len(self._data.get('landmark_cases', []))} cases from JSON")
            
        except Exception as e:
            print(f"[ERROR] Error loading data: {e}")
            self._data = {"articles": [], "landmark_cases": [], "procedures": [], "quick_replies": []}

    @property
    def articles(self) -> List[Dict[str, Any]]:
        return self._data.get('articles', [])

    @property
    def cases(self) -> List[Dict[str, Any]]:
        return self._data.get('landmark_cases', [])

    @property
    def procedures(self) -> List[Dict[str, Any]]:
        return self._data.get('procedures', [])

    @property
    def quick_replies(self) -> List[Dict[str, Any]]:
        return self._data.get('quick_replies', [])

# Global instance
db = Database()

def get_db():
    return db
