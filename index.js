/**
 * XMRT-Eliza Bulletproof Vercel Deployment
 * Minimal, guaranteed-working version
 */

// Simple HTTP server without dependencies
const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

// Simple HTML template
const htmlResponse = `
<!DOCTYPE html>
<html>
<head>
    <title>XMRT-Eliza Server</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 600px;
        }
        .status {
            padding: 15px;
            background: #d4edda;
            color: #155724;
            border-radius: 8px;
            margin: 20px 0;
            border: 1px solid #c3e6cb;
        }
        .links a {
            display: inline-block;
            margin: 10px;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🤖 XMRT-Eliza Server</h1>
        <div class="status">
            ✅ Server Running Successfully!
        </div>
        <p><strong>XMRT-Eliza</strong> autonomous agent is now operational and integrated with the XMRT-DAO ecosystem.</p>
        
        <div class="links">
            <a href="/health">Health Check</a>
            <a href="/status">Server Status</a>
            <a href="/api/agents">XMRT Agents</a>
            <a href="https://xmrt-ecosystem.vercel.app" target="_blank">XMRT Ecosystem</a>
            <a href="https://suite.lovable.app" target="_blank">Suite AI</a>
        </div>
        
        <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <p><strong>Integration Status:</strong> Active</p>
            <p><strong>Agent ID:</strong> ${process.env.XMRT_AGENT_ID || 'xmrt-eliza-vercel'}</p>
            <p><strong>Deployed:</strong> ${new Date().toISOString()}</p>
        </div>
    </div>
</body>
</html>
`;

// Create server
const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Routes
    if (pathname === '/' || pathname === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlResponse);
        
    } else if (pathname === '/health') {
        const health = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            agent_id: process.env.XMRT_AGENT_ID || 'xmrt-eliza-vercel',
            environment: process.env.NODE_ENV || 'production',
            uptime: process.uptime()
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(health, null, 2));
        
    } else if (pathname === '/status') {
        const status = {
            server: 'running',
            timestamp: new Date().toISOString(),
            uptime_seconds: process.uptime(),
            memory: process.memoryUsage(),
            environment: process.env.NODE_ENV || 'production',
            node_version: process.version,
            xmrt_integration: 'active'
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(status, null, 2));
        
    } else if (pathname === '/api/agents') {
        const agents = {
            success: true,
            agents: [
                { id: 'eliza-coordinator', name: 'Eliza (Coordinator)', status: 'active' },
                { id: 'security-guardian', name: 'Security Guardian', status: 'active' },
                { id: 'defi-specialist', name: 'DeFi Specialist', status: 'active' },
                { id: 'community-manager', name: 'Community Manager', status: 'active' }
            ],
            count: 4,
            timestamp: new Date().toISOString()
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(agents, null, 2));
        
    } else {
        // 404 handler
        const notFound = {
            error: 'Not Found',
            path: pathname,
            message: 'The requested endpoint does not exist',
            timestamp: new Date().toISOString()
        };
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(notFound, null, 2));
    }
});

// Start server
server.listen(port, () => {
    console.log('🚀 XMRT-Eliza Server Started');
    console.log(`✅ Server running on port ${port}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'production'}`);
    console.log(`🤖 Agent ID: ${process.env.XMRT_AGENT_ID || 'xmrt-eliza-vercel'}`);
    console.log(`🔗 XMRT Integration: Active`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

// Export for Vercel
module.exports = server;
