const travelRepository = require("../repositories/travelRepository");
const moment = require("moment");

class TravelService {
  constructor() {
    this.travelRepository = travelRepository;
    this.moment = moment;
  }

  async getAllTravels() {
    try {
      const allTravels = await this.travelRepository.findAll();
      if (!allTravels || allTravels.length === 0) {
        return new Error("No travels found");
      }
      return allTravels;
    } catch (error) {
      throw new Error("Error fetching travels: " + error.message);
    }
  }

  async getTravelById(id) {
    try {
      const travel = await this.travelRepository.findByPk(id);
      if (!travel) {
        return new Error("No travels found");
      }
      return travel;
    } catch (error) {
      throw new Error("Error fetching travel: " + error.message);
    }
  }

  async createTravel(TravelData) {
    try {
      const newTravel = await this.travelRepository.create(TravelData);
      if (!newTravel) {
        return new Error("No travels found");
      }
      return { success: true, newTravel };
    } catch (error) {
      throw new Error("Error creating travel: " + error.message);
    }
  }

  async updateTravel(id, travelData) {
    try {
      const travel = await this.travelRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      const updated = await this.travelRepository.update(travelData, {
        where: { id },
      });
      if (!updated) {
        return new Error("No travels found");
      }

      return { message: "Travel updated successfully" };
    } catch (error) {
      throw new Error("Error updating travel: " + error.message);
    }
  }

  async editTravels(id) {
    try {
      const travel = await this.travelRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }

      if (travel.start_date) {
        travel.start_date_formated = moment(travel.start_date).format("YYYY-MM-DD");
      }
      if (travel.end_date) {
        travel.end_date_formated = moment(travel.end_date).format("YYYY-MM-DD");
      }

      return travel;
    } catch (error) {
      throw new Error("Error editing travel: " + error.message);
    }
  }

  async deleteTravel(id) {
    try {
      const travel = await this.travelRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      await this.travelRepository.delete({ where: { id } });
      return { message: "Travel deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting travel: " + error.message);
    }
  }

  async toggleDone(id) {
    try {
      const travel = await this.travelRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      travel.done = !travel.done;
      await travel.save();
      return { message: "Travel status toggled successfully" };
    } catch (error) {
      throw new Error("Error toggling travel status: " + error.message);
    }
  }
}

module.exports = new TravelService();
