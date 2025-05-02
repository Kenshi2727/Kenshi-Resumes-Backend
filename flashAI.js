import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
import { dataForAts, setScore } from "./sharedData.js";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function main() {
    // const pdfResp = await fetch('https://discovery.ucl.ac.uk/id/eprint/10089234/1/343019_3_art_0_py4t4l_convrt.pdf')
    const pdfResp = dataForAts.buffer;
    if (pdfResp === null) {
        console.error("Buffer is null. Buffer not intialized yet.");
        return;
    }
    else {
        const contents = [
            {
                text: `Give ats score for the resume returning a json(not markdown) as follows and do not say anything else.
                {
                "ats_score": ats score in percentage
                }` },
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
        // console.log(response.text);
        // /g flag: Tells JavaScript to replace all matches of either ```json or ``` in the string, not just the first one.
        // '|' ----> OR operator in regex, so it will match either ```json or ```.
        let cleaned = response.text.replace(/```json|```/g, '').trim();
        console.log(JSON.parse(cleaned));
        const score = JSON.parse(cleaned);
        console.log("ATS score:", score.ats_score);
        setScore(score.ats_score);
    }
}

// main();
export default main;