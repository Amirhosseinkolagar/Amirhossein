document.addEventListener('DOMContentLoaded', function () {

    document.documentElement.addEventListener('click', playMusicOnce, {once: true});
    document.documentElement.addEventListener('keydown', playMusicOnce, {once: true});

    function playMusicOnce() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    // نمایش یک پیام تایید برای کاربر
    const userAgreed = confirm('این سایت حاوی موسیقی است. آیا مایل به پخش موسیقی هستید؟');

    if (userAgreed) {
        // کاربر تایید کرده است، پس موسیقی پخش می‌شود
        backgroundMusic.play().catch(error => {
            console.error("موسیقی قابل پخش نیست", error);
        });
    }
    // دیگر نیازی به اضافه کردن گوش‌دهی‌کننده‌ها نیست، زیرا از {once: true} استفاده کرده‌ایم
    }
    const submitBtn = document.getElementById('submitBtn');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');

    function updateSubmitButtonState() {
        submitBtn.disabled = !firstName.value || !lastName.value;
    }

    firstName.addEventListener('input', updateSubmitButtonState);
    lastName.addEventListener('input', updateSubmitButtonState);

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault(); // جلوگیری از ارسال فرم به صورت پیش فرض
        

        // ایجاد انفجار منور از دکمه با استیکر '🎊'
        explodeParticles(submitBtn, '🎊', 100, { spread: 360, size: 20 });

         // موقعیت‌های آتش‌بازی در موقعیت‌های خاص
         const positions = [
            { x: '10%', y: '10%' },
            { x: '90%', y: '10%' },
            { x: '10%', y: '80%' },
            { x: '90%', y: '80%' }
        ];

        positions.forEach(position => {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createHeartFirework(position.x, position.y);
                }, i * 3000);
            }
        });
    

        setTimeout(() => {
            window.location.href = 'page2.html'; // صفحه دوم
        }, 11000); // تاخیر 13 ثانیه قبل از انجام عملیات بعدی
    });
});

// تابع برای ایجاد انفجار منور از دکمه
function explodeParticles(element, particle, count, options = {}) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const particleElement = document.createElement('span');
            particleElement.innerText = particle;
            particleElement.style.position = 'fixed';
            particleElement.style.left = `${rect.left + rect.width / 2}px`;
            particleElement.style.top = `${rect.top + rect.height / 2}px`;
            particleElement.style.fontSize = `${options.size || 24}px`;
            document.body.appendChild(particleElement);

            const angle = Math.random() * options.spread - options.spread / 2;
            const distance = Math.random() * 100 + 50;
            const x = distance * Math.cos(angle * Math.PI / 180);
            const y = distance * Math.sin(angle * Math.PI / 180);

            // انیمیشن حرکت و ناپدید شدن
            particleElement.animate([
                { transform: `translate(0, 0)`, opacity: 1 },
                { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
            ], {
                duration: options.duration || Math.random() * 1000 + 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                particleElement.remove();
            };
        }, options.delay || 0);
    }
}

// آرایه‌ای از رنگ‌های رنگین کمان
const rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

function createHeartFirework(x, y) {
    const count = 30; // تعداد ذرات برای ایجاد شکل قلب

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.classList.add('firework-particle');
            document.body.appendChild(particle);

            particle.style.left = `calc(${x} - 5px)`;
            particle.style.top = `calc(${y} - 5px)`;
            particle.style.backgroundColor = rainbowColors[i % rainbowColors.length]; // اختصاص رنگ به ذره

            const angle = Math.PI * 2 * (i / count);
            const heartX = 16 * Math.pow(Math.sin(angle), 3);
            const heartY = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));

            particle.animate([
                { transform: `translate(0, 0)`, opacity: 1 },
                { transform: `translate(${heartX * 10}px, ${heartY * 10 + 50}px)`, opacity: 0 }
            ], {
                duration: 3000, // آهسته کردن انیمیشن
                easing: 'ease-out',
                fill: 'forwards'
            });
        }, i * 100);
    }
}


document.querySelectorAll('.input-box').forEach(input => {
    input.addEventListener('click', function(event) {
      const boxRect = input.getBoundingClientRect();
      const boxCenterX = boxRect.left + boxRect.width / 2;
      const boxCenterY = boxRect.top + boxRect.height / 2;
      
      for (let i = 0; i < 20; i++) { // ایجاد 20 قلب
        const heart = document.createElement('div');
        heart.classList.add('heart');
        document.body.appendChild(heart);
        heart.style.left = `${boxCenterX}px`;
        heart.style.top = `${window.scrollY + boxCenterY}px`;
  
        // تنظیم انیمیشن
        const animationDuration = Math.random() * 2 + 3; // بین 3 تا 5 ثانیه
        heart.style.transition = `all ${animationDuration}s ease-out`;
        
        // حرکت انفجاری
        const angle = Math.random() * 360;
        const radius = Math.random() * 100 + 50;
        setTimeout(() => {
          heart.style.left = `${boxCenterX + radius * Math.cos(angle)}px`;
          heart.style.top = `${window.scrollY + boxCenterY - radius * Math.sin(angle)}px`;
          heart.style.opacity = 0;
        }, 10);
  
        // حذف قلب پس از اتمام انیمیشن
        setTimeout(() => heart.remove(), animationDuration * 1000);
      }
    });
  });