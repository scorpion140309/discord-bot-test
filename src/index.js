//
//require('dotenv').config();

//
const mybot = require('./bot');
const http = require('http');
const myQS = require('querystring');
const discord = require('discord.js');
const options = {
    intents: ["GUILDS", "GUILD_MESSAGES"],
 };
const client = new discord.Client(options);

http.createServer(function(req, res){
 if (req.method == 'POST'){
   var data = "";
   req.on('data', function(chunk){
     data += chunk;
   });
   req.on('end', function(){
     if(!data){
        console.log("No post data");
        res.end();
        return;
     }
     var dataObject = myQS.parse(data);
     console.log("post:" + dataObject.type);
     if(dataObject.type == "wake"){
       console.log("Woke up in post");
       res.end();
       return;
     }
     res.end();
   });
 }
 else if (req.method == 'GET'){
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('Discord Bot is active now\n');
 }
}).listen(3000);

client.on('ready', message =>{
 console.log('Bot is ready.');
 client.user.setPresence({ activity: { name: 'GAME' } });
});

client.on('messageCreate', message =>{
  if (message.author.id == client.user.id){
    return;
  }
  if(message.mentions.has(client.user)){
    mybot.sendReply(message, "Do you call me?");
    return;
  }

  // head of command
  const PREFIX= '$';
  const isCommand= message.content.substring(0,PREFIX.length)=== PREFIX;
  if(isCommand){
    const args= message.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
    case 'help':
      message.channel.send('\`\`\`command list\n$help\n$ping\n$date\n$add (num) (num)\n\`\`\`');
      break;
    case 'ping':
      message.channel.send('pong!');
      break;
    case 'date':
      const date = new Date();
      date.setHours(date.getHours() + 9);
      const currentTime = mybot.formattedDateTime(date);
      message.channel.send(currentTime);
      break;
    case 'add':
  	  const txtAdd = mybot.calcAdd(args);
      message.channel.send(txtAdd);
      break;
    }
  }
});

if(process.env.DISCORD_BOT_TOKEN == undefined){
  console.log('DISCORD_BOT_TOKEN is NOT defined.');
  process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );
