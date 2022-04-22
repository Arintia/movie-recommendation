import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminCard from "../components/AdminCard/AdminCard";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmMovieAsync, getAdminMoviesAsync, removeAdminMovieAsync } from "../redux/movies/MoviesSlice";
import { ITEMS_PER_PAGE } from "../utils/constants";

export default function AdminList() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  /**
   * Stores adminItems state which is an array of objects that stores the movies that haven't been confirmed by an admin yet.
   */
  const adminItems = useSelector(state => state.movies.adminItems);
  /**
   * Stores the state of whether or not the user is logged in.
   */
  const isLoggedIn = useSelector(state => state.movies.isLoggedIn);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checked, setChecked] = useState([]);
  const checkboxes = Array.from(document.getElementsByClassName("input-checkbox"));
  const [increaseBtn, setIncreaseBtn] = useState();
  const [decreaseBtn, setDecreaseBtn] = useState();

  /**
   * Removes the movie from the checkboxes checked array if the movie exists, adds it to the array if not.
   * The array is used when the user wants to confirm or delete multiple movie entries using checkboxes.
   * @param {String} id - The unique ID of the movie that had its checkbox changed. 
   */
  const addList = (id) => {
    if(!checked.includes(id)) {
      setChecked([...checked, id]);
    } else {
      setChecked(checked.filter(item => item !== id));
    }
  }

  /**
   * useEffect hook that handles whether or not every checkbox that's visible on the screen is checked. Sets the isAllChecked state to true if they are.
   * This hook is executed every time a checkbox is checked/unchecked or a checkbox is added/removed.
   */
  useEffect(() => {
    if(checked.length === checkboxes.length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [checked, checkboxes.length]);

  /**
   * Fetches an array that returns the movies that haven't been confirmed by an admin yet.
   */
  useEffect(() => {
    dispatch(getAdminMoviesAsync());
  }, [dispatch]);

  /**
   * Function that checks or unchecks(if all are checked already) all checkboxes.
   */
  const checkAll = () => {
    if(isAllChecked) {
      setChecked([]);
    } else {
      setChecked(checkboxes.map(checkbox => checkbox.id));
    }
    setIsAllChecked(!isAllChecked);
  }

  /**
   * Function that dispatches a callback to remove every movie that's been checked to be removed.
   * It iterates through "checked" array and dispatches the callback to remove each checked movie.
   */
  const handleRemove = () => {
    for(const movieID of checked) {
      dispatch(removeAdminMovieAsync(movieID));
    }
  }

  /**
   * Function that dispatches a callback to confirm every movie that's been checked to be confirmed.
   * It iterates through "checked" array and dispatches the callback to confirm each checked movie.
   */
  const handleConfirm = () => {
    for(const movieID of checked) {
      dispatch(confirmMovieAsync(movieID));
    }
  }

  /**
   * Function that's used to decrease the current page count. It decreases the page state by 1 if current page is larger than 0. 
   */
  const decreasePage = () => {
    if(page > 0) {
      setPage(page - 1);
    }
  }

  /**
   * Function that's used to increase the current page count. It increases the page state by 1 if current page is smaller than total pages. 
   */
  const increasePage = () => {
    if(page < totalPages) {
      setPage(page + 1);
    }
  }

  /**
   * Function used for manual page switching(i.e. from page 1 to page 3). The page state is set to the value if the current page isn't equal to the specified page.
   * Each page's value is stored as an ID, pageValue fetches the ID of each page and converts it to a number type.
   * @param {*} e - Event object 
   */
  const handlePageSwitch = (e) => {
    const pageValue = Number(e.target.id);
    if(pageValue !== page) {
      setPage(pageValue);
    }
  }

  /**
   * Navigates user to /admin path if they haven't been logged in.
   */
  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate, isLoggedIn]);


  /**
   * If the page changes or the decrease button changes, this hook is called. It disables the decrease button if the current page is 0.
   * It resets the checkboxes that have been checked to avoid any confusion(UX improvement).
   */
  useEffect(() => {
    if(decreaseBtn) {
      if(page === 0) {
        decreaseBtn.disabled = true;
      }
      else {
        decreaseBtn.disabled = false;
      }
    }
    setChecked([]);
  }, [page, decreaseBtn]);

  /**
   * If the page changes or the increase button changes, this hook is called. It disables the increase button if the current page is equal to or greater than the total page.
   * The reason why this hook doesn't reset the checkboxes is because it's already handled by decrease button hook above.
   */
  useEffect(() => {
    if(increaseBtn) {
      if(page === totalPages) {
        increaseBtn.disabled = true;
      } 
      else {
        increaseBtn.disabled = false;
      }
    } 
  }, [page, increaseBtn, totalPages]);

  /**
   * Every time the length of adminItems array changes, this hook is called.
   * It sets the total pages based on the length divided by ITEMS_PER_PAGE constant. 
   * It utilizes the Math.floor function, if the result is 1.2, it sets the total pages to 2.
   */
  useEffect(() => {
    setTotalPages(Math.floor(adminItems.length / ITEMS_PER_PAGE));
  }, [adminItems.length]);

  useEffect(() => {
    setIncreaseBtn(document.getElementById("increase-btn"));
    setDecreaseBtn(document.getElementById("decrease-btn"));
  }, []);

  /**
   * Array that stores the movies current pages holds.
   */
  const selectedItems = adminItems.slice(((ITEMS_PER_PAGE * page)), (ITEMS_PER_PAGE * (page + 1)));
  
  return (
    <main className="flex flex-col justify-center pt-12 w-screen h-screen bg-slate-100 text-center">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">Recommendation List</h2>
      </div>
      <div className="overflow-x-auto w-full max-w-full mb-12">
        <table className="table w-full z-10">
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
              <th>Genre</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map(movie => 
              <AdminCard 
                key={movie.id}
                id={movie.id}
                imgUrl={movie.imgUrl}
                title={movie.title}
                director={movie.director}
                description={movie.shortDesc}
                genre={movie.genre}
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
              <th className="flex justify-center">
                <div className="btn-group">
                  <button 
                    id="decrease-btn"
                    className="btn bg-slate-100 text-slate-900 hover:bg-slate-200"
                    onClick={decreasePage}
                  >
                      «
                  </button>
                  <button 
                    className="btn bg-slate-100 text-slate-900 hover:bg-slate-200 dropdown"
                  >
                    <label tabIndex="0" className="m-1">Page {page+1}</label>
                    {totalPages > 0 && // if there are any pages
                      <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {[...Array(totalPages+1)].map((page, index) => 
                          <li><button className="z-30" onClick={handlePageSwitch} id={index}>Page {index+1}</button></li>
                        )}
                      </ul>
                    }
                  </button>
                  <button 
                    id="increase-btn"
                    className="btn bg-slate-100 text-slate-900 hover:bg-slate-200"
                    onClick={increasePage}
                  >
                    »
                  </button>
                </div>
              </th>
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