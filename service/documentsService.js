const tripsRepository = require('../repositories/tripsRepository');
const registrationsRepository = require('../repositories/registrationsRepository');
const formidable = require('formidable');
const fs = require('fs');

class documentsService {
    constructor() {
        this.tripsRepository = tripsRepository;
        this.registrationsRepository = registrationsRepository;
        this.formidable = formidable;
        this.fs = fs;
    }

    requiredDocuments = async (tripId) => {
        try {
            const tripDetails = await this.tripsRepository.findByPk(tripId);
            const departure = tripDetails.departure;
            const destination = tripDetails.destination;
            const requiredDocuments = tripDetails.requiredDocuments;
            return { requiredDocuments: requiredDocuments, departure: departure, destination: destination };            
        } catch (error) {
            throw new Error(`Error retrieving documents list: ${error.message}`);
        }
    }

    store = async (tripId, datas) => {
        try {
            await this.tripsRepository.update(tripId, { $push: { requiredDocuments: datas } });
        } catch (error) {
            throw new Error(`Error storing required document: ${error.message}`);
        }
    }

    saveDocument = async (req) => {
        try {
            const registrationId = req.params.id
            let form = new this.formidable.IncomingForm();
            form.parse(req, (err, fields, files) => {
                let docTitle = fields.title[0];
                let oldPath = files.sentFile[0].filepath;
                let newPath = './public/documents/' + registrationId + '_' + docTitle + '_' + files.sentFile[0].originalFilename;
                this.fs.rename(oldPath, newPath, function (err) {
                    if (err) throw err;
                });
                this.updateSentDocument(registrationId, docTitle, newPath);
            });
        } catch (error) {
            throw new Error(`Error storing received document: ${error.message}`);
        }
    }

    updateSentDocument = async (registrationId, docTitle, docUrl) => {
        try {
            await this.registrationsRepository.update(registrationId, { $push: { document: { title: docTitle, url: docUrl } } });
        } catch (error) {
            throw new Error(`Error updating registration received document: ${error.message}`);
        }
    }

    getRegistrationsDocument = async (tripId) => {
        try {
            const tripDetails = await this.registrationsRepository.findRegisteredUsers(tripId);
            return tripDetails;
        } catch (error) {
            throw new Error(`Error retrieving sent documents: ${error.message}`);
        }
    }

    getUsersDocuments = async (userId) => {
        try {
            return await this.registrationsRepository.findByUser(userId);
        } catch (error) {
            throw new Error(`Error retrieving user documents: ${error.message}`);
        }
    }
}

module.exports = new documentsService();