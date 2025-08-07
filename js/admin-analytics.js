// Admin Analytics Dashboard Script
// Este script maneja la funcionalidad del dashboard privado

class AdminAnalytics {
    constructor() {
        this.GA_MEASUREMENT_ID = 'G-TQ2RP0YJK5';
        this.isAuthenticated = false;
        this.data = {
            realtime: {},
            historical: {},
            local: []
        };
        
        this.init();
    }
    
    init() {
        // Verificar autenticación
        this.checkAuth();
        
        // Cargar datos si está autenticado
        if (this.isAuthenticated) {
            this.loadAllData();
            this.startRealtimeUpdates();
        }
    }
    
    checkAuth() {
        // Verificar token en localStorage
        const token = localStorage.getItem('admin_token');
        const expiry = localStorage.getItem('admin_token_expiry');
        
        if (token && expiry) {
            const now = new Date().getTime();
            if (now < parseInt(expiry)) {
                this.isAuthenticated = true;
                return true;
            }
        }
        
        this.isAuthenticated = false;
        return false;
    }
    
    login(password) {
        // Hash simple de la contraseña (en producción usar bcrypt)
        const hashedPassword = btoa(password);
        const correctHash = 'ZGRzb2x1dGlvbnMyMDI0'; // 'ddsolutions2024' en base64
        
        if (hashedPassword === correctHash) {
            const token = this.generateToken();
            const expiry = new Date().getTime() + (2 * 60 * 60 * 1000); // 2 horas
            
            localStorage.setItem('admin_token', token);
            localStorage.setItem('admin_token_expiry', expiry);
            
            this.isAuthenticated = true;
            return true;
        }
        
        return false;
    }
    
    logout() {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_token_expiry');
        this.isAuthenticated = false;
        window.location.reload();
    }
    
    generateToken() {
        return Math.random().toString(36).substr(2) + Date.now().toString(36);
    }
    
    async loadAllData() {
        // Cargar datos locales
        this.loadLocalAnalytics();
        
        // Simular carga de datos de GA (en producción usar GA Reporting API)
        this.simulateGoogleAnalyticsData();
        
        // Actualizar UI
        this.updateDashboard();
    }
    
