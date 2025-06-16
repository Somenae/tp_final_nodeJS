const travels = require("../model/travels");

class travelRepository {
  constructor() {
    this.travels = travels;
  }

  async findAll() {
    return this.travels.findAll();
  }

  async findByPk(id) {
    return this.travels.findByPk(id);
  }

  async create(taskData) {
    return this.travels.create(taskData);
  }

  async update(taskData, options) {
    return this.travels.update(taskData, options);
  }

  async delete(options) {
    return this.travels.findByIdAndDelete(options);
  }

  async findOne(options) {
    return this.travels.findOne(options);
  }

}
module.exports = new travelRepository();
