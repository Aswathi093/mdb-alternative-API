const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const menu_items = document.querySelectorAll('nav .mainMenu li a');




openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

// close menu when you click on a menu item 
menu_items.forEach(item => {
    item.addEventListener('click',function(){
        close();
    })
})

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}

function close(){
    mainMenu.style.top = '-100%';
    mainMenu.style.display = 'none';
   
}



//fetching api
const API_KEY = '6c915d8cb8598277067b0da21d0c7cd4' ;
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + 'movie/popular?api_key=6c915d8cb8598277067b0da21d0c7cd4&language=en-US&page=1';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const main = document.getElementById('content');


GetMovies(API_URL);

function GetMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results);
        ShowMovies(data.results);
    })
}

function ShowMovies(data){
    main.innerHTML = ``;
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, genre_ids, release_date}= movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('cards');
        movieElement.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movieinfo">
                <h3>${title}</h3>
                <span class="rating">${vote_average}</span>
                <h4>Genre</h4>
                <span>${release_date}</span>
            </div>
            <div class="description">
                ${overview}
            </div>
        `
        main.appendChild(movieElement);
    });
}