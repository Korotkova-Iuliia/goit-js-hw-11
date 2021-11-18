const API_KEY = `24377768-1651c24dae1d00899e27f41ae`;
const BASE_URL = `https://pixabay.com/api`;
export function fetchTag(tags, page, perPage) {
  const URL = `${BASE_URL}/?key=${API_KEY}&q=${tags}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${40}`;

  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
