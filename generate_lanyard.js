const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const createLanyard = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
        <defs>
            <linearGradient id="shine" x1="0%" y1="0%" x2="200%" y2="200%">
                <stop offset="0%" stop-color="rgba(255,255,255,0)" />
                <stop offset="45%" stop-color="rgba(255,255,255,0)" />
                <stop offset="50%" stop-color="rgba(255,255,255,0.4)" />
                <stop offset="55%" stop-color="rgba(255,255,255,0)" />
                <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                <animate attributeName="x1" values="-200%;200%" dur="4s" repeatCount="indefinite" />
                <animate attributeName="x2" values="0%;400%" dur="4s" repeatCount="indefinite" />
            </linearGradient>

            <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#888" />
                <stop offset="50%" stop-color="#ccc" />
                <stop offset="100%" stop-color="#888" />
            </linearGradient>

            <filter id="glass" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
            
            <clipPath id="avatarClip">
                <circle cx="200" cy="400" r="60" />
            </clipPath>
        </defs>

        <style>
            .pendulum {
                transform-origin: 200px 0px;
                animation: swing 6s ease-in-out infinite alternate;
            }
            @keyframes swing {
                0% { transform: rotate(-5deg); }
                100% { transform: rotate(5deg); }
            }
            .text {
                font-family: sans-serif;
                fill: white;
                text-anchor: middle;
            }
            .barcode {
                font-family: 'Courier New', monospace;
                font-size: 28px;
                letter-spacing: -2px;
                fill: white;
                text-anchor: middle;
            }
            .strap-text {
                font-family: 'Courier New', monospace;
                font-weight: bold;
                font-size: 14px;
                fill: rgba(255,255,255,0.7);
            }
        </style>

        <!-- Entire system swings from top center -->
        <g class="pendulum">
            
            <!-- Strap -->
            <path d="M 180 -50 L 190 200 L 210 200 L 220 -50 Z" fill="#ff007f" />
            
            <!-- Strap Text (repeating) -->
            <g transform="translate(195, 20) rotate(90)">
                <text x="0" y="0" class="strap-text">DEVELOPER // DEVELOPER // DEVELOPER //</text>
            </g>

            <!-- Metal Clasp -->
            <rect x="185" y="195" width="30" height="20" rx="5" fill="url(#metal)" />
            <path d="M 195 215 C 195 230 205 230 205 215" fill="none" stroke="url(#metal)" stroke-width="4" />
            
            <!-- Ring -->
            <circle cx="200" cy="235" r="12" fill="none" stroke="url(#metal)" stroke-width="4" />
            
            <!-- Card -->
            <g transform="translate(100, 250)">
                <!-- Glass Background -->
                <rect width="200" height="320" rx="15" fill="rgba(25,25,35,0.85)" stroke="rgba(255,255,255,0.2)" stroke-width="2" filter="url(#glass)" />
                
                <!-- Avatar Ring -->
                <circle cx="100" cy="90" r="62" fill="none" stroke="#ff007f" stroke-width="3" />
                
                <!-- Avatar Image -->
                <image href="data:image/png;base64,${data.userImageBase64}" x="40" y="30" width="120" height="120" clip-path="url(#avatarClip)" preserveAspectRatio="xMidYMid slice" />
                
                <!-- Info -->
                <text x="100" y="185" class="text" font-size="20" font-weight="bold">Somnath Gorai</text>
                <text x="100" y="210" class="text" font-size="14" fill="#a0a0a0">App &amp; Web Developer</text>
                <text x="100" y="235" class="text" font-size="14" fill="#ff007f">@som8101</text>
                
                <!-- Barcode Dummy -->
                <text x="100" y="285" class="barcode">||| |||| | |||</text>
                
                <!-- Holographic Shine overlay -->
                <rect width="200" height="320" rx="15" fill="url(#shine)" pointer-events="none" />
                
                <!-- Card Hole -->
                <rect x="75" y="10" width="50" height="10" rx="5" fill="#000" />
            </g>
            
            <!-- Link from ring to card -->
            <path d="M 200 247 L 200 260" fill="none" stroke="url(#metal)" stroke-width="3" />
        </g>
    </svg>`;
};

fs.writeFileSync('lanyard.svg', createLanyard());
console.log("Lanyard created!");
