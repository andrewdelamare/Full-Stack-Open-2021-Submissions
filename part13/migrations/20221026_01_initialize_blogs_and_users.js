const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1991,
        isBefore(value) {
          const now = new Date();
          if (parseInt(value) > now.getFullYear()) {
            throw new Error(
              "The blog must have been written already! Future publication years are not acceptable"
            );
          }
          console.log(value, " THIS IS THE YEAR");
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropColumn("year");
  },
};
