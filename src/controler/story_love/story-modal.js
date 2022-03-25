const Sequelize = require("sequelize");
const db = require('../base/mysql/mysql');
const storis = db.sequelize.define('storis', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    imageUri: {
        type: Sequelize.STRING,
        allowNull: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createDate:{
        type: Sequelize.DATE,
        allowNull: false,
    },
});
typeFile=[
    'image/png',
    'image/jpg',
    'image/jpeg',
    'video/mp4'
]
tailfile={
    'image/png':"png",
    'image/jpg':"jpg",
    'image/jpeg':"jpg",
    'video/mp4' : "mp4"
}
typeField=['img','video'];

module.exports ={
    storis :storis,
    tailfile: tailfile,
    typeFile: typeFile
}