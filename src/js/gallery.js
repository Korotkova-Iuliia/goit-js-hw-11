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
async function getAxiosTag(surchtags, page) {
  const URL = `${BASE_URL}/?key=${API_KEY}&q=${surchtags}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${40}`;
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
// refs.loadMoreBtn.addEventListener('click', () => {
//   getAxiosTag(surchtags, page).then(photos => {
//     renderPhotos(photos.hits);

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
window.addEventListener('scroll', () => {
  // galleryHeight = document.querySelector('ul').getBoundingClientRect().height;
  const galleryHeightTop = document.querySelector('ul').getBoundingClientRect().top;
  const galleryHeightBottom = document.querySelector('ul').getBoundingClientRect().bottom;
  console.log(galleryHeightTop);
  console.log(galleryHeightBottom);
  console.log(document.documentElement.clientHeight);
  if (galleryHeightBottom < document.documentElement.clientHeight) {
    // page += 1;
    if (surchtags === '') {
      reset();
    }
    getAxiosTag(surchtags, page).then(photos => {
      renderPhotos(photos.hits);

      page += 1;
      if (page > photos.totalHits / perPage || photos.totalHits < perPage) {
        return refs.loadMoreBtn.classList.add('is-hidden');
      }
      refs.loadMoreBtn.classList.remove('is-hidden');
    });
    // });
  }
  if (galleryHeightBottom === document.documentElement.clientHeight) {
    notifyEndResult();
  }
});

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  page = 1;
  reset();
  surchtags = refs.searchForm.elements.searchQuery.value.trim();
  // if (surchtags === '') {
  //   reset();
  //   return notifyFailure();
  // }

  console.log(surchtags);
  getAxiosTag(surchtags, page).then(photos => {
    renderPhotos(photos.hits);
    console.log(document.querySelector('li'));
    console.log(document.querySelector('li').getBoundingClientRect().height);
    console.log(document.querySelector('.gallery').firstElementChild.getBoundingClientRect());
    const cardHeight = document.querySelector('li').getBoundingClientRect().height;
    console.log(cardHeight);
    window.scrollBy({
      top: cardHeight * 0.4,
      behavior: 'smooth',
    });
    // page += 1;

    console.log(photos);
    console.log(photos.hits);

    if (photos.totalHits > 0) {
      notifySuccess(photos.totalHits);
    }

    if (page > photos.totalHits / perPage || photos.totalHits < perPage) {
      return refs.loadMoreBtn.classList.add('is-hidden');
    }
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
});

function renderPhotos(hits) {
  if (hits.length === 0) {
    notifyFailure();
  }
  console.log(hits.length);

  const markup = hits
    .map(
      ({ webformatURL, tags, largeImageURL, likes, views, comments, downloads }) =>
        `
    <li class="gallery-list">
        <a class="gallery__link" href="${largeImageURL}">
                  <div class="gallery__card">
                   <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                 <div class="gallery__item-info">
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
     </li>
      `,
    )
    .join('');
  refs.galleryList.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
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

// const observer = new IntersectionObserver(onEntry, {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.5,
// });
// let observer = new IntersectionObserver(
//   (hits, observer) => {
//     console.log(hits);
//     hits.forEach(hit => {
//       if (hit.isIntersecting) {
//         getAxiosTag(surchtags, page).then(photos => {
//           renderPhotos(photos.hits);
//           page += 1;
//         });
//       }
//       observer.unobserve(hit.target);
//       console.log(hit.target);
//       observer.observe(document.querySelector('li:last-child'));
//     });
//   },
//   {
//     threshold: 1,
//   },
// );
// observer.observe(document.querySelector('li'));

// // ...............зроблено з кнопкою загрузки.........................................\\\\\\\\\\\\\\\\\\
// import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// // import { getAxiosTag } from './api';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// const refs = {
//   searchForm: document.querySelector('#search-form'),
//   galleryList: document.querySelector('.gallery'),
//   loadMoreBtn: document.querySelector('.load-more'),
//   inputEl: document.querySelector('.searchQuery'),
// };
// const perPage = 40;
// let surchtags = '';
// let page = 1;
// const API_KEY = `24377768-1651c24dae1d00899e27f41ae`;
// const BASE_URL = `https://pixabay.com/api`;
// async function getAxiosTag(surchtags, page) {
//   const URL = `${BASE_URL}/?key=${API_KEY}&q=${surchtags}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${40}`;
//   console.log(surchtags);
//   try {
//     const response = await axios.get(URL);
//     console.log(response);
//     console.log(response.data);
//     console.log(response.data.hits);
//     return await response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }
// refs.loadMoreBtn.classList.add('is-hidden');
// refs.searchForm.addEventListener('input', e => {
//   console.log(e.target);
//   if (e.target !== 0) {
//     refs.loadMoreBtn.classList.add('is-hidden');
//     return reset();
//   }
// });
// refs.loadMoreBtn.addEventListener('click', () => {
//   getAxiosTag(surchtags, page).then(photos => {
//     renderPhotos(photos.hits);

//     page += 1;
//     if (page > photos.totalHits / perPage || photos.totalHits < perPage) {
//       notifyEndResult();
//       return refs.loadMoreBtn.classList.add('is-hidden');
//     }
//     refs.loadMoreBtn.classList.remove('is-hidden');
//   });
// });

// refs.searchForm.addEventListener('submit', e => {
//   e.preventDefault();
//   page = 1;
//   reset();
//   surchtags = refs.searchForm.elements.searchQuery.value.trim();
//   if (surchtags === '') {
//     reset();
//     return notifyFailure();
//   }

//   getAxiosTag(surchtags, page).then(photos => {
//     renderPhotos(photos.hits);
// const cardHeight = document.querySelector('li').getBoundingClientRect().height;
// console.log(cardHeight);
// window.scrollBy({
//   top: cardHeight * 0.5,
//   behavior: 'smooth',
// });
//     if (photos.totalHits > 0) {
//       notifySuccess(photos.totalHits);
//     }
//     page += 1;
//     if (page > photos.totalHits / perPage || photos.totalHits < perPage) {
//       return refs.loadMoreBtn.classList.add('is-hidden');
//     }
//     refs.loadMoreBtn.classList.remove('is-hidden');
//   });
// });

// function renderPhotos(hits) {
//   if (hits.length === 0) {
//     notifyFailure();
//   }

//   const markup = hits
//     .map(
//       ({ webformatURL, tags, largeImageURL, likes, views, comments, downloads }) =>
//         `
//     <li class="gallery-list">
//         <a class="gallery__link" href="${largeImageURL}">
//                   <div class="gallery__card">
//                    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
//                  <div class="gallery__item-info">
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
//                </div>
//         </a>
//      </li>
//       `,
//     )
//     .join('');
//   refs.galleryList.insertAdjacentHTML('beforeend', markup);
//   lightbox.refresh();
// }

// const lightbox = new SimpleLightbox('.gallery a', {
//   captions: true,
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

// // ............... кінець "зроблено з кнопкою загрузки"....................\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
