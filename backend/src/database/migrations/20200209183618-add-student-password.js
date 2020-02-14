module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('students', 'password_hash', {
      type: Sequelize.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('students', 'password_hash');
  },
};
