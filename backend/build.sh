#!/usr/bin/env bash
# Build script for Render.com backend deployment

set -o errexit  # Exit on error

echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Running database migrations..."
python scripts/migrate_data.py --clear

echo "Build completed successfully!"
