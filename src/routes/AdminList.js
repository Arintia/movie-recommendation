import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminCard from "../components/AdminCard/AdminCard";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmMovie, removeMovie } from "../redux/movies/MoviesSlice";

export default function AdminList() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const adminItems = useSelector(state => state.movies.adminItems);
  const isLoggedIn = useSelector(state => state.movies.isLoggedIn);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checked, setChecked] = useState([]);
  const checkboxes = Array.from(document.getElementsByClassName("input-checkbox"));

  function addList(id) {
    if(!checked.includes(id)) {
      setChecked([...checked, id]);
    } else {
      setChecked(checked.filter(item => item !== id));
    }
  }

  useEffect(() => {
    if(checked.length === checkboxes.length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [checked, checkboxes.length]);

  function checkAll() {
    if(isAllChecked) {
      setChecked([]);
    } else {
      setChecked(checkboxes.map(checkbox => checkbox.id));
    }
    setIsAllChecked(!isAllChecked);
  }

  function handleRemove() {
    for(const movieID of checked) {
      dispatch(removeMovie(movieID));
    }
  }

  function handleConfirm() {
    for(const movieID of checked) {
      dispatch(confirmMovie(movieID));
    }
  }

  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate, isLoggedIn]);
  
  return (
    <main className="flex flex-col justify-center pt-12 w-screen h-screen bg-slate-100 text-center">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">Recommendation List</h2>
      </div>
      <div className="overflow-x-auto w-full max-w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" onChange={checkAll} checked={isAllChecked} />
                </label>
              </th>
              <th>Recommended Information</th>
              <th>Description</th>
              <th>Director</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {adminItems.map(movie => 
              <AdminCard 
                key={movie.id}
                id={movie.id}
                imgUrl={movie.imgUrl}
                title={movie.title}
                director={movie.director}
                description={movie.shortDesc}
                rating={movie.rating}
                recommendedBy={movie.recommendedBy}
                addList={addList}
                checked={checked}
              />
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" onChange={checkAll} checked={isAllChecked} />
                </label>
              </th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>
                <button 
                  className="btn rounded-lg btn-sm btn-success mr-2"
                  onClick={handleConfirm}
                >
                    <FontAwesomeIcon className="ml-1" icon={faCheck} />
                </button>
                <button 
                    className="btn rounded-lg btn-sm btn-error"
                    onClick={handleRemove}
                >
                    <FontAwesomeIcon className="ml-1" icon={faTrash} />
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}