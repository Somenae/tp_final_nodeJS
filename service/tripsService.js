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
        return []
      }
      return allTrips;
    } catch (error) {
      throw new Error("Error fetching trips: " + error.message);
    }
  }

  async getTripById(id) {
    try {
      const trip = await this.tripsRepository.findByPk(id);
      if (!trip) {
        return new Error("No trips found");
      }
      return trip;
    } catch (error) {
      throw new Error("Error fetching trip: " + error.message);
    }
  }

  async createTrip(TravelData) {
    try {
      if (!TravelData) {
        return new Error("No datas sent")
      }

      if (TravelData.price) {
        TravelData.price = parseFloat(TravelData.price);
      }

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
      const updated = await this.tripsRepository.update(id, travelData);
      if (!updated) {
        return new Error("No travels found");
      }

      return { message: "Trip updated successfully" };
    } catch (error) {
      throw new Error("Error updating travel: " + error.message);
    }
  }

  async editTrips(id) {
    try {
      const travel = await this.tripsRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }

      if (travel.departureDateTime) {
        travel.departureDateTime = moment(travel.departureDateTime).format("YYYY-MM-DD");
      }
      if (travel.arrivalDateTime) {
        travel.arrivalDateTime = moment(travel.arrivalDateTime).format("YYYY-MM-DD");
      }

      return travel;
    } catch (error) {
      throw new Error("Error editing travel: " + error.message);
    }
  }

  async deleteTrip(id) {
    try {
      const travel = await this.tripsRepository.findByPk(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      await this.tripsRepository.delete(id);
      return { message: "Travel deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting travel: " + error.message);
    }
  }
}

module.exports = new TripsService();
