'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inscripcion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inscripcion.belongsTo(models.Estudiante, {
        foreignKey: 'estudianteld',
        as: 'estudiante'
      });

      Inscripcion.belongsTo(models.Asignatura, {
        foreignKey: 'asignaturaId',
        as: 'asignatura'
      });
    }
  }
  Inscripcion.init({
    estudianteld: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Estudiantes',
        key: 'id'
      }
    },
    asignaturaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Asignaturas',
        key: 'id'
      }
    },
    semestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    calificacion: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Inscripcion',
    name:{
      singular: "Inscripcion",
      plural: "Inscripciones"
    },
    indexes: [
      {
        unique: true,
        fields: ['estudianteld', 'asignaturaId', 'semestre'],
        name: 'unique_inscripcion'
      }
    ]
  });
  return Inscripcion;
};