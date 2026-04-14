const mammoth = require("mammoth");

mammoth.extractRawText({path: "C:\\Users\\busin\\Downloads\\2526 - ĐỀ CƯƠNG KTĐG HKII - ANH 8.docx"})
    .then(function(result){
        const text = result.value; // The raw text
        console.log(text);
        const messages = result.messages;
        if(messages.length > 0) {
            console.error("Messages:", messages);
        }
    })
    .catch(function(error) {
        console.error("Error reading docx:", error);
    });
