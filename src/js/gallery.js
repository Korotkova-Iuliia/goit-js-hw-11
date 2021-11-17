// import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// eg\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
// OK\\\\\\\\\\\\\\\\
const refs = {
  searchForm: document.querySelector('#search-form'),
  //   input: document.querySelector('.searchQuery'),
};
let tag = 0;
refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  tag = refs.searchForm.elements.searchQuery.value;
  refs.searchForm.reset();

  const API_KEY = `24377768-1651c24dae1d00899e27f41ae`;

  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${tag}&image_type=photo`;

  fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(showPhoto => console.log(showPhoto));
});
// refs.form.addEventListener('input', e => {
//   //  const login = searchbox.elements.login.value;
//   tag = e.target.value;
//   console.log(e.target.value);
// });

// OK\\\\\\\\\\\\\\\\

// end\\\\\\\\\\\\\\\\
// function showPhoto({ main, weather, name }) {
//   refs.temperatureDescription.textContent = weather[0].main;
//   refs.temmperatureDegree.textContent = Math.round(main.temp);
//   refs.locationTimezone.textContent = name;
//   refs.icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
//   setSkycons(weather[0].description);
// }
// eg pixabay\\\\\\\\\\\\\\
// $.getJSON(URL, function (data) {
//   if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function (i, hit) {
//       console.log(hit.pageURL);
//     });
//   else console.log('No hits');
// });
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// const searchbox = document.querySelector('.searchbox > input');
// const profileContainer = document.querySelector('.profile-section');

// searchbox.addEventListener('submit', e => {
//   e.preventDefault();
//   const login = searchbox.elements.login.value;
//   fetchUser(login).then(showProfile);
//   searchbox.reset();
// });

// searchbox.addEventListener(
//   'input',
//   debounce(() => {
//     fetchUser(searchbox.value)
//       .then(userdata => showProfile(userdata))
//       .catch(error => showError(error));
//   }, 300),
// );
