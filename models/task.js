'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    idTasks: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // nombre del modelo al que hace referencia
        key: 'idUsers'  // clave primaria de Users
      }
    }
  }, {});

  Task.associate = function(models) {
    // Una tarea pertenece a un usuario
    Task.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });

    // Una tarea puede tener un estado de completado
    Task.hasOne(models.Completed, {
      foreignKey: 'task_id',
      as: 'completed'
    });
  };

  return Task;
};


//:::::::::: modelo generado automáticamente ::::::::::.
// 'use strict';
// const {Model} = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Task extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Task.init({
//     title: DataTypes.STRING,
//     description: DataTypes.TEXT,
//     user_id: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Task',
//   });
//   return Task;
// };