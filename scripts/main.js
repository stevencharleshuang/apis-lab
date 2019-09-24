const searchBtn   = document.querySelector('.search-btn');
const searchInput = document.querySelector('#search-input');
const gallery     = document.querySelector('.gallery');
const main        = document.querySelector('main');
const footer      = document.querySelector('footer');

let resultsArr = [];
let pagination = [];
let query = '';
let offset = 0;

/**
 * @name handleSubmit
 * @description Fetches data from Giphy and calls populateGallery if there are images to display or noResults if there are no images returned from the fetch call.
 * @param { object } e The event object
 */
const handleSubmit = (e) => {
  e.preventDefault();  
  
  query = searchInput.value;

  fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=RRdCt59QG1Ut01EyxPVOO4Rgp1WiGJhR`)
    .then(response => response.json())
    .then(response => {
      // console.log('Initial Fetch Response', response);
      resultsArr = response.data;
      pagination = response.pagination;

      !!response.pagination.total_count < 1 ? noResults() : populateGallery(response.data);
    })
    .catch(err => console.log(err));
}

/**
 * @name handleLoadMore
 * @description Makes a fetch call to load more images setting the query results offset to the current offset value + 25 (initialized at 0). Calls addMoreToGallery with the results
 * @param { object } e The event object
 */
const handleLoadMore = (e) => {
  e.preventDefault();
  offset += 25;

  fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&offset=${offset}&api_key=RRdCt59QG1Ut01EyxPVOO4Rgp1WiGJhR`)
    .then(response => response.json())
    .then(response => {
      // console.log('Load More Response', response);
      addMoreToGallery(response.data);
    })
    .catch(err => console.log(err));
}

/**
 * @name populateGallery
 * @description Accepts an array of images and adds them to the DOM. 
 * If there are more than 25 images in the results, adds a button to load more images
 * @param { array } results The array of images that were fetched to be displayed
 */
const populateGallery = (results) => {
  gallery.innerHTML = '';
  results.forEach(img => {
    let gif = document.createElement('img');
    gif.setAttribute('src', img.images.original.url);
    gallery.append(gif);
  });

  // console.log(pagination);

  if (pagination.total_count > 25) {
    if (footer.hasChildNodes()) footer.innerHTML = '';

    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.innerText = 'Moar!';
    loadMoreBtn.setAttribute('class', 'load-more-btn btn');
    footer.append(loadMoreBtn);
    
    loadMoreBtn.addEventListener('click', handleLoadMore);
  }
}

/**
 * @name addMoreToGallery
 * @description Iterates through the array of gifs and adds them to the DOM after the existing gallery of images
 * @param { array } results The array of resulting images fetched from the Load More event
 */
const addMoreToGallery = (results) => {
  results.forEach(img => {
    let gif = document.createElement('img');
    gif.setAttribute('src', img.images.original.url);
    gallery.append(gif);
  })
}

/**
 * @name noResults
 * @description If query returns no results, adds a message reflecting this to the DOM.
 */
const noResults = () => {
  // console.log('no results');
  gallery.innerHTML = '';

  let tryAgain = document.createElement('h2');
  tryAgain.innerText = 'No gifs here; try again...';
  gallery.append(tryAgain);
}

searchBtn.addEventListener('click', handleSubmit);



