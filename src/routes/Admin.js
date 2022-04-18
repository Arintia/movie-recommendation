import { faPaperPlane, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../redux/movies/MoviesSlice";

export default function Recommend() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const adminAccounts = useSelector(state => state.movies.adminAccounts);
  const username = useRef("");
  const password = useRef("");
  const errorText = useRef();
  const [isFailedLogin, setIsFailedLogin] = useState(false);

  useEffect(() => {
    errorText.current = document.getElementById("error-text");
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username.current || !password.current) return;
    if(adminAccounts.find(account => account.userName === username.current && account.password === password.current)) {
      await dispatch(handleLogin());
      navigate("/adminlist");
    } else {
      setIsFailedLogin(true);
      errorText.current.classList.remove("hidden");
    }
  }

  return (
    <main className="pt-12 w-screen h-screen flex justify-center items-center bg-slate-100">
      <form className="text-center lg:w-1/4 sm:w-1/2 bg-white rounded-xl p-9" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-left mb-6">Login</h2>
        <label htmlFor="username" className="text-left block mb-2 text-sm font-medium text-slate-900">Username</label>
        <div className="relative mb-6">
          <div className={
              isFailedLogin
              ?
              "flex text-red-900 absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              :
              "flex text-white absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            }
          >
            <FontAwesomeIcon className="ml-1" icon={faUser} />
          </div>
          <input 
            type="text" 
            id="username" 
            className={
              isFailedLogin
              ?
              "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5"
              :
              "bg-slate-900 border border-slate-800 text-white text-sm rounded-lg focus:ring-slate-700 focus:border-slate-700 block w-full pl-10 p-2.5" 
            }
            placeholder="Username"
            onChange={(e) => username.current = e.target.value}
            required 
          />
        </div>
        <label htmlFor="password" className="text-left block mb-2 text-sm font-medium text-slate-900">Password</label>
        <div className="relative mb-2">
          <div className={
              isFailedLogin
              ?
              "flex text-red-900 absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              :
              "flex text-white absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            }
          >
            <FontAwesomeIcon className="ml-1" icon={faKey} />
          </div>
          <input 
            type="password" 
            id="password" 
            className={
              isFailedLogin
              ?
              "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5"
              :
              "bg-slate-900 border border-slate-800 text-white text-sm rounded-lg focus:ring-slate-700 focus:border-slate-700 block w-full pl-10 p-2.5" 
            }
            placeholder="Password"
            onChange={(e) => password.current = e.target.value} 
            required
          />
        </div>
        <p id="error-text" class="text-left text-sm text-red-600 mb-6 hidden">You entered an incorrect username or password.</p>
        <button type="submit" className="btn btn-active text-white rounded-lg">Login <FontAwesomeIcon className="ml-1" icon={faPaperPlane} /></button>
      </form>
    </main>
  );
}