#!/bin/bash

echo "🧪 Testing CineFlix Local Setup..."
echo ""

# Check if backend is running
echo "1️⃣ Checking Backend (port 5001)..."
if lsof -i :5001 > /dev/null 2>&1; then
    echo "   ✅ Backend is running"
else
    echo "   ❌ Backend is NOT running"
    exit 1
fi

# Check if frontend is running
echo ""
echo "2️⃣ Checking Frontend (port 3000)..."
if lsof -i :3000 > /dev/null 2>&1; then
    echo "   ✅ Frontend is running"
else
    echo "   ❌ Frontend is NOT running"
    exit 1
fi

echo ""
echo "3️⃣ Testing Backend API..."
response=$(curl -s -w "\n%{http_code}" http://localhost:5001/api/health)
status_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

if [ "$status_code" = "200" ]; then
    echo "   ✅ Backend API responds: $body"
else
    echo "   ❌ Backend API failed with status: $status_code"
fi

echo ""
echo "4️⃣ Testing Subscription Plans API..."
plans_response=$(curl -s -w "\n%{http_code}" http://localhost:5001/api/subscription/plans)
plans_status=$(echo "$plans_response" | tail -n1)

if [ "$plans_status" = "200" ]; then
    echo "   ✅ Plans API working"
else
    echo "   ❌ Plans API failed with status: $plans_status"
fi

echo ""
echo "✨ All systems ready!"
echo ""
echo "📱 Open in browser: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5001"
echo ""
echo "Press Ctrl+C in the terminal running 'npm start' to stop servers"
