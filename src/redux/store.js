import { configureStore } from '@reduxjs/toolkit';
import MoviesSlice from './movies/MoviesSlice';

export const store = configureStore({
    reducer: {
        movies: MoviesSlice
    }
});