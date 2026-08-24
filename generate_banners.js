const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const createBanner = (isDark) => {
    const bgColor = isDark ? '#0d1117' : '#ffffff';
    const textColor = isDark ? '#c9d1d9' : '#24292f';
    const terminalBg = isDark ? '#161b22' : '#f6f8fa';
    const terminalHeader = isDark ? '#21262d' : '#ebf0f4';
    
    // Convert namePath (which is an SVG string containing a <path>) into our own tag.
    // data.namePath looks like: <svg ...><path d="..."/></svg>
    const match = data.namePath.match(/d="([^"]+)"/);
    const d = match ? match[1] : '';

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 740" width="1280" height="740">
        <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff007f">
                    <animate attributeName="stop-color" values="#ff007f;#7f00ff;#ff007f" dur="3s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stop-color="#7f00ff">
                    <animate attributeName="stop-color" values="#7f00ff;#ff007f;#7f00ff" dur="3s" repeatCount="indefinite" />
                </stop>
            </linearGradient>
            
            <clipPath id="hologramClip">
                <rect x="850" y="50" width="400" height="600" rx="20">
                    <animate attributeName="height" from="0" to="600" dur="2s" fill="freeze" begin="0s" />
                </rect>
            </clipPath>

            <clipPath id="scannerClip">
                <rect x="850" y="50" width="400" height="600" rx="20" />
            </clipPath>

            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>

        <style>
            .bg { fill: ${bgColor}; }
            .text { font-family: 'Courier New', monospace; fill: ${textColor}; }
            
            /* Terminal typing */
            .terminal-text {
                font-family: 'Courier New', monospace;
                font-size: 18px;
                fill: #00ff00;
                clip-path: inset(0 100% 0 0);
                animation: type 2s steps(40, end) forwards;
                animation-delay: 0.5s;
            }
            .cursor {
                fill: #00ff00;
                animation: blink 1s step-end infinite;
            }
            @keyframes type { to { clip-path: inset(0 0 0 0); } }
            @keyframes blink { 50% { opacity: 0; } }

            /* Handwriting name */
            .name-path {
                fill: none;
                stroke: url(#neonGradient);
                stroke-width: 3;
                stroke-dasharray: 2000;
                stroke-dashoffset: 2000;
                animation: drawName 3s ease forwards;
                animation-delay: 1s;
            }
            @keyframes drawName {
                to { stroke-dashoffset: 0; fill: url(#neonGradient); }
            }

            /* Roles cycling */
            .role {
                font-family: 'Segoe UI', sans-serif;
                font-size: 24px;
                font-weight: bold;
                fill: ${textColor};
                opacity: 0;
            }
            .role1 { animation: cycleRole1 9s infinite; }
            .role2 { animation: cycleRole2 9s infinite; }
            .role3 { animation: cycleRole3 9s infinite; }
            @keyframes cycleRole1 { 0%, 33.33% { opacity: 1; transform: translateY(0); } 35%, 100% { opacity: 0; transform: translateY(-10px); } }
            @keyframes cycleRole2 { 33.33%, 66.66% { opacity: 1; transform: translateY(0); } 68%, 100%, 0%, 31% { opacity: 0; transform: translateY(-10px); } }
            @keyframes cycleRole3 { 66.66%, 100% { opacity: 1; transform: translateY(0); } 0%, 64% { opacity: 0; transform: translateY(-10px); } }

            /* Tech Pills */
            .pill {
                fill: ${terminalBg};
                stroke: ${isDark ? '#30363d' : '#d0d7de'};
                stroke-width: 1;
                transition: transform 0.3s ease;
                opacity: 0;
                animation: fadeIn 0.5s forwards;
            }
            .pill:hover { transform: scale(1.1); stroke: url(#neonGradient); }
            .pill-text { font-family: sans-serif; font-size: 14px; fill: ${textColor}; pointer-events: none; }
            @keyframes fadeIn { to { opacity: 1; } }

            /* Code Editor */
            .code-line { font-family: monospace; font-size: 16px; opacity: 0; }
            .c1 { fill: #ff7b72; animation: fadeLine 0.5s forwards 1.5s; }
            .c2 { fill: #d2a8ff; animation: fadeLine 0.5s forwards 2.0s; }
            .c3 { fill: #a5d6ff; animation: fadeLine 0.5s forwards 2.5s; }
            .c4 { fill: #79c0ff; animation: fadeLine 0.5s forwards 3.0s; }
            @keyframes fadeLine { to { opacity: 1; } }

            /* Neon Sign */
            .neon-sign {
                font-family: sans-serif;
                font-size: 30px;
                font-weight: 900;
                fill: #fff;
                stroke: #ff007f;
                stroke-width: 2;
                filter: url(#neonGlow);
                animation: flicker 4s infinite;
            }
            @keyframes flicker {
                0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
                20%, 24%, 55% { opacity: 0.1; }
            }

            /* Hologram Scanner */
            .scanner-line {
                fill: #ff007f;
                opacity: 0.8;
                filter: url(#neonGlow);
                animation: scanSweep 3.5s linear infinite;
                animation-delay: 2s;
            }
            @keyframes scanSweep {
                0% { transform: translateY(50px); opacity: 0; }
                5% { opacity: 0.8; }
                95% { opacity: 0.8; }
                100% { transform: translateY(650px); opacity: 0; }
            }

            /* Ambient Orbs & Particles */
            .orb { fill: url(#neonGradient); opacity: 0.3; filter: blur(20px); animation: float 6s ease-in-out infinite alternate; }
            .orb2 { fill: #00ffcc; opacity: 0.2; filter: blur(30px); animation: float2 8s ease-in-out infinite alternate; }
            @keyframes float { 0% { transform: translate(0, 0); } 100% { transform: translate(30px, -50px); } }
            @keyframes float2 { 0% { transform: translate(0, 0); } 100% { transform: translate(-40px, 60px); } }
            
            .sparkle { fill: #fff; opacity: 0; animation: twinkle 3s infinite; }
            @keyframes twinkle { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.2); } }
        </style>

        <!-- Background -->
        <rect class="bg" width="100%" height="100%" rx="15" />
        
        <!-- Ambient Background Effects -->
        <circle class="orb" cx="150" cy="600" r="100" />
        <circle class="orb2" cx="700" cy="150" r="150" />
        
        <!-- Sparkles -->
        <path class="sparkle" style="animation-delay: 0s" d="M100,100 L105,115 L120,120 L105,125 L100,140 L95,125 L80,120 L95,115 Z" />
        <path class="sparkle" style="animation-delay: 1s" d="M800,50 L802,57 L810,60 L802,62 L800,70 L797,62 L790,60 L797,57 Z" />
        <path class="sparkle" style="animation-delay: 2s" d="M400,600 L403,612 L415,615 L403,618 L400,630 L397,618 L385,615 L397,612 Z" />

        <!-- Neon Sign -->
        <text x="50" y="60" class="neon-sign">KEEP CODING KEEP GROWING</text>

        <!-- Terminal Window -->
        <g transform="translate(50, 100)">
            <rect width="600" height="40" fill="${terminalHeader}" rx="10" ry="10" />
            <rect width="600" height="25" fill="${terminalHeader}" y="15" />
            <circle cx="25" cy="20" r="6" fill="#ff5f56" />
            <circle cx="45" cy="20" r="6" fill="#ffbd2e" />
            <circle cx="65" cy="20" r="6" fill="#27c93f" />
            <rect width="600" height="80" fill="${terminalBg}" y="40" rx="10" ry="10" />
            <rect width="600" height="20" fill="${terminalBg}" y="40" />
            <!-- Terminal Text grouped to allow clip-path animation -->
            <g>
                <text x="20" y="75" class="terminal-text">user@dev:~$ cat README.md</text>
                <rect class="cursor" x="290" y="60" width="10" height="18" />
            </g>
        </g>

        <!-- Name Vector -->
        <g transform="translate(50, 320)">
            <path class="name-path" d="${d}" />
        </g>

        <!-- Roles -->
        <g transform="translate(50, 400)">
            <text class="role role1">App &amp; Web Developer</text>
            <text class="role role2">UI/UX Enthusiast</text>
            <text class="role role3">Open Source Contributor</text>
        </g>

        <!-- Tagline Box -->
        <g transform="translate(50, 450)">
            <rect width="500" height="80" fill="${terminalBg}" rx="15" stroke="${isDark ? '#30363d' : '#d0d7de'}" stroke-width="2"/>
            <image href="data:image/png;base64,${data.logoBase64}" x="15" y="15" width="50" height="50" />
            <text x="80" y="45" class="text" font-style="italic" font-size="18">"Ab mya itna vi khas nahi"</text>
        </g>

        <!-- Tech Stack Pills -->
        <g transform="translate(50, 560)">
            ${['React', 'React Native', 'JS', 'HTML', 'CSS', 'Git', 'GitHub', 'SQL', 'Supabase', 'Next.js', 'WordPress', 'Shopify', 'C/C++'].map((skill, i) => {
                const row = Math.floor(i / 6);
                const col = i % 6;
                const delay = (2 + i * 0.1).toFixed(1);
                return `
                <g transform="translate(${col * 105}, ${row * 45})" style="animation-delay: ${delay}s" class="pill">
                    <rect width="95" height="30" rx="15" />
                    <text x="47.5" y="20" text-anchor="middle" class="pill-text">${skill}</text>
                </g>
                `;
            }).join('')}
        </g>

        <!-- Code Editor Card -->
        <g transform="translate(700, 100)">
            <rect width="450" height="200" fill="#282c34" rx="15" />
            <circle cx="20" cy="20" r="6" fill="#ff5f56" />
            <circle cx="40" cy="20" r="6" fill="#ffbd2e" />
            <circle cx="60" cy="20" r="6" fill="#27c93f" />
            
            <text x="20" y="60" class="code-line c1">function buildDreams() {</text>
            <text x="40" y="90" class="code-line c2">const idea = generateIdea();</text>
            <text x="40" y="120" class="code-line c3">while (coffee.amount &gt; 0) {</text>
            <text x="60" y="150" class="code-line c4">code(idea);</text>
            <text x="40" y="180" class="code-line c3">}</text>
            <text x="20" y="210" class="code-line c1">}</text>
        </g>

        <!-- Hologram User Image -->
        <!-- clipped with a height-growing rect first, then scanner line passes over -->
        <g clip-path="url(#hologramClip)">
            <g clip-path="url(#scannerClip)">
                <image href="data:image/png;base64,${data.userImageBase64}" x="800" y="150" width="450" height="600" preserveAspectRatio="xMidYMax meet" />
            </g>
        </g>
        <!-- Scanner Line -->
        <rect x="800" y="0" width="450" height="4" class="scanner-line" />

    </svg>`;
};

fs.writeFileSync('banner.svg', createBanner(true));
fs.writeFileSync('banner-light.svg', createBanner(false));
console.log("Banners created!");
