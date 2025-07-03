const cards = document.querySelectorAll(".card");
// const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

window.addEventListener("load", () => {
    cards.forEach(card => {
        // Get custom angles and x-offset from HTML attributes
        const startAngle = parseFloat(card.dataset.start);
        const xOffset = parseFloat(card.dataset.offset);

        // Set initial transform
        card.style.transform = `translateX(${xOffset * 4}px) rotateZ(${startAngle/5}deg)`;
    });
});

// hamburger.addEventListener("click", () => {
//   navLinks.classList.toggle("show");
// });

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // % of how far the card is in view
    const progress = 1 - Math.max(0, Math.min(1, rect.top / windowHeight));

    // Get custom angles and x-offset from HTML attributes
    const startAngle = parseFloat(card.dataset.start);
    const endAngle = parseFloat(card.dataset.end);
    const xOffset = parseFloat(card.dataset.offset);

    // Interpolate rotation & x-position
    const currentAngle = startAngle + (endAngle - startAngle) * progress;
    const currentX = xOffset * (1 - progress); // move toward center

    card.style.transform = `translateX(${currentX * 3}px) rotateZ(${currentAngle}deg)`;
  });
});

function selectPlan(planName) {
    const notification = document.getElementById('notification');
    const planNames = {
        'starter': 'Starter',
        'plus': 'Plus',
        'pro': 'Pro'
    };
    
    notification.textContent = `${planNames[planName]} plan selected! Redirecting to checkout...`;
    notification.classList.add('show');
    
    // Add ripple effect to clicked card
    const card = document.querySelector(`[data-plan="${planName}"]`);
    card.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 150);
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
    
    // Here you would typically redirect to a payment processor
    console.log(`Selected plan: ${planName}`);
}

// Add some interactive animations
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate cards on load
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.pricing-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});
