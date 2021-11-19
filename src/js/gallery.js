import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { getAxiosTag } from './api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  inputEl: document.querySelector('.searchQuery'),
};
const perPage = 40;
let surchtags = '';
let page = 1;

const API_KEY = `24377768-1651c24dae1d00899e27f41ae`;
const BASE_URL = `https://pixabay.com/api`;

const URL = `${BASE_URL}/?key=${API_KEY}&q=${surchtags}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${40}`;
async function getAxiosTag(surchtags, page) {
  console.log(surchtags);
  try {
    const response = await axios.get(URL);
    console.log(response);
    console.log(response.data);
    console.log(response.data.hits);

    return await response.data;
  } catch (error) {
    console.log(error);
  }
}
refs.loadMoreBtn.classList.add('is-hidden');
refs.searchForm.addEventListener('input', e => {
  console.log(e.target);
  if (e.target !== 0) {
    refs.loadMoreBtn.classList.add('is-hidden');
    return reset();
  }
});

refs.loadMoreBtn.addEventListener('click', () => {
  getAxiosTag(surchtags, page).then(photos => {
    renderPhotos(surchtags, page);

    page += 1;
    if (page > photos.totalHits / perPage || photos.totalHits < perPage) {
      // console.log(photos.totalHits);
      // console.log(perPage);
      // console.log(photos.totalHits < perPage);
      // console.log(page > photos.totalHits / perPage);
      notifyEndResult();
      return refs.loadMoreBtn.classList.add('is-hidden');
    }
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
});

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();

  surchtags = refs.searchForm.elements.searchQuery.value;
  console.log(surchtags);

  getAxiosTag(surchtags, page).then(photos => {
    renderPhotos(photos.hits);
    console.log(photos);
    console.log(photos.hits);
    if (photos.totalHits > 0) {
      notifySuccess(photos.totalHits);
    }
    // refs.searchForm.reset();
    page += 1;
    if (page > photos.totalHits / perPage || photos.totalHits < perPage) {
      // console.log(photos.totalHits);
      // console.log(perPage);
      // console.log(photos.totalHits < perPage);
      // console.log(page > photos.totalHits / perPage);

      return refs.loadMoreBtn.classList.add('is-hidden');
    }
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
});

// console.log(photos);
// console.log(photos.hits);

function renderPhotos(hits) {
  if (hits.length === 0) {
    notifyFailure();
  }
  console.log(hits.length);

  const markup = hits
    .map(
      ({ webformatURL, tags, largeImageURL, likes, views, comments, downloads }) =>
        `<li class="gallery__link">
        <a class="gallery__item" href="${largeImageURL}"></div class="gallery__item_card">
                  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="gallery__item_info">
                        <p class="item-info">
                          <b>Likes: </b>${likes}
                        </p>
                        <p class="item-info">
                          <b>Views: </b>${views}
                        </p>
                        <p class="item-info">
                          <b>Comments: </b>${comments}
                        </p>
                        <p class="item-info">
                          <b>Downloads: </b>${downloads}
                        </p>
                    </div>
                </div>
          </a>
      </li>`,
    )
    .join('');

  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}
const lightbox = new SimpleLightbox('.hits a', {
  captionsData: 'alt',
  captionDelay: 250,
  enableKeyboard: true,
  animationSlide: true,
  animationSpeed: 250,
});

function reset() {
  console.log('сброс');
  refs.galleryList.innerHTML = '';
}

function notifyFailure() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
    showOnlyTheLastOne: true,
  });
}
function notifyEndResult() {
  Notify.failure('We`re sorry, but you`ve reached the end of search results.', {
    showOnlyTheLastOne: true,
  });
}
function notifySuccess(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`, {
    showOnlyTheLastOne: true,
  });
}

// ;
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
// \\\\\\\\\\\\\\\               to do
// \\\\\\\\\\\\\\\\\\\\
// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
// \\\\\\\\\\\\\\\\
// // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// // function onEntry({ hits }, observer) {
// //   console.log(hits);
// //   hits.forEach(hit => {
// //     if (hit.isIntersecting) {
// //       page += 3;
// //       api(page);
// //     }
// //   });
// // }

// // const observer = new IntersectionObserver(onEntry, {
// //   root: null,
// //   rootMargin: '2px',
// //   threshold: 0.7,
// // });

// //\..............1-я попытка..... зроблено без axios ...............\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// //
// // // OK\\\\\\\\\\\\\\\\//
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import { fetchTag } from './api';

// // function onEntry(entries, observer) {
// //   entries.forEach(entry => {
// //     if (entry.isIntersecting) {
// //       page += 1;
// //       api(page);
// //     }
// //   });
// // }
// // const observer = new IntersectionObserver(onEntry, {
// //   root: null,
// //   rootMargin: '0px',
// //   threshold: 0.5,
// // });
// // eg\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// //   if (parseInt(data.totalHits) > 0)
// //     $.each(data.hits, function (i, hit) {
// //       console.log(hit.pageURL);
// //     });
// //   else console.log('No hits');
// // });

// // OK\\\\\\\\\\\\\\\\

// const refs = {
//   searchForm: document.querySelector('#search-form'),
//   galleryList: document.querySelector('.gallery'),
//   loadMoreBtn: document.querySelector('.load-more'),
//   inputEl: document.querySelector('.searchQuery'),
// };
// const perPage = 40;
// let tags = 0;
// let page = 1;

// refs.loadMoreBtn.classList.add('is-hidden');
// refs.searchForm.addEventListener('input', e => {
//   if (e.target !== 0) {
//     refs.loadMoreBtn.classList.add('is-hidden');
//     return reset();
//   }
// });

// refs.loadMoreBtn.addEventListener('click', () => {
//   fetchTag(tags, page, perPage).then(photos => {
//     renderPhotos(photos);

//     page += 1;
//     if (page > photos.totalHits / perPage || photos.totalHits < perPage) {
//       // console.log(photos.totalHits);
//       // console.log(perPage);
//       // console.log(photos.totalHits < perPage);
//       // console.log(page > photos.totalHits / perPage);
//       notifyEndResult();
//       return refs.loadMoreBtn.classList.add('is-hidden');
//     }
//     refs.loadMoreBtn.classList.remove('is-hidden');
//   });
// });

// refs.searchForm.addEventListener('submit', e => {
//   e.preventDefault();

//   tags = refs.searchForm.elements.searchQuery.value;
//   refs.searchForm.reset();

//   fetchTag(tags, page).then(photos => {
//     renderPhotos(photos);
//     if (photos.totalHits > 0) {
//       notifySuccess(photos.totalHits);
//     }

//     page += 1;
//     if (page > photos.totalHits / perPage || photos.totalHits < perPage) {
//       // console.log(photos.totalHits);
//       // console.log(perPage);
//       // console.log(photos.totalHits < perPage);
//       // console.log(page > photos.totalHits / perPage);

//       return refs.loadMoreBtn.classList.add('is-hidden');
//     }
//     refs.loadMoreBtn.classList.remove('is-hidden');
//   });
// });

// function renderPhotos({ hits }) {
//   if (hits.length === 0) {
//     notifyFailure();
//   }

//   console.log(hits);
//   const markup = hits
//     .map(
//       ({ webformatURL, tags, largeImageURL, likes, views, comments, downloads }) =>
//         `<li class="gallery__link">
//         <a class="gallery__item" href="${largeImageURL}"></div class="gallery__item_card">
//                   <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
//                     <div class="gallery__item_info">
//                         <p class="item-info">
//                           <b>Likes: </b>${likes}
//                         </p>
//                         <p class="item-info">
//                           <b>Views: </b>${views}
//                         </p>
//                         <p class="item-info">
//                           <b>Comments: </b>${comments}
//                         </p>
//                         <p class="item-info">
//                           <b>Downloads: </b>${downloads}
//                         </p>
//                     </div>
//                 </div>
//           </a>
//       </li>`,
//     )
//     .join('');

//   refs.galleryList.insertAdjacentHTML('beforeend', markup);
// }
// const lightbox = new SimpleLightbox('.hits a', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   enableKeyboard: true,
//   animationSlide: true,
//   animationSpeed: 250,
// });

// function reset() {
//   console.log('сброс');
//   refs.galleryList.innerHTML = '';
// }

// function notifyFailure() {
//   Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
//     showOnlyTheLastOne: true,
//   });
// }
// function notifyEndResult() {
//   Notify.failure('We`re sorry, but you`ve reached the end of search results.', {
//     showOnlyTheLastOne: true,
//   });
// }
// function notifySuccess(totalHits) {
//   Notify.success(`Hooray! We found ${totalHits} images.`, {
//     showOnlyTheLastOne: true,
//   });
// }

// // ;
// // ${hit.previewURL}
// // function notifyInfo() {
// //   Notify.info('Too many matches found. Please enter a more specific name.', {
// //     showOnlyTheLastOne: true,
// //   });
// // {
// /* ; */
// // }

// // if {hits.lengs === 0} {
// // notifyFailure();
// // console.log('ошибка')
// // };

// // end\\\\\\\\\\\\\\\\

// // refs.form.addEventListener('input', e => {
// //   //  const login = searchbox.elements.login.value;
// //   tag = e.target.value;
// //   console.log(e.target.value);
// // });

// // function showPhoto({ main, weather, name }) {
// //   refs.temperatureDescription.textContent = weather[0].main;
// //   refs.temmperatureDegree.textContent = Math.round(main.temp);
// //   refs.locationTimezone.textContent = name;
// //   refs.icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
// //   setSkycons(weather[0].description);
// // }
// // eg pixabay\\\\\\\\\\\\\\
// // $.getJSON(URL, function (data) {
// //   if (parseInt(data.totalHits) > 0)
// //     $.each(data.hits, function (i, hit) {
// //       console.log(hit.pageURL);
// //     });
// //   else console.log('No hits');
// // });
// // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// // const searchbox = document.querySelector('.searchbox > input');
// // const profileContainer = document.querySelector('.profile-section');

// // searchbox.addEventListener('submit', e => {
// //   e.preventDefault();
// //   const login = searchbox.elements.login.value;
// //   fetchUser(login).then(showProfile);
// //   searchbox.reset();
// // });

// // searchbox.addEventListener(
// //   'input',
// //   debounce(() => {
// //     fetchUser(searchbox.value)
// //       .then(userdata => showProfile(userdata))
// //       .catch(error => showError(error));
// //   }, 300),
// // );
