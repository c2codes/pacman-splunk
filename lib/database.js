'use strict';

var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
var _db;

function Database() {

    this.connect = async function(app) {
        try {
            const client = await MongoClient.connect(config.database.url, config.database.options);
            _db = client.db(config.database.dbname); // Get the database from the client
            app.locals.db = _db; // Store the db in app locals
            console.log('Successfully connected to the database');
        } catch (err) {
            console.error('Database connection error:', err);
            console.error('Database URL:', config.database.url);
            console.error('Database options:', config.database.options);
            throw err; // Re-throw the error to handle it later if necessary
        }
    };

    this.getDb = async function(app) {
        if (!_db) {
            await this.connect(app);
        }
        return _db;
    }
}

module.exports = exports = new Database(); // Singleton
