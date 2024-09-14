const API_KEY = process.env.API_KEY;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
// https://api.themoviedb.org/3/movie/157336?api_key=112d4c44b52cca644deafb0d8e85bb46&append_to_response=videos,images
const baseUrl = 'https://api.themoviedb.org/3/';
const urlEndPath = '&include_adult=false&language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export async function getMovies() {
  try {
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function searchForMovie(title) {
  const url = encodeURI(baseUrl + 'search/movie?query=' + title + urlEndPath);
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Error fetching movie <> ${title}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('<><> ERROR DURING API CALLS FUNCTION <><>');
    console.error(err);
    return err;
  }
}

export async function searchForStar(star) {
  const url = encodeURI(baseUrl + 'search/person?query=' + star + urlEndPath);
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Error fetching star <> ${star}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('<><> ERROR DURING API CALLS FUNCTION <><>');
    console.error(err);
    return err;
  }
}
