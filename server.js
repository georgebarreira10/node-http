const http = require('http')
const hostname = '192.168.3.54'
const port = 5000

http.createServer((req, res) => {
    console.log(req.url)
    
    if (req.url==='/') {
        res.end('Home')


    }
    //solicitando a resposta 'res'
    //res.end('Que lindo, GEORGE!')

}).listen(port, hostname, () => 
console.log(`Servidor rodando...http://${hostname}:${port}`))