# XMRT-Eliza Vercel Deployment Guide

## 🚨 Common Deployment Issues & Solutions

### Issue 1: Server Startup Hanging
**Symptoms**: "Starting Eliza Server..." screen that never completes
**Causes**:
- Missing environment variables
- Incorrect entry point configuration
- Memory/timeout limitations
- Authentication issues

**Solutions**:
1. **Check Environment Variables**:
   ```bash
   # In Vercel Dashboard > Project Settings > Environment Variables
   NODE_ENV=production
   XMRT_AGENT_ID=xmrt-eliza-vercel
   XMRT_SUPABASE_URL=https://vawouugtzwmejxqkeqqj.supabase.co
   XMRT_ECOSYSTEM_URL=https://xmrt-ecosystem.vercel.app
   XMRT_SUITE_AI_URL=https://suite.lovable.app
   ```

2. **Update vercel.json Configuration**:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       { "src": "/(.*)", "dest": "/index.js" }
     ]
   }
   ```

3. **Fix Entry Point (index.js)**:
   - Ensure proper Express.js setup
   - Add health check endpoints
   - Handle Vercel serverless requirements

### Issue 2: Authentication Errors
**Symptoms**: "Authentication Required" messages
**Solutions**:
1. Remove authentication middleware for public endpoints
2. Configure proper CORS settings
3. Set up public health check endpoints

### Issue 3: Memory/Timeout Issues
**Solutions**:
1. Increase function memory in vercel.json:
   ```json
   "functions": {
     "src/**.js": {
       "memory": 1024,
       "maxDuration": 30
     }
   }
   ```

2. Optimize initialization code
3. Use lazy loading for heavy dependencies

## 🚀 Quick Fix Deployment

### Step 1: Update Repository
```bash
git clone https://github.com/DevGruGold/xmrt-eliza
cd xmrt-eliza
```

### Step 2: Verify Files
Ensure these files exist:
- ✅ `vercel.json` - Vercel configuration
- ✅ `index.js` - Entry point
- ✅ `package.json` - Dependencies
- ✅ `.env.example` - Environment template

### Step 3: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Step 4: Configure Environment
In Vercel Dashboard:
1. Go to Project Settings
2. Add Environment Variables
3. Redeploy

## 🔍 Testing Deployment

### Health Check Endpoints
- `GET /` - Main interface
- `GET /health` - Server health
- `GET /status` - System status
- `GET /api/agents` - XMRT agents

### Expected Responses
```bash
# Health check
curl https://your-deployment.vercel.app/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2025-12-12T...",
  "agent": "xmrt-eliza-vercel",
  "xmrt_integration": true
}
```

## 🛠️ Debugging Tools

### 1. Vercel Function Logs
```bash
vercel logs https://your-deployment.vercel.app
```

### 2. Local Testing
```bash
# Test locally first
npm install
npm start

# Should start on http://localhost:3000
```

### 3. Environment Validation
```javascript
// Add to your code for debugging
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  XMRT_AGENT_ID: process.env.XMRT_AGENT_ID,
  PORT: process.env.PORT
});
```

## 🔄 Redeployment Steps

If the current deployment is stuck:

1. **Fix Configuration**:
   - Update vercel.json
   - Fix index.js entry point
   - Set environment variables

2. **Redeploy**:
   ```bash
   vercel --prod --force
   ```

3. **Monitor Deployment**:
   - Check Vercel dashboard
   - Monitor function logs
   - Test health endpoints

## 📞 Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **XMRT Ecosystem**: https://xmrt-ecosystem.vercel.app
- **Suite AI**: https://suite.lovable.app
- **GitHub Repository**: https://github.com/DevGruGold/xmrt-eliza

---

**Current Status**: Deployment configuration updated  
**Next Action**: Redeploy with fixed configuration  
**Expected Result**: Properly working XMRT-Eliza server on Vercel
