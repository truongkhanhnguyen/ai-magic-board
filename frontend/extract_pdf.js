const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('C:\\Users\\busin\\OneDrive\\Desktop\\ĐỀ CƯƠNG_edited.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(err) {
    console.error("Error reading PDF:", err);
});
