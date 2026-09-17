const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

const movies = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        genre: "Prison, Drama",
        year: 1994
    },
    {
        id: 2,
        title: "The Godfather",
        genre: "Crime, Gangster",
        year: 1972
    },
    {
        id: 3,
        title: "The Dark Knight",
        genre: "Crime Thriller, Neo-Noir",
        year: 2008
    },
    {
        id: 4,
        title: "Pulp Fiction",
        genre: "Crime, Thriller",
        year: 1994
    },
    {
        id: 5,
        title: "Forrest Gump",
        genre: "Drama, Romance",
        year: 1994
    }
];


app.get("/api/movies", (req, res) => {
    res.json(movies);
});


app.get("/api/movies/:id", (req, res) => {

    const id = Number(req.params.id);

    const movie = movies.find(movie => movie.id === id);

    if (!movie) {
        return res.status(404).json({
            message: "Movie not found"
        });
    }

    res.json(movie);
});


app.post("/api/movies", (req, res) => {

    const { title, genre, year } = req.body;

    if (!title || !genre || !year) {
        return res.status(400).json({
            message: "Title, genre, and year are required."
        });
    }

    const newMovie = {
        id: movies.length + 1,
        title: title,
        genre: genre,
        year: Number(year)
    };

    movies.push(newMovie);

    res.status(201).json(newMovie);
});


app.use(express.static(__dirname));


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
