/* Event */
module.exports = {
    name: "Durum Ayarlama",
    eventName: "ready",
    execute() {
        const activities = ["DoraTech 💖"]
        setInterval(() => client.user.setPresence({ 
                activities: [{ name: activities[Math.floor(Math.random() * activities.length)], type: require('discord.js').ActivityType.Watching }],
                status: 'online' 
            }
        ), 5000);
    }
}