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
    
    // Here you would normally send the form data to a server
    alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
    contactForm.reset();
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
        }
    });
}, observerOptions);

// Observe all service cards and other elements
document.querySelectorAll('.service-card, .about-content, .contact-content').forEach(el => {
    observer.observe(el);
});

// Add animation classes
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .about-content, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.visible, .about-content.visible, .contact-content.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-links.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.95);
            flex-direction: column;
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 0, 0, 0.2);
        }
        
        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
});

// Multi-language support
const translations = {
    es: {
        nav: {
            home: "Inicio",
            services: "Servicios",
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

let currentLang = 'es';

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
    
    // Navigation
    document.querySelector('a[href="#inicio"]').textContent = t.nav.home;
    document.querySelector('a[href="#servicios"]').textContent = t.nav.services;
    document.querySelector('a[href="#nosotros"]').textContent = t.nav.about;
    document.querySelector('a[href="#contacto"]').textContent = t.nav.contact;
    
    // Hero section
    document.querySelector('.hero-title .text-gradient').textContent = t.hero.title1;
    document.querySelector('.hero-title .text-white').textContent = t.hero.title2;
    document.querySelector('.hero-subtitle').textContent = t.hero.subtitle;
    document.querySelector('.btn-primary').textContent = t.hero.cta1;
    document.querySelector('.btn-secondary').textContent = t.hero.cta2;
    
    // Hero stats
    const statLabels = document.querySelectorAll('.stat-label');
    statLabels[0].textContent = t.hero.stats.satisfaction;
    statLabels[1].textContent = t.hero.stats.projects;
    statLabels[2].textContent = t.hero.stats.support;
    
    // Services section
    document.querySelector('#servicios .section-title .text-gradient').textContent = t.services.title;
    document.querySelector('#servicios .section-subtitle').textContent = t.services.subtitle;
    
    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceData = [t.services.ai, t.services.automation, t.services.development, t.services.consulting];
    
    serviceCards.forEach((card, index) => {
        const data = serviceData[index];
        card.querySelector('h3').textContent = data.title;
        card.querySelector('p').textContent = data.desc;
        const features = card.querySelectorAll('.service-features li');
        features.forEach((feature, i) => {
            feature.textContent = data.features[i];
        });
    });
    
    // About section
    document.querySelector('#nosotros .section-title .text-gradient').textContent = t.about.title;
    document.querySelector('.about-text .lead').textContent = t.about.lead;
    document.querySelector('.about-text p:nth-of-type(2)').textContent = t.about.text;
    
    // About features
    const aboutFeatures = document.querySelectorAll('.feature');
    const featureData = [t.about.features.innovation, t.about.features.security, t.about.features.global];
    aboutFeatures.forEach((feature, index) => {
        feature.querySelector('h4').textContent = featureData[index].title;
        feature.querySelector('p').textContent = featureData[index].desc;
    });
    
    // Contact section
    document.querySelector('#contacto .section-title .text-gradient').textContent = t.contact.title;
    document.querySelector('#contacto .section-subtitle').textContent = t.contact.subtitle;
    
    // Contact form
    document.querySelector('label[for="name"]').textContent = t.contact.form.name;
    document.querySelector('label[for="email"]').textContent = t.contact.form.email;
    document.querySelector('label[for="phone"]').textContent = t.contact.form.phone;
    document.querySelector('label[for="service"]').textContent = t.contact.form.service;
    document.querySelector('label[for="message"]').textContent = t.contact.form.message;
    document.querySelector('.contact-form .btn-primary').textContent = t.contact.form.send;
    
    // Contact info
    const infoItems = document.querySelectorAll('.info-item h4');
    infoItems[0].textContent = t.contact.info.email;
    infoItems[1].textContent = t.contact.info.phone;
    infoItems[2].textContent = t.contact.info.schedule;
    document.querySelector('.info-item:last-child p').textContent = t.contact.info.scheduleText;
    
    // Footer
    document.querySelector('.footer-brand p').textContent = t.footer.tagline;
    document.querySelector('.footer-links h4').textContent = t.footer.quickLinks;
    document.querySelector('.footer-social h4').textContent = t.footer.followUs;
    document.querySelector('.footer-bottom p').textContent = `© 2024 DDSolutions.ai - ${t.footer.rights}`;
    
    // Update footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks[0].textContent = t.nav.home;
    footerLinks[1].textContent = t.nav.services;
    footerLinks[2].textContent = t.nav.about;
    footerLinks[3].textContent = t.nav.contact;
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
    navWrapper.insertBefore(langSelector, document.querySelector('.menu-toggle'));
    
    // Add styles
    const style = document.createElement('style');
    style.textContent += `
        .language-selector {
            margin-left: 2rem;
        }
        
        #langSelect {
            background: var(--gray-dark);
            border: 1px solid rgba(255, 0, 0, 0.2);
            color: var(--white);
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        #langSelect:hover {
            border-color: var(--primary-red);
        }
        
        #langSelect:focus {
            outline: none;
            border-color: var(--primary-red);
            box-shadow: 0 0 10px rgba(255, 0, 0, 0.2);
        }
        
        @media (max-width: 768px) {
            .language-selector {
                margin-left: auto;
                margin-right: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Handle language change
    const select = document.getElementById('langSelect');
    select.addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('preferredLanguage', currentLang);
        updateContent(currentLang);
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLanguage);