const apiKey = '8e6a02c9c94f981766d18c5017f28bc5';
const trendingApiUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;
const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.inputText');
const searchBtn = document.querySelector('.searchBtn');
const moviesContainer = document.getElementById('movies');

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

document.addEventListener('DOMContentLoaded', function() {
  const select = document.getElementById("genre");
  
  genres.forEach(genre => {
    const optionElement = document.createElement("option");
    optionElement.text = genre.name;
    optionElement.value = genre.id;
    select.appendChild(optionElement);
  });

  // Add event listener to select element for genre
  select.addEventListener('change', event => {
    const selectedGenreId = event.target.value;
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenreId}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        moviesContainer.innerHTML = ''; // Clear any existing movie data
        data.results.forEach(movie => {
          const movieMarkup = createMovieMarkup(movie);
          moviesContainer.insertAdjacentHTML('beforeend', movieMarkup);
        });
      })
      .catch(error => {
        console.error(error);
      });
  });
});

function createMovieMarkup(movie) {
  const genreNames = movie.genre_ids.map(genreId => {
    const genre = genres.find(genre => genre.id === genreId);
    return genre ? genre.name : '';
  }).filter(genreName => genreName !== '');
  
  return `
  <div class = "container">
    <h2>${movie.title}</h2>
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} Poster">
    
    <button id="ratingBtn">${movie.vote_average.toFixed(1)}</button>
    <p>Genres: ${genreNames.join(', ')}</p>
    <p>${movie.overview}</p>
  </div>
  `;
}

  




fetch(trendingApiUrl)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    movies.forEach(movie => {
      const movieMarkup = createMovieMarkup(movie);
      moviesContainer.insertAdjacentHTML('beforeend', movieMarkup);
    });
  })
  .catch(error => console.error(error));

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchQuery = searchInput.value;
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;

  

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      moviesContainer.innerHTML = ''; // Clear any existing movie data
      data.results.forEach(movie => {
        const movieMarkup = createMovieMarkup(movie);
        moviesContainer.insertAdjacentHTML('beforeend', movieMarkup);
      });
    })
    .catch(error => {
      console.error(error);
    });
});
