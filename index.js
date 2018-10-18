const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-451498921287-458404358289-6aQ3xRamCm9PK1ef45k3Uzaq',
    name: 'DAN'
});

//start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':dan:'
    };

    console.log('Dan bot is ready');
});

//error handler
bot.on('error', (err) => console.log(err));

//message handler
bot.on('message', (data) => {
    if(data.type != 'message'){
        return; 
    }
    else{
        // console.log(data);
        handleMessage(data.text, data.user, data.channel);
    }
});

//response to data
function handleMessage(message, user, channel){
    if(message.toLowerCase().includes(' advice')){
        advice(user, channel); 
    }
    else if(message.toLowerCase().includes(' yo momma')){
        yoMamaJoke(); 
    }
    else{
        return; 
    }
}

//give advice
function advice(user, channel){
    axios.get('http://api.adviceslip.com/advice').then(res => {
        const ad = res.data.slip.advice;
        const params = {
            icon_emoji: ':dan:'
        };
        // ch = bot.getChannel(channel); 
        bot.postMessageToChannel('general', `hey <@${user}>, ${ad}`, params);
    });
}

//Tell a yo mama joke
function yoMamaJoke() {
    axios.get('http://api.yomomma.info').then(res => {
        const joke = res.data.joke; 
        const params = {
            icon_emoji: ':dan:'
        };
        // console.log(ad);
        bot.postMessageToChannel('general', joke, params);
    });
}