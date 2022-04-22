import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard/MovieCard";
import { getMoviesAsync } from "../redux/movies/MoviesSlice";

export default function Recommend() {
    const movies = useSelector(state => state.movies.items);
    const dispatch = useDispatch();
    const [searchDirector, setSearchDirector] = useState("");
    const [searchGenre, setSearchGenre] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    /**
     * Fetches movies from the API upon dom mount.
     */
    useEffect(() => {
        dispatch(getMoviesAsync());
    }, [dispatch]);

    useEffect(() => {
        setFilteredMovies(movies.filter(movie => movie.director.includes(searchDirector) && movie.genre.includes(searchGenre)));
    }, [searchDirector, searchGenre, movies]);
    
    return (
        <>
        <main className="my-12 flex justify-center bg-slate-100">
            <div className="mt-12 mb-6 text-center">
                <h3 className="text-5xl">Find your next favourite movie now!</h3>
                <p className="font-light">You can search for a specific genre or a specific director down below.</p>
                <p className="font-light">Feel free to recommend a movie yourself.</p>
                <form className="mx-auto text-center mt-6 w-1/2">
                    <div className="text-left relative z-0 mb-6 w-full group">
                        <input 
                            type="text" 
                            name="director" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            value={searchDirector}
                            onChange={(e) => setSearchDirector(e.target.value)} 
                        required />
                        <label htmlFor="director" className="absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Director</label>
                    </div>
                    <select 
                        id="genres" 
                        className="mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={searchGenre}
                        onChange={(e) => setSearchGenre(e.target.value)}
                    >
                        <option value="">Please select a genre.</option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Horror">Horror</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Western">Western</option>
                    </select>
                </form>
            </div>
        </main>
        <div className="container w-screen flex flex-wrap justify-evenly mb-24">
            {filteredMovies.map(movie => 
                <Link 
                    className="w-96 mr-3 mb-6"
                    key={movie.id}
                    to={`/movies/${movie.id}`}
                >
                    <MovieCard 
                        key={movie.id}
                        imgUrl={movie.imgUrl}
                        title={movie.title}
                        director={movie.director}
                        genre={movie.genre}
                        description={movie.shortDesc}
                        rating={movie.rating}
                    />
                </Link>
            )}
        </div>
      </>
    );

  }