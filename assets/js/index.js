'use strict';

/**
 * import all components and function
 */


import{ sidebar } from "./sidebar.js";
import{ api_key, imageBaseURL, fetchDataFromServer} from "./api.js";

import {createMovieCard} from './movie-card.js';
import { search } from "./search.js";

const pageContent = document.querySelector("[page-content]");

sidebar();

/**
 * Home page section (Top rated,Upcomming,Trending movies)
*/


const homePageSection = [
    {
        title: "Upcoming Movies",
        path : "/movie/upcoming"
    },
    
    
    {
        title : "Tending Movies",
        path : "/trending/movie/week"
    },

    {
        title: "Tending Series",
        path : "/trending/tv/week"
    },

    {
        title : "Top Rated Movies",
        path : "/movie/top_rated"
    },


]


const genreList = {

    // create genre struing from genre_id eg:[23,43] -> "Action,Romance".

    asString(genreIdList){
        let newGenreList = [];

        for(const genreId of genreIdList){
            this[genreId] && newGenreList.push(this[genreId]);// this == genreList
        }

        return newGenreList.join(", ")
    }

};


fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,function({ genres }){
    for(const{id,name} of genres){
        genreList[id] = name;

    }

    fetchDataFromServer(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`,heroBanner);
});



const heroBanner = function({results: movieList}){
    const banner = document.createElement("section");
    banner.classList.add("banner");
    banner.areaLabel = "popular Moives";

    banner.innerHTML = `

    <div class="banner-slider"></div>


    <div class="slider-control">
        <div class="control-inner"></div>
    </div>
    
    `;

    let controlItemIndex = 0;

    for(const [index,movie] of movieList.entries()){

        const {
            backdrop_path,
            title,
            release_date,
            genre_ids,
            overview,
            poster_path,
            vote_average,
            id
        } = movie;


        /**
         *  format date
         * */ 
        function changeDateFormat(dateString) {
            var dateParts = dateString.split('-');
            var year = dateParts[0];
            var month = dateParts[1];
            var day = dateParts[2];
          
            // Create a Date object with the given date components
            var date = new Date(year, month - 1, day);
          
            // Format the date using built-in Date methods
            var formattedDate = date.toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
          
            return formattedDate;
          }
          
          // Example usage
          var oldDate = release_date;
          var newDate = changeDateFormat(oldDate);
        //   console.log(newDate); // Output: "May 17, 2023"




        const sliderItem = document.createElement("div");
        sliderItem.classList.add("slider-item");
        sliderItem.setAttribute("slider-item","");

        sliderItem.innerHTML = `
            <img src="${imageBaseURL}w1280${backdrop_path}" alt="${title}" class="img-cover" loading="${index === 0 ? "eager" : "lazy"}"/>

            <div class="banner-content">
                <h2 class="heading">${title}</h2>

                <div class="meta-list">
                    <div class="meta-item">${newDate.split(" / ")}</div>
                    <div class="meta-item card-bradge">${vote_average.toFixed(1)}</div>
                </div>

                <p class="genre">${genreList.asString(genre_ids)}</p>
                <p class="banner-text">${overview}</p>

                <a href="./detail.html" class="btn" onclick="getMovieDetail(${id})">
                    <!-- <img src="./assets/img/play_circle.png" alt=""/> -->
                    <i class="far fa-play-circle text-light fa-2x" aria-hidden="true"></i> 

                    <span class="span">Watch Now</span>
                </a>
            </div>
        `;


        banner.querySelector(".banner-slider").appendChild(sliderItem);

        const controlItem = document.createElement("button");
        controlItem.classList.add("poster-box","slider-item");


        controlItem.setAttribute("slider-control", `${controlItemIndex}`);

        controlItemIndex++;

        controlItem.innerHTML = `
            <img src="${imageBaseURL}w154${poster_path}" alt="Slide to ${title} loading="lazy" draggable="false" class="img-cover"/>
        `;

        banner.querySelector(".control-inner").appendChild(controlItem);


    }

    pageContent.appendChild(banner);

    addHeroSlider();


    /**
     *  fetxh data for home paeg sections (top rated , upcomming, trending)
    */

    for(const{ title,path} of homePageSection){
        fetchDataFromServer(`https://api.themoviedb.org/3${path}?api_key=${api_key}&page=1`, createMovieList, title);
    }
}


/**
 *  Hreo Slide Function
 */

const addHeroSlider = function(){

    const sliderItems = document.querySelectorAll("[slider-item]");

    const sliderControls = document.querySelectorAll("[slider-control]");

    let lastSliderItem = sliderItems[0];
    let lastSliderControl = sliderControls[0];

    lastSliderItem.classList.add("active");
    lastSliderControl.classList.add("active");

    const sliderStart = function(){
        lastSliderItem.classList.remove("active");
        lastSliderControl.classList.remove("active");

        // `this` == slider-control

        sliderItems[Number(this.getAttribute("slider-control"))].classList.add("active");
        this.classList.add("active");

        lastSliderItem = sliderItems[Number(this.getAttribute("slider-control"))];
        lastSliderControl = this;



    }


    addEventOnElements(sliderControls,"click",sliderStart);
}

const createMovieList = function ({ results: movieList }, title) {
  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list");
  movieListElem.areaLabel = `${title}`;

  movieListElem.innerHTML = `
    <div class="title-wrapper">
      <h3 class="title-large">${title}</h3>
    </div>

    <div class="slider-list">
      <div class="slider-inner"></div>
    </div>
  `;

  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);
    movieListElem.querySelector(".slider-inner").appendChild(movieCard);
  }

  pageContent.appendChild(movieListElem);
};


search();