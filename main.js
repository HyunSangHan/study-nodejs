var http = require('http');
var fs = require('fs');
var url = require('url');
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/' || pathname === '/index.html') {
        var title = queryData.id;
        var description = "";
        if(title === undefined){
            fs.readdir('./data', (err, filelist) => {
                title = "Welcome";
                description = "Welcome to my homepage"
                list = `<ul>`
                for(var i = 0; i < filelist.length; i++) {
                    list += `<li><a href="/?id=`+filelist[i]+`">`+filelist[i]+`</a></li>`
                }
                list += `</ul>`
                var template = `
                <!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="index.html">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                <p>${description}
                </p>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);    
            });
        } else {
            fs.readdir('./data', (err, filelist) => {
                fs.readFile(`data/${title}`, 'utf-8', (err, description) => {
                    console.log(description);
                    description = description;
                    list = `<ul>`
                    for(var i = 0; i < filelist.length; i++) {
                        list += `<li><a href="/?id=`+filelist[i]+`">`+filelist[i]+`</a></li>`
                    }
                    list += `</ul>`
                    var template = `
                    <!doctype html>
                    <html>
                    <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                    </head>
                    <body>
                    <h1><a href="index.html">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <p>${description}
                    </p>
                    </body>
                    </html>
                    `;
                    response.writeHead(200);
                    response.end(template);
                })
            })
        }
    } else {
        response.writeHead(404);
        response.end("not found");
    }
});
app.listen(3000);