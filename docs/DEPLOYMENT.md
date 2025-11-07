# 🚀 Deployment Guide - Banya Haven

Complete guide for deploying the Banya Haven website to production.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you've completed these steps:

- [ ] Test the website thoroughly in development mode
- [ ] Update all placeholder content and images
- [ ] Replace logo URL with your own hosted version
- [ ] Test booking widget functionality
- [ ] Verify all links work correctly
- [ ] Test responsive design on mobile, tablet, and desktop
- [ ] Check Cyrillic text renders correctly
- [ ] Review privacy policy and terms of service
- [ ] Test form submissions
- [ ] Optimize images for web (compress, use WebP if possible)

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

Vercel offers the easiest deployment with automatic builds and previews.

**Steps:**

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **For production deployment:**
```bash
vercel --prod
```

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Node Version: 18.x

**Automatic Deployment:**
- Connect your GitHub repository to Vercel
- Every push to main branch will auto-deploy

### Option 2: Netlify

Great for static sites with excellent CDN.

**Steps:**

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login to Netlify:**
```bash
netlify login
```

3. **Initialize and deploy:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

**Configuration (netlify.toml):**
Create a `netlify.toml` file in the root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### Option 3: Traditional Web Hosting (cPanel/FTP)

**Steps:**

1. **Build the project locally:**
```bash
npm run build
```

2. **Upload contents of `dist/` folder to your web server:**
   - Connect via FTP/SFTP
   - Upload all files from `dist/` to `public_html/` or `www/`

3. **Configure .htaccess for SPA routing:**
Create `.htaccess` file in your web root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 4: DigitalOcean App Platform

**Steps:**

1. Push your code to GitHub/GitLab
2. Go to DigitalOcean App Platform
3. Create new app from GitHub repository
4. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - HTTP Port: 8080 (default)

### Option 5: AWS S3 + CloudFront

For scalable, global CDN deployment.

**Steps:**

1. **Build the project:**
```bash
npm run build
```

2. **Create S3 bucket:**
```bash
aws s3 mb s3://banya-haven
```

3. **Upload files:**
```bash
aws s3 sync dist/ s3://banya-haven --acl public-read
```

4. **Enable static website hosting in S3**

5. **Create CloudFront distribution** pointing to S3 bucket

6. **Configure custom domain and SSL certificate**

## 🔒 Environment Variables

If you add backend functionality later, create a `.env` file:

```env
VITE_API_URL=https://your-api.com
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_ANALYTICS_ID=your_analytics_id
```

**Important:** Never commit `.env` to version control!

## 🔧 Domain Configuration

### Custom Domain Setup

1. **Update DNS records:**
   - Add A record or CNAME pointing to your hosting provider
   - Example for Vercel:
     ```
     CNAME: www.banyahaven.com -> cname.vercel-dns.com
     A: banyahaven.com -> 76.76.21.21
     ```

2. **SSL Certificate:**
   - Most hosting providers (Vercel, Netlify) provide free SSL automatically
   - For custom hosting, use Let's Encrypt

3. **Update base URL in code if needed**

## 📊 Analytics Setup (Optional)

### Google Analytics

1. Get your GA4 Measurement ID
2. Add to `index.html` before closing `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Yandex Metrica (Russian Market)

1. Create Yandex Metrica account
2. Add tracking code to `index.html`

## 🐛 Troubleshooting

### Build Fails

**Issue:** TypeScript errors during build
**Solution:** Run `npm run lint` to find errors, fix them, then rebuild

**Issue:** Out of memory error
**Solution:** Increase Node memory:
```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### White Screen After Deployment

**Issue:** Site shows blank white screen
**Solution:** 
- Check browser console for errors
- Ensure all paths are relative (no leading `/` in imports)
- Verify SPA routing is configured (redirects to index.html)

### Images Not Loading

**Issue:** Images show broken
**Solution:** 
- Use full URLs for external images
- Ensure image paths are correct
- Check CORS settings if loading from external sources

### Slow Loading

**Solution:**
- Compress images before deployment
- Enable gzip/brotli compression on server
- Use CDN for static assets
- Implement lazy loading for images

## 📱 Testing After Deployment

Test checklist:
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Booking widget opens and functions
- [ ] Forms can be submitted
- [ ] Mobile responsive design works
- [ ] Images load properly
- [ ] Google Maps displays correctly
- [ ] Gallery auto-scroll functions
- [ ] Legal documents open
- [ ] Cookie consent appears
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on different devices (iOS, Android)

## 🔄 Continuous Deployment

For automatic deployments on code changes:

1. **Connect GitHub repository** to Vercel/Netlify
2. **Set up branch deployments:**
   - `main` branch → Production
   - `develop` branch → Staging
3. **Configure build hooks** for manual triggers if needed

## 📈 Performance Optimization

After deployment, optimize:

1. **Enable compression** (gzip/brotli)
2. **Set cache headers** for static assets
3. **Use CDN** for faster global delivery
4. **Minimize JavaScript bundle size**
5. **Optimize images** (WebP, lazy loading)
6. **Enable HTTP/2 or HTTP/3**

## 🆘 Support

If you encounter issues during deployment:
1. Check hosting provider's documentation
2. Review build logs for specific errors
3. Test locally with `npm run preview` to ensure production build works
4. Contact hosting provider support if needed

---

**Good luck with your deployment! 🎉**
