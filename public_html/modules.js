let fs = require('fs');

module.exports.doRegister = function(body) {
    let answer = {};
    let nick = body['nick'];
    let pass = body['password'];
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
    return answer;
}


module.exports.doRanking = function(body) {
  let answer = {};
  let group = body["group"];
  let size = body["size"];
  let ranking;
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
    let aux = fs.readFileSync('ranking' + size + '.json');
    ranking = JSON.parse(aux.toString());
    ranking.sort((a, b) => b.victories - a.victories);
    const top10 = ranking.slice(0,9);
    answer.body = "{\"ranking\": "+ JSON.stringify(top10) + "}";
  }
  return answer;
}

module.exports.doInitPlayer = function(body) {
  let nick = body['nick'];
  let size = body['size'];
  let aux = fs.readFileSync('ranking' + size + '.json');
  let ranking = JSON.parse(aux.toString());
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
}

module.exports.doWin = function(body) {
  let nick = body['nick'];
  let size = body['size'];
  let aux = fs.readFileSync('ranking' + size + '.json');
  let ranking = JSON.parse(aux.toString());
  let user = ranking.find(u => u.nick == nick);
  let index = ranking.findIndex(u => u.nick == nick);
  ranking.splice(index,1);
  ranking.push({nick: nick, victories: user.victories+1, games: user.games});
  fs.writeFileSync('ranking' + size + '.json',JSON.stringify(ranking));
}
