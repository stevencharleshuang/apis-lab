const searchBtn   = document.querySelector('.search-btn');
const searchInput = document.querySelector('#search-input');
const gallery     = document.querySelector('.gallery');

let resultsArr = [];

const handleSubmit = (e) => {
  e.preventDefault();  
  
  let query = searchInput.value;

  console.log('search submitted!');
  fetch(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=RRdCt59QG1Ut01EyxPVOO4Rgp1WiGJhR`)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      resultsArr = response.data;
      // console.log(results);

      populateGallery(resultsArr);
    })
    .catch(err => console.log(err));
}

const populateGallery = (results) => {
  results.forEach(img => {
    let gif = document.createElement('img');
    gif.setAttribute('src', `https://media.giphy.com/media/${img.id}/giphy.gif`);
    gallery.append(gif);
  });
}


searchBtn.addEventListener('click', handleSubmit);



