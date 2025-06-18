const users = require("../model/users");

class usersRepository {
  constructor() {
    this.users = users;
  }

  async findAll() {
    return this.users.find();
  }

  async findByPk(id) {
    return this.users.findById(id);
  }

  async create(taskData) {
    return this.users.create(taskData);
  }

  async update(id, options) {
    return this.users.findByIdAndUpdate(id, options);
  }

  async delete(options) {
    return this.users.findByIdAndDelete(options);
  }

  async findOne(options) {
    return this.users.findOne(options);
  }

}

module.exports = new usersRepository();