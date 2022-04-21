export const toRatingArr = (rating) => {
    const ratingArr = [];
    for(let i = 0; i < Math.floor(Number(rating)); i++) {
        ratingArr.push(i);
    }
    return ratingArr;
}