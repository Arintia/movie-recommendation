import React from 'react';
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmMovieAsync, removeAdminMovieAsync } from '../../redux/movies/MoviesSlice';
import { useDispatch } from 'react-redux';


function AdminCard({ id, imgUrl, title, director, description, rating, recommendedBy, addList, checked }) {
    const dispatch = useDispatch();
    return (
        <tr>
            <th>
                <label>
                    <input 
                        id={id} 
                        type="checkbox" 
                        className="checkbox input-checkbox" 
                        onChange={(e) => addList(e.target.id)} 
                        checked={checked.includes(id)}
                    />
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                        <img 
                            src={`${imgUrl}`} 
                            alt="Movie"
                            onError={({ currentTarget }) => { // Executes if the image cannot be loaded.
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
                        dispatch(confirmMovieAsync(id))
                    }
                >
                    <FontAwesomeIcon className="ml-1" icon={faCheck} />
                </button>
                <button 
                    className="btn rounded-lg btn-sm btn-error"
                    onClick={() => dispatch(removeAdminMovieAsync(id))}
                >
                    <FontAwesomeIcon className="ml-1" icon={faTrash} />
                </button>
            </td>
        </tr>
    );
}

export default AdminCard;