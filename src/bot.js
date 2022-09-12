//
exports.sendReply = function (message, text){
message.reply(text)
    .then(console.log("Send Reply: " + text))
    .catch(console.error);
}

//
exports.sendMsg = function (channelId, text, option={}){
client.channels.get(channelId).send(text, option)
    .then(console.log("Send Message: " + text + JSON.stringify(option)))
    .catch(console.error);
}

//
exports.formattedDateTime = function (date) {
    const y = date.getFullYear();
    const m = ('0' + (date.getMonth() + 1)).slice(-2);
    const d = ('0' + date.getDate()).slice(-2);
    const h = ('0' + date.getHours()).slice(-2);
    const mi = ('0' + date.getMinutes()).slice(-2);
    const s = ('0' + date.getSeconds()).slice(-2);

    return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s;
}

//
exports.calcAdd = function (args) {
    if (args.length > 2) {
    const val0 = Number(args[1])
    const val1 = Number(args[2])
    const valAns = val0 + val1
    const txtAdd = args[1] + ' + ' + args[2] + ' = ' + valAns
    return txtAdd;
    }
}
