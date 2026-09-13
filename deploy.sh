#!/bin/bash
# =============================================================
# Shaurya CA — VPS Deployment Script (Apache)
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
# Production: API is same origin, proxied through Apache
VITE_API_BASE_URL=https://ca.shauryaiitkgp.in
EOF

# Re-build with production env
echo "🔨 Rebuilding frontend with production env..."
cd frontend
npm run build
cd ..

# --- 5. Enable required Apache modules ---
echo ""
echo "🔧 Enabling required Apache modules..."
sudo a2enmod proxy proxy_http rewrite headers
echo "✅ Apache modules enabled."

# --- 6. Setup Apache VirtualHost ---
APACHE_CONF="/etc/apache2/sites-available/ca.shauryaiitkgp.in.conf"
if [ ! -f "$APACHE_CONF" ]; then
  echo ""
  echo "🔧 Setting up Apache VirtualHost..."
  sudo cp apache/ca.shauryaiitkgp.in.conf "$APACHE_CONF"
  sudo a2ensite ca.shauryaiitkgp.in.conf
  sudo apache2ctl configtest && sudo systemctl reload apache2
  echo "✅ Apache configured."
else
  echo "✅ Apache config already exists. Updating and reloading..."
  sudo cp apache/ca.shauryaiitkgp.in.conf "$APACHE_CONF"
  sudo apache2ctl configtest && sudo systemctl reload apache2
fi

# --- 7. Start/Restart with PM2 ---
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
echo "  3. Run: sudo certbot --apache -d ca.shauryaiitkgp.in  (for SSL)"
echo ""
echo "Useful commands:"
echo "  pm2 logs shaurya-backend    — View live logs"
echo "  pm2 status                  — Check process status"
echo "  pm2 restart shaurya-backend — Restart backend"
echo "  sudo tail -f /var/log/apache2/shaurya-error.log  — Apache errors"
echo ""
