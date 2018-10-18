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

    bot.postMessageToChannel('general', 'Get ready to get FISTED',params);
});

//error handler
bot.on('error', (err) => console.log(err));

//message handler
bot.on('message', (data) => {
    if(data.type != 'message'){
        return; 
    }
    else{
        handleMessage(data.text);
    }
});

//response to data
function handleMessage(message){
    if(message.includes(' advice')){
        advice(); 
    }
    else if(message.includes(' yo momma')){
        yoMamaJoke(); 
    }
    else if(message.includes(' ?')){
        yesNo(); 
    }
    else{
        return; 
    }
}

//give advice
function advice(){
    axios.get('http://api.adviceslip.com/advice').then(res => {
        const ad = res.data.slip.advice;
        const params = {
            icon_emoji: ':dan:'
        };
        // console.log(ad);
        bot.postMessageToChannel('general', `hey dumbfuck, ${ad}`, params);
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
//give yes no response
function yesNo(){
    axios.get('https://yesno.wtf/api/').then(res => {
        const y = res.data.answer
        const params = {
            icon_emoji: ':dan:'
        };
        console.log(y);
        // bot.postMessageToChannel('general', y, params);
    });
}