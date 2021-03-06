import React from 'react';
import { faStar,faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toRatingArr } from '../../utils/functions';


function MovieCard({ imgUrl, title, director, description, genre, rating }) {
    /**
     * Converts the rating into an array.
     */
    const ratingArr = toRatingArr(rating);

    return (
        <div className="card w-full bg-slate-200 shadow-xl">
            <figure 
                style={
                    {
                        width: "100%", 
                        height: "256px", 
                        backgroundImage: `url("${imgUrl}"), url("https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg")`, 
                        backgroundPosition: "center center", 
                        backgroundRepeat: "no-repeat"
                    }
                } 
            />
            <div className="pt-4 pl-4 card-body relative">
                <div className="badge absolute top-5 right-5">{genre}</div>
                <div>
                    <h4 className="text-xl">{title}</h4>
                    <p className="font-light">by <strong>{director}</strong></p>
                </div>
                <p>{description}</p>
                <div className="card-actions">
                    <div className="flex w-full justify-between items-center">
                        <div className="flex items-center">
                            {ratingArr.map((rating, index) => // The converted rating array is utilized to print stars with FontAwesome.
                                <FontAwesomeIcon key={index} className="mr-1" icon={faStar} />
                            )}
                            {ratingArr.length < rating && <FontAwesomeIcon className="mr-1" icon={faStarHalf} />}
                        </div>
                        <button className="btn btn-active text-white rounded-lg">Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;