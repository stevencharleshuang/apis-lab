const searchBtn   = document.querySelector('.search-btn');
const searchInput = document.querySelector('#search-input');
const gallery     = document.querySelector('.gallery');
const main        = document.querySelector('main');

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
      console.log(response)
      resultsArr = response.data;
      pagination = response.pagination;
      populateGallery(response.data);
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
    gif.setAttribute('src', `https://media.giphy.com/media/${img.id}/giphy.gif`);
    gallery.append(gif);
  });

  console.log(pagination);

  if (pagination.total_count > 25) {
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.innerText = 'Load More...';
    loadMoreBtn.setAttribute('class', 'load-more-btn btn');
    main.append(loadMoreBtn);
    
    loadMoreBtn.addEventListener('click', handleLoadMore);
  }
}

const addMoreToGallery = (results) => {
  results.forEach(img => {
    let gif = document.createElement('img');
    gif.setAttribute('src', `https://media.giphy.com/media/${img.id}/giphy.gif`);
    gallery.append(gif);
  })
}

searchBtn.addEventListener('click', handleSubmit);



