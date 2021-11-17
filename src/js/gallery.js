import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// eg\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// var API_KEY = '';
// var URL = 'https://pixabay.com/api/?key=' + API_KEY + '&q=' + encodeURIComponent('red roses');
// $.getJSON(URL, function (data) {
//   if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function (i, hit) {
//       console.log(hit.pageURL);
//     });
//   else console.log('No hits');
// });
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
//     safesearch - фильтр по возрасту.Задай значение true.

const API_KEY = `24377768-1651c24dae1d00899e27f41ae`;
const URL = 'https://pixabay.com/api/?key=' + API_KEY + '&q=' + encodeURIComponent('red roses');
fetch(URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(showPhoto => console.log(showPhoto));

// function showPhoto({ main, weather, name }) {
//   refs.temperatureDescription.textContent = weather[0].main;
//   refs.temmperatureDegree.textContent = Math.round(main.temp);
//   refs.locationTimezone.textContent = name;
//   refs.icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
//   setSkycons(weather[0].description);
// }

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const refs = {
  form: document.querySelector('#search-form'),
};

refs.form.addEventListener('input', e => {
  console.log(e.target.value);
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  refs.form.reset();
});
