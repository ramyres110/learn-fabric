const fabric = require('fabric').fabric;
const http = require('http');
const url = require('url');
const PORT = 9091;

const server = http.createServer((request, response) => {

    let params = url.parse(request.url, true);

    let canvas = fabric.createCanvasForNode(200, 200);

    response.writeHead(200, { 'Content-Type': 'image/png' });
    canvas.loadFromJSON(params.query.data, function () {
        canvas.renderAll();
        let stream = canvas.createPNGStream();
        stream.on('data', function (chunk) {
            response.write(chunk);
        });
        stream.on('end', function () {
            response.end();
        });
    });
})

server.listen(PORT, () => {
    console.log('Server listening on', PORT);
});
