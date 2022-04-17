import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../redux/movies/MoviesSlice";


export default function Recommend() {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [recommendedBy, setRecommendedBy] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {imgUrl: imgUrl, title: title, director: director, shortDesc: description, rating: rating, recommendedBy: recommendedBy};
    dispatch(addMovie(payload));
    setImgUrl("");
    setTitle("");
    setDirector("");
    setDescription("");
    setRating("");
    setRecommendedBy("");
  }

  return (
    <main className="pt-12 mt-12 w-screen h-screen flex justify-center items-center bg-slate-100">
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
            value={imgUrl}
            className="bg-slate-900 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="https://yourexample.com/img.png"
            onChange={e => setImgUrl(e.target.value)} 
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
            value={title} 
            className="bg-slate-900 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Your title" 
            onChange={e => setTitle(e.target.value)} 
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
            value={director}
            className="bg-slate-900 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Your director" 
            onChange={e => setDirector(e.target.value)} 
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
            className="textarea w-full resize-none rounded-lg bg-slate-900 text-white" 
            placeholder="Short description(max. 255 chars allowed)"
            id="description"
            value={description}
            maxLength={255}
            onChange={e => setDescription(e.target.value)} 
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
            value={recommendedBy}
            className="bg-slate-900 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Your name" 
            onChange={e => setRecommendedBy(e.target.value)} 
            required
          />
        </div>
        <label 
            htmlFor="rating-10" 
            className="text-left mb-1 block text-sm font-light text-black"
          >
            Rating
          </label>
        <div className="rating rating-lg rating-half mb-4">
          <input type="radio" value={0} name="rating-10" className="rating-hidden" />
          <input type="radio" value={0.5} name="rating-10" className="mask mask-star-2 mask-half-1" onChange={e => setRating(e.target.value)}/>
          <input type="radio" value={1} name="rating-10" className="mask mask-star-2 mask-half-2" onChange={e => setRating(e.target.value)} checked />
          <input type="radio" value={1.5} name="rating-10" className="mask mask-star-2 mask-half-1" onChange={e => setRating(e.target.value)} />
          <input type="radio" value={2} name="rating-10" className="mask mask-star-2 mask-half-2" onChange={e => setRating(e.target.value)} />
          <input type="radio" value={2.5} name="rating-10" className="mask mask-star-2 mask-half-1" onChange={e => setRating(e.target.value)} />
          <input type="radio" value={3} name="rating-10" className="mask mask-star-2 mask-half-2" onChange={e => setRating(e.target.value)} />
          <input type="radio" value={3.5} name="rating-10" className="mask mask-star-2 mask-half-1" onChange={e => setRating(e.target.value)} />
          <input type="radio" value={4} name="rating-10" className="mask mask-star-2 mask-half-2" onChange={e => setRating(e.target.value)} />
          <input type="radio" value={4.5} name="rating-10" className="mask mask-star-2 mask-half-1" onChange={e => setRating(e.target.value)} />
          <input type="radio" value={5} name="rating-10" className="mask mask-star-2 mask-half-2" onChange={e => setRating(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-active text-white rounded-lg">Submit <FontAwesomeIcon className="ml-1" icon={faPaperPlane} /></button>
      </form>
    </main>
  );
}