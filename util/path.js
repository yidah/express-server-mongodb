const path = require('path');

// path.dirname returns directory name of a path
// require.main.filename gives us the path to the start up file, app.js
module.exports = path.dirname(require.main.filename);