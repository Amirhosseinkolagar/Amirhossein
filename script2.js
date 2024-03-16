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


});

document.getElementById("giftButton").onclick = function() {
    this.style.display = 'none'; // Hide the button

    setTimeout(function() {
      var messageBox = document.getElementById("messageBox");
      messageBox.style.display = 'block'; // Show the message box
      messageBox.style.animation = 'fadeIn 2s forwards'; // Apply fade in animation
    }, 3000);

    setTimeout(function() {
      var messageBox = document.getElementById("messageBox");
      messageBox.style.opacity = '0'; // Begin to hide the message box
      setTimeout(function() {
        messageBox.style.display = 'none'; // Fully hide the message box
        document.getElementById("giftButton").style.display = 'inline-block'; // Show the button again
      }, 2000); // Wait for the fade out transition to finish
    }, 20000);
  };

