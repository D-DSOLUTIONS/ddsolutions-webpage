import React from 'react';
import PropTypes from 'prop-types';

/**
 * DDSolutions Logo Component
 * 
 * A flexible, scalable logo component supporting multiple variants and sizes
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Logo variant: 'icon', 'horizontal', 'vertical', 'full'
 * @param {string} props.size - Size preset: 'xs', 'sm', 'md', 'lg', 'xl', 'custom'
 * @param {number} props.width - Custom width (when size='custom')
 * @param {number} props.height - Custom height (when size='custom')
 * @param {string} props.theme - Color theme: 'default', 'monochrome', 'dark', 'light'
 * @param {boolean} props.animated - Enable animations
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Inline styles
 */
const DDLogo = ({
  variant = 'horizontal',
  size = 'md',
  width,
  height,
  theme = 'default',
  animated = true,
  className = '',
  style = {},
  ...props
}) => {
  // Size presets
  const sizePresets = {
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

  // Get dimensions
  const getDimensions = () => {
    if (size === 'custom') {
      return { width: width || 200, height: height || 50 };
    }
    return sizePresets[variant]?.[size] || sizePresets.horizontal.md;
  };

  const dimensions = getDimensions();

  // Theme color mappings
  const getThemeColors = () => {
    const themes = {
      default: {
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
      },
      dark: {
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
      }
    };
    return themes[theme] || themes.default;
  };

  const colors = getThemeColors();

  // Icon-only component
  const IconLogo = ({ colors, animated, dimensions }) => (
    <svg 
      width={dimensions.width} 
      height={dimensions.height} 
      viewBox="0 0 64 64" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="30%" stopColor={colors.accent} />
          <stop offset="70%" stopColor={colors.dark} />
          <stop offset="100%" stopColor={colors.deep} />
        </linearGradient>
        
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.6" />
        </linearGradient>
        
        {theme !== 'monochrome' && (
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        )}
      </defs>
      
      <path 
        d="M32 8 L50 16 L50 32 L44 40 L32 48 L20 40 L14 32 L14 16 Z" 
        fill="none" 
        stroke="url(#primary)" 
        strokeWidth="2.5" 
        filter={theme !== 'monochrome' ? "url(#glow)" : undefined}
      />
      
      <g transform="translate(20, 20)">
        <path 
          d="M0 0 L0 24 L12 24 C18 24 22 20 22 12 C22 4 18 0 12 0 Z" 
          fill="url(#primary)"
        />
        <path 
          d="M16 3 L16 21 L24 21 C28 21 30 19 30 15 C30 11 28 9 24 9 L16 9 Z" 
          fill="url(#accent)" 
          opacity="0.9"
        />
      </g>
      
      <circle cx="32" cy="32" r="4" fill="url(#primary)"/>
      <circle cx="32" cy="32" r="2" fill="#ffffff"/>
      
      {animated && (
        <>
          <circle cx="22" cy="12" r="1.5" fill="url(#primary)">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="42" cy="12" r="1.5" fill="url(#primary)">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
          </circle>
        </>
      )}
      
      {!animated && (
        <>
          <circle cx="22" cy="12" r="1.5" fill="url(#primary)"/>
          <circle cx="42" cy="12" r="1.5" fill="url(#primary)"/>
        </>
      )}
      
      <circle cx="22" cy="52" r="1.5" fill="url(#accent)"/>
      <circle cx="42" cy="52" r="1.5" fill="url(#accent)"/>
    </svg>
  );

  // Horizontal layout component
  const HorizontalLogo = ({ colors, animated, dimensions }) => (
    <svg 
      width={dimensions.width} 
      height={dimensions.height} 
      viewBox="0 0 280 80" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="30%" stopColor={colors.accent} />
          <stop offset="70%" stopColor={colors.dark} />
          <stop offset="100%" stopColor={colors.deep} />
        </linearGradient>
        
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      
      {/* Icon section */}
      <g transform="translate(8, 8)">
        <path 
          d="M32 8 L50 16 L50 32 L44 40 L32 48 L20 40 L14 32 L14 16 Z" 
          fill="none" 
          stroke="url(#primary)" 
          strokeWidth="2.5"
        />
        
        <g transform="translate(20, 20)">
          <path 
            d="M0 0 L0 24 L12 24 C18 24 22 20 22 12 C22 4 18 0 12 0 Z" 
            fill="url(#primary)"
          />
          <path 
            d="M16 3 L16 21 L24 21 C28 21 30 19 30 15 C30 11 28 9 24 9 L16 9 Z" 
            fill="url(#accent)" 
            opacity="0.9"
          />
        </g>
        
        <circle cx="32" cy="32" r="4" fill="url(#primary)"/>
        <circle cx="32" cy="32" r="2" fill="#ffffff"/>
      </g>
      
      {/* Text section */}
      <g transform="translate(88, 0)">
        <text 
          x="0" 
          y="35" 
          fontFamily="'Orbitron', monospace" 
          fontWeight="700" 
          fontSize="24" 
          fill="url(#primary)"
          letterSpacing="2px"
        >
          DD
        </text>
        
        <text 
          x="0" 
          y="55" 
          fontFamily="'Orbitron', monospace" 
          fontWeight="300" 
          fontSize="14" 
          fill="url(#primary)" 
          opacity="0.8"
          letterSpacing="4px"
        >
          SOLUTIONS
        </text>
        
        <line 
          x1="120" 
          y1="25" 
          x2="120" 
          y2="55" 
          stroke="url(#accent)" 
          strokeWidth="2" 
          opacity="0.6"
        />
        
        <text 
          x="130" 
          y="32" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="500" 
          fontSize="11" 
          fill="url(#primary)" 
          opacity="0.7"
        >
          AI & AUTOMATION
        </text>
        <text 
          x="130" 
          y="48" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="300" 
          fontSize="9" 
          fill="url(#primary)" 
          opacity="0.6"
        >
          SOLUTIONS
        </text>
      </g>
    </svg>
  );

  // Vertical layout component
  const VerticalLogo = ({ colors, animated, dimensions }) => (
    <svg 
      width={dimensions.width} 
      height={dimensions.height} 
      viewBox="0 0 120 160" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="30%" stopColor={colors.accent} />
          <stop offset="70%" stopColor={colors.dark} />
          <stop offset="100%" stopColor={colors.deep} />
        </linearGradient>
        
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      
      {/* Icon section */}
      <g transform="translate(28, 8)">
        <path 
          d="M32 8 L50 16 L50 32 L44 40 L32 48 L20 40 L14 32 L14 16 Z" 
          fill="none" 
          stroke="url(#primary)" 
          strokeWidth="2.5"
        />
        
        <g transform="translate(20, 20)">
          <path 
            d="M0 0 L0 24 L12 24 C18 24 22 20 22 12 C22 4 18 0 12 0 Z" 
            fill="url(#primary)"
          />
          <path 
            d="M16 3 L16 21 L24 21 C28 21 30 19 30 15 C30 11 28 9 24 9 L16 9 Z" 
            fill="url(#accent)" 
            opacity="0.9"
          />
        </g>
        
        <circle cx="32" cy="32" r="4" fill="url(#primary)"/>
        <circle cx="32" cy="32" r="2" fill="#ffffff"/>
      </g>
      
      {/* Text section */}
      <g transform="translate(60, 90)">
        <text 
          x="0" 
          y="0" 
          fontFamily="'Orbitron', monospace" 
          fontWeight="700" 
          fontSize="28" 
          fill="url(#primary)"
          letterSpacing="3px"
          textAnchor="middle"
        >
          DD
        </text>
        
        <text 
          x="0" 
          y="20" 
          fontFamily="'Orbitron', monospace" 
          fontWeight="300" 
          fontSize="12" 
          fill="url(#primary)" 
          opacity="0.8"
          letterSpacing="5px"
          textAnchor="middle"
        >
          SOLUTIONS
        </text>
        
        <line 
          x1="-25" 
          y1="30" 
          x2="25" 
          y2="30" 
          stroke="url(#accent)" 
          strokeWidth="1" 
          opacity="0.5"
        />
        
        <text 
          x="0" 
          y="45" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="400" 
          fontSize="9" 
          fill="url(#primary)" 
          opacity="0.6"
          textAnchor="middle"
        >
          AI & AUTOMATION
        </text>
      </g>
    </svg>
  );

  // Render appropriate variant
  const renderLogo = () => {
    const commonProps = { colors, animated, dimensions };
    
    switch (variant) {
      case 'icon':
        return <IconLogo {...commonProps} />;
      case 'horizontal':
      case 'full':
        return <HorizontalLogo {...commonProps} />;
      case 'vertical':
        return <VerticalLogo {...commonProps} />;
      default:
        return <HorizontalLogo {...commonProps} />;
    }
  };

  return (
    <div 
      className={`dd-logo dd-logo--${variant} dd-logo--${theme} ${className}`}
      style={{
        display: 'inline-block',
        lineHeight: 0,
        ...style
      }}
    >
      {renderLogo()}
    </div>
  );
};

DDLogo.propTypes = {
  variant: PropTypes.oneOf(['icon', 'horizontal', 'vertical', 'full']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'custom']),
  width: PropTypes.number,
  height: PropTypes.number,
  theme: PropTypes.oneOf(['default', 'monochrome', 'dark', 'light']),
  animated: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

export default DDLogo;

// Usage examples:
// <DDLogo variant="icon" size="sm" />
// <DDLogo variant="horizontal" size="lg" theme="dark" />
// <DDLogo variant="vertical" size="custom" width={150} height={200} animated={false} />