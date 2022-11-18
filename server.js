const express = require('express')

const app = express()

const db = require('./config/dbConnect')
const livros = require("./models/Livro")

db.once('open', () => {

    console.log('Conexao realizada com sucesso!')

})


const hostname = '192.168.3.54'
const port = 5000

const books = [

    { _id: 1, title: 'O Dia do Coringa', autor: 'Jostein', favorito: true },
    { _id: 2, title: 'O mundo de Sofia', autor: 'Jostein', favorito: true },
    { _id: 3, title: 'A Casa', autor: 'Raquel de Queiroz', favorito: false },

]

app.use(

    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//URI
app.get('/', (req, res) => {

    res.json({ nome: 'George' })

})

app.get('/', (req, res) => {

    res.sendFile(`${__dirname}/index.html`)
})

//filter i.favorito = true / !i.favorito = false
app.get('/books', (req, res) => {

    livros.find((err, livrosDoBanco) => {

        if (err) res.status(400);

        res.status(200).json(livrosDoBanco);

        //res.send(books) manda todos os livros sem filtro
        //res.send(books.filter(i => i.favorito))
    })
})

app.post('/books', (req, res) => {

    //array de objeto. o body contém a lista que é enviada
    const body = req.body

    console.log('body', body)

    //percorrer a lista (sacola)
    body.map(obj => books.push(obj))

    //push para arrays
    //books.push(req.body)

    res.send(req.body)

})

app.get('/books/:id', (req, res) => {

    //console.log(req.params.id)

    const book = books.find(
        (book) => book._id === req.params.id
    )

    if (book)
        res.send(book)
    else
        res.sendStatus(404)
})

app.delete('/books/:id', (req, res) => {

    //'obj._id' é inteiro e '== id' é string relacionado ao req.params.id 
    //outraforma: '=== parseInt(id)'. dar preferencia para === estritamente igual

    let id = req.params.id
    let index = books.findIndex(obj => obj._id === parseInt(id))

    console.log('index', index)

    books.splice(index, 1)

    res.status(200).json(books)


})

app.patch('/books/:id', (req, res) => {

    let id = parseInt(req.params.id)

    //buscar livro. checar se ele existe.
    let book = books.find(obj => obj._id === id)
    console.log('book:', book)

    //mudança do title do livro
    let body = req.body
    console.log('body:', body)

    book.title = body.title
    book.autor = body.autor
    res.send(books)

})

app.listen(
    port,
    hostname,
    () =>
        console.log(`http://${hostname}:${port}`)
)