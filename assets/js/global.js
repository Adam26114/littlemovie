'use strict';

/*-----------------------------------*\
  #Add event on multiple element
\*-----------------------------------*/

const addEventOnElements = function (elements,eventType,callback){
    for (const elem of elements) elem.addEventListener(eventType,callback)
}

/*-----------------------------------*\
  # Toggle search box in mobile device || small screen
\*-----------------------------------*/

const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");


const searchInput = document.querySelector('.search-field');
const searchBtn = document.querySelector('.search-btn');


addEventOnElements(searchTogglers,"click",function(){
  searchBox.classList.toggle("active"); 
  // console.log('hao');
  searchInput.focus();
});


// Auto Year
// var autodate = document.getElementById("autodate");

// var year = new Date().getUTCFullYear();

// autodate.textContent = year;


// ! Clear text in search area
// Add a blur event listener to the document
document.addEventListener('click', function(event) {
  // Check if the clicked element is not the search input
  if (event.target !== searchInput) {
    // Clear the search input value
    searchInput.value = '';
  }
});



/**
 *  store movieId in `localStorage` 
 * when yot click any movie
*/

const getMovieDetail = function(movieId){
  window.localStorage.setItem("movieId",String(movieId));
}

const getMovieList = function(urlParam,genreName){
   window.localStorage.setItem("urlParam",urlParam);
   window.localStorage.setItem("genreName",genreName);
}