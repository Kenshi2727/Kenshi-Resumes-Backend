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
        await db.query('INSERT INTO resume (title,"documentId","userEmail","userName") VALUES ($1, $2, $3, $4)', [data.title, data.documentId, data.userEmail, data.userName]);
    } catch (error) {
        console.log("Database insertion error----->", error);
    }

    res.send(data);

});

app.get('/api/user-resumes', async (req, res) => {
    console.log("get request--->", req.query);
    const userEmail = req.query.userEmail;
    try {
        const result = await db.query('SELECT * FROM resume WHERE "userEmail" = $1', [userEmail]);
        console.log(result.rows);
        const dataItem = result.rows[0];
        const data = {
            data: result.rows
        }
        res.json(data);
    } catch (error) {
        console.log("Database fetching error----->", error);
        res.status(500).send("Error fetching data from database");
    }
});

app.put('/api/user-resumes/:id', async (req, res) => {
    console.log(req.body);
    console.log(req.params);

    try {
        const data = req.body.data;
        await db.query('UPDATE resume SET "firstName"= $1, "lastName" = $2, "jobTitle" = $3, address = $4, phone = $5, email=$6 WHERE "documentId" = $7', [data.firstName, data.lastName, data.jobTitle, data.address, data.phone, data.email, req.params.id]);
    } catch (error) {
        console.log("Database insertion error----->", error);
    }
    res.send(req.body);
});
app.listen(port, () => console.log(`Server is running on port ${port}`));
