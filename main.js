var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');


function templateHTML(title, list, body) {
    return `
        <!doctype html>
        <html>
            <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="index.html">WEB</a></h1>
                ${list}
                <a href="/create">create</a>
                ${body}
            </body>
        </html>
    `
}

function templateList(filelist) {
    var list = `<ul>`
    for(var i = 0; i < filelist.length; i++) {
        list += `<li><a href="/?id=`+filelist[i]+`">`+filelist[i]+`</a></li>`
    }
    return list + `</ul>`
}

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
                var list = templateList(filelist);
                var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                response.writeHead(200);
                response.end(template);    
            });
        } else {
            fs.readdir('./data', (err, filelist) => {
                fs.readFile(`data/${title}`, 'utf-8', (err, description) => {
                    description = description;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                    response.writeHead(200);
                    response.end(template);
                })
            })
        }
    } else if (pathname === '/create') {
        fs.readdir('./data', (err, filelist) => {
            title = "Web - create";
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
                <form action="http://localhost:3000/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                    <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                    <input type="submit">
                    </p>
                </form>
            `);
            response.writeHead(200);
            response.end(template);    
        });
    } else if (pathname === '/create_process') {
        let body = ''; // data를 담을 body
        request.on('data', data => { //post로 받은 데이터는 request 안에 있을 것임. data를 받을 떄 이 콜백함수를 실행하겠다는 뜻 
          body = body + data; // data를 받는대로 body에 누적함
        });
        request.on('end', () => { // data전송이 끝나면 이 콜백함수를 실행하겠다는 뜻
            const post = qs.parse(body); // 받아둔 body를 parse해서 post에 넣음
            const title = post.title;
            const description = post.description
            fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end("success");           
            });
        });
    } else {
        response.writeHead(404);
        response.end("not found");
    }
});
app.listen(3000);