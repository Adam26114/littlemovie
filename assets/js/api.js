'use strict';

const api_key = "8ba7de5ed9194d735ec43d4579dc1cf5";
const imageBaseURL = "https://image.tmdb.org/t/p/";


/**
 * Fetch data from a server using th 'url' and passes
 * the result in Json Data to a 'callback' function
 * along with an optinal paramete if hs 'optionalParam'
*/


const fetchDataFromServer = function(url,callback,optionalParam){
    fetch(url)
    .then(respnse => respnse.json())
    .then(data => callback (data, optionalParam))
}


export{imageBaseURL,api_key,fetchDataFromServer}; 