module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      street: {
        type: Sequelize.STRING,
      },
      streetNumber: {
        type: Sequelize.STRING,
      },
      commune: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      apartment: {
        type: Sequelize.STRING,
      },
      extra: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Addresses');
  },
};
