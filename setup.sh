#!/bin/bash
set -e

echo "========================================="
echo "  Employee Management App - Setup Script"
echo "========================================="

cd /Users/abhishekdod/Employee-Management-Fullstack-App

# Clean up temp files
rm -rf git_template empty_template

# Step 1: Initialize Git
echo ""
echo "[1/4] Initializing Git repository..."
git init
git add .
git commit -m "Initial commit: Employee Management Fullstack App"
echo "✓ Git initialized and code committed."

# Step 2: Install GitHub CLI if needed
echo ""
echo "[2/4] Checking GitHub CLI..."
if ! command -v gh &> /dev/null; then
    echo "Installing GitHub CLI..."
    brew install gh
fi
echo "✓ GitHub CLI ready."

# Step 3: Authenticate with GitHub
echo ""
echo "[3/4] Checking GitHub authentication..."
if ! gh auth status &> /dev/null 2>&1; then
    echo "Please log in to GitHub:"
    gh auth login
fi
echo "✓ Authenticated with GitHub."

# Step 4: Create repo and push
echo ""
echo "[4/4] Creating GitHub repository and pushing code..."
gh repo create Employee-Management-Fullstack-App --public --source=. --push
echo "✓ Code pushed to GitHub!"

echo ""
echo "========================================="
echo "  Setup Complete!"
echo "========================================="
echo ""
echo "To run the backend:"
echo "  cd backend && mvn clean install -DskipTests && mvn spring-boot:run"
echo ""
echo "To run the frontend (separate terminal):"
echo "  cd frontend && npm start"
echo ""
