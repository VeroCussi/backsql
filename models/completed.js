// modelo acorde a las bases de datos que ya había creado.

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Completed = sequelize.define('Completed', {
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tasks', // nombre del modelo al que hace referencia
        key: 'idTasks'  // clave primaria de Tasks
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'done'),
      allowNull: false
    }
  }, {});

  Completed.associate = function(models) {
    // El estado completado pertenece a una tarea
    Completed.belongsTo(models.Task, {
      foreignKey: 'task_id',
      as: 'task'
    });
  };

  return Completed;
};


//::::::::::: modelo generado automáticamente

// 'use strict';
// const {Model} = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Completed extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Completed.init({
//     task_id: DataTypes.INTEGER,
//     status: DataTypes.ENUM
//   }, {
//     sequelize,
//     modelName: 'Completed',
//   });
//   return Completed;
// };