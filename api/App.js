const express = require("express");

const app = express();
const port = 3001;

app.get("/", (req, res) => {
    res.redirect("/movies");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});