#!/bin/bash

cd mojodas-spa

# Check if node_modules exists, install if not
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  pnpm install
fi

echo "🚀 Starting MojoDas Spa..."
echo "🌐 Opening http://localhost:3000"
pnpm dev
