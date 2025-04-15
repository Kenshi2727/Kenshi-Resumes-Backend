import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const port = 3000;
const app = express();
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
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
        // console.log(result.rows);
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

app.get('/api/user-resumes/:id', async (req, res) => {
    console.log("populate--->", req.query);
    if (req.query.populate && req.query.populate === "*") {
        const documentId = req.params.id;
        console.log("documentId----->", req.params);
        try {
            const result = await db.query('SELECT * FROM resume WHERE "documentId" = $1', [documentId]);
            console.log('response---->', result.rows);
            let resData = result.rows[0];

            const exp = await db.query('SELECT * FROM experience WHERE "documentId" = $1', [documentId]);
            console.log('experience response---->', exp.rows);

            let jsonData = [];
            if (exp.rows.length > 0) {
                for (let i = 0; i < exp.rows[0].title.length; i++) {
                    jsonData.push({
                        title: exp.rows[0].title[i],
                        companyName: exp.rows[0].companyName[i],
                        city: exp.rows[0].city[i],
                        state: exp.rows[0].state[i],
                        startDate: exp.rows[0].startDate[i],
                        endDate: exp.rows[0].endDate[i],
                        workSummery: exp.rows[0].workSummery[i]
                    });
                }
            }

            console.log("jsonData----->", jsonData);

            let jsonEduData = [];
            const edu = await db.query('SELECT * FROM education WHERE "documentId" = $1', [documentId]);
            console.log('education response----->', edu.rows);
            if (edu.rows.length > 0) {
                for (let i = 0; i < edu.rows[0].degree.length; i++) {
                    jsonEduData.push({
                        degree: edu.rows[0].degree[i],
                        university: edu.rows[0].university[i],
                        major: edu.rows[0].major[i],
                        startDate: edu.rows[0].startDate[i],
                        endDate: edu.rows[0].endDate[i],
                        description: edu.rows[0].description[i]
                    });
                }
            }

            let jsonSkillsData = [];
            const skills = await db.query('SELECT * FROM skills WHERE "documentId" = $1', [documentId]);
            console.log('skills response----->', skills.rows);

            if (skills.rows.length > 0) {
                for (let i = 0; i < skills.rows[0].rating.length; i++) {
                    jsonSkillsData.push(
                        {
                            name: skills.rows[0].name[i],
                            rating: skills.rows[0].rating[i],
                        }
                    );
                }
            }

            resData = {
                ...resData,
                Experience: jsonData,
                education: jsonEduData,
                skills: jsonSkillsData
            }
            const data = {
                data: resData
            }
            res.json(data);
        } catch (error) {
            console.log("Database fetching error----->", error);
            res.status(500).send("Error fetching data from database");
        }
    }
    else {
        res.status(500).send("No populate query found");
    }
});


