import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';

const port = 3000;
const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/user-resumes', (req, res) => {
    console.log(req.body);
    const documentId = 1;
    const data = {
        data: {
            documentId: documentId,
        }
    }
    res.send(data);
});

app.put('/user-resumes/:id', (req, res) => {
    console.log(req.body);
});
app.listen(port, () => console.log(`Server is running on port ${port}`));
