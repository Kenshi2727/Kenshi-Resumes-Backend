// https://core.telegram.org/bots/api
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { sharedData } from './index.js';
dotenv.config();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
bot.onText(/\greet/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, "Hello, I am your bot! How can I assist you today?\nAnswered to:" + resp);
});

//sending docuemnts
bot.onText(/\/sendpdf (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    // const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // Replace with your PDF URL
    // const pdfUrl = 'uploads\\2cd8a544ce05cf1b9bc6d178a234e098';
    const pdfUrl = sharedData.path;
    console.log("received data--->", sharedData);
    const resp = match[1];
    if (resp === sharedData.id) {

        bot.sendDocument(chatId, pdfUrl, {
            caption: 'Here is your AI-generated Resume!',

        }, {
            filename: sharedData.fileName,
            contentType: 'application/pdf',
        }).catch((error) => {
            console.error('Error sending document:', error);
            bot.sendMessage(chatId, 'Sorry, there was an error sending the PDF.');
        });
    }
    else {
        bot.sendMessage(chatId, 'Sorry, you are not authorized to access this document.');
    }
});


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log("Response from user", msg);

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Hello,Kenshin Commander reporting! Have a pathetic day baby!');
});
