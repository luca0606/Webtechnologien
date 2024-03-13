const { JobService } = require('../services')
const BaseRouter = require('./base-router')
const JobModel = require("../models/job")
const multer = require('multer');
const path = require('path');

// Multer Middleware für Dateiuploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Zielverzeichnis für die hochgeladenen Dateien festlegen
        cb(null, 'fileUpload');
    },
    filename: (req, file, cb) => {
        // Dateiname festlegen, hier mit einem Zeitstempel um Dateiüberschreibungen zu vermeiden
        //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname);

    }
});

// Stellen Sie sicher, dass das Verzeichnis 'Fileupload' existiert, oder erstellen Sie es
const upload = multer({ storage: storage });

class JobRouter extends BaseRouter {

    

    constructor(JobModel, JobService) {
        super(JobModel, JobService)

        this.router.post("/upload",upload.single('file'), async (req, res) => {
            console.log(req)
            if (!req.file) {
                return res.status(400).send({
                    message: 'Keine Datei zum Hochladen vorhanden.'
                });
            } else {
                // Hier könnten Sie zusätzliche Datenbankoperationen durchführen
                
                // Es wird eine Nachricht zurückgegeben, dass der Upload erfolgreich war
                return res.status(200).send({
                    message: 'Datei erfolgreich hochgeladen',
                    dateiname: req.file.filename
                });
            }
        });

    }

}

module.exports = new JobRouter(JobModel, JobService).router