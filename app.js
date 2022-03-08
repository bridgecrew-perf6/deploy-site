const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const ngrok = require('ngrok');

dotenv.config({ path: "./config.env" })
// set port 
app.use(cors());
const port = process.env.PORT || 5000;

// set body parser
app.use(express.urlencoded());
app.use(express.json());

// set static path
app.use(express.static(path.join(__dirname, '/public')))


// set hbs engine
app.set("view engine", "hbs");



// Routing page
app.get('/', async (req, res, next) => {
    try {
        res.status(200).render("index")
    } catch (error) {
        res.status(404).send({
            msg: error.message
        })
    }
})

app.post("/", async (req, res, next) => {
    try {
        const { port, subdomain } = req.body
        console.log(req.body)

        await ngrok.authtoken(process.env.TOKEN);
        const url = await ngrok.connect(port);



        // await ngrok.disconnect(url); // stops one
        // await ngrok.disconnect(); // stops all
        // await ngrok.kill(); // kills ngrok process

        console.log(url)
        res.status(200).render("index", {
            url: url,
            show: "hide"
        })

    } catch (error) {
        res.status(404).send({
            msg: error.message
        })
    }
})


// listen app on port
app.listen(port, () => {
    console.log("listening on port " + port);
});