// Cheack if there is main color in local storage 
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color',mainColors);
    // Cheack For Active Class
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        // add active class on element with data color === local storage item
        if (element.dataset.color === mainColors) {
           // add active class
            element.classList.add("active");
        }

    }); 
    




}
// Select Landing Page Element 
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images 
let imgsArray = ["back1.jpg","back2.jpg","back3.jpg","back4.jpg","back5.jpg"];

//  random background option 

let backgroundOption = true;

// check if there is local storage random background item 
let backgroundLocalItem = localStorage.getItem("background_option");

// check if background local storage is not empty 

if (backgroundLocalItem !== null) {
    // remove active class from all spans 
document.querySelectorAll(" .random-backgrounds span").forEach(element => {
    element.classList.remove("active");
})

if (backgroundLocalItem === 'true' ) {

    backgroundOption = true
    document.querySelector(".yes").classList.add("active");
    
} else {

    backgroundOption = false
    document.querySelector(".no").classList.add("active");
}


}

// variable to control the interval 

let backgroundInterval;

// function to randomize images 
function randomizeImgs () {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // Change Background img
            landingPage.style.backgroundImage = 'url("imgs/'+ imgsArray[randomNumber]+'")';

        },10000)
    }

}

randomizeImgs();

// gear icon & setting box

let gearIcon = document.querySelector(".gear-icon");
let settingBox = document.querySelector(".setting-box");

gearIcon.onclick = function () {
    settingBox.classList.toggle("open");
    gearIcon.classList.toggle("fa-spin");

};
// switch colors 
const colorsli = document.querySelectorAll(".colors-list li");

colorsli.forEach(li => {
    // loop on list items
    li.addEventListener("click",(e) => {
    
    // set color on root 
    document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
    // set color on local storage 
    window.localStorage.setItem("color_option", e.target.dataset.color );
    // Remove Active Class From All Childrens
    handleActive (e);

    });
});

// switch background 
const randomBackEl = document.querySelectorAll(".random-backgrounds span ");

randomBackEl.forEach(span => {
    // loop on all span
    span.addEventListener("click",(e) => {
    
    // Remove Active Class From All Childrens
    handleActive (e);

    if (e.target.dataset.background === 'yes') {
        backgroundOption = true;

        randomizeImgs();

        localStorage.setItem("background_option",true);

    } else {
        backgroundOption = false;
        clearInterval(backgroundInterval);
        localStorage.setItem("background_option",false);

    }

    });
});

// Skills selcetor 
let ourSkills = document.querySelector(".skills");


window.onscroll = function () {
    // skills Offset top
    let skillsOffsetTop = getOffsetTop(ourSkills);
    
    // skills outer height 
    let skillsOuterHeight = ourSkills.offsetHeight;

    // window height
    let windowHeight = this.innerHeight

    // window scroll top 

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight) ) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })

    }


};
const getOffsetTop = element => {
    let offsetTop = 0;
    while(element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
    }
    return offsetTop;
}

// Create Pop up with the image 
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        // create overlay element 
        let overlay = document.createElement("div");
        // add class to overlay
        overlay.className = "popup-overlay";
        // append to body
        document.body.appendChild(overlay);
        // Create the popup box
        let popupBox = document.createElement("div");
        // add class to popup box
        popupBox.className = "popup-box";
        // create image
        let popupImage = document.createElement("img");

        // set image source
        popupImage.src = img.src;
        popupImage.style.width = "400px";

         // create heading 
        if (img.alt !== null) {
            // create heading
            let imgHeading = document.createElement("h3");
            // create text for heading 
            let imgText = document.createTextNode(img.alt);
            // append the text to heading 
            imgHeading.appendChild(imgText);
            // append heading to popup box
            popupBox.appendChild(imgHeading);

        }

        // add image to popup box 
        popupBox.appendChild(popupImage);

        // append popup box to body 
        document.body.appendChild(popupBox);

        // create close span 
        let closeButton = document.createElement("span");

        // create the close text

        let closeButtonText = document.createTextNode("X");

        // append text to close botton

        closeButton.appendChild(closeButtonText);

        // add class to close button

        closeButton.className = 'close-button'

        // add close button to the popup box 
        popupBox.appendChild(closeButton);

        closeButton.addEventListener('click',(e) => {
            overlay.style.display = "none";
            popupBox.style.display =  "none";
        })


    });


});

// select all bullets

const allBullets =  document.querySelectorAll(".nav-bullets .bullet");



// select all links 
const allLinks =  document.querySelectorAll(".links a");


function scrollToSomeWhere (elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
    
            });
        })
    
    });

}
// handle active
function handleActive (ev) {
      // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // add active class on target element 
    ev.target.classList.add("active");
}

// show  or hide bullets


let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");

        if (bulletLocalItem === 'block') {
            bulletsContainer.style.display = "block"
            document.querySelector(".bullets-option .yes").classList.add("active")
            
    
    
        } else {
            bulletsContainer.style.display = "none"
            document.querySelector(".bullets-option .no").classList.add("active")

            
    
        }
    });
    



}

bulletsSpan.forEach(span => {
    
    span.addEventListener("click",(e) => {
        
        if (span.dataset.display === "yes") {
            bulletsContainer.style.display = "block"
            localStorage.setItem("bullets_option", 'block');

        } else {
            bulletsContainer.style.display = "none"
            localStorage.setItem("bullets_option", 'none');

        }
        handleActive(e);

    });
});

// reset button 
document.querySelector(".reset-options").onclick = function () {

    localStorage.clear();

    
    // localStorage.removeItem("bullets_option");
    // localStorage.removeItem("color_option");
    // localStorage.removeItem("background_option");
    // localStorage.removeItem("bullets_option");

    // relod window

    window.location.reload()






};
// toggle menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
this.classList.toggle("menu-active");
tLinks.classList.toggle("open");
};

// click anywhere outside menu and toggle button 
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks ) {
        // check if menu is open 
        if (tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");

        }



    }

});
// stop propagation on menu 
tLinks.onclick = function (e) {
    e.stopPropagation();

}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);




