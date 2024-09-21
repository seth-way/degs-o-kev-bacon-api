# degs-o-kev-bacon-api

This repo was created to be used with the <a href="https://github.com/seth-way/degs-o-kev-bacon">6&deg; of Kevin Bacon App</a>.

## Set Up

> [!WARNING]
> **[Node.js](https://nodejs.org/en) & [npm](https://www.npmjs.com/) are required to run this app.**<br>
> _Please ensure you have both installed on your machine before proceeding._

- To create new puzzles & retrieve new info from [The Movie DB](https://www.themoviedb.org/?language=en-US), you will need to sign up and request your own api key. You can store the 'Read Access Token' in a .env.local file under the key `ACCESS_TOKEN`. This step isn't required if you only want to work with existing puzzles/movies.
- _(optional) *Fork this project to your own Github account._
- Clone the repository to your local machine.
- `cd` into the project folder.
- Use the `npm install` command to install the project dependencies.
- Use the `npm start` command to run the server.

## Endpoints

| Description       | URL                                          | Method | Required Properties for Request | Sample Successful Response      |
| ----------------- | -------------------------------------------- | ------ | ------------------------------- | ------------------------------- |
| Get all puzzles   | http://localhost:3001/api/puzzles            | GET    | none                            | An array containing all puzzles   |
| Get single puzzle | http://localhost:3001/api/puzzles/{puzzleId} | GET    | none                            | A puzzle object                 |
