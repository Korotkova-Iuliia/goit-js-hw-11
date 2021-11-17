// 1-я попытка..............
// // OK\\\\\\\\\\\\\\\\//
// import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// function notifyFailure() {
//   Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
//     showOnlyTheLastOne: true,
//   });
// }

// eg\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//   if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function (i, hit) {
//       console.log(hit.pageURL);
//     });
//   else console.log('No hits');
// });

// OK\\\\\\\\\\\\\\\\
import { fetchTag } from './api';
const refs = {
  searchForm: document.querySelector('#search-form'),
  //   input: document.querySelector('.searchQuery'),
  galleryList: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let tags = 0;
let page = 1;
refs.loadMoreBtn.classList.add('is-hidden');
refs.loadMoreBtn.addEventListener('click', () => {
  fetchTag(tags, page).then(photos => {
    renderPhotos(photos);
    page += 1;
    console.log(photos.total);
    console.log(photos.totalHits);
    console.log(page > photos.total / 4);
    if (page > photos.total / 4) {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
  });
});

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();

  tags = refs.searchForm.elements.searchQuery.value;
  refs.searchForm.reset();
  fetchTag(tags, page).then(photos => {
    renderPhotos(photos);
    page += 1;
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
});

function renderPhotos({ hits }) {
  console.log(hits);
  const markup = hits
    .map(
      ({
        webformatURL,
        tags,
        // largeImageURL,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" weight="20" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes: ${likes} </b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div>`,
    )
    .join('');
  //  <img class="large-img" src="${largeImageURL}" alt="${tags}" weight="20" loading="lazy" />;
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}
// galleryListReset();
// function galleryListReset() {
//   galleryList.innerHTML = '';
// }
// ${hit.previewURL}
// function notifyInfo() {
//   Notify.info('Too many matches found. Please enter a more specific name.', {
//     showOnlyTheLastOne: true,
//   });
// {
/* ; */
// }

// if {hits.lengs === 0} {
// notifyFailure();
// console.log('ошибка')
// };

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
