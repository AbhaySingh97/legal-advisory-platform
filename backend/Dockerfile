# Use an official Python runtime as a parent image
# Using slim version for smaller size but full compatibility
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
# build-essential for compiling some python packages
# ca-certificates for SSL
RUN apt-get update && apt-get install -y \
    build-essential \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
# Adding --no-cache-dir to keep image small
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8000

# Run the migration script AND start the server
# This ensures data is migrated on every deploy if clear flag is not set (it just upserts usually or errors on duplicates if unique)
# Actually, migration script might clear data if we are not careful.
# Let's just start the server. Migration should be a manual step or a separate job.
# But for Render, we can use a "pre-start" command in Render settings if needed.
# For now, standard CMD to run server.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
