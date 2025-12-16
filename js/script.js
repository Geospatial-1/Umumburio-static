// Main JavaScript file for Umumburio SHG website

// Services Data
const services = [
    {
        title: "Unity of Members",
        icon: "fas fa-users",
        desc: "Fostering strong bonds and collaboration among members.",
    },
    {
        title: "Financial Support",
        icon: "fas fa-hand-holding-usd",
        desc: "Providing financial assistance for business and personal development.",
    },
    {
        title: "Community Development",
        icon: "fas fa-hands-helping",
        desc: "Engaging in projects that benefit our local community.",
    },
    {
        title: "Loans to Members",
        icon: "fas fa-credit-card",
        desc: "Affordable credit facilities with flexible repayment terms.",
    },
    {
        title: "Merry-Go-Round",
        icon: "fas fa-gift",
        desc: "Rotating savings and credit association (ROSCA) for members.",
    },
    {
        title: "Family Welfare",
        icon: "fas fa-home",
        desc: "Supporting members' families through various initiatives.",
    },
    {
        title: "Business Support",
        icon: "fas fa-briefcase",
        desc: "Helping members grow their businesses through various support services.",
    },
    {
        title: "Financial Literacy",
        icon: "fas fa-chart-line",
        desc: "Training members on money management and investment.",
    },
    {
        title: "Table Banking",
        icon: "fas fa-piggy-bank",
        desc: "Member-owned banking system for savings and loans.",
    }
];

// Team Data
const teamMembers = [
    {
        name: "John Otieno",
        position: "Chairperson",
        description: "Strategic leadership and governance",
        image: "images/chairman.jpg"
    },
    {
        name: "Mary Achieng",
        position: "Treasurer",
        description: "Financial management and reporting",
        image: "images/treasurer.jpg"
    },
    {
        name: "James Okoth",
        position: "Secretary",
        description: "Documentation and coordination",
        image: "images/secretary.jpg"
    },
    {
        name: "Sarah Akinyi",
        position: "Communications Head",
        description: "Internal and external communications",
        image: "images/communication.jpg"
    },
    {
        name: "Dr. Peter Omondi",
        position: "Group Patron",
        description: "Advisory and mentorship role",
        image: "images/patron.jpg"
    },
    {
        name: "Grace Atieno",
        position: "Executive Board Member",
        description: "Strategic planning and member relations",
        image: "images/board-member.jpg"
    }
];

// Initialize Particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#00ff9c"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00ff9c",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.4
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Create animated stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const numStars = 20;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        star.setAttribute('class', 'star');
        star.setAttribute('filter', 'url(#starGlow)');
        
        // Create star shape
        const size = 0.5 + Math.random() * 1;
        const points = [];
        for (let j = 0; j < 5; j++) {
            const angle = (j * 72 - 90) * Math.PI / 180;
            const x = 50 + Math.cos(angle) * size;
            const y = 50 + Math.sin(angle) * size;
            points.push(`${x},${y}`);
        }
        star.setAttribute('d', `M${points.join('L')}Z`);
        
        // Random position along border
        const path = document.getElementById('border-path');
        const pathLength = path.getTotalLength();
        const startOffset = (pathLength / numStars) * i;
        
        // Create animation
        const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
        animateMotion.setAttribute('dur', '20s');
        animateMotion.setAttribute('repeatCount', 'indefinite');
        animateMotion.setAttribute('path', 'M2,2 L98,2 L98,98 L2,98 Z');
        animateMotion.setAttribute('keyPoints', `${i/numStars};${(i/numStars + 0.5) % 1}`);
        animateMotion.setAttribute('keyTimes', '0;1');
        animateMotion.setAttribute('calcMode', 'linear');
        
        // Add twinkling animation
        const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateOpacity.setAttribute('attributeName', 'opacity');
        animateOpacity.setAttribute('values', '0.3;0.8;0.3');
        animateOpacity.setAttribute('dur', '2s');
        animateOpacity.setAttribute('repeatCount', 'indefinite');
        animateOpacity.setAttribute('begin', `${Math.random() * 2}s`);
        
        star.appendChild(animateMotion);
        star.appendChild(animateOpacity);
        starsContainer.appendChild(star);
    }
}

