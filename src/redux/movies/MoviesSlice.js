import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

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
        isLoggedIn: false
    },
    reducers: {
        addMovie: (state,action) => {
            const {imgUrl, title, director, shortDesc, rating, recommendedBy } = action.payload;
            if(!state.items.find(movie => movie.title.toUpperCase() === title.toUpperCase())) {
                if(!state.adminItems.find(movie => movie.title.toUpperCase() === title.toUpperCase())) {
                    state.adminItems.push(
                        { 
                            id: uid(),
                            imgUrl: imgUrl, 
                            title: title, 
                            director: director, 
                            shortDesc: shortDesc, 
                            rating: rating, 
                            recommendedBy: recommendedBy, 
                        }
                    );
                    state.addedItem = true;
                } else {
                    state.addedItem = false;
                }
            } else {
                state.addedItem = false;
            }
        },
        handleLogin: (state, action) => {
            state.isLoggedIn = !state.isLoggedIn;
        },
        confirmMovie: (state, action) => {
            const {id, imgUrl, title, director, description, rating, recommendedBy} = action.payload;
            state.adminItems = state.adminItems.filter(movie => movie.id !== id);
            state.items.push({
                id: id,
                imgUrl: imgUrl, 
                title: title, 
                director: director, 
                shortDesc: description, 
                rating: rating, 
                recommendedBy: recommendedBy,
            });
        },
        removeMovie: (state, action) => {
            const id = action.payload;
            state.adminItems = state.adminItems.filter(movie => movie.id !== id);
        }
    }
});

export const { addMovie, handleLogin, confirmMovie, removeMovie } = MoviesSlice.actions;
export default MoviesSlice.reducer;