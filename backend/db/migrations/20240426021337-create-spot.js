let options = {

  logging:true
};
console.log("Checking env");
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
  console.log("env is production");
  console.log(options);
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE"
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model:"Users",
          foriegnKey:"ownerId"
        }
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.DECIMAL
      },
      lng: {
        type: Sequelize.DECIMAL
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots"
    await queryInterface.dropTable({schema:"GroundNdN", tableName:"SpotImages"});
    await queryInterface.dropTable({schema:"GroundNdN", tableName:"ReviewImages"});
    await queryInterface.dropTable('spots');
    await queryInterface.dropTable(options);
  }
};
