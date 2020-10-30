$(document).ready(function() {


const menuToggle = document.querySelector('#menu-toggle');
const mobileNavContainer = document.querySelector('#mobile-nav');
const mobileOverlay = document.querySelector('.mobile-nav-overlay');
const body = document.querySelector('body');

menuToggle.onclick = function(){
    menuToggle.classList.toggle('menu-icon-active');
    mobileNavContainer.classList.toggle('mobile-nav--active');
    mobileOverlay.classList.toggle('mobile-nav-overlay--active');
    body.classList.toggle('no-scroll');
}

});