const express = require ('express');
const cors = require ('cors');
const knex = require('knex')

const app = express ();
app.use(express.json());
app.use(cors());

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'movies.db'
    },
    useNullAsDefault: true
})

/*app.get('/movies', (req, res) => {
    res.json(movies);
    //operacion para ver toda la info de pelis que hay en una base de datos
});*/

app.get('/movies/:movieId', async (req,res) => {
    const movie =await db ('movies').select('*').where({ id:req.params.movieId}).first();
    res.json(movie);
});
app.get('/movies', async (req, res) => {
    const movies=await db ('movies').select('*');
    res.json(movies);
})

/*app.get('/movies/:title', (req, res) => {
        // buscar la pelicula y devolverla en formato JSON (peli concreta)
});*/

app.post('/movies', async (req, res) => {
    //registra info en la base de datos
    await db('movies').insert({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year
    });
    res.status(201).json({});
});

app.put('/movies/:movieId', async (req, res) => {
    /* para modificar los datos de una peli*/
    await db('movies').update({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year
    }) .where ({id: req.params.movieId});
    res.status(200).json({});
});

app.delete('/movies/:title', (req, res) => {
    // para modificar los datos de una peli
});


app.listen(8080, () => {
    console.log('El backend ha iniciado en el puerto 8080');
});







/*const movies = [
    {
        'title': 'Batman',
        'description': 'Batman description',
        'year': 2005
    },
    {
        'title': 'Superman',
        'description': 'Superman description',
        'year': 1982
    },
    {
        'title': 'Spiderman',
        'description': 'Spiderman',
        'year': 1980
    },
] ;*/