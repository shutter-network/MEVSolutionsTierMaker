# Deployment Guide

## GitHub Pages Deployment

### Option 1: Manual Deployment (Recommended)
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to repository Settings → Pages
4. Source: "Deploy from a branch"
5. Branch: "main" (or "master")
6. Folder: "/ (root)"
7. Click "Save"
8. Your site will be available at `https://yourusername.github.io/MEVSolutionsTierMaker`

### Option 2: Using Git Commands
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: MEV Solutions Tier Maker"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/yourusername/MEVSolutionsTierMaker.git

# Push to GitHub
git push -u origin main
```

### Option 3: Using GitHub CLI
```bash
# Create repository and push (requires GitHub CLI)
gh repo create MEVSolutionsTierMaker --public --source=. --remote=origin --push
```

## Local Development

### Using Python (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Start server
http-server -p 8000
```

### Using PHP
```bash
php -S localhost:8000
```

## File Structure After Deployment
```
MEVSolutionsTierMaker/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html          # Main application
├── styles.css          # Styling
├── script.js          # Functionality
├── test.html          # Test page
├── package.json       # Project metadata
├── README.md         # Documentation
├── LICENSE           # MIT License
└── DEPLOYMENT.md     # This file
```

## Troubleshooting

### Common Issues

1. **404 Error**: Make sure `index.html` is in the root directory
2. **CSS/JS Not Loading**: Check file paths are correct and files exist
3. **Drag and Drop Not Working**: Ensure browser supports HTML5 drag and drop
4. **Image Download Not Working**: html2canvas library needs to load properly

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ❌ Internet Explorer

### Mobile Support
The application is responsive and works on mobile devices, though the drag and drop experience may vary on touch devices.

## Security Considerations

- This is a client-side only application (no server required)
- No user data is stored or transmitted
- All processing happens in the browser
- Safe to host on any static hosting service

## Performance

- Lightweight: ~50KB total size
- Fast loading: No external dependencies except html2canvas
- Responsive: Works well on various screen sizes
- Accessible: Uses semantic HTML and proper ARIA labels
