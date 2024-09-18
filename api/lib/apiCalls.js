const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const baseUrl = 'https://api.themoviedb.org/3/';
const urlEndPath = '&include_adult=false&language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

async function searchForMovie(title) {
  const url = encodeURI(baseUrl + 'search/movie?query=' + title + urlEndPath);
  try {
    const data = await fetch(url, options);
    if (!data.ok) throw new Error(`Error fetching movie <> ${title}`);
    const movies = await data.json();
    return movies.results[0];
  } catch (err) {
    next(err);
  }
}

async function searchForStar(star) {
  const url = encodeURI(baseUrl + 'search/person?query=' + star + urlEndPath);
  try {
    const data = await fetch(url, options);
    if (!data.ok) throw new Error(`Error fetching star <> ${star}`);
    const stars = await data.json();
    return stars.results[0];
  } catch (err) {
    next(err);
  }
}

module.exports = { searchForMovie, searchForStar };
