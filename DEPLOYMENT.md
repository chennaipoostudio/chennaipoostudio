# 🚀 Quick Deployment Guide for GitHub Pages

## Steps to Deploy Your Website

### 1️⃣ Open Command Prompt/PowerShell
Navigate to your project folder:
```bash
cd "C:\Users\elumalai.p2\Desktop\chennai-poo-studio"
```

### 2️⃣ Initialize Git and Commit Files
```bash
git init
git add .
git commit -m "Initial commit: Chennai Poo Studio website"
```

### 3️⃣ Create GitHub Repository

**Option A: Using GitHub CLI** (if installed)
```bash
gh repo create chennai-poo-studio --public --source=. --remote=origin --push
```

**Option B: Manual Method**
1. Go to https://github.com/new
2. Repository name: `chennai-poo-studio`
3. Keep it **Public**
4. Don't initialize with README
5. Click "Create repository"
6. Run these commands:
```bash
git remote add origin https://github.com/YOUR-USERNAME/chennai-poo-studio.git
git branch -M main
git push -u origin main
```

### 4️⃣ Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 2-3 minutes for deployment

### 5️⃣ Access Your Live Website
Your website will be available at:
```
https://YOUR-USERNAME.github.io/chennai-poo-studio/
```

## 🔄 To Update Your Website Later

After making any changes:
```bash
git add .
git commit -m "Update website"
git push origin main
```

GitHub Pages will automatically rebuild and deploy your changes!

---

## 📞 Need Help?

Contact Chennai Poo Studio:
- 📱 WhatsApp: +91 98408 39607
- 📷 Instagram: @chennaipoostudio

---

**Website Created Successfully! 🌸💚**
