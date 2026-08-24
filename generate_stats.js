const fs = require('fs');

const createStats = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="450" height="195" viewBox="0 0 450 195">
        <style>
            .bg { fill: #0d1117; stroke: #30363d; stroke-width: 1; }
            .title { font-family: 'Segoe UI', sans-serif; font-size: 18px; font-weight: bold; fill: #c9d1d9; }
            .stat-text { font-family: 'Segoe UI', sans-serif; font-size: 14px; fill: #c9d1d9; font-weight: 600; }
            .stat-val { font-family: 'Segoe UI', sans-serif; font-size: 14px; fill: #c9d1d9; font-weight: bold; }
            
            .rank-circle-bg { fill: none; stroke: #21262d; stroke-width: 8; }
            .rank-circle {
                fill: none;
                stroke: url(#gradient);
                stroke-width: 8;
                stroke-dasharray: 251;
                stroke-dashoffset: 251;
                animation: drawRank 2s ease-out forwards;
                animation-delay: 0.5s;
                transform: rotate(-90deg);
                transform-origin: 360px 95px;
            }
            .rank-text {
                font-family: 'Segoe UI', sans-serif;
                font-size: 36px;
                font-weight: bold;
                fill: #ff007f;
                opacity: 0;
                animation: fadeIn 0.5s forwards 1.5s;
            }

            .row {
                opacity: 0;
                animation: slideIn 0.5s forwards;
            }
            .r1 { animation-delay: 0.2s; }
            .r2 { animation-delay: 0.4s; }
            .r3 { animation-delay: 0.6s; }
            .r4 { animation-delay: 0.8s; }

            @keyframes slideIn {
                from { opacity: 0; transform: translateX(-20px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes drawRank {
                to { stroke-dashoffset: 50; } /* 80% full */
            }
            @keyframes fadeIn { to { opacity: 1; } }
        </style>
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff007f"/>
                <stop offset="100%" stop-color="#7f00ff"/>
            </linearGradient>
        </defs>

        <rect class="bg" width="448" height="193" x="1" y="1" rx="10" />
        <text class="title" x="25" y="35">Somnath Gorai's GitHub Stats</text>

        <!-- Stats Rows -->
        <g class="row r1" transform="translate(25, 65)">
            <text class="stat-text" y="10">Total Stars Earned:</text>
            <text class="stat-val" x="150" y="10">1337</text>
        </g>
        <g class="row r2" transform="translate(25, 95)">
            <text class="stat-text" y="10">Total Commits (2026):</text>
            <text class="stat-val" x="150" y="10">4200</text>
        </g>
        <g class="row r3" transform="translate(25, 125)">
            <text class="stat-text" y="10">Total PRs:</text>
            <text class="stat-val" x="150" y="10">150</text>
        </g>
        <g class="row r4" transform="translate(25, 155)">
            <text class="stat-text" y="10">Total Issues:</text>
            <text class="stat-val" x="150" y="10">84</text>
        </g>

        <!-- Rank -->
        <circle class="rank-circle-bg" cx="360" cy="95" r="40" />
        <circle class="rank-circle" cx="360" cy="95" r="40" stroke-linecap="round" />
        <text class="rank-text" x="360" y="108" text-anchor="middle">S</text>
    </svg>`;
};

const createLangs = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="195" viewBox="0 0 300 195">
        <style>
            .bg { fill: #0d1117; stroke: #30363d; stroke-width: 1; }
            .title { font-family: 'Segoe UI', sans-serif; font-size: 16px; font-weight: bold; fill: #c9d1d9; }
            .lang-text { font-family: 'Segoe UI', sans-serif; font-size: 12px; fill: #c9d1d9; font-weight: 600; }
            .lang-perc { font-family: 'Segoe UI', sans-serif; font-size: 12px; fill: #8b949e; }
            
            .bar-bg { fill: #21262d; rx: 4; }
            .bar { rx: 4; transform-origin: left; animation: scaleX 1s ease-out forwards; transform: scaleX(0); }
            
            @keyframes scaleX { to { transform: scaleX(1); } }
            
            .b1 { fill: #3178c6; animation-delay: 0.2s; }
            .b2 { fill: #f1e05a; animation-delay: 0.4s; }
            .b3 { fill: #e34c26; animation-delay: 0.6s; }
            .b4 { fill: #563d7c; animation-delay: 0.8s; }
            .b5 { fill: #b07219; animation-delay: 1.0s; }
        </style>
        <rect class="bg" width="298" height="193" x="1" y="1" rx="10" />
        <text class="title" x="25" y="30">Most Used Languages</text>

        <g transform="translate(25, 55)">
            <text class="lang-text" y="0">TypeScript</text><text class="lang-perc" x="220" y="0">45%</text>
            <rect class="bar-bg" y="8" width="250" height="8" />
            <rect class="bar b1" y="8" width="112.5" height="8" />
        </g>
        <g transform="translate(25, 85)">
            <text class="lang-text" y="0">JavaScript</text><text class="lang-perc" x="220" y="0">25%</text>
            <rect class="bar-bg" y="8" width="250" height="8" />
            <rect class="bar b2" y="8" width="62.5" height="8" />
        </g>
        <g transform="translate(25, 115)">
            <text class="lang-text" y="0">HTML/CSS</text><text class="lang-perc" x="220" y="0">15%</text>
            <rect class="bar-bg" y="8" width="250" height="8" />
            <rect class="bar b3" y="8" width="37.5" height="8" />
        </g>
        <g transform="translate(25, 145)">
            <text class="lang-text" y="0">CSS</text><text class="lang-perc" x="220" y="0">10%</text>
            <rect class="bar-bg" y="8" width="250" height="8" />
            <rect class="bar b4" y="8" width="25" height="8" />
        </g>
        <g transform="translate(25, 175)">
            <text class="lang-text" y="0">Java</text><text class="lang-perc" x="220" y="0">5%</text>
            <rect class="bar-bg" y="8" width="250" height="8" />
            <rect class="bar b5" y="8" width="12.5" height="8" />
        </g>
    </svg>`;
};

const createTrophies = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="200" viewBox="0 0 900 200">
        <defs>
            <linearGradient id="shine" x1="0%" y1="0%" x2="200%" y2="200%">
                <stop offset="0%" stop-color="rgba(255,255,255,0)" />
                <stop offset="45%" stop-color="rgba(255,255,255,0)" />
                <stop offset="50%" stop-color="rgba(255,255,255,0.4)" />
                <stop offset="55%" stop-color="rgba(255,255,255,0)" />
                <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                <animate attributeName="x1" values="-200%;200%" dur="3s" repeatCount="indefinite" />
                <animate attributeName="x2" values="0%;400%" dur="3s" repeatCount="indefinite" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <style>
            .bg { fill: transparent; }
            .cell {
                fill: #161b22;
                stroke: #30363d;
                stroke-width: 1;
                transform: scale(0);
                transform-origin: center;
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            }
            .t1 { animation-delay: 0.1s; transform-origin: 90px 100px; }
            .t2 { animation-delay: 0.3s; transform-origin: 270px 100px; }
            .t3 { animation-delay: 0.5s; transform-origin: 450px 100px; }
            .t4 { animation-delay: 0.7s; transform-origin: 630px 100px; }
            .t5 { animation-delay: 0.9s; transform-origin: 810px 100px; }
            
            .trophy-title { font-family: 'Segoe UI', sans-serif; font-size: 14px; font-weight: bold; fill: #c9d1d9; text-anchor: middle; opacity: 0; animation: fadeIn 0.5s forwards 1.2s; }
            .trophy-rank { font-family: 'Segoe UI', sans-serif; font-size: 32px; font-weight: 900; text-anchor: middle; opacity: 0; animation: fadeIn 0.5s forwards 1.2s; filter: url(#glow); }
            
            .rank-S { fill: #ff007f; }
            .rank-A { fill: #00ffcc; }
            .rank-B { fill: #ffd700; }
            
            @keyframes popIn { to { transform: scale(1); } }
            @keyframes fadeIn { to { opacity: 1; } }
        </style>

        <rect class="bg" width="900" height="200" />
        
        <g class="t1">
            <rect class="cell" x="10" y="25" width="160" height="150" rx="10" />
            <text class="trophy-title" x="90" y="60">Multi-Language</text>
            <text class="trophy-rank rank-S" x="90" y="115">S</text>
            <rect x="10" y="25" width="160" height="150" rx="10" fill="url(#shine)" pointer-events="none" style="clip-path: inset(0 0 0 0 round 10px);" />
        </g>
        
        <g class="t2">
            <rect class="cell" x="190" y="25" width="160" height="150" rx="10" />
            <text class="trophy-title" x="270" y="60">Super Star</text>
            <text class="trophy-rank rank-A" x="270" y="115">A</text>
            <rect x="190" y="25" width="160" height="150" rx="10" fill="url(#shine)" pointer-events="none" style="clip-path: inset(0 0 0 0 round 10px);" />
        </g>

        <g class="t3">
            <rect class="cell" x="370" y="25" width="160" height="150" rx="10" />
            <text class="trophy-title" x="450" y="60">Commits</text>
            <text class="trophy-rank rank-S" x="450" y="115">S</text>
            <rect x="370" y="25" width="160" height="150" rx="10" fill="url(#shine)" pointer-events="none" style="clip-path: inset(0 0 0 0 round 10px);" />
        </g>
        
        <g class="t4">
            <rect class="cell" x="550" y="25" width="160" height="150" rx="10" />
            <text class="trophy-title" x="630" y="60">Issues</text>
            <text class="trophy-rank rank-B" x="630" y="115">B</text>
            <rect x="550" y="25" width="160" height="150" rx="10" fill="url(#shine)" pointer-events="none" style="clip-path: inset(0 0 0 0 round 10px);" />
        </g>

        <g class="t5">
            <rect class="cell" x="730" y="25" width="160" height="150" rx="10" />
            <text class="trophy-title" x="810" y="60">Pull Requests</text>
            <text class="trophy-rank rank-A" x="810" y="115">A</text>
            <rect x="730" y="25" width="160" height="150" rx="10" fill="url(#shine)" pointer-events="none" style="clip-path: inset(0 0 0 0 round 10px);" />
        </g>
    </svg>`;
};

fs.writeFileSync('stats.svg', createStats());
fs.writeFileSync('langs.svg', createLangs());
fs.writeFileSync('trophies.svg', createTrophies());
console.log("Stats created!");
