var express = require('express');
var app = express();
let player
// set the view engine to ejs
app.set('view engine', 'ejs');
let name;
// use res.render to load up an ejs view file
// getting profile for tag
const BrawlStars = require("brawlstars.js")
const token      = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA0YzJhMDE1LTVhMGEtNDY2OC05ZmU0LTg5YzNiYjhmMThlNCIsImlhdCI6MTY1ODM5Mzk4MCwic3ViIjoiZGV2ZWxvcGVyL2M3YjdlNWQ4LTIyMzYtNWZkNi01ODI2LWYxYWViN2YxYmU2OSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTgyLjE4OS4yMDAuNDgiXSwidHlwZSI6ImNsaWVudCJ9XX0.cxaTqsKx2S5PTn2O-I6Z7zqPxp0AFs9zeT-sAr0ZLb4fjqGK3gkM3CgHOuJ5FUevVlthmRNIAJ9krf6SMdaLCQ"
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