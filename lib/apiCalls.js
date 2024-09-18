const API_KEY = process.env.API_KEY;
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

// function getMovies() {
//   try {
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// }

function searchForMovie(title) {
  const url = encodeURI(baseUrl + 'search/movie?query=' + title + urlEndPath);

  const movie = fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(`Error fetching movie <> ${title}`);
      return res.json();
    })
    .then(data => data)
    .catch(err => {
      console.error(err);
      return err;
    });
  return movie;
}

function searchForStar(star) {
  const url = encodeURI(baseUrl + 'search/person?query=' + star + urlEndPath);
  const star = fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(`Error fetching movie <> ${star}`);
      return res.json();
    })
    .then(data => data)
    .catch(err => {
      console.error(err);
      return err;
    });

  return star;
}

module.exports = { getMovies, searchForMovie, searchForStar };