// Initialize services
function initServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <i class="${service.icon} service-icon"></i>
            <h3>${service.title}</h3>
            <p>${service.desc}</p>
        `;
        
        serviceCard.addEventListener('click', () => {
            alert(`Learn more about: ${service.title}`);
        });
        
        servicesGrid.appendChild(serviceCard);
    });
}

// Initialize team
function initTeam() {
    const teamGrid = document.getElementById('teamGrid');
    if (!teamGrid) return;
    
    teamMembers.forEach(member => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-member';
        teamCard.innerHTML = `
            <div class="member-photo">
                <img src="${member.image}" alt="${member.name}" onerror="this.src='https://placehold.co/200x200/00ff9c/0a192f?text=${member.name.split(' ')[0].charAt(0)}.+${member.name.split(' ')[1]}'">
            </div>
            <h3>${member.name}</h3>
            <p>${member.position}</p>
            <p>${member.description}</p>
        `;
        
        teamGrid.appendChild(teamCard);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = navMenu.classList.contains('active') 
                ? 'fas fa-times' 
                : 'fas fa-bars';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu on link click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }
}

// Form Submission Handler
function initForms() {
    const membershipForm = document.getElementById('membershipForm');
    if (membershipForm) {
        membershipForm.addEventListener('submit', handleMembershipForm);
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginForm);
    }
    
    const loanForm = document.getElementById('loanForm');
    if (loanForm) {
        loanForm.addEventListener('submit', handleLoanForm);
    }
}

// Handle membership form submission
async function handleMembershipForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formMessage = document.getElementById('formMessage');
    
    // Basic form validation
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'rgba(255, 50, 50, 0.5)';
        } else {
            field.style.borderColor = 'rgba(0, 255, 156, 0.2)';
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields marked with *');
        return;
    }
    
    // Collect form data
    const formData = {
        fullName: form.querySelector('#fullName').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        area: form.querySelector('#area').value,
        reason: form.querySelector('#reason').value,
        business: form.querySelector('#business')?.value || '',
        submittedAt: new Date().toISOString()
    };
    
    try {
        // Save to Firebase
        await window.firebaseAuth.submitMembershipApplication(formData);
        
        // Show success message
        form.style.display = 'none';
        if (formMessage) {
            formMessage.style.display = 'block';
        }
        
        // Reset form after 10 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            if (formMessage) {
                formMessage.style.display = 'none';
            }
        }, 10000);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting application. Please try again.');
    }
}

// Handle login form submission
async function handleLoginForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    const userType = form.querySelector('input[name="userType"]:checked')?.value;
    
    if (!userType) {
        alert('Please select your user type');
        return;
    }
    
    try {
        await window.firebaseAuth.signIn(email, password);
        // Redirect handled by auth state observer
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed: ' + error.message);
    }
}

// Handle loan form submission
async function handleLoanForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const amount = form.querySelector('#amount').value;
    const purpose = form.querySelector('#purpose').value;
    const repaymentPeriod = form.querySelector('#repaymentPeriod').value;
    const guarantor = form.querySelector('#guarantor')?.value || '';
    
    const applicationData = {
        amount: parseFloat(amount),
        purpose,
        repaymentPeriod: parseInt(repaymentPeriod),
        guarantor,
        appliedAt: new Date().toISOString()
    };
    
    try {
        await window.firebaseAuth.submitLoanApplication(applicationData);
        alert('Loan application submitted successfully!');
        form.reset();
    } catch (error) {
        console.error('Error submitting loan application:', error);
        alert('Error submitting application: ' + error.message);
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, href);
            }
        });
    });
}

// Animate elements on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for animation
    document.querySelectorAll('.service-card, .team-member, .benefit-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Header scroll effect
function initHeaderScroll() {
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.background = 'rgba(10, 25, 47, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(10, 25, 47, 0.9)';
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Initialize user type selector
function initUserTypeSelector() {
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const input = document.querySelector(`input[value="${btn.dataset.type}"]`);
            if (input) {
                input.checked = true;
            }
        });
    });
}

// Initialize dashboard
function initDashboard() {
    // Load user data
    if (window.firebaseAuth) {
        window.firebaseAuth.getCurrentUser()
            .then(user => {
                document.getElementById('userName').textContent = user.firstName + ' ' + user.lastName;
                document.getElementById('userRole').textContent = user.role.toUpperCase();
                document.getElementById('userEmail').textContent = user.email;
            })
            .catch(error => {
                console.error('Error loading user data:', error);
            });
    }
    
    // Initialize logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.firebaseAuth.signOut();
        });
    }
}

// Main initialization function
function init() {
    initParticles();
    createStars();
    initServices();
    initTeam();
    initMobileMenu();
    initForms();
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderScroll();
    initUserTypeSelector();
    initDashboard();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);