const http = require('http')

const server = http.createServer((req, res) => {
    res.end('Your server is live now')

})

server.listen(1000, () => {
    console.log('Now Your server is live now this time')
})