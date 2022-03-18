// api.js
// NASA API helper module

// Path for NASA's Mars Rover API
const api_path = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
const api_rovers = [ "curiosity", "opportunity", "spirit" ];

const https = require("https");
const fs = require("fs");



/* Function: request photos by date
 * Purpose: creates an array of photo URLs from a specified date
 * Arguments: Date object
 * Return Value: Array of URLs on resolve, none on rejection
 */
function requestPhotosByDate(date) {

    let i = 0;
    let arrData = new Array();

    return new Promise((res, rej) => {

        api_rovers.forEach((rover) => {

            https.get(`${api_path}${rover}/photos?earth_date=${date}&api_key=${process.env.NASA_API_KEY}`, (resp) =>
            {
                let data = '';

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    let json = JSON.parse(data);
                    if (json.error) {
                        rej(data);
                        return;
                    }

                    json.photos.forEach((photo) => {
                        arrData.push(photo.img_src);
                    });

                    ++i;

                    if (i === api_rovers.length) {
                        res(arrData);
                    }
                });
            }).
            on("error", (err) => {
                console.error("Error: " + err.message);
                rej(err);
            });

        });

    });
}

function savePhotosToPath(arr, path) {
    arr.forEach((url) => {
        https.get(url, (photo) =>
        {
            let imgNameArr = url.split("/");
            let imgName = imgNameArr[imgNameArr.length - 1];
            let filePath = fs.createWriteStream(`${path}/${imgName}`);

            photo.pipe(filePath);

            filePath.on("finish", () => {
                filePath.close();
            });

            filePath.on("error", (err) => {
                console.error("Error: " + err.message);
            });
        });
    });
}

module.exports = {
  requestPhotosByDate: requestPhotosByDate,
  savePhotosToPath: savePhotosToPath,
}
