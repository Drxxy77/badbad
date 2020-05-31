const discord = require('discord.js')
module.exports = {

	aliases:[],
	args:2,
	botInVoiceChannel:false,
	botPermission:85185,
	broken:false,
	bypass:false,
	admin:true,
	category:"administrator",
	cooldown:5,
	cooldownType:"USER",
	description:"Sets The Balance Of A User.",
	enabled:true,
	name:"setbal",
	needsQueue:false,
	nsfw:false,
	usage:"<user> <coins>",
	userInVoiceChannel:false,
	userPermission:0,
	voteLock:false,
	
	async execute(message, args) {

	  user = message.client.users.cache.find(u => u.username.toLowerCase() == args[0].toLowerCase()) || message.mentions.users.last() || message.client.users.cache.get(args[0]) || message.author

	  if(!user) return message.channel.send("Couldn't Find User Specified.")

	  if(user.id == message.author.id) var userDB = message.author.database
	  if(user.id !== message.author.id) var userDB = await message.client.db.fetch(`user-${user.id}`) ;
	  if(!userDB) return message.channel.send("This user isn't in the database, or has no coins.")
	  	if(isNaN(args[1])) return message.channel.send("Number Of Coins Must Be A Number!")
    	if(args[1].includes(".")) return message.channel.send("Only Buy In Full Numbers (No Decimals)")
    	if(parseInt(args[1]) < 0) return message.channel.send("Number Must Be Higher Then 0.")

	 	userDB.totalTransactions += 1
    	userDB.transactions.unshift({"id":userDB.totalTransactions,"name":`[ADMIN]: ${message.author.tag} set your coins to ${args[1]}.`})

    	userDB.coins = parseInt(args[1])

    	message.client.db.set(`user-${user.id}`, userDB);

	 

	}

};
