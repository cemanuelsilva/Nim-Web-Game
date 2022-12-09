
let PORT = 8018;

let http = require('http');
let path = require('path');
let url  = require('url');
let fs   = require('fs');
let mod = require('./modules');


const headers = {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        'Access-Control-Request-Headers': 'access-control-allow-origin,content-type'
};

http.createServer(function(request, response) {
  const preq = url.parse(request.url, true);
  const pathname = preq.pathname;
  let answer={};
  let body = '';

  switch(request.method) {
    case 'POST':
    request.on('data', (chunk) => {body += chunk})
    request.on('end', () => {
              try {
                let query = JSON.parse(body);
                answer = createResponse(pathname, query);
                response.writeHead(answer.status, headers);
                response.write(answer.body);
                response.end();
               }
              catch(err) {
                console.log(err);
              }
    })
    request.on('error', (err) => {console.log(err.message); })
      break;
    default:
      answer.status = 404;
      response.writeHead(answer.status, headers);
      response.end()
      break;
  }
}).listen(PORT);



function createResponse(pathname,body) {
  let answer = {};
  answer.body = '';

  switch(pathname) {
    case '/register':
      answer = mod.doRegister(body);
      break;
    case '/ranking':
      answer = mod.doRanking(body);
      break;
    case '/initPlayer':
      mod.doInitPlayer(body);
      break;
    case '/win':
      mod.doWin(body);
      break;
    default:
      answer.status = 404;
      break;
    }
    if(answer.status === undefined)
        answer.status = 200;
    return answer;
}