    loadLocalAnalytics() {
        try {
            const stored = localStorage.getItem('dd_analytics');
            if (stored) {
                this.data.local = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Error loading local analytics:', e);
        }
    }
    
    simulateGoogleAnalyticsData() {
        // Simular datos de Google Analytics
        // En producción, esto vendría de la API real
        
        this.data.realtime = {
            activeUsers: Math.floor(Math.random() * 10) + 1,
            pageviews: Math.floor(Math.random() * 50) + 10,
            events: Math.floor(Math.random() * 20) + 5
        };
        
        this.data.historical = {
            users: {
                today: Math.floor(Math.random() * 100) + 20,
                yesterday: Math.floor(Math.random() * 100) + 15,
                lastWeek: Math.floor(Math.random() * 500) + 100,
                lastMonth: Math.floor(Math.random() * 2000) + 500
            },
            sessions: {
                today: Math.floor(Math.random() * 150) + 30,
                yesterday: Math.floor(Math.random() * 150) + 25,
                lastWeek: Math.floor(Math.random() * 800) + 200,
                lastMonth: Math.floor(Math.random() * 3000) + 800
            },
            bounceRate: {
                today: Math.floor(Math.random() * 30) + 40,
                average: Math.floor(Math.random() * 20) + 45
            },
            avgSessionDuration: {
                today: Math.floor(Math.random() * 300) + 60,
                average: Math.floor(Math.random() * 240) + 90
            },
            topPages: [
                { page: '/', views: Math.floor(Math.random() * 500) + 100 },
                { page: '/servicios', views: Math.floor(Math.random() * 200) + 50 },
                { page: '/contacto', views: Math.floor(Math.random() * 100) + 20 },
                { page: '/precios', views: Math.floor(Math.random() * 80) + 15 }
            ],
            topReferrers: [
                { source: 'google', visits: Math.floor(Math.random() * 300) + 100 },
                { source: 'direct', visits: Math.floor(Math.random() * 200) + 80 },
                { source: 'github.com', visits: Math.floor(Math.random() * 100) + 30 },
                { source: 'linkedin.com', visits: Math.floor(Math.random() * 50) + 10 }
            ],
            devices: {
                desktop: Math.floor(Math.random() * 40) + 40,
                mobile: Math.floor(Math.random() * 30) + 30,
                tablet: Math.floor(Math.random() * 20) + 10
            },
            countries: [
                { country: 'España', users: Math.floor(Math.random() * 200) + 100 },
                { country: 'México', users: Math.floor(Math.random() * 100) + 50 },
                { country: 'Argentina', users: Math.floor(Math.random() * 80) + 30 },
                { country: 'Colombia', users: Math.floor(Math.random() * 60) + 20 }
            ]
        };
    }
    
    updateDashboard() {
        // Actualizar todas las métricas en el dashboard
        this.updateRealtimeMetrics();
        this.updateHistoricalMetrics();
        this.updateTables();
        this.updateCharts();
    }
    
    updateRealtimeMetrics() {
        // Actualizar métricas en tiempo real
        const realtimeEl = document.getElementById('realtimeUsers');
        if (realtimeEl) {
            realtimeEl.textContent = this.data.realtime.activeUsers;
        }
    }
    
    updateHistoricalMetrics() {
        // Actualizar cards de estadísticas
        const metrics = {
            'visitorsToday': this.data.historical.users.today,
            'pageViews': this.data.historical.sessions.today * 3,
            'avgTime': this.formatTime(this.data.historical.avgSessionDuration.today),
            'bounceRate': this.data.historical.bounceRate.today + '%'
        };
        
        Object.keys(metrics).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = metrics[id];
            }
        });
    }
    
    updateTables() {
        // Actualizar tabla de páginas principales
        this.updateTopPagesTable();
        
        // Actualizar tabla de referidores
        this.updateReferrersTable();
        
        // Actualizar tabla de eventos locales
        this.updateLocalEventsTable();
    }
    
    updateTopPagesTable() {
        const tbody = document.getElementById('topPagesBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        this.data.historical.topPages.forEach(page => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${page.page}</td>
                <td>${page.views}</td>
                <td>${this.createMiniBar(page.views, 500)}</td>
            `;
        });
    }
    
    updateReferrersTable() {
        const tbody = document.getElementById('referrersBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        this.data.historical.topReferrers.forEach(ref => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${ref.source}</td>
                <td>${ref.visits}</td>
                <td>${this.createMiniBar(ref.visits, 300)}</td>
            `;
        });
    }
    
    updateLocalEventsTable() {
        const tbody = document.getElementById('analyticsTableBody');
        if (!tbody) return;
        
        if (this.data.local.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="no-data">No hay datos locales disponibles</td></tr>';
            return;
        }
        
        tbody.innerHTML = '';
        this.data.local.slice(-10).reverse().forEach(event => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td title="${event.sessionId}">${event.sessionId?.substring(0, 8)}...</td>
                <td><span style="color: #00ff41;">${event.event || 'pageview'}</span></td>
                <td>${event.data?.page || '/'}</td>
                <td>${new Date(event.timestamp).toLocaleTimeString()}</td>
                <td>${event.visitorInfo?.isMobile ? '📱' : '💻'}</td>
            `;
        });
    }
    
    updateCharts() {
        // Aquí irían las actualizaciones de gráficos
        // Por ahora solo simulamos
        console.log('Charts updated');
    }
    
    createMiniBar(value, max) {
        const percentage = (value / max) * 100;
        return `
            <div style="width: 100px; height: 20px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #00ff41, #00cc34); transition: width 0.3s;"></div>
            </div>
        `;
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    startRealtimeUpdates() {
        // Actualizar cada 30 segundos
        setInterval(() => {
            this.loadAllData();
        }, 30000);
        
        // Simular visitantes en tiempo real
        setInterval(() => {
            this.simulateRealtimeVisitor();
        }, 5000);
    }
    
    simulateRealtimeVisitor() {
        const pages = ['/', '/servicios', '/contacto', '/precios', '/nosotros'];
        const countries = ['España', 'México', 'Argentina', 'Colombia', 'Chile'];
        const devices = ['Mobile', 'Desktop', 'Tablet'];
        const sources = ['Google', 'Direct', 'Facebook', 'LinkedIn', 'Twitter'];
        
        const visitor = {
            time: new Date().toLocaleTimeString(),
            page: pages[Math.floor(Math.random() * pages.length)],
            country: countries[Math.floor(Math.random() * countries.length)],
            device: devices[Math.floor(Math.random() * devices.length)],
            source: sources[Math.floor(Math.random() * sources.length)]
        };
        
        this.addRealtimeVisitor(visitor);
    }
    
    addRealtimeVisitor(visitor) {
        const tbody = document.getElementById('visitorsTableBody');
        if (!tbody) return;
        
        // Si es la primera vez, limpiar mensaje de "no data"
        if (tbody.rows[0] && tbody.rows[0].cells[0].classList.contains('no-data')) {
            tbody.innerHTML = '';
        }
        
        // Agregar nueva fila al principio
        const row = tbody.insertRow(0);
        row.style.animation = 'fadeIn 0.5s';
        row.innerHTML = `
            <td>${visitor.time}</td>
            <td>${visitor.page}</td>
            <td>${visitor.source}</td>
            <td>${visitor.country}</td>
            <td>${visitor.device === 'Mobile' ? '📱' : visitor.device === 'Tablet' ? '📱' : '💻'} ${visitor.device}</td>
        `;
        
        // Mantener máximo 15 filas
        while (tbody.rows.length > 15) {
            tbody.deleteRow(tbody.rows.length - 1);
        }
    }
    
    // Método para exportar datos
    exportData(format = 'json') {
        const data = {
            exported: new Date().toISOString(),
            realtime: this.data.realtime,
            historical: this.data.historical,
            local: this.data.local
        };
        
        if (format === 'json') {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
        } else if (format === 'csv') {
            // Convertir a CSV
            let csv = 'Métrica,Valor,Fecha\n';
            csv += `Usuarios Hoy,${this.data.historical.users.today},${new Date().toLocaleDateString()}\n`;
            csv += `Sesiones Hoy,${this.data.historical.sessions.today},${new Date().toLocaleDateString()}\n`;
            csv += `Tasa de Rebote,${this.data.historical.bounceRate.today}%,${new Date().toLocaleDateString()}\n`;
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `analytics_${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
        }
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.adminAnalytics = new AdminAnalytics();
    });
} else {
    window.adminAnalytics = new AdminAnalytics();
}

// Agregar animación de fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);