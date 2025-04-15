// https://core.telegram.org/bots/api
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

//sending docuemnts
bot.onText(/\/sendpdf/, (msg) => {
    const chatId = msg.chat.id;
    const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // Replace with your PDF URL

    bot.sendDocument(chatId, pdfUrl, {
        caption: 'Here is your PDF file!',
    }).catch((error) => {
        console.error('Error sending document:', error);
        bot.sendMessage(chatId, 'Sorry, there was an error sending the PDF.');
    });
});


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Hello,Kenshin Commander reporting! Have a pathetic day baby!');
});
