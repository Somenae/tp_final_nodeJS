const tripsService = require("../service/tripsService");

class TravelController {
  constructor() {
    this.tripsService = tripsService;
  }
  index = async (req, res) => {
    try {
      const trips = await this.tripsService.getAllTrips();
      return res.render("trips/index", { trips: trips });
    } catch (error) {
      console.error("Error fetching trips: ", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  store = async (req, res) => {
    try {
      await this.tripsService.createTrip(req.body);
      return res.redirect("/api/trips");
    } catch (error) {
      console.error("Error creating trip: ", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  create = (req, res) => {
    try {
      res.render("trips/create");
    } catch (error) {
      console.error("Error rendering create trip page: ", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  update = async (req, res) => {
    try {
      await this.tripsService.updateTravel(req.params.id, req.body);
      res.redirect("/api/trips");
    } catch (error) {
      console.error("Error updating trip: ", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  edit = async (req, res) => {
    try {
      const trip = await this.tripsService.editTrips(req.params.id);
      res.render("trips/edit", { trip: trip });
    } catch (error) {
      console.error("Error rendering edit trips page: ", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  delete = async (req, res) => {
    try {
      await this.tripsService.deleteTrip(req.params.id);
      res.redirect("/api/trips");
    } catch (error) {
      console.error("Error deleting trip: ", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  toggleDone = async (req, res) => {
    try {
      await this.tripsService.toggleDone(req.params.id);
      res.redirect("/api/trips");
    } catch (error) {
      console.error("Error toggling travel status: ", error);
      return res.status(500).send("Internal Server Error");
    }
  };
}

module.exports = new TravelController();
