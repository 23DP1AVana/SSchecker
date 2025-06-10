document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                }
            }
        });
    });
    
    // Animated counter for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('hero-visual')) {
                    // Trigger notification popup animation
                    setTimeout(() => {
                        document.querySelector('.notification-popup').style.opacity = '1';
                    }, 1500);
                    
                    // Start counter animation
                    animateCounters();
                }
                
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.step, .feature-card, .hero-visual');
    animatedElements.forEach(el => observer.observe(el));
    
    // Window resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    });
});

let loading = false
const BUTTON = document.getElementById('formSubmit')
const form = document.getElementById('contactForm')
const errorMsg = document.getElementById('formError')

form.addEventListener('submit', function (event) {
    event.preventDefault()
    if (loading) return
    loading = true
    BUTTON.innerHTML = 'Loading...'

    const nameInput = document.querySelector('input[placeholder="Your Name"]')
    const emailInput = document.querySelector('input[placeholder="Your Email"]')
    const subjectInput = document.querySelector('input[placeholder="Subject"]')
    const messageInput = document.querySelector('textarea[placeholder="Your Message"]')

    const name = nameInput.value.trim()
    const email = emailInput.value.trim()
    const subject = subjectInput.value.trim()
    const message = messageInput.value.trim()

    const fields = [nameInput, emailInput, subjectInput, messageInput]
    let hasError = false

    fields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('input-error')
            hasError = true
        } else {
            field.classList.remove('input-error')
        }
    })

    if (hasError) {
        errorMsg.style.color = 'red'
        errorMsg.textContent = 'Please fill in all fields.'
        resetButton()
        loading = false
        return
    } else {
        errorMsg.textContent = ''
    }

    const data = {
        service_id: 'service_qu8irua',
        template_id: 'template_xfv7exi',
        user_id: 'wtCRfUdNsnRwRkqjy',
        template_params: {
            user_name: name,
            user_email: email,
            subject: subject,
            message: message
        }
    }

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                BUTTON.innerHTML = 'Sent!'
                form.reset()
                errorMsg.style.color = 'green'
                errorMsg.textContent = 'Your message has been sent successfully!'
            } else {
                throw new Error('Failed to send email')
            }
        })
        .catch(() => {
            errorMsg.style.color = 'red'
            errorMsg.textContent = 'Something went wrong. Please try again.'
        })
        .finally(() => {
            setTimeout(() => {
                resetButton()
                errorMsg.textContent = ''
                errorMsg.style.color = 'red'
                loading = false
            }, 5000)
        })
})

function resetButton() {
    BUTTON.innerHTML = `Send Message <i class="fas fa-paper-plane"></i>`
}