const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        // add the fallback setting below 
        fallback: {
            "fs": false,
            "os": false,
            "path": false
        },
    }
};