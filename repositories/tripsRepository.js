const trips = require("../model/trips");

class tripsRepository {
  constructor() {
    this.trips = trips;
  }

  async findAll() {
    return this.trips.find();
  }

  async findByPk(id) {
    return this.trips.findById(id);
  }

  async create(taskData) {
    return this.trips.create(taskData);
  }

  async update(id, options) {
    const trip = await this.trips.findById(id);
    if (!trip) return null;
      Object.keys(options).forEach(key => {
    if (options[key] !== undefined) {
      trip[key] = options[key];
    }
    });
    return trip.save();
  }

  async delete(options) {
    return this.trips.findByIdAndDelete(options);
  }

  async findOne(options) {
    return this.trips.findOne(options);
  }

}
module.exports = new tripsRepository();
