// EN -- Node server creation and app.js's import.
// FR -- Création d'un server Node et importation de app.js.
const http = require('http');
const app = require('./app');
const server = http.createServer(app);

// EN -- Port validity verification.
// FR -- Vérification de la validité du port.
const normalizePort = val => {
    const port = parseInt(val, 10);
    if(isNaN(port)){
    return val;
    }
    if(port >= 0){
    return port;
    }
    return false;
};

// EN -- Error search and correction.
// FR -- Recherche d'erreur et correction.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
    throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
    default:
        throw error;
    }
};

// EN --  Port record on which the server is running.
// FR -- Enregistrement du port sur lequel le serveur s'execute.
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});
server.listen(port);