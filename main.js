var http = require('http');
var fs = require('fs');
var url = require('url');
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/' || pathname === '/index.html') {
        var title = queryData.id;
        fs.readFile(`data/${title}`, 'utf-8', (err, description) => {
            if(title === undefined){
                title = "Welcome";
                description = "Welcome to my homepage"
            }

            var template = `
            <!doctype html>
            <html>
            <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
            </head>
            <body>
            <h1><a href="index.html">WEB</a></h1>
            <ol>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JAVASCRIPT">JAVASCRIPT</a></li>
            </ol>
            <h2>${title}</h2>
            <p>${description}
            </p>
            </body>
            </html>
        `;
        response.writeHead(200);
        response.end(template);
        })
    } else {
        response.writeHead(404);
        response.end("not found");
    }
});
app.listen(3000);