#!/usr/bin/env python3
import sys

# Read the file
with open('backend/app/services/chat_service.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Count occurrences before
before_count = content.count(r'\"\"\"')
print(f"Found {before_count} instances of escaped triple quotes")

# Replace escaped triple quotes
fixed_content = content.replace(r'\"\"\"', '"""')

# Count after
after_count = fixed_content.count(r'\"\"\"')
print(f"Remaining after fix: {after_count}")

# Write back
with open('backend/app/services/chat_service.py', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("File fixed successfully!")
