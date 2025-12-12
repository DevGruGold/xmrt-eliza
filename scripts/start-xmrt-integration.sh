#!/bin/bash
# XMRT-Eliza Integration Startup Script

echo "🚀 Starting XMRT-Eliza Integration..."

# Check environment variables
if [ -z "$XMRT_AGENT_ID" ]; then
    export XMRT_AGENT_ID="xmrt-eliza-001"
    echo "📋 Using default agent ID: $XMRT_AGENT_ID"
fi

# Set integration endpoints
export XMRT_SUPABASE_URL="https://vawouugtzwmejxqkeqqj.supabase.co"
export XMRT_ECOSYSTEM_URL="https://xmrt-ecosystem.vercel.app"
export XMRT_SUITE_AI_URL="https://suite.lovable.app"

echo "🔗 Integration endpoints configured:"
echo "  • Supabase: $XMRT_SUPABASE_URL"
echo "  • XMRT Ecosystem: $XMRT_ECOSYSTEM_URL"
echo "  • Suite AI: $XMRT_SUITE_AI_URL"

# Start with XMRT character if available
if [ -f "characters/xmrt-eliza-basic.character.json" ]; then
    echo "🤖 Starting with XMRT-Eliza character..."
    npm run dev -- --character=characters/xmrt-eliza-basic.character.json
else
    echo "⚠️ XMRT character not found, starting with default configuration..."
    npm run dev
fi
