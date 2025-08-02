// https://core.telegram.org/bots/api
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { sharedData } from './index.js';
import db from './index.js';
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
bot.onText(/\/sendpdf/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userName = msg.from.username;
    // const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // Replace with your PDF URL
    // const pdfUrl = 'uploads\\2cd8a544ce05cf1b9bc6d178a234e098';
    // const pdfData = sharedData.buffer; // Buffer of the PDF file
    console.log("received data--->", sharedData);
    // const resp = match[1];

    try {
        const result = await db.query(`SELECT * FROM telegramusers WHERE "userName" = $1`, [userName]);
        if (result.rows.length > 0) {
            result.rows.forEach((row) => {
                const pdfData = row.pdf; // Buffer of the PDF file
                // console.log("Result from db", result);


                if (!Buffer.isBuffer(pdfData)) {
                    console.log("pdfData is not a buffer. Converting...");
                    pdfData = Buffer.from(pdfData, 'binary');
                }



                bot.sendDocument(chatId, pdfData, {
                    caption: 'Here is your AI-generated Resume!',

                }, {
                    filename: row.fileName,
                    contentType: 'application/pdf',
                }).catch((error) => {
                    console.error('Error sending document:', error);
                    bot.sendMessage(chatId, 'Sorry, there was an error sending the PDF.');
                });
            })
        }
        else {
            bot.sendMessage(chatId, 'Sorry, no records found!');
        }
    }
    catch (error) {
        console.log("Error in sending document", error);
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
