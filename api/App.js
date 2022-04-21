const express = require("express");
const cors = require('cors');
const { json } = require('body-parser');
const { uid } = require('uid');

const app = express();
const port = 3001;

app.use(cors());
app.use(json());

let movies = [

];

let adminMovies = [

];

app.get("/movies", (req, res) => res.send(movies));

app.post("/movies/:id", (req, res) => {
    const id = req.params.id;
    const newMovie = adminMovies.find(movie => id === movie.id);
    movies.push(newMovie);
    adminMovies = adminMovies.filter(movie => newMovie.id !== movie.id);
    return res.send(newMovie);
});

app.delete("/movies:id", (req, res) => {
    const id = req.params.id;
    movies.filter(movie => id !== movie.id);
    return res.send(movies);
});

app.delete("/movies", (req, res) => {
    movies = [];
    return res.send(movies);
});

app.get("/adminlist", (req, res) => res.send(adminMovies));

app.post("/adminlist", (req, res) => {
    const newMovie = {
        id: uid(),
        imgUrl: req.body.imgUrl,
        title: req.body.title,
        director: req.body.director,
        shortDesc: req.body.shortDesc,
        rating: Number(req.body.rating),
        recommendedBy: req.body.recommendedBy
    };
    adminMovies.push(newMovie);
    return res.send(newMovie);
});

app.delete("/adminlist:id", (req, res) => {
    const id = req.params.id;
    adminMovies.filter(adminMovie => id !== adminMovie.id);
    return res.send(adminMovies);
});

app.delete("/adminlist", (req, res) => {
    adminMovies = [];
    return res.send(adminMovies);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});