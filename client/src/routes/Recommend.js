import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addAdminMovieAsync } from "../redux/movies/MoviesSlice";


export default function Recommend() {
  const dispatch = useDispatch();
  const imgUrl = useRef("");
  const title = useRef("");
  const director = useRef("");
  const description = useRef("");
  const rating = useRef(0);
  const recommendedBy = useRef("");
  const genre = useRef("");
  const confirmationAlert = useRef();
  const formInputs = document.getElementsByClassName("form-input");
  
  /**
   * useEffect assigns confirmation alert div when the DOM is mounted.
   * confirmation alert div is shown when an entry is successfully added.
   */
  useEffect(() => {
    confirmationAlert.current = document.getElementById("conf-alert");
  }, []);

  /**
   * Handles form submission to recommend a movie.
   * Dispatches the addAdminMovieAsync callback to send the payload to the API.
   * Resets the form inputs.
   * Shows confirmation alert for 2.5 seconds.
   * @param {*} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!genre.current || genre.current === "") return;
    const payload = {
      imgUrl: imgUrl.current, 
      title: title.current, 
      director: director.current, 
      shortDesc: description.current, 
      genre: genre.current,
      rating: rating.current, 
      recommendedBy: recommendedBy.current
    };
    await dispatch(addAdminMovieAsync(payload));
    for(const input of formInputs) {
      input.value = "";
    }
    confirmationAlert.current.classList.remove("hidden");
    setTimeout(() => confirmationAlert.current.classList.add("hidden"), 2500);
  }

  return (
    <main className="pt-12 lg:mt-4 pb-16 w-screen h-screen flex justify-center items-center bg-slate-100 mb-24">
      <form className="mx-auto text-center mt-12 lg:w-1/4 sm:w-1/2 bg-white rounded-xl p-9" onSubmit={handleSubmit}>
        <h2 className="text-xl text-left mb-2">Recommend a movie</h2>
        <div className="mb-4">
          <label 
            htmlFor="img-url" 
            className="text-left mb-1 block text-sm font-light text-black"
          >
            Image URL
          </label>
          <input 
            type="text" 
            name="img-url" 
            id="img-url" 
            className="form-input bg-slate-900 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="https://yourexample.com/img.png"
            onChange={e => imgUrl.current = e.target.value} 
            required
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="title" 
            className="text-left mb-1 block text-sm font-light text-black"
          >
            Title
          </label>
          <input 
            type="text" 
            name="title" 
            id="title"
            className="form-input bg-slate-900 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Your title" 
            onChange={e => title.current = e.target.value} 
            required
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="director" 
            className="text-left mb-1 block text-sm font-light text-black"
          >
            Director
          </label>
          <input 
            type="text" 
            name="director" 
            id="director" 
            className="form-input bg-slate-900 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Your director" 
            onChange={e => director.current = e.target.value} 
            required
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="description" 
            className="text-left mb-1 block text-sm font-light text-black"
          >
            Description
          </label>
          <textarea 
            name="description"
            className="form-input textarea w-full resize-none rounded-lg bg-slate-900 text-white" 
            placeholder="Short description(max. 325 chars allowed)"
            id="description"
            maxLength={325}
            onChange={e => description.current = e.target.value} 
            required
          >
          </textarea>
        </div>
        <div className="mb-4">
          <label 
            htmlFor="recommended-by" 
            className="text-left mb-1 block text-sm font-light text-black"
          >
            Your name
          </label>
          <input 
            type="text" 
            name="recommended-by" 
            id="recommended-by" 
            className="form-input bg-slate-900 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Your name" 
            onChange={e => recommendedBy.current = e.target.value} 
            required
          />
        </div>
        <label 
          htmlFor="genres"
          className="text-left mb-1 block text-sm font-light text-black"
        >
          Genre
        </label>
        <select 
          id="genres" 
          className="mb-4 bg-slate-900 border border-slate-800 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={(e) => genre.current = e.target.value}
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
        <label 
            htmlFor="rating-10" 
            className="text-left mb-1 block text-sm font-light text-black"
          >
            Rating
          </label>
        <div className="rating rating-lg rating-half mb-4">
          <input type="radio" value={1} name="rating-10" className="rating-hidden" />
          <input type="radio" value={1} name="rating-10" className="mask mask-star-2 mask-half-1" onChange={e => rating.current = e.target.value}/>
          <input type="radio" value={1} name="rating-10" className="mask mask-star-2 mask-half-2" onChange={e => rating.current = e.target.value} checked />
          <input type="radio" value={1.5} name="rating-10" className="mask mask-star-2 mask-half-1" onChange={e => rating.current = e.target.value} />
          <input type="radio" value={2} name="rating-10" className="mask mask-star-2 mask-half-2" onChange={e => rating.current = e.target.value} />
          <input type="radio" value={2.5} name="rating-10" className="mask mask-star-2 mask-half-1" onChange={e => rating.current = e.target.value} />
          <input type="radio" value={3} name="rating-10" className="mask mask-star-2 mask-half-2" onChange={e => rating.current = e.target.value} />
          <input type="radio" value={3.5} name="rating-10" className="mask mask-star-2 mask-half-1" onChange={e => rating.current = e.target.value} />
          <input type="radio" value={4} name="rating-10" className="mask mask-star-2 mask-half-2" onChange={e => rating.current = e.target.value} />
          <input type="radio" value={4.5} name="rating-10" className="mask mask-star-2 mask-half-1" onChange={e => rating.current = e.target.value} />
          <input type="radio" value={5} name="rating-10" className="mask mask-star-2 mask-half-2" onChange={e => rating.current = e.target.value} />
        </div>
        <button type="submit" className="btn btn-active text-white rounded-lg">Submit <FontAwesomeIcon className="ml-1" icon={faPaperPlane} /></button>
      </form>
      <div className="absolute top-14 w-2/3 xl:bottom-0 xl:w-1/4 xl:h-12 xl:right-4 alert alert-success shadow-lg hidden transition-all" id="conf-alert">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Your recommendation has been sent for confirmation!</span>
        </div>
      </div>
    </main>
  );
}