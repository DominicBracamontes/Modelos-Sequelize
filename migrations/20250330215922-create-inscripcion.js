// migrations/XXXXXX-create-inscripcion.js
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inscripciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estudianteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Estudiantes',
          key: 'matricula'
        }
      },
      asignaturaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Asignaturas',
          key: 'clave' // Referencia al campo único
        }
      },
      semestre: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      calificacion: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Índice compuesto para evitar inscripciones duplicadas
    await queryInterface.addIndex('Inscripciones', {
      fields: ['estudianteId', 'asignaturaId', 'semestre'],
      unique: true,
      name: 'inscripcion_unica'
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Inscripciones');
  }
};