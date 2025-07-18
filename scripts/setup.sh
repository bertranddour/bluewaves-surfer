#!/bin/bash

# 🏄‍♂️ Surfer Design System Setup Script
# This script sets up the complete development environment

set -e

echo "🏄‍♂️ Setting up Surfer Design System..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is required but not installed. Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build the project
echo "🔨 Building project..."
pnpm build

# Run type checking
echo "🔍 Type checking..."
pnpm typecheck

# Run linting
echo "🧹 Linting..."
pnpm lint

# Run tests
echo "🧪 Running tests..."
pnpm test

echo "✅ Setup complete!"
echo ""
echo "🚀 Next steps:"
echo "  - Run 'pnpm dev' to start development"
echo "  - Run 'pnpm storybook' to view components"
echo "  - Check out the documentation at https://surfer.bluewaves.boutique"
echo ""
echo "Happy surfing! 🌊"