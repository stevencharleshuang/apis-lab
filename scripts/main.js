const searchBtn   = document.querySelector('.search-btn');
const searchInput = document.querySelector('#search-input');
const gallery     = document.querySelector('.gallery');
const main        = document.querySelector('main');
const footer      = document.querySelector('footer');

let resultsArr = [];
let pagination = [];
let query = '';
let offset = 0;

const handleSubmit = (e) => {
  e.preventDefault();  
  
  query = searchInput.value;

  fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=RRdCt59QG1Ut01EyxPVOO4Rgp1WiGJhR`)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      resultsArr = response.data;
      pagination = response.pagination;

      !!response.pagination.total_count < 1 ? noResults() : populateGallery(response.data);
    })
    .catch(err => console.log(err));
}

const handleLoadMore = (e) => {
  e.preventDefault();
  offset += 25;

  fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&offset=${offset}&api_key=RRdCt59QG1Ut01EyxPVOO4Rgp1WiGJhR`)
    .then(response => response.json())
    .then(response => {
      console.log('Load More Response', response);
      addMoreToGallery(response.data);
    })
    .catch(err => console.log(err));
}

const populateGallery = (results) => {
  gallery.innerHTML = '';
  results.forEach(img => {
    let gif = document.createElement('img');
    gif.setAttribute('src', img.images.original.url);
    gallery.append(gif);
  });

  console.log(pagination);

  if (pagination.total_count > 25) {
    if (footer.hasChildNodes()) footer.innerHTML = '';

    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.innerText = 'Moar!';
    loadMoreBtn.setAttribute('class', 'load-more-btn btn');
    footer.append(loadMoreBtn);
    
    loadMoreBtn.addEventListener('click', handleLoadMore);
  }
}

const noResults = () => {
  console.log('no results');
  gallery.innerHTML = '';

  let tryAgain = document.createElement('h2');
  tryAgain.innerText = 'No gifs here; try again...';
  gallery.append(tryAgain);
}

const addMoreToGallery = (results) => {
  results.forEach(img => {
    let gif = document.createElement('img');
    gif.setAttribute('src', img.images.original.url);
    gallery.append(gif);
  })
}

searchBtn.addEventListener('click', handleSubmit);



