with open('backend/app/services/chat_service.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace escaped triple quotes with normal triple quotes
fixed = content.replace('\\"""', '"""')

with open('backend/app/services/chat_service.py', 'w', encoding='utf-8') as f:
    f.write(fixed)

print("Fixed all escaped quotes!")
