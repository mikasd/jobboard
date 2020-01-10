
const express = require('express')
const app = express()
const port = 3001

var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/api/jobs', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const jobs = await getAsync('github');
    return res.send(jobs)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))