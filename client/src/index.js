import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { 
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';
import Recommend from './routes/Recommend';
import Admin from './routes/Admin';
import Movies from './routes/Movies';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AdminList from './routes/AdminList';
import Movie from './routes/Movie';

const root = ReactDOMClient.createRoot(document.getElementById("root"));

/**
 * Provider component makes the Redux store available to nested components, thus allowing us to use the slice.
 * BrowserRouter syncs our UI with our URL. 
 * Routes basically acts like a <Switch> and is a new react-router functionality.
 **/ 
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<Movie />} />
          <Route path="recommend" element={<Recommend />} />
          <Route path="admin" element={<Admin />} />
          <Route path="adminlist" element={<AdminList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
