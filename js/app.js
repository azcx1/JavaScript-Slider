const controlPanel = document.querySelector('.control-panel'); // get control panel

if(controlPanel){ // if control panel exists
    const slideTime = 10000; // time to change slide
    let slideInterval;
    let currentIndex = 0;
    const images = ['img1.jpg', 'img2.jpg', 'img3.webp']; // array of images

    function startSlideInterval(){ // function to start the slide interval
        slideInterval = setInterval(()=>{ // set the interval
           let nextIndex = (currentIndex + 1)%images.length; // get the next index
           ChangeSlide(nextIndex); // change the slide
        }, slideTime); // set the interval time
    }
    function resetSlideInterval() { // function to reset the slide interval
        clearInterval(slideInterval); // clear the interval
        startSlideInterval(); // start the interval
    }

    function bulletAnimation(bulletLoad){
        bulletLoad.style.width = "0%";
        setTimeout(() => bulletLoad.style.width = "100%", 10);
    }

    // let pause = 0; //pause variable to check if the slide is paused or not
    // const picon = document.querySelector('#play-icon'); //get play icon
    //
    // document.querySelector('.pause')?.addEventListener('click', ()=>{ //pause button event listener
    //     if(picon.classList.contains('fa-pause')){ //if play icon is pause
    //         picon.classList.remove('fa-pause');
    //         picon.classList.add('fa-play'); //change icon to play
    //         pause = 1; //set pause to 1
    //     }else{
    //         picon.classList.remove('fa-play'); //if play icon is play
    //         picon.classList.add('fa-pause'); //change icon to pause
    //         pause = 0; //set pause to 0
    //     }
    // })

    images.forEach((image,index)=>{ // loop through the images
        const bullet = document.createElement('div'); // create a bullet
        bullet.classList.add('bullet'); // add the bullet class
        if(index === 0){ // give the first bullet the active class
            bullet.classList.add('active'); // add the active class
            const bulletInside = document.createElement('div'); // create a bullet inside for loading animation
            bulletInside.classList.add('bullet-load'); // add the bullet load class
            bullet.appendChild(bulletInside); // append the bullet load to the bullet
            bulletAnimation(bulletInside); // animate the bullet
        }
        controlPanel.appendChild(bullet); // append the bullet to the control panel

        bullet.addEventListener('click', ()=>{ // add click event listener to the bullet
            ChangeSlide(index); // change the slide
            resetSlideInterval(); // reset the slide interval
        });
    });

    const sliderImage = document.querySelector('.slider-image'); // get the slider image

    function ChangeSlide(newIndex){ // function to change the slide
        const activeBullet = document.querySelector('.bullet.active'); // get the active bullet
        if(activeBullet){ // if the active bullet exists
            const bulletLoad = activeBullet.querySelector('.bullet-load'); // get the bullet load
            if(bulletLoad){ // if the bullet load exists
                activeBullet.classList.remove('active'); // remove the active class
                bulletLoad.remove(); // remove the bullet load
            }
        }
        currentIndex = newIndex; // set the current index

        const newBullet = document.querySelectorAll('.bullet')[newIndex]; // get the new bullet
        newBullet.classList.add('active'); // add the active class
        const newBulletLoad = document.createElement('div'); // create a new bullet load
        newBulletLoad.classList.add('bullet-load'); // add the bullet load class
        newBullet.appendChild(newBulletLoad); // append the bullet load to the bullet

        sliderImage.src = `img/${images[newIndex]}`; // change the image

        bulletAnimation(newBulletLoad); // animate the bullet
    }

    startSlideInterval(); // start the slide interval
}