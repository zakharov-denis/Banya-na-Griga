# 🚀 Deploy to Firebase Hosting - Step by Step Guide

## Prerequisites Checklist

- ✅ Firebase CLI installed (`firebase-tools`)
- ✅ Firebase project configured (`banya-na-griga`)
- ✅ Firebase configuration files exist (`firebase.json`, `.firebaserc`)
- ✅ Build script configured in `package.json`

## Step-by-Step Deployment

### Step 1: Login to Firebase (if not already logged in)

```bash
firebase login
```

This will open a browser window for you to authenticate with your Google account.

### Step 2: Verify Firebase Project

Check that you're connected to the correct project:

```bash
firebase projects:list
```

You should see `banya-na-griga` in the list.

### Step 3: Build Your Project

Create a production build:

```bash
npm run build
```

This will:
- Compile TypeScript
- Build the React app with Vite
- Create optimized files in the `dist/` directory

**Important:** Make sure the build completes without errors!

### Step 4: Test the Build Locally (Optional but Recommended)

Preview your production build before deploying:

```bash
npm run preview
```

Visit `http://localhost:4173` to verify everything looks correct.

### Step 5: Deploy to Firebase

Deploy your website to Firebase Hosting:

```bash
firebase deploy --only hosting
```

This will:
- Upload files from the `dist/` directory
- Deploy to Firebase Hosting
- Provide you with a live URL

### Step 6: Access Your Live Website

After deployment, Firebase will provide you with:
- **Hosting URL:** `https://banya-na-griga.web.app`
- **Custom Domain URL:** `https://banya-na-griga.firebaseapp.com`

## Quick Deploy Command

For future deployments, you can combine build and deploy:

```bash
npm run build && firebase deploy --only hosting
```

## Troubleshooting

### Build Fails
- Check for TypeScript errors: `npm run lint`
- Verify all dependencies are installed: `npm install`
- Check console for specific error messages

### Deploy Fails
- Verify you're logged in: `firebase login`
- Check project ID matches: `firebase use`
- Ensure `dist/` directory exists after build

### Website Shows Blank Page
- Check browser console for errors
- Verify `index.html` is in `dist/` directory
- Check Firebase Hosting rewrites are configured correctly

### Styles Not Loading
- Verify `globals.css` is included in build
- Check that Tailwind CSS is properly configured
- Clear browser cache and hard refresh

## Updating Your Website

To update your live website:

1. Make your changes
2. Build: `npm run build`
3. Deploy: `firebase deploy --only hosting`

## Custom Domain Setup

To use your own domain:

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. Firebase will provide SSL certificate automatically

## Monitoring

- **Firebase Console:** https://console.firebase.google.com
- **Analytics:** Check Firebase Console → Analytics
- **Hosting:** Check Firebase Console → Hosting for deployment history

---

**Your website will be live at:** `https://banya-na-griga.web.app`

