const controlPanel = document.querySelector('.control-panel'); // Get the control panel

if(controlPanel){ // If the control panel exists
    const sliderImage = document.querySelector('.slider-image');
    const slider_img = ['img1.jpg', 'img2.jpg', 'img3.webp']; // Array of images

    const slideDuration = 15000;
    let bullets = [];
    let currentIndex = 0;
    let slideInterval;

    slider_img.forEach((image, index) =>{ // Loop through the images
        const bullet = document.createElement('div'); // Create a bullet
        bullet.classList.add('bullet'); // Add the bullet class

        if(index === 0){ // give the first bullet the active class
            bullet.classList.add('active');
            const bulletLoad = document.createElement('div'); // Create a bullet load
            bulletLoad.classList.add('bullet-load'); // Add the bullet load class
            bullet.appendChild(bulletLoad); // Append the bullet load to the bullet
            setTimeout(() => bulletLoad.style.width = "100%", 10);
        }
        controlPanel.appendChild(bullet); // Append the bullet to the control panel
        bullets.push(bullet);
        console.log(index);

        bullet.addEventListener('click', ()=>{
            changeSlide(index);
            resetTimer();
        });
    });

    function changeSlide(newIndex){
        const activeBullet = document.querySelector('.bullet.active');
        if(activeBullet){
            const bulletLoad = activeBullet.querySelector('.bullet-load');
            if(bulletLoad){
                activeBullet.classList.remove('active');
                bulletLoad.remove();
            }
        }
        currentIndex = newIndex;
        bullets[currentIndex].classList.add('active');
        const newBulletLoad = document.createElement('div');
        newBulletLoad.classList.add('bullet-load');
        bullets[currentIndex].appendChild(newBulletLoad);

        sliderImage.src = `img/${slider_img[currentIndex]}`;
        setTimeout(() => newBulletLoad.style.width = "100%", 10);
    }

    function nextSlide() {
        changeSlide((currentIndex + 1) % slider_img.length);
    }

    function startTimer() {
        slideInterval = setInterval(nextSlide, 15000);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    startTimer();
}

