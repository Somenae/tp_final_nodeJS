const documentsService = require('../service/documentsService');


class documentsController {
    constructor() {
        this.documentsService = documentsService;
    }

    requiredDocuments = async (req, res) => {
        try {
            const tripId = req.params.id;
            const { requiredDocuments, departure, destination } = await this.documentsService.requiredDocuments(tripId);
            return res.render('documents/list', { requiredDocuments: requiredDocuments, departure: departure, destination: destination, tripId: tripId });
        } catch (error) {
            throw new Error(`Error retrieving documents list: ${error.message}`);
        }
    }

    addDocument = async (req, res) => {
        try {
            return res.render('documents/add', { tripId: req.params.id });
        } catch (error) {
            throw new Error(`Error rendering create documents form: ${error.message}`);
        }
    }

    storeRequiredDocument = async (req, res) => {
        try {
            const tripId = req.params.id
            await this.documentsService.store(tripId, req.body)
            return res.redirect(`/api/documents/${tripId}`);
        } catch (error) {
            throw new Error(`Error storing required documents form: ${error.message}`);
        }
    }

    sendDocument = async (req, res) => {
        try {
            const registrationId = req.params.id
            return res.render('documents/send', { registrationId: registrationId });
        } catch (error) {
            throw new Error(`Error rendering send document form: ${error.message}`);
        }
    }

    storeDocument = async (req, res) => {
        try {
            await this.documentsService.saveDocument(req);
            return res.redirect("/api/registrations/me")
        } catch (error) {
            throw new Error(`Error sending required document: ${error.message}`);
        }
    }

    receivedDocuments = async (req, res) => {
        try {
            const tripDetails = await this.documentsService.getRegistrationsDocument(req.params.id);

            return res.render("documents/adminList", { tripDetails: tripDetails });
        } catch (error) {
            throw new Error(`Error showing sent documents: ${error.message}`);
        }
    }

    myDocuments = async (req, res) => {
        try {
            const documents = await this.documentsService.getUsersDocuments(req.user.id);
            
            return res.render('documents/userDocs', { documents: documents });
        } catch (error) {
            throw new Error(`Error showing user's documents: ${error.message}`);
        }
    }
}

module.exports = new documentsController();