/**
 * Puerto
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * Entorno
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';




/**
 * BD
 */
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/facturaDB';
} else {

    urlDB = 'mongodb://ivan:123456a@ds129801.mlab.com:29801/facturas';
}

process.env.URLDB = urlDB;