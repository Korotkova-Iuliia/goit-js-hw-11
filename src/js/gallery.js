// // 1-я попытка..............
// // // OK\\\\\\\\\\\\\\\\//

// import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { fetchTag } from './api';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

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
//     refresh();
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

//         <a class="gallery__item" href="${largeImageURL}">
//         </div class="gallery__item_card">
//          <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
//         <div class="gallery__item_info">
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
//                   </div>
//           </a>

//       </li>`,
//     )
//     .join('');

//   refs.galleryList.insertAdjacentHTML('beforeend', markup);
// }
// // \\\\\\\\\\\\\\
// function onEntry(hits, observer) {
//   hits.forEach(hit => {
//     if (hit.isIntersecting) {
//       page += 1;
//       api(page);
//     }
//   });
// }
// const observer = new IntersectionObserver(onEntry, {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.5,
// });

// // \\\\\\\\\\
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
// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   enableKeyboard: true,
//   animationSlide: true,
//   animationSpeed: 250,
// });
