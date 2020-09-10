const fs = require('fs')
const http = require('http')
const url = require('url')

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
const laptopData = JSON.parse(json)

const server = http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname
    const id = url.parse(req.url, true).query.id

    console.log(url.parse(req.url, true))
    
    if(pathName === '/products' || pathName === '/') {
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end('This is the PRODUCTS page!')
    } else if (pathName === '/laptop' && id > laptopData.length) {
        res.writeHead(200, {'Content-type': 'text/html'})

        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptop[id]
            let output = data.replace(/{%PRODUCTNAME%}/g, laptop.productName)
            output = data.replace(/{%IMAGE%}/g, laptop.image)
            output = data.replace(/{%PRICE%}/g, laptop.price)
            output = data.replace(/{%SCREEN%}/g, laptop.screen)
            output = data.replace(/{%CPU%}/g, laptop.cpu)
            output = data.replace(/{%STORAGE%}/g, laptop.storage)
            output = data.replace(/{%RAM%}/g, laptop.ram)
            output = data.replace(/{%DESCRIPTION%}/g, laptop.description)
            res.end(output)
        })
    } else {
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end('URL was not found on the server!')
    }
})

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening for for requests')
})
