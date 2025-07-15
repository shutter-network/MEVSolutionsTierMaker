# MEV Solutions Tier Maker

A web-based tier maker for ranking different solutions that address malicious MEV (Maximal Extractable Value) in blockchain transactions.

## Features

- **Drag and Drop Interface**: Easily drag solutions between tiers (S, A, B, C, D)
- **User-Friendly Solutions**: Includes both technical and non-technical MEV protection methods
- **Real-time Updates**: See your rankings update instantly as you make changes
- **Image Export**: Download your tier rankings as a PNG image
- **Responsive Design**: Works on desktop and mobile devices
- **GitHub Pages Ready**: Fully static site that can be hosted on GitHub Pages

## MEV Protection Solutions Included

### 🛡️ 0-Click Solution
Everyone is protected by default - no user action required

### 🔗 Connect MEV-Protected RPC
Configure wallet to use protected RPC endpoints

### 🏪 Use DEX with MEV Protection
Trade on decentralized exchanges with built-in MEV protection

### 🔒 Private Mempool
Submit transactions to private memory pools

### ⚡ Flashbots Protect
Use Flashbots protection service

### 🚫 MEV Blocker
Block MEV extraction attempts

### 🎭 Commit-Reveal Schemes
Hide transaction details temporarily

### 🏛️ MEV Auction
Auction MEV to highest bidder

### ⛽ Gas Optimization
Optimize gas to reduce MEV impact

### 🔄 Layer 2 Scaling
Use L2 solutions with MEV protection

### 🤝 MEV Share
Share MEV profits with users

### ⚖️ Fair Ordering
Implement fair transaction ordering

## How to Use

1. **Drag and Drop**: Click and drag any solution from the pool to your desired tier
2. **Rearrange**: Move solutions between tiers by dragging them
3. **Return to Pool**: Drag solutions back to the pool if you want to remove them from tiers
4. **View Rankings**: See your current rankings in the "Your Rankings" section
5. **Reset**: Click "Reset" to clear all rankings
6. **Download**: Click "Download Image" to save your tier list as a PNG

## Local Development

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No build process or dependencies required!

## GitHub Pages Deployment

1. Fork this repository
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your tier maker will be available at `https://yourusername.github.io/MEVSolutionsTierMaker`

## File Structure

```
MEVSolutionsTierMaker/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Technical Details

- **Pure HTML/CSS/JavaScript**: No frameworks or build tools required
- **Modern CSS**: Uses CSS Grid, Flexbox, and CSS custom properties
- **ES6+ JavaScript**: Uses modern JavaScript features
- **Drag and Drop API**: Native HTML5 drag and drop implementation
- **html2canvas**: For image generation functionality
- **Responsive Design**: Mobile-friendly interface

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).

## About MEV

Maximal Extractable Value (MEV) refers to the maximum value that can be extracted from block production in excess of the standard block reward and gas fees. MEV can be extracted by including, excluding, or reordering transactions within a block. This tier maker helps users understand and rank different protection mechanisms against malicious MEV extraction.
