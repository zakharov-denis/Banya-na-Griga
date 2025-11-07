#!/bin/bash

# Setup script for Firebase deployment
# This script helps prepare the project for Firebase Hosting deployment

set -e  # Exit on error

echo "🚀 Banya Haven - Firebase Deployment Setup"
echo "=========================================="
echo ""

# Check if components directory exists
if [ ! -d "components" ]; then
    echo "📦 Extracting components directory..."
    if [ -f "components (1).zip" ]; then
        unzip -q "components (1).zip" -d components
        echo "✅ Components directory extracted"
    else
        echo "❌ Error: components (1).zip not found"
        exit 1
    fi
else
    echo "✅ Components directory already exists"
fi

# Check if styles directory exists
if [ ! -d "styles" ]; then
    echo "📦 Extracting styles directory..."
    if [ -f "styles (1).zip" ]; then
        unzip -q "styles (1).zip" -d styles
        echo "✅ Styles directory extracted"
    else
        echo "❌ Error: styles (1).zip not found"
        exit 1
    fi
else
    echo "✅ Styles directory already exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Check Firebase CLI
if ! command -v firebase &> /dev/null; then
    echo "⚠️  Firebase CLI not found. Installing..."
    npm install -g firebase-tools
    echo "✅ Firebase CLI installed"
else
    echo "✅ Firebase CLI is installed"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .firebaserc with your Firebase project ID"
echo "2. Run: npm run build"
echo "3. Run: firebase login"
echo "4. Run: firebase deploy --only hosting"
echo ""

