const discord = require('discord.js')
module.exports = {

	aliases:["balance", "profile"],
	args:0,
	botInVoiceChannel:false,
	botPermission:85185,
	broken:false,
	bypass:false,
	admin:false,
	category:"utility",
	cooldown:5,
	cooldownType:"USER",
	description:"Check Your Own Balance Or A Users.",
	enabled:true,
	name:"bal",
	needsQueue:false,
	nsfw:false,
	usage:"(user)",
	userInVoiceChannel:false,
	userPermission:0,
	voteLock:false,
	
	async execute(message, args) {

	  if(!args[0]) user = message.author
	  if(args[0]) user = message.client.users.cache.find(u => u.username.toLowerCase() == args[0].toLowerCase()) || message.mentions.users.last() || message.client.users.cache.get(args[0]) || message.author

	  var userDB = await message.client.db.fetch(`user-${user.id}`);
	  if(!userDB) return message.channel.send("This user isn't in the database, or has no coins.")
	  if(!userDB.coins) return message.channel.send("This user isn't in the database, or has no coins.")

	  while (userDB.transactions.length > 10) {
		userDB.transactions.pop()
	  }

	  var embed = new discord.MessageEmbed()
	  embed.setTitle(`${user.tag}'s Balance`)
	  embed.setColor(`RANDOM`)
	  embed.addField("Coin Balance", `${userDB.coins}`, false)
	  embed.addField("Transactions", `${userDB.transactions.length > 1 ? userDB.transactions.map(trans => `\n${trans.id}. ${trans.name}`) : "No Transactions"}`, false)

	  message.channel.send({embed})

	}

};
