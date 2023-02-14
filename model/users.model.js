module.exports = (sequelize, DataTypes, Model) => {

    class Users extends Model {}

    Users.init({
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        address: {
          type: DataTypes.JSON
          // allowNull defaults to true
        },
        additional_info: {
            type: DataTypes.JSON
            // allowNull defaults to true
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
       
      }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'users' // We need to choose the model name
      });
      
      return Users;
}