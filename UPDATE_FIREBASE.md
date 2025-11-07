# 🔄 How to Update Firebase from Local Copy

## Quick Update (2 Steps)

### Step 1: Build Your Project
```bash
npm run build
```

This will:
- Compile TypeScript
- Build your React app with Vite
- Create optimized production files in the `dist/` directory

### Step 2: Deploy to Firebase
```bash
firebase deploy --only hosting
```

This will:
- Upload files from `dist/` directory
- Deploy to Firebase Hosting
- Make your changes live

---

## One-Line Command (Recommended)

You can combine both steps:

```bash
npm run build && firebase deploy --only hosting
```

This builds and deploys in one command.

---

## Complete Update Workflow

### 1. Make Your Changes Locally
- Edit files in your project
- Test locally with `npm run dev`
- Verify everything works

### 2. Build for Production
```bash
npm run build
```

**Check for errors:**
- If build fails, fix TypeScript/compilation errors
- Verify `dist/` folder is created
- Check that all files are generated

### 3. Test Production Build (Optional but Recommended)
```bash
npm run preview
```

Visit `http://localhost:4173` to preview your production build before deploying.

### 4. Deploy to Firebase
```bash
firebase deploy --only hosting
```

### 5. Verify Deployment
- Visit your live site: `https://banya-na-griga.web.app`
- Check that changes are visible
- Test functionality

---

## Troubleshooting

### Build Fails
```bash
# Check for TypeScript errors
npm run lint

# Clear cache and rebuild
rm -rf dist node_modules/.vite
npm run build
```

### Deploy Fails
```bash
# Check if you're logged in
firebase login

# Verify project
firebase use

# Check Firebase config
cat firebase.json
```

### Changes Not Showing
1. **Hard refresh browser:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Clear browser cache**
3. **Check Firebase Console:** Verify deployment succeeded
4. **Wait a few minutes:** CDN cache may take 1-2 minutes to update

---

## Deployment Best Practices

### Before Deploying
- ✅ Test locally with `npm run dev`
- ✅ Build successfully with `npm run build`
- ✅ Preview production build with `npm run preview`
- ✅ Check for console errors
- ✅ Test on mobile devices (if possible)

### After Deploying
- ✅ Visit live site and verify changes
- ✅ Test all interactive features
- ✅ Check mobile responsiveness
- ✅ Verify analytics are working

---

## Quick Reference

| Command | Purpose |
|--------|---------|
| `npm run dev` | Run development server locally |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `firebase deploy --only hosting` | Deploy to Firebase |
| `npm run build && firebase deploy --only hosting` | Build and deploy in one command |

---

## Example: Updating After Making Changes

```bash
# 1. Make your changes (edit files)

# 2. Test locally
npm run dev
# Visit http://localhost:3000 and verify

# 3. Build and deploy
npm run build && firebase deploy --only hosting

# 4. Done! Your site is updated at:
# https://banya-na-griga.web.app
```

---

**Your live site:** https://banya-na-griga.web.app

