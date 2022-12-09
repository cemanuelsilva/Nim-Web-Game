
let PORT = 8018;

let http = require('http');
let path = require('path');
let url  = require('url');
let fs   = require('fs');


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
  let nick;
  let pass;
  let size;
  let aux;
  let ranking;
  let user;
  let index;
  let group;


  switch(pathname) {
    case '/register':
      nick = body['nick'];
      pass = body['password'];
      if(nick === "" || pass === "") {
        answer.status = 400;
        answer.body = "{ error: invalid user/password }";
      } else {
          let aux = fs.readFileSync('registos.json');
          let database = JSON.parse(aux.toString());
          //console.log(database);
          let user = database.find(u => u.nick == nick);
          if(user == null) {
            database.push({nick: nick, pass: pass});
            answer.body = "{}";
            fs.writeFileSync('registos.json', JSON.stringify(database));
          } else if(user.pass !== pass){
            answer.body = "{ error: User registered with a different password }";
            answer.status = 401;
          } else {
            answer.body="{}"
          }
      }
      break;
    case '/ranking':
      group = body["group"];
      size = body["size"];
      if(group == null) {
        answer.status = 400;
        answer.body = "{ error: Undefined group }"
      } else if(size == null) {
        answer.status = 400;
        answer.body = "{ error: Undefined size }"
      } else if(!Number.isInteger(size) || size <= 0) {
        answer.status = 400;
        answer.body = "{ error: Invalid size \'"+ size + "\' }";
      } else if(!Number.isInteger(group) || group <= 0) {
        answer.status = 400;
        answer.body = "{ error: Invalid group \'"+ group + "\' }";
      } else {
        aux = fs.readFileSync('ranking' + size + '.json');
        ranking = JSON.parse(aux.toString());
        ranking.sort((a, b) => b.victories - a.victories);
        const top10 = ranking.slice(0,9);
        answer.body = "{\"ranking\": "+ JSON.stringify(top10) + "}";
      }
      break;
    case '/initPlayer':
      nick = body['nick'];
      size = body['size'];
      aux = fs.readFileSync('ranking' + size + '.json');
      ranking = JSON.parse(aux.toString());
      user = ranking.find(u => u.nick == nick);
      if(user == null) {
        ranking.push({nick: nick, victories: 0, games: 1});
        fs.writeFileSync('ranking' + size + '.json',JSON.stringify(ranking));
      } else {
        index = ranking.findIndex(u => u.nick == nick);
        ranking.splice(index,1);
        ranking.push({nick: nick, victories: user.victories, games: user.games+1});
        fs.writeFileSync('ranking' + size + '.json',JSON.stringify(ranking));
      }
      break;
    case '/win':
      nick = body['nick'];
      size = body['size'];
      aux = fs.readFileSync('ranking' + size + '.json');
      ranking = JSON.parse(aux.toString());
      user = ranking.find(u => u.nick == nick);
      index = ranking.findIndex(u => u.nick == nick);
      ranking.splice(index,1);
      ranking.push({nick: nick, victories: user.victories+1, games: user.games});
      fs.writeFileSync('ranking' + size + '.json',JSON.stringify(ranking));
      break;
    default:
      answer.status = 404;
      break;
    }
    if(answer.status === undefined)
        answer.status = 200;
    return answer;
}
