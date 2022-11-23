const http = require('http')

const server = http.createServer((req,res)=>{

    if(req.url === '/'){
        res.write('Welcome to my Node Js project')
    }
   
    if(req.url === '/home'){
        res.write('Welcome home')
    }
    else if(req.url === '/About'){
        res.write('Welcome to About Us page')
    }
    else if(req.url === '/node'){
        res.write('Welcome to my Node Js project')
    }

    res.end()
})

server.listen(3000)