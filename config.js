global.environment = 'production';

var config = {
    //environment : 'production',
    development: {
        //url to be used in link generation
        url: 'http://localhost:8000',
        //mysql connection settings
        database: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'attra_cab',
            timezone: 'Z'
        }
    },
    production: {
        //url to be used in link generation
        url: 'https://attracab.herokuapp.com/',
        //mongodb connection settings
        database: {
            host: 'sql2.freesqldatabase.com',
            user: 'sql2321059',
            password: 'yK2!xR2*',
            database: 'sql2321059',
            timezone: 'Z'
        }

    }
};

module.exports = config;