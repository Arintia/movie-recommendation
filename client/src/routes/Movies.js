import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard/MovieCard";
import { getMoviesAsync } from "../redux/movies/MoviesSlice";

export default function Recommend() {
    const movies = useSelector(state => state.movies.items);
    const dispatch = useDispatch();
    
    /**
     * Fetches movies from the API upon dom mount.
     */
    useEffect(() => {
        dispatch(getMoviesAsync());
    }, [dispatch]);
    
    return (
        <>
        <main className="my-12 flex justify-center bg-slate-100">
            <div className="mt-12 mb-6 text-center">
                <h3 className="text-5xl">Find your next favourite movie now!</h3>
                <p className="font-light">You can search for a specific genre or a specific director down below.</p>
                <p className="font-light">Feel free to recommend a movie yourself.</p>
                <form className="mx-auto text-center mt-6 w-1/2">
                    <div className="text-left relative z-0 mb-6 w-full group">
                        <input type="text" name="director" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="director" className="absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Director</label>
                    </div>
                    <select id="genres" className="mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Action</option>
                        <option>Adventure</option>
                        <option>Romance</option>
                        <option>Comedy</option>
                    </select>
                </form>
            </div>
        </main>
        <div className="container w-screen flex flex-wrap justify-evenly mb-24">
            {movies.map(movie => 
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
                        description={movie.shortDesc}
                        rating={movie.rating}
                    />
                </Link>
            )}
        </div>
      </>
    );

  }