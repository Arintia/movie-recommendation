import { faArrowLeft, faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toRatingArr } from "../utils/functions";

export default function Movie() {
    const params = useParams();
    const navigate = useNavigate();
    const items = useSelector(state => state.movies.items);
    const movie = items.find(movie => movie.id === params.movieId);

    /**
     * If the movie doesn't exist, end-user gets re-directed to /movies path.
     */
    useEffect(() => {
        if(!movie) {
            navigate("/movies");
        }
    }, [movie, navigate]);
    /**
     * Converts the rating into an array.
     */
    const ratingArr = toRatingArr(movie.rating);

    return (
        <main className="h-screen container lg:pl-32 bg-slate-100 w-screen">
            <a href="/movies" className="lg:mt-24 mt-16 btn btn-xs rounded-lg mb-8"><FontAwesomeIcon className="mr-2" icon={faArrowLeft} /> Back</a>
            <div className="container flex lg:flex-row flex-col lg:mb-0 mb-48">
                <img 
                    src={`${movie.imgUrl}`}
                    className="h-96 w-auto" 
                    alt="Movie"
                    onError={({ currentTarget }) => { // Executes if the image cannot be loaded.
                        currentTarget.onerror = null; 
                        currentTarget.src="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
                    }}
                />
                <div className="container ml-8 relative">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <h4 className="text-md opacity-50 mb-4">Recommended by {movie.recommendedBy}</h4>
                    <p className="mb-4">{movie.shortDesc}</p>
                    <p className="opacity-50"><span className="font-bold">Directed by:</span> {movie.director}</p>
                    <div className="absolute lg:right-40 right-20 lg:bottom-20 bottom-0 text-center">
                        <h4 className="text-lg font-bold">Rating</h4>
                        {ratingArr.map((rating, index) => // The converted rating array is utilized to print stars with FontAwesome.
                            <FontAwesomeIcon key={index} className="mr-1" icon={faStar} />
                        )}
                        {ratingArr.length < movie.rating && <FontAwesomeIcon className="mr-1" icon={faStarHalf} />}
                    </div>
                </div>
            </div>
        </main>
    );
}