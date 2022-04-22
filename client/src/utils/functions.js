/**
 * Returns an array with the length of rating.(If rating is 4, an array with the length of 4 is returned)
 * @param {*} rating - Expects the rating of a movie in number type. Attempts conversion to number type if not a number. 
 * @returns {Array}
 */
export const toRatingArr = (rating) => {
    const ratingArr = [];
    if(typeof rating !== "number") {
        try {
            rating = Number(rating);
        } catch(e) {
            throw e;
        }
    }
    for(let i = 0; i < Math.floor(rating); i++) {
        ratingArr.push(i);
    }
    return ratingArr;
}
