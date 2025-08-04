// Global variables
let currentTestimonial = 0;
let currentLang = 'es';
let metrics = {
    processes: 15789,
    hours: 892345,
    savings: 4500000,
    countries: 47
};

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<div class="loading"></div> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate metrics counters
            if (entry.target.classList.contains('metric-card')) {
                animateMetricCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card, .about-content, .contact-content, .metric-card, .pricing-card, .testimonial-card, .blog-card, .partner-item, .automation-category').forEach(el => {
        observer.observe(el);
    });
});

// Metrics counter animation
function animateMetricCounter(card) {
    const numberElement = card.querySelector('.metric-number');
    const target = parseInt(numberElement.dataset.target);
    const prefix = numberElement.dataset.prefix || '';
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (displayValue >= 1000000) {
            displayValue = (displayValue / 1000000).toFixed(1) + 'M';
        } else if (displayValue >= 1000) {
            displayValue = (displayValue / 1000).toFixed(0) + 'K';
        }
        
        numberElement.textContent = prefix + displayValue;
    }, 16);
}

// Testimonials slider
function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentTestimonial = index;
}

function changeTestimonial(direction) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const newIndex = (currentTestimonial + direction + testimonials.length) % testimonials.length;
    showTestimonial(newIndex);
}

// Auto-rotate testimonials
setInterval(() => {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 0) {
        changeTestimonial(1);
    }
}, 8000);

// ROI Calculator
function initROICalculator() {
    const employeesSlider = document.getElementById('employees');
    const tasksSlider = document.getElementById('tasks');
    const costSlider = document.getElementById('hourly-cost');
    
    if (!employeesSlider) return;
    
    const employeesValue = document.getElementById('employees-value');
    const tasksValue = document.getElementById('tasks-value');
    const costValue = document.getElementById('hourly-cost-value');
    
    function updateROI() {
        const employees = parseInt(employeesSlider.value);
        const tasks = parseInt(tasksSlider.value);
        const cost = parseInt(costSlider.value);
        
        employeesValue.textContent = employees;
        tasksValue.textContent = tasks;
        costValue.textContent = cost;
        
        // Calculate savings (assuming 60% automation efficiency)
        const weeklyHours = tasks * 0.6; // 60% can be automated
        const weeklySavings = weeklyHours * cost;
        const monthlySavings = weeklySavings * 4.33;
        const yearlySavings = monthlySavings * 12;
        
        // Update results
        document.getElementById('monthly-savings').textContent = `€${monthlySavings.toLocaleString()}`;
        document.getElementById('yearly-savings').textContent = `€${yearlySavings.toLocaleString()}`;
        
        // ROI calculation (assuming implementation cost of 6 months of savings)
        const implementationCost = monthlySavings * 6;
        const roi = ((yearlySavings - implementationCost) / implementationCost * 100);
        document.getElementById('roi-percentage').textContent = `${Math.round(roi)}%`;
        
        // Payback time
        const paybackMonths = implementationCost / monthlySavings;
        document.getElementById('payback-time').textContent = `${paybackMonths.toFixed(1)} meses`;
    }
    
    employeesSlider.addEventListener('input', updateROI);
    tasksSlider.addEventListener('input', updateROI);
    costSlider.addEventListener('input', updateROI);
    
    // Initial calculation
    updateROI();
}

// Download ROI Report
function downloadROIReport() {
    showNotification('Generando informe personalizado...', 'success');
    
    // Simulate report generation
    setTimeout(() => {
        const element = document.createElement('a');
        const content = generateROIReport();
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'informe-roi-ddsolutions.txt';
        element.click();
        
        showNotification('Informe descargado correctamente', 'success');
    }, 2000);
}

