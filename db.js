var  Sequelize = require('sequelize');

var conn = new Sequelize('postService', 'root', 'root',{
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

var postModel = conn.define('tablePosts',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id"
    },
    post: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "post_m"
    },
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "user_id"
    }
});

// create the table if it doesn't exist yet
postModel.sync();

module.exports = conn;
