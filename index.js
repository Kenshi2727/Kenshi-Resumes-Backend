import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import pg from 'pg';

const port = 3000;
const app = express();
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "user_resume",
    password: "spiralhelix27",
    port: 5433,
})
db.connect();

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/user-resumes', async (req, res) => {
    console.log(req.body);
    const documentId = 1;
    const data = {
        data: {
            documentId: documentId,
        }
    }
    try {
        const data = req.body.data;
        await db.query('INSERT INTO resume (title,resumeid,useremail,username) VALUES ($1, $2, $3, $4)', [data.title, data.resumeId, data.userEmail, data.userName]);
    } catch (error) {
        console.log("Database insertion error----->", error);
    }

    res.send(data);

});

app.get('/api/user-resumes', (req, res) => {
    console.log("get request--->", req.query);

});

app.put('/user-resumes/', (req, res) => {
    console.log(req.body);
});
app.listen(port, () => console.log(`Server is running on port ${port}`));
