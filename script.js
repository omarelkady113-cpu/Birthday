// دالة التحقق من الدخول (الباسورد) مع رسالة الترحيب المتطورة
function checkLogin() {
    const validPass = "2752003"; 
    const passVal = document.getElementById("password").value; 
    const errorMsg = document.getElementById("error-msg"); 
    
    if (passVal === validPass) {
        errorMsg.style.display = "none"; 
        
        // إظهار شاشة الترحيب
        const welcomeOverlay = document.getElementById("welcome-overlay");
        welcomeOverlay.classList.add("show");
        
        // تفضل ظاهرة 3 ثواني
        setTimeout(() => {
            // نخفيها بنعومة (الـ CSS هيعمل fade out)
            welcomeOverlay.classList.remove("show"); 
            
            // نستنى 8=50 جزء من الثانية (وقت الـ fade out في الـ CSS) وبعدين نفتح الشاشة اللي بعدها
            setTimeout(() => {
                nextStep('login-section', 'step1-message'); 
            }, 50);
            
        }, 1500); 
        
    } else {
        errorMsg.style.display = "block";
    }
}

// دالة التنقل بين الشاشات
function nextStep(currentStepId, nextStepId) {
    document.getElementById(currentStepId).classList.remove('active');
    document.getElementById(nextStepId).classList.add('active');
    
    const container = document.getElementById('main-container');
    
    if (nextStepId === 'login-section' || nextStepId === 'step1-message') {
        container.className = 'container size-small';
    } 
    else if (nextStepId === 'step2-video' || nextStepId === 'step4-dates' || nextStepId === 'step5-final' || nextStepId === 'step6-sarahah') {
        container.className = 'container size-medium';
        
        if (nextStepId === 'step5-final') {
            triggerCelebration();
        }
    } 
    else if (nextStepId === 'step3-gallery') {
        container.className = 'container size-large'; 
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// دالة الاحتفال النهائي 
function triggerCelebration() {
    const emojis = ['🎉', '🎂', '❤️', '✨', '💖']; 
    for (let i = 0; i < 50; i++) { 
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)]; 
            
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.fontSize = Math.random() * 20 + 20 + 'px'; 
            confetti.style.zIndex = '1000'; 
            confetti.style.pointerEvents = 'none'; 
            
            document.body.appendChild(confetti); 
            const duration = Math.random() * 3 + 2; 
            
            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'ease-out'
            });
            setTimeout(() => { confetti.remove(); }, duration * 1000);
        }, i * 100); 
    }
}

// دالة فتح الصور 
function revealImage(cardElement) {
    cardElement.classList.add('revealed');
}

// دالة القلوب المتحركة في الخلفية
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '❤️'; 
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.fontSize = Math.random() * 15 + 15 + 'px';
    
    document.getElementById('hearts-container').appendChild(heart);
    
    setTimeout(() => { heart.remove(); }, 6000);
}

setInterval(createHeart, 300);

// تأثير الـ 3D للكروت
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.photo-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -12; 
            const rotateY = ((x - centerX) / centerX) * 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
});
