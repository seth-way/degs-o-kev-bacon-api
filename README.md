# degs-o-kev-bacon-api

This repo was created to be used with the whats cookin project.

## Set Up

Clone this down, and `cd` into it. Then run:

`npm install`

`npm start`

## Endpoints

| Description       | URL                                          | Method | Required Properties for Request | Sample Successful Response      |
| ----------------- | -------------------------------------------- | ------ | ------------------------------- | ------------------------------- |
| Get all puzzles   | http://localhost:3001/api/puzzles            | GET    | none                            | An array containing all users   |
| Get single puzzle | http://localhost:3001/api/puzzles/{puzzleId} | GET    | none                            | A puzzle object                 |
| Get all recipes   | http://localhost:3001/api/v1/recipes         | GET    | none                            | An array containing all recipes |
