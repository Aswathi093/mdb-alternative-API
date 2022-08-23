
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
        <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580"}" alt="${title}">
            <div class="movieinfo">
                <h3>${title}</h3>
                <span class="rating">Rating:  ${vote_average}<br></span>
                <span>Release date: ${release_date}</span>
            </div>
            <div class="description">
                ${overview}
            </div>
        `
        main.appendChild(movieElement);
    });
}
//search
const form = document.getElementById('form');
const search = document.getElementById('search');
const Search_URL = 'https://api.themoviedb.org/3/search/movie?api_key=6c915d8cb8598277067b0da21d0c7cd4&language=en-US&page=1&include_adult=false&query=';

form.addEventListener('submit' , (e) => {
    e.preventDefault()
    const searchterm = search.value;
    if(searchterm){
        GetMovies(Search_URL+searchterm)
        console.log(search);
    }
    else{
        GetMovies(API_URL);
    }
})

//genres
const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    /*{
   "id": 80,
   "name": "Crime"
 },*/
 /*{
   "id": 99,
      "name": "Documentary"
 },*/
 {
   "id": 18,
   "name": "Drama"
    },
    {
   "id": 10751,
   "name": "Family"
 },
 {
   "id": 14,
      "name": "Fantasy"
    },
 /*{
   "id": 36,
   "name": "History"
 },
    {
      "id": 27,
      "name": "Horror"
    },
 {
   "id": 10402,
   "name": "Music"
 },
 {
   "id": 9648,
       "name": "Mystery"
     },
     {
       "id": 10749,
       "name": "Romance"
     },*/
    {
      "id": 878,
      "name": "Science Fiction"
    },
     {
       "id": 10770,
       "name": "TV Movie"
     },
    {
      "id": 53,
      "name": "Thriller"
    },
     {
       "id": 10752,
       "name": "War"
     },
     /*{
       "id": 37,
       "name": "Western"
     }*/
  ]
  var selectedgenre = [];
const genreEl = document.getElementById('mainMenu');
setgenres()
function setgenres(){
  genreEl.innerHTML = '';
  genres.forEach(genres => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id=genres.id;
    t.innerText=genres.name;
    t.addEventListener('click', ()=>{
        if(selectedgenre.length == 0){
          selectedgenre.push(genres.id);
        }
        else{
          if(selectedgenre.includes(genres.id)){
            selectedgenre.forEach((id, idx) =>{
              if(id==genres.id){
                selectedgenre.splice(idx, 1);
              }
            })
          }
          else{
            selectedgenre.push(genres.id);
          }
        }
        console.log(selectedgenre);
        GetMovies(API_URL+'&with_genres='+encodeURI(selectedgenre.join(',')))
        highlightSelection();
      })
    genreEl.append(t);
  })
}

function highlightSelection(){
  const tags= document.querySelectorAll('.tag');
  tags.forEach(tag =>{
    tag.classList.remove('highlight');
  })
 //clearBtn();
  if(selectedgenre.length !=0){
    selectedgenre.forEach(id =>{
      const highlightedtag = document.getElementById(id);
      highlightedtag.classList.add('highlight');
    })
  }
}

/*function clearBtn(){
  let clearBtn= document.getElementById('clear');
  if(clearBtn){
   clearBtn.classList.add('highlight');
  }else{
    let clear = document.createElement('div');
  clear.classList.add('tag','hightlight');
  clear.id ='clear';
  clear.innerText='Clear x';
  clear.addEventListener('click',()=>{
    selectedgenre=[];
    setgenres();
    getMovies(API_URL);

  })
  tagsEl.append(clear);
  }
  
}*/