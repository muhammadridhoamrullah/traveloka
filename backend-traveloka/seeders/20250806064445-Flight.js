"use strict";
let data = require("../data/flight.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data = data.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      // Convert JSONB fields to proper format for PostgreSQL
      el.departure = JSON.stringify(el.departure);
      el.arrival = JSON.stringify(el.arrival);
      el.cabinClasses = JSON.stringify(el.cabinClasses);
      el.stops = JSON.stringify(el.stops);
      return el;
    });
    await queryInterface.bulkInsert("Flights", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Flights", null, {});
  },
};
