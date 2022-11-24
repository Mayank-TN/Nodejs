const fs = require('fs')
const http = require('http')

const server = http.createServer((req, res) => {

    const url = req.url
    const method = req.method
    if (url === '/') {
        const data = fs.readFileSync('message.txt' , 'utf-8')
        res.write('<html>')
        res.write('<head><title>Enter Mesage</title><head>')
        res.write('<body>'+ data +'<form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>')
        res.write('<html>')
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk)
        })
        return req.on('end', () => {
            const parserBody = Buffer.concat(body).toString();
            const message = parserBody.split('=')[1]
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end();
            })
        })
    }
        // res.write('<head><title>Enter Mesage</title><head>')
        // res.write('<body>'+data+'<form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>')
        // res.write('<html>')
        res.end()
})

server.listen(3000)