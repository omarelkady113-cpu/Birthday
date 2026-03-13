// دالة التحقق من الدخول (الباسورد)
function checkLogin() {
    const validPass = "1234"; // كلمة المرور الصحيحة
    const passVal = document.getElementById("password").value; // القيمة اللي المستخدم كتبها
    const errorMsg = document.getElementById("error-msg"); // رسالة الخطأ

    // لو الباسورد صح، ينفذ دالة الانتقال للشاشة الأولى
    if (passVal === validPass) {
        nextStep('login-section', 'step1-message');
    } else {
        // لو غلط، يظهر رسالة الخطأ
        errorMsg.style.display = "block";
    }
}

// دالة التنقل بين الشاشات مع تغيير حجم المربع الأبيض
function nextStep(currentStepId, nextStepId) {
    // إخفاء الشاشة الحالية بإزالة كلاس active وإظهار الجديدة بإضافته
    document.getElementById(currentStepId).classList.remove('active');
    document.getElementById(nextStepId).classList.add('active');
    
    // جلب الصندوق الأساسي للتحكم في حجمه
    const container = document.getElementById('main-container');
    
    // تغيير حجم الصندوق على حسب الصفحة (ده اللي بيمنع إن الشاشة تبوظ)
    if (nextStepId === 'login-section' || nextStepId === 'step1-message') {
        container.className = 'container size-small'; // شاشة صغيرة
    } 
    // ضفت هنا خطوة صراحة (step6-sarahah) عشان تاخد الحجم المتوسط
    else if (nextStepId === 'step2-video' || nextStepId === 'step4-dates' || nextStepId === 'step5-final' || nextStepId === 'step6-sarahah') {
        container.className = 'container size-medium'; // شاشة متوسطة
        
        // لو الشاشة هي التورتة، شغل مطر من ورق الزينة والقلوب
        if (nextStepId === 'step5-final') {
            triggerCelebration();
        }
    } 
    else if (nextStepId === 'step3-gallery') {
        container.className = 'container size-large'; // شاشة كبيرة جداً لمعرض الصور
    }
    
    // الطلوع لأول الصفحة بنعومة بعد كل ضغطة
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// دالة الاحتفال النهائي (نزول إيموجيز من فوق)
function triggerCelebration() {
    const emojis = ['🎉', '🎂', '❤️', '✨', '💖']; // الأشكال اللي هتنزل
    for (let i = 0; i < 50; i++) { // تكرار 50 مرة
        setTimeout(() => {
            // إنشاء عنصر جديد في الـ HTML
            const confetti = document.createElement('div');
            confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)]; // اختيار شكل عشوائي
            
            // تنسيقه ليظهر في مكان عشوائي أعلى الشاشة
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.fontSize = Math.random() * 20 + 20 + 'px'; // حجم عشوائي
            confetti.style.zIndex = '1000'; // يظهر فوق كل حاجة
            confetti.style.pointerEvents = 'none'; // عشان ميعطلش الماوس
            
            document.body.appendChild(confetti); // إضافته للصفحة

            const duration = Math.random() * 3 + 2; // سرعة نزول عشوائية
            // أنيميشن النزول لتحت مع الدوران
            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'ease-out'
            });

            // مسح العنصر بعد ما ينزل عشان المتصفح ميهنجش
            setTimeout(() => { confetti.remove(); }, duration * 1000);
        }, i * 100); // تساقط متتابع (بين كل واحدة والتانية جزء من الثانية)
    }
}

// دالة فتح الصور المخفية في معرض الصور
function revealImage(cardElement) {
    // إضافة كلاس revealed اللي بيشغل الـ CSS اللي بيشيل الغلاف ويوضح الصورة
    cardElement.classList.add('revealed');
}

// دالة إنشاء القلوب المتحركة (الخلفية المستمرة)
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '❤️'; // شكل القلب
    
    // مكان ظهوره أسفل الشاشة عشوائي
    heart.style.left = Math.random() * 100 + 'vw';
    // سرعة صعوده عشوائية
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    // حجمه عشوائي
    heart.style.fontSize = Math.random() * 15 + 15 + 'px';
    
    document.getElementById('hearts-container').appendChild(heart);
    
    // مسح القلب بعد 6 ثواني عشان ميزحمش الميموري
    setTimeout(() => { heart.remove(); }, 6000);
}

// تشغيل دالة عمل القلوب كل 300 جزء من الثانية (يعني طول ما الصفحة مفتوحة)
setInterval(createHeart, 300);