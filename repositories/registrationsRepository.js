const registrations = require("../model/registrations");

class registrationsRepository {
  constructor() {
    this.registrations = registrations;
  }

  async findAll() {
    return this.registrations.find();
  }

  async findRegisteredUsers(travelId) {
    return this.registrations.find({ travel: travelId }).populate('userId').populate('travel');
  }

  async findByUser(userId) {
    return this.registrations.find({ userId: userId }).populate('travel');
  }

  async findByPk(id) {
    return this.registrations.findById(id);
  }

  async create(taskData) {
    return this.registrations.create(taskData);
  }

  async update(id, options) {
    return this.registrations.findByIdAndUpdate(id, options);
  }

  async delete(options) {
    return this.registrations.findByIdAndDelete(options);
  }

  async findOne(options) {
    return this.registrations.findOne(options);
  }

}
module.exports = new registrationsRepository();
