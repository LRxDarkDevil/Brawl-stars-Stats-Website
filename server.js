var express = require('express');
var app = express();
let player
// set the view engine to ejs
app.set('view engine', 'ejs');
let name;
// use res.render to load up an ejs view file
// getting profile for tag
const BrawlStars = require("brawlstars.js")
const token      = "YOUR API KEY HERE" // https://developer.brawlstars.com/#/account
const client     = new BrawlStars.Client(token)


// index page
 app.get('/', function(req, res) {
  res.render('pages/index');
});
//player page 
app.get('/player', function(req, res) {
  if(req.query.tag){

    ;(async() => {
   player  = await client.getPlayer(req.query.tag)
   for(let i = 0;i<player.brawlers.length;i++){
     name = player.brawlers[i].name
    name = name.toLowerCase()
    name = name.charAt(0).toUpperCase() + name.slice(1);
    if(name.startsWith("Mr")){
      name = "Mr.P"
    }
    if(name.startsWith("8")){
      name = "8-Bit"
    }
    if(name.startsWith("El")){
      name = "El-Primo"
    }
    if(name.startsWith("Colonel")){
      name = "Colonel-Ruffs"
    }
    player.brawlers[i].name = name;
   }
   res.render('pages/player',{player: player});
   console.log(player)
})()
}
});


app.listen(8080);
console.log('Server is listening on port 8080');
