#!/bin/bash

echo "🚀 Starting Info & Photo Manager..."
echo "📁 Project directory: $(pwd)"
echo "🌐 Server will be available at: http://localhost:3000"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the server
echo "🎯 Starting server..."
npm start