app.put('/api/user-resumes/:id', async (req, res) => {
    console.log(req.body);
    console.log(req.params);

    try {
        const data = req.body.data;
        const section = req.body.section;
        if (section === "summery") {
            console.log("summery data received----->", data.summery)
            await db.query('UPDATE resume SET "summery"= $1 WHERE "documentId" = $2', [data.summery, req.params.id]);
        }
        else if (section === "personalDetails") {
            await db.query('UPDATE resume SET "firstName"= $1, "lastName" = $2, "jobTitle" = $3, address = $4, phone = $5, email=$6 WHERE "documentId" = $7', [data.firstName, data.lastName, data.jobTitle, data.address, data.phone, data.email, req.params.id]);
        }
        else if (section === "experience") {
            console.log("experience data received----->", data.Experience);
            const expData = data.Experience;
            // Extract values into arrays
            const titles = expData.map(item => item.title);
            const companyNames = expData.map(item => item.companyName);
            const cities = expData.map(item => item.city);
            const states = expData.map(item => item.state);
            const startDates = expData.map(item => item.startDate);
            const endDates = expData.map(item => item.endDate);
            const summaries = expData.map(item => item.workSummery);

            const check = await db.query('SELECT * FROM experience WHERE "documentId" = $1', [req.params.id]);
            if (check.rows.length > 0) {
                //upate the data
                await db.query(`
                    UPDATE experience
                    SET
                      title = $1,
                      "companyName" = $2,
                      city = $3,
                      state = $4,
                      "startDate" = $5,
                      "endDate" = $6,
                      "workSummery" = $7
                    WHERE "documentId" = $8;
                  `, [
                    titles,
                    companyNames,
                    cities,
                    states,
                    startDates,
                    endDates,
                    summaries,
                    req.params.id
                ]);
            }
            else {
                //insert the data

                await db.query(`
                    INSERT INTO experience ("documentId")
                    VALUES ($1)
                    `, [req.params.id]);

                await db.query(`
                        UPDATE experience
                        SET
                          title = $1,
                          "companyName" = $2,
                          city = $3,
                          state = $4,
                          "startDate" = $5,
                          "endDate" = $6,
                          "workSummery" = $7
                        WHERE "documentId" = $8;
                      `, [
                    titles,
                    companyNames,
                    cities,
                    states,
                    startDates,
                    endDates,
                    summaries,
                    req.params.id
                ]);

            }
        }
        else if (section === "education") {
            console.log("education data received----->", data.education);
            const eduData = data.education;
            // Extract values into arrays
            const degrees = eduData.map(item => item.degree);
            const universities = eduData.map(item => item.university);
            const majors = eduData.map(item => item.major);
            const startDates = eduData.map(item => item.startDate);
            const endDates = eduData.map(item => item.endDate);
            const descriptions = eduData.map(item => item.description);

            const check = await db.query('SELECT * FROM education WHERE "documentId" = $1', [req.params.id]);
            if (check.rows.length > 0) {
                //upate the data
                await db.query(`
                    UPDATE education
                    SET
                      degree = $1,
                      university = $2,
                      major = $3,
                      "startDate" = $4,
                      "endDate" = $5,
                      description = $6
                    WHERE "documentId" = $7;
                  `, [
                    degrees,
                    universities,
                    majors,
                    startDates,
                    endDates,
                    descriptions,
                    req.params.id
                ]);
            }
            else {
                //insert the data

                await db.query(`
                    INSERT INTO education ("documentId")
                    VALUES ($1)
                    `, [req.params.id]);

                await db.query(`
                        UPDATE education
                        SET
                          degree = $1,
                          university = $2,
                          major = $3,
                          "startDate" = $4,
                          "endDate" = $5,
                          description = $6
                        WHERE "documentId" = $7;
                      `, [
                    degrees,
                    universities,
                    majors,
                    startDates,
                    endDates,
                    descriptions,
                    req.params.id
                ]);
            }
        }
        else if (section === "skills") {
            console.log("skills data received----->", data.skills);
            const skillsData = data.skills;
            // Extract values into arrays
            const names = skillsData.map(item => item.name);
            const ratings = skillsData.map(item => item.rating);

            const check = await db.query('SELECT * FROM skills WHERE "documentId" = $1', [req.params.id]);
            if (check.rows.length > 0) {
                //upate the data
                await db.query(`
                    UPDATE skills
                    SET
                      name = $1,
                      rating = $2
                    WHERE "documentId" = $3;
                  `, [
                    names,
                    ratings,
                    req.params.id
                ]);
            }
            else {
                //insert the data

                await db.query(`
                    INSERT INTO skills ("documentId")
                    VALUES ($1)
                    `, [req.params.id]);

                await db.query(`
                        UPDATE skills
                        SET
                          name = $1,
                          rating = $2
                        WHERE "documentId" = $3;
                      `, [
                    names,
                    ratings,
                    req.params.id
                ]);
            }
        }
        else {
            //theemcolor data
            console.log("theme color data received----->", data.themeColor);
            await db.query('UPDATE resume SET "themeColor"= $1 WHERE "documentId" = $2', [data.themeColor, req.params.id]);
        }
    } catch (error) {
        console.log("Database insertion error----->", error);
    }
    res.send(req.body);
});

app.delete('/api/user-resumes/:id', async (req, res) => {
    console.log("Delete docuemnt id----->", req.params.id);
    try {
        await db.query('DELETE FROM resume WHERE "documentId" = $1', [req.params.id]);
        await db.query('DELETE FROM experience WHERE "documentId" = $1', [req.params.id]);
        await db.query('DELETE FROM education WHERE "documentId" = $1', [req.params.id]);
        await db.query('DELETE FROM skills WHERE "documentId" = $1', [req.params.id]);
        res.send("Document deleted successfully with id " + req.params.id);
    } catch (error) {
        console.log("Database deletion error----->", error);
        res.status(500).send("Error deleting data from database");
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
