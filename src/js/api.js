// import axios from 'axios';

// const API_KEY = `24377768-1651c24dae1d00899e27f41ae`;
// const BASE_URL = `https://pixabay.com/api`;
// const URL = `${BASE_URL}/?key=${API_KEY}&q=${tags}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${40}`;
// const getAxiosTag = async (tags, page, perPage) => {
//   const response = await axios.get(URL);
//   console.log(response);
//   console.log(response.data);
//   return response.data;
// };
// export { getAxiosTag };

// export getAxiosTag().then(response => console.log(response));
// console.log('response');
// };
// getAxiosTag().then(response => console.log(response));

// export function fetchTag(tags, page, perPage) {
//   return fetch(URL).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
