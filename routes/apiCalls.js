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

function searchForMovie(title) {
  const url = encodeURI(baseUrl + 'search/movie?query=' + title + urlEndPath);

  const movieInfo = fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(`Error fetching movie <> ${title}`);
      return res.json();
    })
    .catch(err => {
      console.error(err);
      return err;
    });
  return movieInfo;
}

function searchForStar(star) {
  const url = encodeURI(baseUrl + 'search/person?query=' + star + urlEndPath);
  const starInfo = fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(`Error fetching movie <> ${star}`);
      return res.json();
    })
    .catch(err => {
      console.error(err);
      return err;
    });

  return starInfo;
}

module.exports = { searchForMovie, searchForStar };
