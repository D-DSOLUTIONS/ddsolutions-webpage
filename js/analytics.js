// Sistema de Analytics Personalizado para DDSolutions
// Este script trackea visitantes sin usar cookies de terceros

class DDSolutionsAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.pageViews = [];
        this.events = [];
        
        // Webhook URL para enviar datos (necesitarás configurar tu propio endpoint)
        // Opciones: Google Sheets API, Netlify Functions, Vercel Functions, o tu propio servidor
        this.webhookUrl = 'https://tu-webhook-url.com/analytics'; // CAMBIAR ESTO
        
        this.init();
    }
    
    init() {
        // Registrar la visita inicial
        this.trackPageView();
        
        // Trackear tiempo en la página
        this.trackTimeOnPage();
        
        // Trackear clicks en botones importantes
        this.trackButtonClicks();
        
        // Trackear scroll depth
        this.trackScrollDepth();
        
        // Enviar datos cuando el usuario abandona la página
        this.setupBeforeUnload();
        
        // Información del visitante
        this.collectVisitorInfo();
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    collectVisitorInfo() {
        this.visitorInfo = {
            // Información básica del navegador
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenResolution: `${screen.width}x${screen.height}`,
            colorDepth: screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            
            // Información de la página
            referrer: document.referrer || 'direct',
            currentUrl: window.location.href,
            title: document.title,
            
            // Timestamp
            timestamp: new Date().toISOString(),
            
            // Dispositivo
            isMobile: /Mobile|Android|iPhone/i.test(navigator.userAgent),
            
            // Conexión (si está disponible)
            connectionType: navigator.connection ? navigator.connection.effectiveType : 'unknown'
        };
    }
    
    trackPageView(page = window.location.pathname) {
        const pageView = {
            page: page,
            timestamp: Date.now(),
            title: document.title
        };
        
        this.pageViews.push(pageView);
        
        // Enviar evento en tiempo real (opcional)
        this.sendEvent('pageview', pageView);
    }
    
    trackButtonClicks() {
        // Trackear clicks en CTAs principales
        const importantButtons = [
            '.btn-primary',
            '.btn-secondary',
            'a[href^="#"]',
            'button[type="submit"]'
        ];
        
        importantButtons.forEach(selector => {
            document.querySelectorAll(selector).forEach(button => {
                button.addEventListener('click', (e) => {
                    this.trackEvent('click', {
                        element: selector,
                        text: e.target.textContent,
                        href: e.target.href || null,
                        timestamp: Date.now()
                    });
                });
            });
        });
    }
    
    trackScrollDepth() {
        let maxScroll = 0;
        let scrollPercentages = [25, 50, 75, 90, 100];
        let triggered = new Set();
        
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const scrollPercentage = Math.round((scrolled / scrollHeight) * 100);
            
            if (scrollPercentage > maxScroll) {
                maxScroll = scrollPercentage;
                
                // Trackear hitos de scroll
                scrollPercentages.forEach(percentage => {
                    if (scrollPercentage >= percentage && !triggered.has(percentage)) {
                        triggered.add(percentage);
                        this.trackEvent('scroll', {
                            depth: percentage + '%',
                            timestamp: Date.now()
                        });
                    }
                });
            }
        });
    }
    
    trackTimeOnPage() {
        // Actualizar tiempo cada 10 segundos
        setInterval(() => {
            const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
            this.timeOnPage = timeSpent;
            
            // Hitos de tiempo (30s, 1min, 2min, 5min)
            const timeHitos = [30, 60, 120, 300];
            timeHitos.forEach(hito => {
                if (timeSpent === hito) {
                    this.trackEvent('time_on_page', {
                        seconds: hito,
                        formatted: this.formatTime(hito)
                    });
                }
            });
        }, 10000);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    }
    
    trackEvent(eventName, data) {
        const event = {
            name: eventName,
            data: data,
            timestamp: Date.now(),
            sessionId: this.sessionId
        };
        
        this.events.push(event);
        
        // Log en consola para debugging
        console.log('📊 Analytics Event:', event);
    }
    
    sendEvent(eventName, data) {
        // Enviar datos a tu endpoint
        // Puedes usar fetch para enviar a tu servidor o servicio
        
        const payload = {
            sessionId: this.sessionId,
            event: eventName,
            data: data,
            visitorInfo: this.visitorInfo,
            timestamp: new Date().toISOString()
        };
        
        // Ejemplo de envío (descomentar cuando tengas un endpoint)
        /*
        fetch(this.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            keepalive: true // Importante para beforeunload
        }).catch(err => {
            console.error('Analytics error:', err);
        });
        */
        
        // Por ahora, guardar en localStorage para debugging
        this.saveToLocalStorage(payload);
    }
    
    saveToLocalStorage(data) {
        try {
            const stored = localStorage.getItem('dd_analytics') || '[]';
            const analytics = JSON.parse(stored);
            analytics.push(data);
            
            // Mantener solo los últimos 50 eventos
            if (analytics.length > 50) {
                analytics.shift();
            }
            
            localStorage.setItem('dd_analytics', JSON.stringify(analytics));
        } catch (e) {
            console.error('Error saving analytics:', e);
        }
    }
    
    setupBeforeUnload() {
        window.addEventListener('beforeunload', () => {
            // Enviar resumen de la sesión
            const sessionSummary = {
                sessionId: this.sessionId,
                startTime: this.startTime,
                endTime: Date.now(),
                duration: Math.round((Date.now() - this.startTime) / 1000),
                pageViews: this.pageViews.length,
                events: this.events.length,
                visitorInfo: this.visitorInfo
            };
            
            this.sendEvent('session_end', sessionSummary);
        });
    }
    
    // Método para obtener analytics del localStorage (útil para debugging)
    static getStoredAnalytics() {
        try {
            const stored = localStorage.getItem('dd_analytics');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }
    
    // Método para limpiar analytics antiguos
    static clearAnalytics() {
        localStorage.removeItem('dd_analytics');
        console.log('Analytics cleared');
    }
}

// Inicializar analytics cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ddAnalytics = new DDSolutionsAnalytics();
    });
} else {
    window.ddAnalytics = new DDSolutionsAnalytics();
}

// Exponer métodos útiles en la consola
window.DDAnalytics = {
    getStats: () => DDSolutionsAnalytics.getStoredAnalytics(),
    clear: () => DDSolutionsAnalytics.clearAnalytics(),
    showStats: () => {
        const stats = DDSolutionsAnalytics.getStoredAnalytics();
        console.table(stats);
        return stats;
    }
};