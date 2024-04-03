// middleware/validationMiddleware.js

const dangerousCharsRegex = /[^a-zA-Z0-9@._-]/;

function checkForDangerousChars(data) {
    return dangerousCharsRegex.test(data);
}

module.exports = { checkForDangerousChars };
