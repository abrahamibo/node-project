let http = require('http');
let url = require('url');
var parseFormdata = require('parse-formdata')


let querystring = require('querystring');
let EventEmitter = require('events').EventEmitter;

let jeu = new EventEmitter();

jeu.on('gamestart', function(message){
    console.log(message);
});
let server = http.createServer((req, res) => {
    let page = url.parse(req.url).pathname;
    let params = querystring.parse(url.parse(req.url).query);

    console.log(page);
    console.log(params);
    res.writeHead(200, {"Content-Type": "text/plain"});
    switch (page) {
        case '/':
            res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
            break;
        case '/sous-sol':
            res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
            break;
        case '/game2':
            parseFormdata(req, function (err, data) {
                if (err) {
                    console.log(err);
                    // console.log("err");
                    // throw err
                }
                console.log('fields:', data)
                // data.parts.forEach(function (part) {
                //     console.log('part:', part)
                // })
                // res.end('Be kind to each other')
            })
            break;
        case '/game':
            let queryData;
            let data = []
            req.on('data', chunk => {
                data.push(chunk)
            })
            req.on('end', () => {

                const result = Buffer.concat(data).toString();
                console.log(result);
                // console.log(JSON.parse(data)); // 'Buy the milk'
            })


            // jeu.emit('gamestart', data);
            break;

    }
    res.end();
});




server.listen(3001,() =>{
    console.log('start')
});