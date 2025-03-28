const controlPanel = document.querySelector('.control-panel'); // Get control panel
// getting control-pannel allows us to avoid error on other pages with same javascript file.
if(controlPanel){ // if controlPanel exist them:
    const images = ['img1.jpg', 'img2.jpg', 'img3.webp']; // images store images that we want to as slides
    const changeTime = 5000;

    images.forEach((image,index)=>{ // for every image create div with bullet class
        const bullet = document.createElement('div'); // create div
        bullet.classList.add('bullet'); // give this div bullet class
        if(index === 0){ // if its first bullet then:
            bullet.classList.add('active'); //give this bullet class
            const bulletInside = document.createElement('div'); //create aonther div
            bulletInside.classList.add('bullet-load'); //give this div class, this div is for animation purposes only
            bullet.appendChild(bulletInside); // add this div inside first bullet
        }
        controlPanel.appendChild(bullet); // add bullets inside control-pannel
    });

    const bullets = Array.from(controlPanel.children); // collection of bullets
    let bIndex=1; // index of next active bullet
    function nextIndex(){ //change bullet function auto
        curBulletAct(bullets[bIndex]); //set bullet with next index
    }

    function curBulletAct(target){ // function to change active bullet
        const lActive = controlPanel.querySelector('.active'); // get element with active class
        if(lActive) lActive.classList.remove('active'); // remove active claass from element
        target.classList.add('active'); //add active class to clicked element
        bIndex = (bullets.indexOf(target)+1)%images.length; // calculate next bullet

        const bulletInside = controlPanel.querySelector('.bullet-load'); // get div inside bullet
        if(bulletInside) bulletInside.remove(); //remove this element
        target.appendChild(bulletInside); //add this element to new active div
    }

    let slideInterval; // interval
    function startInterval(){ //start interval function
        slideInterval = setInterval(nextIndex, changeTime);
    }
    function resetInterval(){ //function to reset interval time after changing bullet manually
        clearInterval(slideInterval);
        startInterval();
    }

    controlPanel.addEventListener('click', (e)=>{ //listen for clicks
        if(e.target.classList.contains('bullet')){ //if clicked element is bullet
            curBulletAct(e.target); // change active bullet to clicked one
        }
        resetInterval() //reset interval time of changing for another bullet
    });
    startInterval(); // start interval, changing bullet after time
}