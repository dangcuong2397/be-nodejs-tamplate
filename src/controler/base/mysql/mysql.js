
const Sequelize = require("sequelize");
const {convertOutputDate} = require('../../../utils/date');
const {mysql} = require('./../../../config/config_general')

let host = process.env.mysql_localhost || mysql.host;
let port = process.env.mysql_port || mysql.port;
let user = process.env.mysql_user || mysql.user;
let password = process.env.mysql_password || mysql.password;
let database = process.env.mysql_database || mysql.database;
let connectionLimit = parseInt(process.env.mysql_connectionLimit,10) || 10;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    port: port,
    logging: false,
    dialect: 'mysql',
    timezone: '+07:00',
    pool: {
        max: connectionLimit,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    define: {
        freezeTableName: true,
        timestamps: false,
        underscored: false
    },
    dialectOptions: {
        typeCast: function (field, next) { // for reading from database
            if (field.type === 'DATETIME' || field.type === 'DATE') {
                return convertOutputDate(field.string())
            }
            return next()
        },
    }
});
function authenticate(){
    let connection = setInterval(() => {
        authenticate();
    }, 1000 * 60 * 1);
    sequelize.authenticate()
        .then(function (conn) {
            clearInterval(connection);
            console.log(`Database connected: ${host}:${port}`);
        })
        .catch(e => console.log(`ERROR: NOT CONNECTED TO DATABASE | ${e}`));
}
authenticate();

module.exports = {
    sequelize
};