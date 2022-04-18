import React from 'react';
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmMovie, removeMovie } from '../../redux/movies/MoviesSlice';
import { useDispatch } from 'react-redux';


function AdminCard({ id, imgUrl, title, director, description, rating, recommendedBy }) {
    const dispatch = useDispatch();
    return (
        <tr>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                        <img 
                            src={`${imgUrl}`} 
                            alt="Movie"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; 
                                currentTarget.src="https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
                            }} 
                        />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{title}</div>
                        <div className="text-sm opacity-50">Recommended by {recommendedBy}</div>
                    </div>
                </div>
            </td>
            <td className="max-w-xs whitespace-normal">
                {description}
            </td>
            <td>{director}</td>
            <td>
                {rating}
            </td>
            <td>
                <button 
                    className="btn rounded-lg btn-sm btn-success mr-2"
                    onClick={() => 
                        dispatch(confirmMovie(
                            {
                                id: id, 
                                imgUrl: imgUrl, 
                                title: title, 
                                director: director, 
                                description: description, 
                                rating: rating, 
                                recommendedBy: recommendedBy
                            }
                        ))
                    }
                >
                    <FontAwesomeIcon className="ml-1" icon={faCheck} />
                </button>
                <button 
                    className="btn rounded-lg btn-sm btn-error"
                    onClick={() => dispatch(removeMovie(id))}
                >
                    <FontAwesomeIcon className="ml-1" icon={faTrash} />
                </button>
            </td>
        </tr>
    );
}

export default AdminCard;