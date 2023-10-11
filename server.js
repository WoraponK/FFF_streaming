const express = require('express');
const bdparser = require('body-parser');
const mysql = require('mysql2/promise');
const moment = require('moment');
const cors = require('cors');

//code runserver.
const app = express();
const port = 8000;

//connect database
const dbConfig = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "project_wormbutterfly"
}

app.use(cors());
app.use(bdparser.json());

// req user ส่งเข้า server , res ส่งออกไปหา users
//ส่งออกหน้าเว็บ

/////////////////////////////////////////////////////////////////////////////////////
// user //

app.get('/users', async (req, res) => {
    const conn = await mysql.createConnection(dbConfig);
    const [data] = await conn.query("SELECT * FROM users");
    conn.end();
    res.json(data);
});

app.get('/users/:user_id', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query("SELECT * FROM users WHERE user_id = ?", [req.params.user_id]);
        conn.end();
        let user = data.length == 0 ? {} : data[0];
        res.json(user);
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [maxUserIdRows] = await conn.query("SELECT MAX(user_id) AS maxUserId FROM users");
        const maxUserId = maxUserIdRows[0].maxUserId || 0; // If there are no users yet, set maxUserId to 0
        
        // Generate the next user_id by incrementing the maximum user_id
        const user_id = maxUserId + 1;
        const [data] = await conn.query("INSERT INTO users (user_id, name_profile, username, password, email, profile_picture, amount_hours) VALUES (?,?,?,?,?,?,?)",
            [
                user_id,
                req.body.name_profile,
                req.body.username,
                req.body.password,
                req.body.email,
                req.body.profile_picture,
                req.body.amount_hours
            ]);
        conn.end();
        res.json({
            "message": "save data complate",
            "user_id": user_id,
            "data": req.body
        });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

app.put('/users/:user_id', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query("UPDATE users SET name_profile = ?, username = ?, password = ?, email = ?, profile_picture = ?, amount_hours = ? WHERE user_id = ?",
            [
                req.body.name_profile,
                req.body.username,
                req.body.password,
                req.body.email,
                req.body.profile_picture,
                req.body.amount_hours,
                req.params.user_id
            ]);
        conn.end();
        res.json({
            "message": "edit data complate",
            "user_id": req.params.user_id,
            "data": req.body
        });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

app.delete('/users/:user_id', async (req, res) => {
    try {
        let id = req.params.user_id;
        const conn = await mysql.createConnection(dbConfig);
        await conn.query("DELETE FROM users WHERE user_id = ?", [id]);
        conn.end();
        res.json({
            "message": "delete data complete",
            "user_id": id
        })
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
// streaming //

app.get('/streaming_room', async (req, res) => {
    const conn = await mysql.createConnection(dbConfig);
    const [data] = await conn.query("SELECT * FROM streaming_room");
    conn.end();
    res.json(data);
});

app.get('/streaming_room/:streaming_id', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query("SELECT * FROM streaming_room WHERE streaming_id = ?", [req.params.streaming_id]);
        conn.end();
        let stream_room = data.length == 0 ? {} : data[0];
        res.json(stream_room);
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

// for call amount_watcher //

app.get('/users_streaming_room', async (req, res) => {
    const conn = await mysql.createConnection(dbConfig);
    const [data] = await conn.query("SELECT * FROM users_streaming_room");
    conn.end();
    res.json(data);
});

app.get('/users_streaming_room/:streaming_id', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query("SELECT amount_watcher FROM users_streaming_room WHERE streaming_id = ?", [req.params.streaming_id]);
        conn.end();
        let stream_room = data.length == 0 ? {} : data[0];
        res.json(stream_room);
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

/////////////////////////////////

app.post('/streaming_room', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        
        const user_id = req.body.user_id;
        
        const [maxStreamIdRows] = await conn.query("SELECT MAX(streaming_id) AS maxStreamId FROM streaming_room");
        const maxStreamId = maxStreamIdRows[0].maxStreamId || 0; // If there are no users yet, set maxUserId to 0
        
        // Generate the next user_id by incrementing the maximum user_id
        const streaming_id = maxStreamId + 1;
        const [data] = await conn.query("INSERT INTO streaming_room (streaming_id, user_id, streaming_name) VALUES (?,?,?)",
        [
            streaming_id,
            user_id,
            req.body.streaming_name,
        ]);
        conn.end();
        res.json({
            "message": "save data complate",
            "streaming_id": streaming_id,
            "data": req.body
        });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

app.put('/streaming_room/:streaming_id', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query("UPDATE streaming_room SET streaming_name = ?, streaming_description = ?, streaming_games = ? WHERE streaming_id = ?",
        [
            req.body.streaming_name,
            req.body.streaming_description,
            req.body.streaming_games,
            req.params.streaming_id
        ]);
        conn.end();
        res.json({
            "message": "edit data complete",
            "streaming_id": req.params.streaming_id,
            "data": req.body
        });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});


app.delete('/streaming_room/:streaming_id', async (req, res) => {
    try {
        let id = req.params.streaming_id;
        const conn = await mysql.createConnection(dbConfig);
        await conn.query("DELETE FROM streaming_room WHERE streaming_id = ?", [id]);
        conn.end();
        res.json({
            "message": "delete data complete",
            "streaming_id": id
        })
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
// party //

app.get('/party', async (req, res) => {
    const conn = await mysql.createConnection(dbConfig);
    const [data] = await conn.query("SELECT * FROM party");
    conn.end();
    res.json(data);
});

app.get('/party/:party_id', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query("SELECT * FROM party WHERE party_id = ?", [req.params.party_id]);
        conn.end();
        let party = data.length == 0 ? {} : data[0];
        res.json(party);
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

app.post('/party', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        
        const user_id = req.body.user_id;
        
        const [maxPartyIdRows] = await conn.query("SELECT MAX(party_id) AS maxPartyId FROM party");
        const maxPartyId = maxPartyIdRows[0].maxPartyId || 0; // If there are no users yet, set maxUserId to 0
        
        // Generate the next user_id by incrementing the maximum user_id
        const party_id = maxPartyId + 1;
        const [data] = await conn.query("INSERT INTO party (party_id, user_id, party_name) VALUES (?,?,?)",
        [
            party_id,
            user_id,
            req.body.party_name,
        ]);
        conn.end();
        res.json({
            "message": "save data complate",
            "party_id": party_id,
            "data": req.body
        });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

app.put('/party/:party_id', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [data] = await conn.query("UPDATE party SET party_name = ? WHERE party_id = ?",
        [
            req.body.party_name,
            req.params.party_id
        ]);
        conn.end();
        res.json({
            "message": "edit data complate",
            "party_id": req.params.party_id,
            "data": req.body
        });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

app.delete('/party/:party_id', async (req, res) => {
    try {
        let id = req.params.party_id;
        const conn = await mysql.createConnection(dbConfig);
        await conn.query("DELETE FROM party WHERE party_id = ?", [id]);
        conn.end();
        res.json({
            "message": "delete data complete",
            "party_id": id
        })
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

/////////////////////////////////////////////////////////////////////////////////////

// run //
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});