'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Docente extends Model {
    static associate(models) {
      this.belongsTo(models.Persona, {
        foreignKey: 'personaId',
        as: 'persona'
      });
      this.belongsTo(models.CategoriaEmpleado, {
        foreignKey: 'categoriaId',
        as: 'categoria'
      });
    }
  }

  Docente.init({
    numEmpleado: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true,
        len: [5, 10] // Ajusta según tus requisitos
      }
    },
    personaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Personas',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CategoriaEmpleados',
        key: 'clave'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    }
  }, {
    sequelize,
    modelName: 'Docente',
    tableName: 'Docentes',
    timestamps: true,
    paranoid: true
  });

  return Docente;
};