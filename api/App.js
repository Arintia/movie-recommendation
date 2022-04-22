import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { uid } from "uid";

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let movies = [

];

let adminMovies = [

];

app.get("/movies", (req, res) => res.status(200).send(movies));

app.post("/movies/:id", (req, res) => {
    const id = req.params.id;
    const newMovie = adminMovies.find(movie => id === movie.id);
    try {
        if(!movies.find(movie => newMovie.title === movie.title)) {
            movies.push(newMovie);
            adminMovies = adminMovies.filter(movie => id !== movie.id);
        }
        throw "Movie already exists";
    } catch {
        adminMovies = adminMovies.filter(movie => id !== movie.id);
    }
    return res.status(200).send(newMovie);
});

app.delete("/movies/:id", (req, res) => {
    const id = req.params.id;
    movies = movies.filter(movie => id !== movie.id);
    return res.status(200).send(id);
});

app.delete("/movies", (req, res) => {
    movies = [];
    return res.status(200).send(movies);
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
    return res.status(200).send(newMovie);
});

app.delete("/adminlist/:id", (req, res) => {
    const id = req.params.id;
    adminMovies = adminMovies.filter(adminMovie => id !== adminMovie.id);
    return res.send(id);
});

app.delete("/adminlist", (req, res) => {
    adminMovies = [];
    return res.send(adminMovies);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});