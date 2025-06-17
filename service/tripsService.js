const tripsRepository = require("../repositories/tripsRepository");
const moment = require("moment");

class TripsService {
  constructor() {
    this.tripsRepository = tripsRepository;
    this.moment = moment;
  }

  async getAllTrips() {
    try {
      const allTrips = await this.tripsRepository.findAll();
      if (!allTrips || allTrips.length === 0) {
        return new Error("No trips found");
      }
      return allTrips;
    } catch (error) {
      throw new Error("Error fetching trips: " + error.message);
    }
  }

  async getTravelById(id) {
    try {
      const travel = await this.tripsRepository.findByPk(id);
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
      const newTravel = await this.tripsRepository.create(TravelData);
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
      const travel = await this.tripsRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      const updated = await this.tripsRepository.update(travelData, {
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
      const travel = await this.tripsRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }

      if (travel.departureDateTime) {
        travel.departureDateTime = moment(travel.departureDateTime).format("YYYY-MM-DD");
      }
      if (travel.arrivalDateTime) {
        travel.departureDateTime = moment(travel.arrivalDateTime).format("YYYY-MM-DD");
      }

      return travel;
    } catch (error) {
      throw new Error("Error editing travel: " + error.message);
    }
  }

  async deleteTravel(id) {
    try {
      const travel = await this.tripsRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      await this.tripsRepository.delete({ where: { id } });
      return { message: "Travel deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting travel: " + error.message);
    }
  }

  async toggleDone(id) {
    try {
      const travel = await this.tripsRepository.findByPk(id);
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

module.exports = new TripsService();
