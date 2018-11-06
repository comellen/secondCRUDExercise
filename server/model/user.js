module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        username: DataTypes.STRING,
        passwordhash: DataTypes.STRING
    });
};