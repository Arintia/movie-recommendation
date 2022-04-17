import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

export const MoviesSlice = createSlice({
    name: "movies",
    initialState: {
        items: [
            {
                id: uid(),
                imgUrl: "https://m.media-amazon.com/images/M/MV5BMjI0NmFkYzEtNzU2YS00NTg5LWIwYmMtNmQ1MTU0OGJjOTMxXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_.jpg",
                title: "Fast&Furious 9",
                director: "Justin Lin",
                shortDesc: "F9 (also known as F9: The Fast Saga and internationally as Fast & Furious 9) is a 2021 action film directed by Justin Lin from a screenplay by Daniel Casey and Lin.[9] It is the sequel to The Fate of the Furious (2017), which serves as the ninth main installment, and the tenth full-length film in the Fast & Furious franchise.",
                rating: 3.7,
                recommendedBy: "Yigit Atak",
                createdAt: null
            },
            {
                id: uid(),
                imgUrl: "https://tr.web.img2.acsta.net/pictures/20/01/30/07/38/3417362.png",
                title: "Narcos Mexico",
                director: "Carlo Bernard",
                shortDesc: "Narcos: Mexico is an American crime drama streaming television series created and produced by Chris Brancato, Carlo Bernard, and Doug Miro that premiered on Netflix on November 16, 2018.",
                rating: 4.8,
                recommendedBy: "Yigit Atak",
                createdAt: null
                
            }              
        ]
    },
    reducers: {
        addMovie: (state,action) => {
            const {imgUrl, title, director, shortDesc, rating, recommendedBy } = action.payload;
            state.items.push(
                { 
                    id: uid(),
                    imgUrl: imgUrl, 
                    title: title, 
                    director: director, 
                    shortDesc: shortDesc, 
                    rating: rating, 
                    recommendedBy: recommendedBy, 
                    createdAt: Date.now() 
                }
            );
        }
    }
});

export const { addMovie } = MoviesSlice.actions;
export default MoviesSlice.reducer;