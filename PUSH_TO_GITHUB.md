# 📤 Push to GitHub - Quick Guide

## Option 1: Create New GitHub Repository

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `banya-haven` (or your preferred name)
3. Choose **Private** or **Public**
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

### Step 2: Push Your Code
After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/banya-haven.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Option 2: Use Existing GitHub Repository

If you already have a GitHub repository:

```bash
# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Quick Commands Reference

```bash
# Check current status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

---

## Authentication

If you're asked for credentials:
- **Username:** Your GitHub username
- **Password:** Use a Personal Access Token (not your GitHub password)
  - Create one at: https://github.com/settings/tokens
  - Select `repo` scope

---

## Future Updates

After initial push, to update GitHub:

```bash
git add .
git commit -m "Description of changes"
git push origin main
```


