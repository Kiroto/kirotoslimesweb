const fs = require('fs')
const reviewsDir = "./src/pages/reviews"

const existingReviews = []

fs.readdir(reviewsDir, (err, files) => {
    if (!err) {
        files.forEach(file => {
            const filepath = reviewsDir + "/" + file;
            const isdir =
              fs.existsSync(filepath) && fs.lstatSync(filepath).isDirectory();
            if (isdir) {
                console.log("Review: " + file)
                existingReviews.push(filepath)
            }
        })
    } else {
        console.log("Error Reading Dir: " + err.message)
    }
    const jsonData = JSON.stringify(existingReviews)
    fs.writeFile(reviewsDir + "/" + "reviews.json", jsonData, () => {})
    console.log(jsonData);
})