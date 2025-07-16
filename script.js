class MEVTierMaker {
    constructor() {
        this.tiers = {
            s: [],
            a: [],
            b: [],
            c: [],
            d: []
        };
        
        this.solutions = [
            {
                id: 'threshold-encrypted-mempools',
                name: 'Threshold Encrypted Mempools',
                description: 'Encrypt transactions until inclusion',
                icon: '🔒'
            },
            {
                id: 'batch-auctions',
                name: 'Batch Auctions',
                description: 'Coincidence of wants trading',
                icon: '🐄'
            },
            {
                id: 'private-mempools',
                name: 'Private Mempools',
                description: 'Submit transactions to private pools',
                icon: '🔐'
            },
            {
                id: 'mev-share',
                name: 'MEV Revenue Sharing',
                description: 'Share MEV profits with users',
                icon: '🤝'
            },
            {
                id: 'decentralized-block-building',
                name: 'Decentralized Block Building',
                description: 'Distributed block construction',
                icon: '🏗️'
            },
            {
                id: 'wallet-level-protection',
                name: 'Wallet-Level Protection',
                description: 'Built-in wallet MEV protection',
                icon: '🦊'
            },
            {
                id: 'rollup-mev-protection',
                name: 'Rollup MEV Protection',
                description: 'L2 MEV protection mechanisms',
                icon: '🚀'
            },

            {
                id: 'fair-sequencing',
                name: 'Fair Sequencing',
                description: 'Fair transaction ordering protocols',
                icon: '⚖️'
            },
            {
                id: 'time-boost',
                name: 'Time Boost',
                description: 'Time-based transaction ordering',
                icon: '⏰'
            },
            {
                id: 'mev-auctions',
                name: 'MEV Auctions',
                description: 'Auction MEV rights to highest bidder',
                icon: '🏛️'
            },
            {
                id: 'validator-ejection',
                name: 'Validator Ejection Mechanisms',
                description: 'Remove validators exhibiting MEV extraction',
                icon: '🚫'
            },
            {
                id: 'pow-ordering',
                name: 'Proof-of-Work Ordering',
                description: 'Transaction ordering based on computational work',
                icon: '⛏️'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.setupDragAndDrop();
        this.setupEventListeners();
        this.updateRankingDisplay();
    }
    
    setupDragAndDrop() {
        // Make solution cards draggable
        const solutionCards = document.querySelectorAll('.solution-card');
        solutionCards.forEach(card => {
            card.addEventListener('dragstart', this.handleDragStart.bind(this));
            card.addEventListener('dragend', this.handleDragEnd.bind(this));
        });
        
        // Make tier contents drop zones
        const tierContents = document.querySelectorAll('.tier-content');
        tierContents.forEach(content => {
            content.addEventListener('dragover', this.handleDragOver.bind(this));
            content.addEventListener('drop', this.handleDrop.bind(this));
            content.addEventListener('dragleave', this.handleDragLeave.bind(this));
        });
        
        // Make solutions container a drop zone for returning items
        const solutionsContainer = document.querySelector('.solutions-container');
        solutionsContainer.addEventListener('dragover', this.handleDragOver.bind(this));
        solutionsContainer.addEventListener('drop', this.handleReturnDrop.bind(this));
        solutionsContainer.addEventListener('dragleave', this.handleDragLeave.bind(this));
    }
    
    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.solution);
        e.target.classList.add('dragging');
        
        // Store the source container
        const sourceContainer = e.target.closest('.tier-content') || e.target.closest('.solutions-container');
        e.dataTransfer.setData('source', sourceContainer.dataset.tier || 'pool');
    }
    
    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }
    
    handleDragLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }
    
    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const solutionId = e.dataTransfer.getData('text/plain');
        const sourceTier = e.dataTransfer.getData('source');
        const targetTier = e.currentTarget.dataset.tier;
        
        if (!solutionId || !targetTier) return;
        
        // Remove from source tier if it was in one
        if (sourceTier && sourceTier !== 'pool') {
            this.tiers[sourceTier] = this.tiers[sourceTier].filter(id => id !== solutionId);
        }
        
        // Add to target tier if not already there
        if (!this.tiers[targetTier].includes(solutionId)) {
            this.tiers[targetTier].push(solutionId);
        }
        
        this.updateDisplay();
    }
    
    handleReturnDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const solutionId = e.dataTransfer.getData('text/plain');
        const sourceTier = e.dataTransfer.getData('source');
        
        if (!solutionId || sourceTier === 'pool') return;
        
        // Remove from source tier
        if (sourceTier && sourceTier !== 'pool') {
            this.tiers[sourceTier] = this.tiers[sourceTier].filter(id => id !== solutionId);
        }
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        // Update tier contents
        Object.keys(this.tiers).forEach(tier => {
            const tierContent = document.querySelector(`[data-tier="${tier}"]`);
            tierContent.innerHTML = '';
            
            this.tiers[tier].forEach(solutionId => {
                const solution = this.solutions.find(s => s.id === solutionId);
                if (solution) {
                    const card = this.createSolutionCard(solution);
                    tierContent.appendChild(card);
                }
            });
        });
        
        // Update solutions pool
        const solutionsContainer = document.querySelector('.solutions-container');
        solutionsContainer.innerHTML = '';
        
        const usedSolutions = Object.values(this.tiers).flat();
        const availableSolutions = this.solutions.filter(s => !usedSolutions.includes(s.id));
        
        availableSolutions.forEach(solution => {
            const card = this.createSolutionCard(solution);
            solutionsContainer.appendChild(card);
        });
        
        // Re-setup drag and drop for new cards
        this.setupDragAndDrop();
        this.updateRankingDisplay();
    }
    
    createSolutionCard(solution) {
        const card = document.createElement('div');
        card.className = 'solution-card';
        card.draggable = true;
        card.dataset.solution = solution.id;
        
        card.innerHTML = `
            <div class="solution-icon">${solution.icon}</div>
            <div class="solution-content">
                <div class="solution-name">${solution.name}</div>
                <div class="solution-description">${solution.description}</div>
            </div>
        `;
        
        return card;
    }
    
    updateRankingDisplay() {
        Object.keys(this.tiers).forEach(tier => {
            const rankingItems = document.querySelector(`[data-display="${tier}"] .ranking-items`);
            rankingItems.innerHTML = '';
            
            this.tiers[tier].forEach(solutionId => {
                const solution = this.solutions.find(s => s.id === solutionId);
                if (solution) {
                    const item = document.createElement('div');
                    item.className = 'ranking-item';
                    item.innerHTML = `
                        <span>${solution.icon}</span>
                        <span>${solution.name}</span>
                    `;
                    rankingItems.appendChild(item);
                }
            });
            
            if (this.tiers[tier].length === 0) {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.textContent = 'No solutions ranked in this tier';
                rankingItems.appendChild(emptyState);
            }
        });
    }
    
    setupEventListeners() {
        document.getElementById('resetBtn').addEventListener('click', this.reset.bind(this));
        document.getElementById('downloadBtn').addEventListener('click', this.downloadImage.bind(this));
    }
    
    reset() {
        this.tiers = {
            s: [],
            a: [],
            b: [],
            c: [],
            d: []
        };
        this.updateDisplay();
    }
    
    async downloadImage() {
        // Create a temporary container for the image
        const imageContainer = document.createElement('div');
        imageContainer.style.cssText = `
            position: fixed;
            top: -10000px;
            left: -10000px;
            background: #2756a7;
            width: 1200px;
            padding: 40px;
            font-family: 'Inter', sans-serif;
            color: white;
        `;
        
        imageContainer.innerHTML = `
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-size: 48px; font-weight: 700; margin-bottom: 16px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                    MEV Solutions Tier Maker
                </h1>
                <p style="font-size: 20px; font-weight: 300; opacity: 0.9;">
                    My Rankings for MEV Protection Solutions
                </p>
            </div>
            
            <div style="background: rgba(255, 255, 255, 0.95); padding: 40px; border-radius: 12px; color: #333;">
                ${this.generateRankingHTML()}
            </div>
            
            <div style="text-align: center; margin-top: 20px; font-size: 14px; opacity: 0.8;">
                Created with MEV Solutions Tier Maker
            </div>
        `;
        
        document.body.appendChild(imageContainer);
        
        try {
            // Use html2canvas to capture the image
            const canvas = await html2canvas(imageContainer, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                allowTaint: true
            });
            
            // Download the image
            const link = document.createElement('a');
            link.download = 'mev-solutions-tier-ranking.png';
            link.href = canvas.toDataURL();
            link.click();
            
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Error generating image. Please try again or use a screenshot tool.');
        } finally {
            document.body.removeChild(imageContainer);
        }
    }
    
    generateRankingHTML() {
        const tierColors = {
            s: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            a: 'linear-gradient(135deg, #ffa726, #ff9800)',
            b: 'linear-gradient(135deg, #ffee58, #fdd835)',
            c: 'linear-gradient(135deg, #66bb6a, #4caf50)',
            d: 'linear-gradient(135deg, #42a5f5, #2196f3)'
        };
        
        let html = '';
        
        Object.keys(this.tiers).forEach(tier => {
            const tierName = tier.toUpperCase();
            const solutions = this.tiers[tier].map(id => this.solutions.find(s => s.id === id));
            
            html += `
                <div style="display: flex; align-items: stretch; margin-bottom: 16px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); min-height: 80px;">
                    <div style="display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; color: white; width: 80px; background: ${tierColors[tier]}; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
                        ${tierName}
                    </div>
                    <div style="flex: 1; background: rgba(255, 255, 255, 0.9); padding: 16px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; min-height: 80px;">
                        ${solutions.map(solution => `
                            <div style="background: white; padding: 12px 16px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500;">
                                <span style="font-size: 18px;">${solution.icon}</span>
                                <span>${solution.name}</span>
                            </div>
                        `).join('')}
                        ${solutions.length === 0 ? '<div style="color: #a0aec0; font-style: italic; text-align: center; width: 100%;">No solutions in this tier</div>' : ''}
                    </div>
                </div>
            `;
        });
        
        return html;
    }
}

// Initialize the tier maker when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MEVTierMaker();
});

// Add html2canvas library dynamically
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
script.onload = () => {
    console.log('html2canvas loaded successfully');
};
document.head.appendChild(script);
