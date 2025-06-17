const trips = require("../model/trips");

class tripsRepository {
  constructor() {
    this.trips = trips;
  }

  async findAll() {
    return this.trips.find();
  }

  async findByPk(id) {
    return this.trips.findByPk(id);
  }

  async create(taskData) {
    return this.trips.create(taskData);
  }

  async update(taskData, options) {
    return this.trips.update(taskData, options);
  }

  async delete(options) {
    return this.trips.findByIdAndDelete(options);
  }

  async findOne(options) {
    return this.trips.findOne(options);
  }

}
module.exports = new tripsRepository();
