import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {uid} from "uid";
import axios from "axios";

export const getMoviesAsync = createAsyncThunk('movies/getMoviesAsync', async () => {
    const res = await axios(`http://localhost:3001/movies`);
    return res.data;
});

export const getAdminMoviesAsync = createAsyncThunk('movies/getAdminMoviesAsync', async () => {
    const res = await axios(`http://localhost:3001/adminlist`);
    return res.data;
});

export const confirmMovieAsync = createAsyncThunk('movies/confirmMovieAsync', async (id) => {
    const res = await axios.post(`http://localhost:3001/movies/${id}`);
    return res.data;
});

export const deleteMovieAsync = createAsyncThunk('movies/deleteMovieAsync', async (id) => {
    const res = await axios.delete(`http://localhost:3001/movies/${id}`);
    return res.data;
});

export const addAdminMovieAsync = createAsyncThunk('movies/addAdminMovieAsync', async (data) => {
    const res = await axios.post(`http://localhost:3001/adminlist`, data);
    return res.data;
});

export const removeAdminMovieAsync = createAsyncThunk('movies/removeAdminMovieAsync', async (id) => {
    const res = await axios.delete(`http://localhost:3001/adminlist/${id}`);
    return res.data;
});


export const MoviesSlice = createSlice({
    name: "movies",
    initialState: {
        items: [
                     
        ],
        adminAccounts: [
            {
                id: uid(),
                userName: "test",
                password: "12345"
            }
        ],
        adminItems: [

        ],
        addedItem: false,
        isLoggedIn: false,
        error: null
    },
    reducers: {
        handleLogin: (state, action) => {
            state.isLoggedIn = !state.isLoggedIn;
        }
    },
    extraReducers: {
        [confirmMovieAsync.fulfilled]: (state, action) => {
            const newMovie = action.payload;
            console.log(newMovie);
            state.items.push(newMovie);
            state.adminItems = state.adminItems.filter(movie => newMovie.id !== movie.id);
        },
        [confirmMovieAsync.rejected]: (state, action) => {
            state.error = action.error.message;
        },
        [deleteMovieAsync.fulfilled]: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(movie => id !== movie.id);
        },
        [addAdminMovieAsync.fulfilled]: (state, action) => {
            state.adminItems.push(action.payload);
        },
        [addAdminMovieAsync.rejected]: (state, action) => {
            state.error = action.error.message;
        },
        [removeAdminMovieAsync.fulfilled]: (state, action) => {
            const id  = action.payload;
            state.adminItems = state.adminItems.filter(movie => id !== movie.id);
        },
        [getMoviesAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
        },
        [getAdminMoviesAsync.fulfilled]: (state, action) => {
            state.adminItems = action.payload;
        }
    }
});

export const { handleLogin } = MoviesSlice.actions;
export default MoviesSlice.reducer;