import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { uid } from "uid";

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * Array of objects that stores confirmed movies.
 * @param movies.id - Unique ID of the movie.
 * @param movies.imgUrl - Image URL of the movie.
 * @param movies.title - Title of the movie.
 * @param movies.director - Director(s) of the movie.
 * @param movies.shortDesc - Short description of the movie(max. 325 characters)
 * @param movies.genre - Genre of the movie
 * @param movies.rating - Rating of the movie.
 * @param movies.recommendedBy - Name of the person that recommended the movie.
 */
let movies = [

];

/**
 * Array of objects that stores unconfirmed movies.
 * @param adminMovies.id - Unique ID of the movie.
 * @param adminMovies.imgUrl - Image URL of the movie.
 * @param adminMovies.title - Title of the movie.
 * @param adminMovies.director - Director(s) of the movie.
 * @param adminMovies.shortDesc - Short description of the movie(max. 325 characters)
 * @param adminMovies.genre - Genre of the movie
 * @param adminMovies.rating - Rating of the movie.
 * @param adminMovies.recommendedBy - Name of the person that recommended the movie.
 */
let adminMovies = [

];

/**
 * GET request that sends back the array of confirmed movies.
 */
app.get("/movies", (req, res) => res.status(200).send(movies));

/**
 * POST request that returns the newly added movie if it doesn't already exist. Nothing is returned if the movie already exists.
 * Instead, the movie is removed from the unconfirmed list.
 */
app.post("/movies/:id", (req, res) => {
    const id = req.params.id;
    const newMovie = adminMovies.find(movie => id === movie.id);
    try {
        if(!movies.find(movie => newMovie.title === movie.title)) {
            movies.push(newMovie);
            adminMovies = adminMovies.filter(movie => id !== movie.id);
            return res.status(200).send(newMovie);
        }
        throw "Movie already exists";
    } catch {
        adminMovies = adminMovies.filter(movie => id !== movie.id);
        return res.status(200).send(newMovie);
    }
});

/**
 * DELETE request that deletes a specific movie from the confirmed movies and returns its unique ID.
 */
app.delete("/movies/:id", (req, res) => {
    const id = req.params.id;
    movies = movies.filter(movie => id !== movie.id);
    return res.status(200).send(id);
});

/**
 * DELETE request that resets the confirmed movies.
 */
app.delete("/movies", (req, res) => {
    movies = [];
    return res.status(200).send(movies);
});

/**
 * GET request that returns the array of unconfirmed movies.
 */
app.get("/adminlist", (req, res) => res.send(adminMovies));

/**
 * POST request that adds a new movie to the unconfirmed list and returns the newly added movie.
 */
app.post("/adminlist", (req, res) => {
    const newMovie = {
        id: uid(),
        imgUrl: req.body.imgUrl,
        title: req.body.title,
        director: req.body.director,
        shortDesc: req.body.shortDesc,
        genre: req.body.genre,
        rating: Number(req.body.rating),
        recommendedBy: req.body.recommendedBy
    };
    adminMovies.push(newMovie);
    return res.status(200).send(newMovie);
});

/**
 * DELETE request that deletes a specific movie from the unconfirmed movies and returns its unique ID.
 */
app.delete("/adminlist/:id", (req, res) => {
    const id = req.params.id;
    adminMovies = adminMovies.filter(adminMovie => id !== adminMovie.id);
    return res.send(id);
});

/**
 * DELETE request that resets the unconfirmed movies array.
 */
app.delete("/adminlist", (req, res) => {
    adminMovies = [];
    return res.send(adminMovies);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});