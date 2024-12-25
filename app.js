let api = 'https://www.omdbapi.com/?apikey=438c9068&t='

let title = document.querySelector('#title');
let desc = document.querySelector('#desc');
let genre = document.querySelector('#genre');
let actors = document.querySelector('#actors');
let directors = document.querySelector('#directors');
let awards = document.querySelector('#awards');
let collection = document.querySelector('#collection');
let ln = document.querySelector('#ln');
let ratings = document.querySelector('#ratings')
let poster = document.querySelector('#poster');
let container = document.querySelector('#container');
let error = document.querySelector('#error');
let suggestion = document.querySelector('.suggestion')

container.classList.add('hidden')

function search() {
    let movieInput = document.querySelector('#movieName');
    error.innerText = "";
    if (!movieInput.value.trim()) {
        error.innerText = "Enter movie name";
        container.classList.add('hidden');
        return; 
    }

    let query = api + movieInput.value;

    fetch(query)
        .then(data => data.json())
        .then(data => {
            if (data.Error === 'Movie not found!') {
                error.innerText = 'Movie not found!'
                container.classList.add('hidden');
            } else {
                container.classList.remove('hidden')
                title.innerText = data.Title;
                actors.innerText = data.Actors;
                directors.innerText = data.Director;
                genre.innerText = data.Genre;
                awards.innerText = data.Awards;
                collection.innerText = data.BoxOffice;
                ln.innerText = data.Language;
                desc.innerText = data.Plot;
                ratings.innerText = data.imdbRating;
                poster.src = data.Poster !== "N/A" ? data.Poster : "default_image.png";
                
                if (data.imdbRating > 7) {
                    suggestion.innerText = 'Worth Watching'
                } else if (data.imdbRating > 6 && data.imdbRating < 7) {
                    suggestion.innerText = 'Can Watch'
                } else {
                    suggestion.innerText = 'Time Waste'
                }
            }
        })
}
