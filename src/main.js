// index.js

// Set environment variables
process.env.PORT = 8080;
// process.env.NASA_API_KEY = "DEMO_KEY";
process.env.NASA_API_KEY = "4dHNFbmcqTqKAppJ0LNqDDJoTsET5egsjWYqQGjk";


const express = require('express');
const fs = require('fs');
const input = require('./input.js');
const api = require('./api.js');

const app = express();
const router = express.Router();


/* Function: RequestPhotos
 * Purpose: Parse input and get photos from Rover API. Do caching as well if needed.
 * Arguments: Request object, Response object, Express Next object
 */
const requestPhotos = async function (req, res, next) {
    // URL validation
    if (req.method !== 'GET') {
        res.status(404).send("404 Not Found");
        return;
    }

    // Input validation
    const input_date = req.query["date"];
    const date = new Date(input_date);
    if (input.isInvalidDate(date)) {
        res.status(400).send({ error: "Invalid input date." });
        return;
    }

    if (!fs.existsSync("./cache")) {
        fs.mkdirSync("./cache");
    }

    const format_date = input.formatDate(date);
    const path = "./cache/" + format_date;
    let exists = false;

    // Before deciding to use API, check if local cache exists
    if (fs.existsSync(path)) {
        exists = true;

        filenames = fs.readdirSync(path);

        if (filenames.length != 0) {
            res.status(200).send({ count: filenames.length });
            return;
        }
    } else
        fs.mkdirSync(path);

    try
    {
        console.log("Running API");

        let photoUrls = await api.requestPhotosByDate(format_date);

        if (photoUrls.length)
        {
            api.savePhotosToPath(photoUrls, path);
        } else {
            res.status(204).send({ error: "API returns null" });
        }

    }
    catch (ex) {
        res.status(500).send({ error: ex.toString() });
    }


    next()
}



app.use(requestPhotos)
app.use('/', router);

router.get('/RoverExercise', (req, res) => {
    let responseText = req.requestPhotos
});

app.listen(process.env.PORT, () => {
    console.log("Web server is listening at port: " + process.env.PORT);
});
