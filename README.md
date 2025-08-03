# DDSolutions Website

Modern, futuristic website for DDSolutions.ai - AI and automation solutions company.

## Features

- 🌐 Multi-language support (Spanish, English, Portuguese) with automatic IP-based detection
- 🎨 Modern design with red and black color scheme
- 📱 Fully responsive design
- ♿ Accessible
- ⚡ Smooth animations and futuristic effects
- 🚀 No dependencies (pure HTML, CSS, JavaScript)

## Quick Start

### Using Python (Recommended)
```bash
# Default port 8080
python3 server.py

# Custom port
python3 server.py 8888
```

### Using Node.js
```bash
npx http-server -p 8080
```

### Using PHP
```bash
php -S localhost:8080
```

## Ports in Use

The following ports are currently occupied on your system:
- 3000, 3333, 3337 (likely React/Node apps)
- 5173 (Vite)
- 5432 (PostgreSQL)
- 8081, 8082, 8083, 8087, 8090, 8093
- 27017 (MongoDB)

Recommended free ports: **8080**, 8888, 9000, 5000

## Project Structure

```
ddsolutions-website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Image assets (if needed)
├── fonts/              # Custom fonts (if needed)
├── server.py           # Python development server
└── README.md           # This file
```

## Language Support

The website automatically detects the user's language based on their IP location and displays content in:
- 🇪🇸 Spanish (default)
- 🇬🇧 English
- 🇧🇷 Portuguese

Users can manually change the language using the selector in the navigation bar.
