const { JobService } = require('../services')
const BaseRouter = require('./base-router')
const JobModel = require("../models/job")
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

// Pfad: ./backend/fileUpload
const DATA_DIR = path.join(__dirname, '..', 'fileUpload');

// Stellen Sie sicher, dass das Verzeichnis 'Fileupload' existiert, oder erstellen Sie es
const upload = multer({ storage: storage });

class JobRouter extends BaseRouter {

    

    constructor(JobModel, JobService) {
        super(JobModel, JobService)

        //Endpunkt für Bewerbungs-Upload
        this.router.post("/upload",upload.single('file'), async (req, res) => {
            console.log(req)
            if (!req.file) {
                return res.status(400).send({
                    message: 'Keine Datei zum Hochladen vorhanden.'
                });
            } else {

                return res.status(200).send({
                    message: 'Datei erfolgreich hochgeladen',
                    dateiname: req.file.filename
                });
            }
        });

        //Endpunkt für Bewerbungs-Download
        this.router.get("/download/:fileName", async (req, res) => {

            const fileName = req.params.fileName;
            const filePath = path.join(DATA_DIR, fileName);// .backend/fileUpload/Beispiel.txt

            // Pfad vorhanden?
            console.log(fs.existsSync(filePath))
            if (fs.existsSync(filePath)) {

              res.download(filePath, fileName, (err) => {
                if (err) {
                  console.log('error')
                  next(err);
                }
              });
            } else {
              // Fehlermeldung senden, wenn Datei nicht existiert
              res.status(404).send('Datei wurde nicht gefunden.');
            }
          });

    }

}

module.exports = new JobRouter(JobModel, JobService).router