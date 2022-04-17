import React from 'react';
import { faStar,faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MovieCard({ imgUrl, title, director, description, rating }) {
    const ratingArr = [];
    for(let i = 0; i < Math.floor(rating); i++) {
        ratingArr.push(i);
    }
    console.log(ratingArr.length - 1);
    return (
        <div className="card mb-6 mr-2 lg:w-1/4 bg-slate-200 shadow-xl">
            <figure 
                style={
                    {
                        width: "100%", 
                        height: "256px", 
                        backgroundImage: `url("${imgUrl}")`, 
                        backgroundPosition: "center center", 
                        backgroundRepeat: "no-repeat"
                    }
                } 
            />
            <div className="pt-4 pl-4 card-body">
                <div>
                    <h4 className="text-xl">{title}</h4>
                    <p className="font-light">by <strong>{director}</strong></p>
                </div>
                <p>{description}</p>
                <div className="card-actions">
                    <div className="flex w-full justify-between items-center">
                        <div className="flex items-center">
                            {ratingArr.map(rating =>
                                <FontAwesomeIcon className="mr-1" icon={faStar} />
                            )}
                            {(ratingArr.length - 1) < rating && <FontAwesomeIcon className="mr-1" icon={faStarHalf} />}
                        </div>
                        <button className="btn btn-active text-white rounded-lg">Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;