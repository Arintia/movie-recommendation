import { useEffect, useRef, useState } from "react";
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
  const adminItems = useSelector(state => state.movies.adminItems);
  const isLoggedIn = useSelector(state => state.movies.isLoggedIn);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checked, setChecked] = useState([]);
  const checkboxes = Array.from(document.getElementsByClassName("input-checkbox"));
  const [increaseBtn, setIncreaseBtn] = useState();
  const [decreaseBtn, setDecreaseBtn] = useState();

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

  useEffect(() => {
    dispatch(getAdminMoviesAsync());
  }, [dispatch]);

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
      dispatch(removeAdminMovieAsync(movieID));
    }
  }

  function handleConfirm() {
    for(const movieID of checked) {
      dispatch(confirmMovieAsync(movieID));
    }
  }

  const decreasePage = () => {
    if(page > 0) {
      setPage(page - 1);
    }
  }

  const increasePage = () => {
    if(page+1 < totalPages) {
      setPage(page + 1);
    }
  }

  const handlePageSwitch = (e) => {
    const pageValue = Number(e.target.id);
    if(pageValue !== page) {
      setPage(pageValue);
    }
  }

  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/admin");
    }
  }, [navigate, isLoggedIn]);

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

  useEffect(() => {
    if(increaseBtn) {
      if(page + 1 >= totalPages) {
        increaseBtn.disabled = true;
      } 
      else {
        increaseBtn.disabled = false;
      }
    } 
  }, [page, increaseBtn, totalPages]);

  useEffect(() => {
    setTotalPages(adminItems.length / ITEMS_PER_PAGE);
  }, [adminItems.length]);

  useEffect(() => {
    setIncreaseBtn(document.getElementById("increase-btn"));
    setDecreaseBtn(document.getElementById("decrease-btn"));
  }, []);

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
                    {totalPages > 0 && 
                      <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {[...Array(Math.ceil(totalPages))].map((page, index) => 
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