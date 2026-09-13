#!/bin/bash
# =============================================================
# Shaurya CA — VPS Deployment Script
# =============================================================
# Usage:  chmod +x deploy.sh && ./deploy.sh
# Run from the project root (CAshaurya2026/)
# =============================================================

set -e

echo "=============================="
echo "  Shaurya CA — VPS Deploy"
echo "=============================="

# --- 1. Pull latest code ---
echo ""
echo "📥 Pulling latest code..."
git pull origin main

# --- 2. Install backend production deps ---
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install --production
cd ..

# --- 3. Build frontend ---
echo ""
echo "🔨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# --- 4. Create production .env for frontend ---
echo ""
echo "📝 Creating production frontend .env..."
cat > frontend/.env << 'EOF'
# Production: API is same origin, proxied through Nginx
VITE_API_BASE_URL=https://ca.shauryaiitkgp.in
EOF

# Re-build with production env
echo "🔨 Rebuilding frontend with production env..."
cd frontend
npm run build
cd ..

# --- 5. Setup Nginx (if not already done) ---
NGINX_CONF="/etc/nginx/sites-available/ca.shauryaiitkgp.in"
if [ ! -f "$NGINX_CONF" ]; then
  echo ""
  echo "🔧 Setting up Nginx config..."
  sudo cp nginx/ca.shauryaiitkgp.in.conf "$NGINX_CONF"
  sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/
  sudo nginx -t && sudo systemctl reload nginx
  echo "✅ Nginx configured."
else
  echo "✅ Nginx config already exists. Reloading..."
  sudo cp nginx/ca.shauryaiitkgp.in.conf "$NGINX_CONF"
  sudo nginx -t && sudo systemctl reload nginx
fi

# --- 6. Start/Restart with PM2 ---
echo ""
echo "🚀 Starting backend with PM2..."
if pm2 describe shaurya-backend > /dev/null 2>&1; then
  pm2 restart ecosystem.config.cjs
else
  pm2 start ecosystem.config.cjs
fi
pm2 save

echo ""
echo "=============================="
echo "  ✅ Deployment Complete!"
echo "=============================="
echo ""
echo "Next steps:"
echo "  1. Make sure MySQL is running and accessible"
echo "  2. Verify backend .env has correct DB credentials"
echo "  3. Run: sudo certbot --nginx -d ca.shauryaiitkgp.in  (for SSL)"
echo "  4. Then uncomment HTTPS block in Nginx config"
echo ""
echo "Useful commands:"
echo "  pm2 logs shaurya-backend    — View live logs"
echo "  pm2 status                  — Check process status"
echo "  pm2 restart shaurya-backend — Restart backend"
echo ""
