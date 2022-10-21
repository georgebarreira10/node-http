const express = require('express')

const app = express()
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

app.get('/html', (req, res) => {

    res.sendFile(`${__dirname}/index.html`)
})

//filter i.favorito = true / !i.favorito = false
app.get('/books', (req, res) => {

    //res.send(books) manda todos os livros sem filtro
    res.send(books.filter(i => i.favorito))
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
let id = req.params.id
let index = books.findIndex(obj => obj._id === id)

books.splice(index, 1)

res.send(books)


})

app.listen(
    port,
    hostname,
    () =>
        console.log(`http://${hostname}:${port}`)
)