function generateROIReport() {
    const employees = document.getElementById('employees-value').textContent;
    const tasks = document.getElementById('tasks-value').textContent;
    const cost = document.getElementById('hourly-cost-value').textContent;
    const monthly = document.getElementById('monthly-savings').textContent;
    const yearly = document.getElementById('yearly-savings').textContent;
    const roi = document.getElementById('roi-percentage').textContent;
    const payback = document.getElementById('payback-time').textContent;
    
    return `
INFORME DE ROI - DDSolutions.ai
================================

PARÁMETROS DE ENTRADA:
- Número de empleados: ${employees}
- Horas en tareas repetitivas: ${tasks}/semana
- Costo promedio por hora: €${cost}

RESULTADOS ESTIMADOS:
- Ahorro mensual: ${monthly}
- Ahorro anual: ${yearly}
- ROI esperado: ${roi}
- Tiempo de retorno: ${payback}

RECOMENDACIONES:
1. Comenzar con la automatización de procesos más repetitivos
2. Implementar soluciones de IA gradualmente
3. Formar al equipo en nuevas tecnologías
4. Monitorear métricas de eficiencia continuamente

¿Listo para comenzar tu transformación digital?
Contacta con nosotros: contacto@ddsolutions.ai
    `;
}

// Resources tabs
function showResourceTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`[onclick="showResourceTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Theme toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const preferredTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    if (preferredTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        showNotification(
            `Tema ${newTheme === 'light' ? 'claro' : 'oscuro'} activado`, 
            'success'
        );
    });
}

// Chatbot functionality
function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.querySelector('.chatbot-messages');
    
    chatbotToggle?.addEventListener('click', () => {
        chatbotToggle.classList.toggle('active');
        chatbotWindow.classList.toggle('active');
    });
    
    minimizeBtn?.addEventListener('click', () => {
        chatbotToggle.classList.remove('active');
        chatbotWindow.classList.remove('active');
    });
    
    // Chat responses database
    const chatResponses = {
        'servicios': 'Ofrecemos 4 servicios principales:\n• Inteligencia Artificial personalizada\n• Automatización RPA\n• Desarrollo de software\n• Consultoría IT\n\n¿Te interesa alguno en particular?',
        'precios': 'Tenemos 3 planes:\n• Starter: €999/mes\n• Professional: €2999/mes\n• Enterprise: Personalizado\n\n¿Quieres agendar una demo gratuita?',
        'demo': '¡Perfecto! Te voy a abrir nuestro calendario para que puedas agendar una demo personalizada.',
        'ventas': 'Te conectaré con nuestro equipo de ventas. Mientras tanto, ¿podrías contarme más sobre tu proyecto?',
        'default': 'Gracias por tu mensaje. Un especialista te contactará pronto. ¿Hay algo específico en lo que pueda ayudarte ahora?'
    };
    
    window.sendMessage = function(event) {
        if (event) event.preventDefault();
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addChatMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addChatMessage(response, 'bot');
            
            if (message.toLowerCase().includes('demo')) {
                setTimeout(() => {
                    document.getElementById('calendar-modal').classList.add('active');
                }, 1000);
            }
        }, 1000);
    };
    
    window.sendQuickReply = function(message) {
        addChatMessage(message, 'user');
        
        setTimeout(() => {
            const response = getBotResponse(message);
            addChatMessage(response, 'bot');
            
            if (message.toLowerCase().includes('demo')) {
                setTimeout(() => {
                    document.getElementById('calendar-modal').classList.add('active');
                }, 1000);
            }
        }, 1000);
    };
    
    function addChatMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        
        // Remove quick replies before adding new message
        const quickReplies = chatMessages.querySelector('.quick-replies');
        if (quickReplies && sender === 'user') {
            quickReplies.style.display = 'none';
        }
        
        chatMessages.insertBefore(messageDiv, chatMessages.lastElementChild);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('servicio') || lowerMessage.includes('service')) {
            return chatResponses.servicios;
        } else if (lowerMessage.includes('precio') || lowerMessage.includes('plan') || lowerMessage.includes('cost')) {
            return chatResponses.precios;
        } else if (lowerMessage.includes('demo') || lowerMessage.includes('reunión')) {
            return chatResponses.demo;
        } else if (lowerMessage.includes('ventas') || lowerMessage.includes('contacto')) {
            return chatResponses.ventas;
        } else {
            return chatResponses.default;
        }
    }
}

// Calendar modal
window.closeCalendarModal = function() {
    document.getElementById('calendar-modal').classList.remove('active');
};

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// PWA functionality
function initPWA() {
    let deferredPrompt;
    const pwaInstallBtn = document.createElement('button');
    pwaInstallBtn.className = 'pwa-install';
    pwaInstallBtn.textContent = 'Instalar App';
    pwaInstallBtn.style.display = 'none';
    document.body.appendChild(pwaInstallBtn);
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        pwaInstallBtn.classList.add('show');
    });
    
    pwaInstallBtn.addEventListener('click', () => {
        pwaInstallBtn.classList.remove('show');
        
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    showNotification('¡App instalada correctamente!', 'success');
                }
                deferredPrompt = null;
            });
        }
    });
    
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    }
}

// Push notifications
function initPushNotifications() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        // Request notification permission
        if (Notification.permission === 'default') {
            setTimeout(() => {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        showNotification('¡Notificaciones activadas! Te mantendremos informado.', 'success');
                        
                        // Show welcome notification
                        setTimeout(() => {
                            new Notification('¡Bienvenido a DDSolutions!', {
                                body: 'Gracias por visitarnos. ¿Te ayudamos con tu transformación digital?',
                                icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0iI2ZmMDAwMCI+PHBhdGggZD0iTTIwIDJMMzUgMTBWMzBMMjAgMzhMNSAzMFYxMEwyMCAyWiIvPjwvc3ZnPg==',
                                badge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0iI2ZmMDAwMCI+PHBhdGggZD0iTTIwIDJMMzUgMTBWMzBMMjAgMzhMNSAzMFYxMEwyMCAyWiIvPjwvc3ZnPg=='
                            });
                        }, 3000);
                    }
                });
            }, 10000); // Ask after 10 seconds
        }
    }
}

// Multi-language support
const translations = {
    es: {
        nav: {
            home: "Inicio",
            services: "Servicios",
            pricing: "Precios",
            testimonials: "Testimonios",
            resources: "Recursos",
            about: "Nosotros",
            contact: "Contacto"
        },
        hero: {
            title1: "Transformamos tu negocio",
            title2: "con Inteligencia Artificial",
            subtitle: "Automatización inteligente, soluciones innovadoras y tecnología de vanguardia para impulsar tu empresa hacia el futuro",
            cta1: "Empezar ahora",
            cta2: "Ver servicios",
            stats: {
                satisfaction: "Satisfacción",
                projects: "Proyectos",
                support: "Soporte"
            }
        },
        services: {
            title: "Nuestros Servicios",
            subtitle: "Soluciones tecnológicas avanzadas para cada necesidad de tu empresa",
            ai: {
                title: "Inteligencia Artificial",
                desc: "Implementamos soluciones de IA personalizadas para automatizar procesos y mejorar la toma de decisiones",
                features: ["Machine Learning", "Procesamiento de Lenguaje Natural", "Visión por Computadora"]
            },
            automation: {
                title: "Automatización",
                desc: "Optimizamos flujos de trabajo con RPA y herramientas de automatización inteligente",
                features: ["RPA (Robotic Process Automation)", "Integración de Sistemas", "Workflows Inteligentes"]
            },
            development: {
                title: "Desarrollo de Software",
                desc: "Creamos aplicaciones a medida con las últimas tecnologías y mejores prácticas",
                features: ["Aplicaciones Web", "Apps Móviles", "APIs y Microservicios"]
            },
            consulting: {
                title: "Consultoría IT",
                desc: "Asesoramiento experto para la transformación digital de tu empresa",
                features: ["Arquitectura de Soluciones", "Estrategia Digital", "Optimización de Procesos"]
            }
        },
        metrics: {
            title: "Impacto en Tiempo Real",
            processes: "Procesos Automatizados",
            hours: "Horas Ahorradas", 
            savings: "Ahorro Generado",
            countries: "Países Activos"
        },
        pricing: {
            title: "Planes y Precios",
            subtitle: "Soluciones adaptadas a cada etapa de tu crecimiento"
        },
        testimonials: {
            title: "Lo que dicen nuestros clientes",
            subtitle: "Casos de éxito que transforman empresas"
        },
        calculator: {
            title: "Calcula tu ROI",
            subtitle: "Descubre cuánto puedes ahorrar con automatización inteligente"
        },
        resources: {
            title: "Centro de Recursos",
            subtitle: "Conocimiento y herramientas para tu transformación digital"
        },
        partners: {
            title: "Partners y Certificaciones"
        },
        about: {
            title: "Sobre DDSolutions",
            lead: "Somos líderes en transformación digital, combinando la potencia de la Inteligencia Artificial con soluciones tecnológicas innovadoras.",
            text: "En DDSolutions, creemos que el futuro pertenece a las empresas que abrazan la tecnología. Nuestro equipo de expertos trabaja incansablemente para crear soluciones que no solo resuelven problemas actuales, sino que anticipan las necesidades del mañana.",
            features: {
                innovation: {
                    title: "Innovación Constante",
                    desc: "Siempre a la vanguardia tecnológica"
                },
                security: {
                    title: "Seguridad Garantizada",
                    desc: "Protección de datos de nivel empresarial"
                },
                global: {
                    title: "Alcance Global",
                    desc: "Soluciones adaptadas a cualquier mercado"
                }
            }
        },
        contact: {
            title: "Contacta con nosotros",
            subtitle: "Estamos listos para llevar tu empresa al siguiente nivel",
            form: {
                name: "Nombre completo",
                email: "Correo electrónico",
                phone: "Teléfono",
                service: "Servicio de interés",
                message: "Mensaje",
                send: "Enviar mensaje"
            },
            info: {
                email: "Email",
                phone: "Teléfono",
                schedule: "Horario",
                scheduleText: "Lun - Vie: 9:00 - 18:00"
            }
        },
        footer: {
            tagline: "Transformando el futuro con tecnología inteligente",
            quickLinks: "Enlaces rápidos",
            followUs: "Síguenos",
            rights: "Todos los derechos reservados"
        }
    },
    en: {
        nav: {
            home: "Home",
            services: "Services",
            pricing: "Pricing",
            testimonials: "Testimonials",
            resources: "Resources",
            about: "About",
            contact: "Contact"
        },
        hero: {
            title1: "Transform your business",
            title2: "with Artificial Intelligence",
            subtitle: "Smart automation, innovative solutions and cutting-edge technology to drive your company into the future",
            cta1: "Start now",
            cta2: "View services",
            stats: {
                satisfaction: "Satisfaction",
                projects: "Projects",
                support: "Support"
            }
        },
        services: {
            title: "Our Services",
            subtitle: "Advanced technological solutions for every need of your company",
            ai: {
                title: "Artificial Intelligence",
                desc: "We implement customized AI solutions to automate processes and improve decision making",
                features: ["Machine Learning", "Natural Language Processing", "Computer Vision"]
            },
            automation: {
                title: "Automation",
                desc: "We optimize workflows with RPA and intelligent automation tools",
                features: ["RPA (Robotic Process Automation)", "Systems Integration", "Smart Workflows"]
            },
            development: {
                title: "Software Development",
                desc: "We create custom applications with the latest technologies and best practices",
                features: ["Web Applications", "Mobile Apps", "APIs and Microservices"]
            },
            consulting: {
                title: "IT Consulting",
                desc: "Expert advice for the digital transformation of your company",
                features: ["Solution Architecture", "Digital Strategy", "Process Optimization"]
            }
        },
        metrics: {
            title: "Real-Time Impact",
            processes: "Automated Processes",
            hours: "Hours Saved",
            savings: "Generated Savings",
            countries: "Active Countries"
        },
        pricing: {
            title: "Plans and Pricing",
            subtitle: "Solutions adapted to each stage of your growth"
        },
        testimonials: {
            title: "What our clients say",
            subtitle: "Success stories that transform companies"
        },
        calculator: {
            title: "Calculate your ROI",
            subtitle: "Discover how much you can save with intelligent automation"
        },
        resources: {
            title: "Resource Center",
            subtitle: "Knowledge and tools for your digital transformation"
        },
        partners: {
            title: "Partners and Certifications"
        },
        about: {
            title: "About DDSolutions",
            lead: "We are leaders in digital transformation, combining the power of Artificial Intelligence with innovative technological solutions.",
            text: "At DDSolutions, we believe the future belongs to companies that embrace technology. Our team of experts works tirelessly to create solutions that not only solve current problems, but anticipate tomorrow's needs.",
            features: {
                innovation: {
                    title: "Constant Innovation",
                    desc: "Always at the technological forefront"
                },
                security: {
                    title: "Guaranteed Security",
                    desc: "Enterprise-level data protection"
                },
                global: {
                    title: "Global Reach",
                    desc: "Solutions adapted to any market"
                }
            }
        },
        contact: {
            title: "Contact us",
            subtitle: "We are ready to take your company to the next level",
            form: {
                name: "Full name",
                email: "Email",
                phone: "Phone",
                service: "Service of interest",
                message: "Message",
                send: "Send message"
            },
            info: {
                email: "Email",
                phone: "Phone",
                schedule: "Schedule",
                scheduleText: "Mon - Fri: 9:00 AM - 6:00 PM"
            }
        },
        footer: {
            tagline: "Transforming the future with intelligent technology",
            quickLinks: "Quick links",
            followUs: "Follow us",    
            rights: "All rights reserved"
        }
    },
    pt: {
        nav: {
            home: "Início",
            services: "Serviços",
            pricing: "Preços",
            testimonials: "Depoimentos",
            resources: "Recursos",
            about: "Sobre",
            contact: "Contato"
        },
        hero: {
            title1: "Transformamos seu negócio",
            title2: "com Inteligência Artificial",
            subtitle: "Automação inteligente, soluções inovadoras e tecnologia de ponta para impulsionar sua empresa para o futuro",
            cta1: "Começar agora",
            cta2: "Ver serviços",
            stats: {
                satisfaction: "Satisfação",
                projects: "Projetos",
                support: "Suporte"
            }
        },
        services: {
            title: "Nossos Serviços",
            subtitle: "Soluções tecnológicas avançadas para cada necessidade da sua empresa",
            ai: {
                title: "Inteligência Artificial",
                desc: "Implementamos soluções de IA personalizadas para automatizar processos e melhorar a tomada de decisões",
                features: ["Machine Learning", "Processamento de Linguagem Natural", "Visão Computacional"]
            },
            automation: {
                title: "Automação",
                desc: "Otimizamos fluxos de trabalho com RPA e ferramentas de automação inteligente",
                features: ["RPA (Robotic Process Automation)", "Integração de Sistemas", "Workflows Inteligentes"]
            },
            development: {
                title: "Desenvolvimento de Software",
                desc: "Criamos aplicações personalizadas com as últimas tecnologias e melhores práticas",
                features: ["Aplicações Web", "Apps Móveis", "APIs e Microsserviços"]
            },
            consulting: {
                title: "Consultoria TI",
                desc: "Assessoria especializada para a transformação digital da sua empresa",
                features: ["Arquitetura de Soluções", "Estratégia Digital", "Otimização de Processos"]
            }
        },
        metrics: {
            title: "Impacto em Tempo Real",
            processes: "Processos Automatizados",
            hours: "Horas Economizadas",
            savings: "Economia Gerada",
            countries: "Países Ativos"
        },
        pricing: {
            title: "Planos e Preços",
            subtitle: "Soluções adaptadas a cada etapa do seu crescimento"
        },
        testimonials: {
            title: "O que nossos clientes dizem",
            subtitle: "Histórias de sucesso que transformam empresas"
        },
        calculator: {
            title: "Calcule seu ROI",
            subtitle: "Descubra quanto você pode economizar com automação inteligente"
        },
        resources: {
            title: "Centro de Recursos",
            subtitle: "Conhecimento e ferramentas para sua transformação digital"
        },
        partners: {
            title: "Parceiros e Certificações"
        },
        about: {
            title: "Sobre DDSolutions",
            lead: "Somos líderes em transformação digital, combinando o poder da Inteligência Artificial com soluções tecnológicas inovadoras.",
            text: "Na DDSolutions, acreditamos que o futuro pertence às empresas que abraçam a tecnologia. Nossa equipe de especialistas trabalha incansavelmente para criar soluções que não apenas resolvem problemas atuais, mas antecipam as necessidades de amanhã.",
            features: {
                innovation: {
                    title: "Inovação Constante",
                    desc: "Sempre na vanguarda tecnológica"
                },
                security: {
                    title: "Segurança Garantida",
                    desc: "Proteção de dados de nível empresarial"
                },
                global: {
                    title: "Alcance Global",
                    desc: "Soluções adaptadas a qualquer mercado"
                }
            }
        },
        contact: {
            title: "Entre em contato",
            subtitle: "Estamos prontos para levar sua empresa ao próximo nível",
            form: {
                name: "Nome completo",
                email: "E-mail",
                phone: "Telefone",
                service: "Serviço de interesse",
                message: "Mensagem",
                send: "Enviar mensagem"
            },
            info: {
                email: "E-mail",
                phone: "Telefone",
                schedule: "Horário",
                scheduleText: "Seg - Sex: 9:00 - 18:00"
            }
        },
        footer: {
            tagline: "Transformando o futuro com tecnologia inteligente",
            quickLinks: "Links rápidos",
            followUs: "Siga-nos",
            rights: "Todos os direitos reservados"
        }
    }
};

// Detect user language based on IP geolocation
async function detectUserLanguage() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;
        
        // Map countries to languages
        const languageMap = {
            'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CL': 'es', 'PE': 'es', 'VE': 'es', 'EC': 'es', 'GT': 'es', 'CU': 'es', 'BO': 'es', 'DO': 'es', 'HN': 'es', 'PY': 'es', 'SV': 'es', 'NI': 'es', 'CR': 'es', 'PA': 'es', 'UY': 'es',
            'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en',
            'BR': 'pt', 'PT': 'pt', 'AO': 'pt', 'MZ': 'pt'
        };
        
        const detectedLang = languageMap[countryCode] || 'en';
        return detectedLang;
    } catch (error) {
        console.error('Error detecting language:', error);
        return 'en';
    }
}

// Update page content with selected language
function updateContent(lang) {
    const t = translations[lang];
    if (!t) return;
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks[0]) navLinks[0].textContent = t.nav.home;
    if (navLinks[1]) navLinks[1].textContent = t.nav.services;
    if (navLinks[2]) navLinks[2].textContent = t.nav.pricing;
    if (navLinks[3]) navLinks[3].textContent = t.nav.testimonials;
    if (navLinks[4]) navLinks[4].textContent = t.nav.resources;
    if (navLinks[5]) navLinks[5].textContent = t.nav.about;
    if (navLinks[6]) navLinks[6].textContent = t.nav.contact;
    
    // Hero section
    const heroTitle1 = document.querySelector('.hero-title .text-gradient');
    const heroTitle2 = document.querySelector('.hero-title .text-white');
    if (heroTitle1) heroTitle1.textContent = t.hero.title1;
    if (heroTitle2) heroTitle2.textContent = t.hero.title2;
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;
    
    const heroBtns = document.querySelectorAll('.hero-buttons .btn');
    if (heroBtns[0]) heroBtns[0].textContent = t.hero.cta1;
    if (heroBtns[1]) heroBtns[1].textContent = t.hero.cta2;
    
    // Update other sections...
    const sectionsToUpdate = [
        { selector: '#servicios .section-title .text-gradient', text: t.services.title },
        { selector: '#servicios .section-subtitle', text: t.services.subtitle },
        { selector: '.metrics .section-title .text-gradient', text: t.metrics.title },
        { selector: '#precios .section-title .text-gradient', text: t.pricing.title },
        { selector: '#precios .section-subtitle', text: t.pricing.subtitle },
        { selector: '#testimonios .section-title .text-gradient', text: t.testimonials.title },
        { selector: '#testimonios .section-subtitle', text: t.testimonials.subtitle },
        { selector: '.roi-calculator .section-title .text-gradient', text: t.calculator.title },
        { selector: '.roi-calculator .section-subtitle', text: t.calculator.subtitle },
        { selector: '#recursos .section-title .text-gradient', text: t.resources.title },
        { selector: '#recursos .section-subtitle', text: t.resources.subtitle },
        { selector: '.partners .section-title .text-gradient', text: t.partners.title },
        { selector: '#nosotros .section-title .text-gradient', text: t.about.title },
        { selector: '#contacto .section-title .text-gradient', text: t.contact.title },
        { selector: '#contacto .section-subtitle', text: t.contact.subtitle }
    ];
    
    sectionsToUpdate.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element && item.text) {
            element.textContent = item.text;
        }
    });
}

// Create language selector
function createLanguageSelector() {
    const langSelector = document.createElement('div');
    langSelector.className = 'language-selector';
    langSelector.innerHTML = `
        <select id="langSelect">
            <option value="es">🇪🇸 Español</option>
            <option value="en">🇬🇧 English</option>
            <option value="pt">🇧🇷 Português</option>
        </select>
    `;
    
    // Add to navbar
    const navWrapper = document.querySelector('.nav-wrapper');
    const themeToggle = document.querySelector('.theme-toggle');
    navWrapper.insertBefore(langSelector, themeToggle);
    
    // Handle language change
    const select = document.getElementById('langSelect');
    select.addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('preferredLanguage', currentLang);
        updateContent(currentLang);
        showNotification(`Idioma cambiado a ${e.target.selectedOptions[0].textContent}`, 'success');
    });
    
    return select;
}

// Initialize language system
async function initializeLanguage() {
    // Check for saved preference
    const savedLang = localStorage.getItem('preferredLanguage');
    
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    } else {
        // Detect language based on IP
        currentLang = await detectUserLanguage();
    }
    
    // Create language selector
    const langSelect = createLanguageSelector();
    langSelect.value = currentLang;
    
    // Update content
    updateContent(currentLang);
}

// Premium Automation Showcase Functionality
function initAutomationShowcase() {
    // Animate statistics in global impact section on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElements = entry.target.querySelectorAll('.stat-value');
                statElements.forEach(stat => {
                    const target = parseInt(stat.dataset.target);
                    if (target) {
                        animateNumber(stat, 0, target, 2500);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe the global impact statistics section
    const globalImpact = document.querySelector('.global-impact');
    if (globalImpact) {
        observer.observe(globalImpact);
    }
    
    // Add enhanced card interaction effects
    const deptCards = document.querySelectorAll('.dept-card');
    deptCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add slight delay to stagger animations if multiple cards are hovered
            setTimeout(() => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            }, Math.random() * 100);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect for mobile/touch devices
        card.addEventListener('click', () => {
            card.classList.add('clicked');
            setTimeout(() => {
                card.classList.remove('clicked');
            }, 300);
        });
    });
    
    // Animate department statistics on scroll
    const deptStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const numberMatch = text.match(/\d+/);
                    if (numberMatch) {
                        const number = parseInt(numberMatch[0]);
                        const suffix = text.replace(/\d+/, '');
                        animateNumber(stat, 0, number, 1500, suffix);
                    }
                });
                deptStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });
    
    // Observe all department cards for stats animation
    deptCards.forEach(card => {
        deptStatsObserver.observe(card);
    });
}

// Animate numbers function
function animateNumber(element, start, end, duration, customSuffix = null) {
    const startTime = performance.now();
    const originalText = element.textContent;
    const suffix = customSuffix || originalText.replace(/\d+/g, '').trim();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smoother animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(start + (end - start) * easedProgress);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initThemeToggle();
    initChatbot();
    initROICalculator();
    initAutomationShowcase();
    initPWA();
    initPushNotifications();
    
    // Update real-time metrics every 30 seconds
    setInterval(() => {
        metrics.processes += Math.floor(Math.random() * 10);
        metrics.hours += Math.floor(Math.random() * 100);
        metrics.savings += Math.floor(Math.random() * 1000);
        
        const processEl = document.querySelector('[data-target="15789"]');
        const hoursEl = document.querySelector('[data-target="892345"]');
        const savingsEl = document.querySelector('[data-target="4500000"]');
        
        if (processEl && processEl.classList.contains('visible')) {
            processEl.textContent = (metrics.processes / 1000).toFixed(0) + 'K';
        }
        if (hoursEl && hoursEl.classList.contains('visible')) {
            hoursEl.textContent = (metrics.hours / 1000).toFixed(0) + 'K';
        }
        if (savingsEl && savingsEl.classList.contains('visible')) {
            savingsEl.textContent = '$' + (metrics.savings / 1000000).toFixed(1) + 'M';
        }
    }, 30000);
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}