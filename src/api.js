import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38324271-7e43a2be81ff0199763370e16';
export const perPage = 12;

export async function getImageList(query, page) {
  return axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
}
