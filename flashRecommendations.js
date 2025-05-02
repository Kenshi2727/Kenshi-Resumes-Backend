import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import { dataForAts } from "./sharedData.js";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
let recommendations = '';
async function main() {
    // const pdfResp = await fetch('https://discovery.ucl.ac.uk/id/eprint/10089234/1/343019_3_art_0_py4t4l_convrt.pdf')
    const pdfResp = dataForAts.buffer;
    if (pdfResp === null) {
        console.error("Buffer is null for recommendations. Buffer not intialized yet.");
        return;
    }
    else {
        const contents = [
            {
                text: "Give recommendations to improve this resumme's ATS Scores."
            },
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: Buffer.from(pdfResp).toString("base64")
                }
            }
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents
        });
        console.log(response.text);
        recommendations = response.text;
    }
}

// main();
export default main;
export { recommendations };