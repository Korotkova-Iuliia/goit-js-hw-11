// OK\\\\\\\\\\\\\\\\//
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function notifyFailure() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
    showOnlyTheLastOne: true,
  });
}
// function notifyInfo() {
//   Notify.info('Too many matches found. Please enter a more specific name.', {
//     showOnlyTheLastOne: true,
//   });
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
  //   refs.searchForm.reset();

  fetchTag(tag).then(showPhoto => console.log(showPhoto));
});

function fetchTag(tag) {
  const API_KEY = `24377768-1651c24dae1d00899e27f41ae`;

  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${tag}&image_type=photo&orientation=horizontal&safesearch=true`;
  return fetch(URL).then(response => {
    if (!response.ok) {
      
      throw new Error(response.status);
    }
    return response.json();
  });
}
// {
  /* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>; */
// }

// if {hits.lengs === 0} {
notifyFailure();
console.log('ошибка')
};

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
//     downloads - количество загрузок.
// end\\\\\\\\\\\\\\\\

// refs.form.addEventListener('input', e => {
//   //  const login = searchbox.elements.login.value;
//   tag = e.target.value;
//   console.log(e.target.value);
// });

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
