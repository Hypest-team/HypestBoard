var path = require('path');

function getStaticFilePath(file) {
    return path.resolve(__dirname + '../../../html' + file);
}

exports.getIndexFile = function (req, res) {
    var filePath = getStaticFilePath('/index.html');
    console.log('Sending static file', filePath);
    res.sendFile(filePath);
};

exports.getStaticFile = function (req, res) {
    var filePath = getStaticFilePath(req.params[0]);
    console.log('Sending static file', filePath);
    res.sendFile(filePath);
};