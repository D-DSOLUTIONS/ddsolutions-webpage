/**
 * DDSolutions Logo Web Component
 * Custom element: <dd-logo>
 * 
 * Usage:
 * <dd-logo variant="horizontal" size="md" theme="default" animated></dd-logo>
 * <dd-logo variant="icon" size="lg" theme="dark"></dd-logo>
 * <dd-logo variant="vertical" size="custom" width="150" height="200"></dd-logo>
 */

class DDLogo extends HTMLElement {
  static get observedAttributes() {
    return [
      'variant', 'size', 'width', 'height', 'theme', 
      'animated', 'interactive', 'glow', 'responsive'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.render();
    this.setupInteractivity();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // Size presets for different variants
  get sizePresets() {
    return {
      icon: {
        xs: { width: 16, height: 16 },
        sm: { width: 24, height: 24 },
        md: { width: 32, height: 32 },
        lg: { width: 48, height: 48 },
        xl: { width: 64, height: 64 }
      },
      horizontal: {
        xs: { width: 120, height: 32 },
        sm: { width: 160, height: 40 },
        md: { width: 200, height: 50 },
        lg: { width: 280, height: 70 },
        xl: { width: 360, height: 90 }
      },
      vertical: {
        xs: { width: 60, height: 80 },
        sm: { width: 80, height: 120 },
        md: { width: 100, height: 140 },
        lg: { width: 120, height: 160 },
        xl: { width: 150, height: 200 }
      }
    };
  }

  // Get current dimensions based on variant, size, or custom width/height
  getDimensions() {
    const variant = this.getAttribute('variant') || 'horizontal';
    const size = this.getAttribute('size') || 'md';
    const customWidth = this.getAttribute('width');
    const customHeight = this.getAttribute('height');

    if (customWidth && customHeight) {
      return { width: parseInt(customWidth), height: parseInt(customHeight) };
    }

    if (size === 'custom' && customWidth) {
      const width = parseInt(customWidth);
      const ratio = variant === 'vertical' ? 1.4 : 0.25;
      return { width, height: Math.round(width * ratio) };
    }

    return this.sizePresets[variant]?.[size] || this.sizePresets.horizontal.md;
  }

  // Get theme-specific colors
  getThemeColors() {
    const theme = this.getAttribute('theme') || 'default';
    
    const themes = {
      default: {
        primary: '#00ff41',
        accent: '#39ff5c',
        dark: '#00cc34',
        deep: '#009928'
      },
      light: {
        primary: '#00cc34',
        accent: '#009928',
        dark: '#007a1f',
        deep: '#005c17'
      },
      dark: {
        primary: '#00ff41',
        accent: '#39ff5c',
        dark: '#00cc34',
        deep: '#009928'
      },
      monochrome: {
        primary: 'currentColor',
        accent: 'currentColor',
        dark: 'currentColor',
        deep: 'currentColor'
      }
    };

    return themes[theme] || themes.default;
  }

  // Generate SVG logo based on variant
  generateLogoSVG() {
    const variant = this.getAttribute('variant') || 'horizontal';
    const animated = this.hasAttribute('animated');
    const dimensions = this.getDimensions();
    const colors = this.getThemeColors();
    const theme = this.getAttribute('theme') || 'default';

    // Common SVG elements
    const gradientDefs = `
      <defs>
        <linearGradient id="primary-${this.id || 'default'}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colors.primary}"/>
          <stop offset="30%" stop-color="${colors.accent}"/>
          <stop offset="70%" stop-color="${colors.dark}"/>
          <stop offset="100%" stop-color="${colors.deep}"/>
        </linearGradient>
        
        <linearGradient id="accent-${this.id || 'default'}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colors.accent}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="${colors.primary}" stop-opacity="0.6"/>
        </linearGradient>
        
        ${theme !== 'monochrome' ? `
        <filter id="glow-${this.id || 'default'}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>` : ''}
      </defs>
    `;

    switch (variant) {
      case 'icon':
        return this.generateIconSVG(dimensions, colors, animated, gradientDefs, theme);
      case 'vertical':
        return this.generateVerticalSVG(dimensions, colors, animated, gradientDefs, theme);
      case 'horizontal':
      default:
        return this.generateHorizontalSVG(dimensions, colors, animated, gradientDefs, theme);
    }
  }

  generateIconSVG(dimensions, colors, animated, gradientDefs, theme) {
    const primaryGrad = `url(#primary-${this.id || 'default'})`;
    const accentGrad = `url(#accent-${this.id || 'default'})`;
    const glowFilter = theme !== 'monochrome' ? `url(#glow-${this.id || 'default'})` : '';

    return `
      <svg width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        ${gradientDefs}
        
        <path d="M32 8 L50 16 L50 32 L44 40 L32 48 L20 40 L14 32 L14 16 Z" 
              fill="none" 
              stroke="${primaryGrad}" 
              stroke-width="2.5" 
              ${glowFilter ? `filter="${glowFilter}"` : ''}/>
        
        <g transform="translate(20, 20)">
          <path d="M0 0 L0 24 L12 24 C18 24 22 20 22 12 C22 4 18 0 12 0 Z" 
                fill="${primaryGrad}"/>
          <path d="M16 3 L16 21 L24 21 C28 21 30 19 30 15 C30 11 28 9 24 9 L16 9 Z" 
                fill="${accentGrad}" 
                opacity="0.9"/>
        </g>
        
        <circle cx="32" cy="32" r="4" fill="${primaryGrad}"/>
        <circle cx="32" cy="32" r="2" fill="#ffffff"/>
        
        ${animated ? `
          <circle cx="22" cy="12" r="1.5" fill="${primaryGrad}">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="42" cy="12" r="1.5" fill="${primaryGrad}">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
          </circle>
        ` : `
          <circle cx="22" cy="12" r="1.5" fill="${primaryGrad}"/>
          <circle cx="42" cy="12" r="1.5" fill="${primaryGrad}"/>
        `}
        
        <circle cx="22" cy="52" r="1.5" fill="${accentGrad}"/>
        <circle cx="42" cy="52" r="1.5" fill="${accentGrad}"/>
      </svg>
    `;
  }

  generateHorizontalSVG(dimensions, colors, animated, gradientDefs, theme) {
    const primaryGrad = `url(#primary-${this.id || 'default'})`;
    const accentGrad = `url(#accent-${this.id || 'default'})`;

    return `
      <svg width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
        ${gradientDefs}
        
        <g transform="translate(8, 8)">
          <path d="M32 8 L50 16 L50 32 L44 40 L32 48 L20 40 L14 32 L14 16 Z" 
                fill="none" 
                stroke="${primaryGrad}" 
                stroke-width="2.5"/>
          
          <g transform="translate(20, 20)">
            <path d="M0 0 L0 24 L12 24 C18 24 22 20 22 12 C22 4 18 0 12 0 Z" 
                  fill="${primaryGrad}"/>
            <path d="M16 3 L16 21 L24 21 C28 21 30 19 30 15 C30 11 28 9 24 9 L16 9 Z" 
                  fill="${accentGrad}" 
                  opacity="0.9"/>
          </g>
          
          <circle cx="32" cy="32" r="4" fill="${primaryGrad}"/>
          <circle cx="32" cy="32" r="2" fill="#ffffff"/>
        </g>
        
        <g transform="translate(88, 0)">
          <text x="0" y="35" 
                font-family="'Orbitron', monospace" 
                font-weight="700" 
                font-size="24" 
                fill="${primaryGrad}"
                letter-spacing="2px">DD</text>
          
          <text x="0" y="55" 
                font-family="'Orbitron', monospace" 
                font-weight="300" 
                font-size="14" 
                fill="${primaryGrad}" 
                opacity="0.8"
                letter-spacing="4px">SOLUTIONS</text>
          
          <line x1="120" y1="25" x2="120" y2="55" 
                stroke="${accentGrad}" 
                stroke-width="2" 
                opacity="0.6"/>
          
          <text x="130" y="32" 
                font-family="'Inter', sans-serif" 
                font-weight="500" 
                font-size="11" 
                fill="${primaryGrad}" 
                opacity="0.7">AI &amp; AUTOMATION</text>
          <text x="130" y="48" 
                font-family="'Inter', sans-serif" 
                font-weight="300" 
                font-size="9" 
                fill="${primaryGrad}" 
                opacity="0.6">SOLUTIONS</text>
        </g>
      </svg>
    `;
  }

  generateVerticalSVG(dimensions, colors, animated, gradientDefs, theme) {
    const primaryGrad = `url(#primary-${this.id || 'default'})`;
    const accentGrad = `url(#accent-${this.id || 'default'})`;

    return `
      <svg width="${dimensions.width}" height="${dimensions.height}" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
        ${gradientDefs}
        
        <g transform="translate(28, 8)">
          <path d="M32 8 L50 16 L50 32 L44 40 L32 48 L20 40 L14 32 L14 16 Z" 
                fill="none" 
                stroke="${primaryGrad}" 
                stroke-width="2.5"/>
          
          <g transform="translate(20, 20)">
            <path d="M0 0 L0 24 L12 24 C18 24 22 20 22 12 C22 4 18 0 12 0 Z" 
                  fill="${primaryGrad}"/>
            <path d="M16 3 L16 21 L24 21 C28 21 30 19 30 15 C30 11 28 9 24 9 L16 9 Z" 
                  fill="${accentGrad}" 
                  opacity="0.9"/>
          </g>
          
          <circle cx="32" cy="32" r="4" fill="${primaryGrad}"/>
          <circle cx="32" cy="32" r="2" fill="#ffffff"/>
        </g>
        
        <g transform="translate(60, 90)">
          <text x="0" y="0" 
                font-family="'Orbitron', monospace" 
                font-weight="700" 
                font-size="28" 
                fill="${primaryGrad}"
                letter-spacing="3px"
                text-anchor="middle">DD</text>
          
          <text x="0" y="20" 
                font-family="'Orbitron', monospace" 
                font-weight="300" 
                font-size="12" 
                fill="${primaryGrad}" 
                opacity="0.8"
                letter-spacing="5px"
                text-anchor="middle">SOLUTIONS</text>
          
          <line x1="-25" y1="30" x2="25" y2="30" 
                stroke="${accentGrad}" 
                stroke-width="1" 
                opacity="0.5"/>
          
          <text x="0" y="45" 
                font-family="'Inter', sans-serif" 
                font-weight="400" 
                font-size="9" 
                fill="${primaryGrad}" 
                opacity="0.6"
                text-anchor="middle">AI &amp; AUTOMATION</text>
        </g>
      </svg>
    `;
  }

  setupInteractivity() {
    if (this.hasAttribute('interactive')) {
      this.style.cursor = 'pointer';
      this.style.transition = 'all 0.3s ease';
      
      this.addEventListener('mouseenter', () => {
        this.style.transform = 'scale(1.05)';
        if (this.hasAttribute('glow')) {
          this.style.filter = 'brightness(1.1) drop-shadow(0 0 8px var(--dd-primary, #00ff41))';
        }
      });
      
      this.addEventListener('mouseleave', () => {
        this.style.transform = 'scale(1)';
        this.style.filter = '';
      });
      
      this.addEventListener('mousedown', () => {
        this.style.transform = 'scale(0.98)';
      });
      
      this.addEventListener('mouseup', () => {
        this.style.transform = 'scale(1.05)';
      });
    }
  }

  render() {
    const logoSVG = this.generateLogoSVG();
    const theme = this.getAttribute('theme') || 'default';
    const glow = this.hasAttribute('glow');
    const responsive = this.hasAttribute('responsive');

    // Generate CSS for the component
    const css = `
      <style>
        :host {
          display: inline-block;
          line-height: 0;
          --dd-primary: #00ff41;
          --dd-accent: #39ff5c;
          --dd-dark: #00cc34;
          --dd-deep: #009928;
        }
        
        :host([theme="light"]) {
          --dd-primary: #00cc34;
          --dd-accent: #009928;
          --dd-dark: #007a1f;
          --dd-deep: #005c17;
        }
        
        :host([glow]) svg {
          filter: drop-shadow(0 0 12px var(--dd-primary));
        }
        
        :host([animated]) {
          animation: dd-pulse 3s ease-in-out infinite;
        }
        
        @keyframes dd-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        ${responsive ? `
        @media (max-width: 768px) {
          :host([variant="horizontal"][size="lg"]) svg { width: 200px; height: 50px; }
          :host([variant="horizontal"][size="xl"]) svg { width: 240px; height: 60px; }
        }
        
        @media (max-width: 480px) {
          :host([variant="horizontal"][size="lg"]) svg { width: 160px; height: 40px; }
          :host([variant="horizontal"][size="xl"]) svg { width: 180px; height: 45px; }
        }
        ` : ''}
      </style>
    `;

    this.shadowRoot.innerHTML = css + logoSVG;
  }
}

// Register the custom element
if (!customElements.get('dd-logo')) {
  customElements.define('dd-logo', DDLogo);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DDLogo;
}

/* Usage Examples:

// Basic usage
<dd-logo></dd-logo>

// Icon variant with large size and glow effect
<dd-logo variant="icon" size="lg" glow></dd-logo>

// Horizontal logo with dark theme and animation
<dd-logo variant="horizontal" size="md" theme="dark" animated></dd-logo>

// Vertical logo with custom dimensions
<dd-logo variant="vertical" size="custom" width="150" height="200"></dd-logo>

// Interactive logo with hover effects
<dd-logo variant="horizontal" size="lg" interactive glow responsive></dd-logo>

// Monochrome version for print
<dd-logo variant="icon" size="md" theme="monochrome"></dd-logo>

// JavaScript API
const logo = document.querySelector('dd-logo');
logo.setAttribute('variant', 'vertical');
logo.setAttribute('size', 'xl');
logo.setAttribute('animated', '');

// Event handling
logo.addEventListener('click', () => {
  console.log('Logo clicked!');
});

*/