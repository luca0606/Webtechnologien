const express = require("express");
const app = express();
const UserModel = require("./user-model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

class AnmeldeService extends BaseService {}

module.exports = new AnmeldeService(AnmeldeModel);

app.post("/anmeldung", (req, res) => {
  let benutzerGefunden;

  UserModel.findOne({ email: req.body.email })
    .then((email) => {
      if (!email) {
        return res.status(401).json({
          message: "Benutzer nicht gefunden",
        });
      }
      benutzerGefunden = email;
      const hashedPassword = CryptoJS.SHA256(req.body.password).toString();
      if (hashedPassword !== email.password) {
        return res.status(401).json({
          message: "Passwort ist nicht korrekt",
        });
      }
      //Benutzer und Passwort in Datenbank
      //Erstellung des Anmelde Tokens
      //npm install --save jsonwebtoken
      //Hash-Token hier manuell erstellt, da ausreichend für Zweck
      const token = jwt.sign(
        { username: benutzerGefunden.username, userId: benutzerGefunden._id },
        "Hash-Token",
        {}
      );
      return res.status(200).json({
        token: token,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Fehler bei der Anmeldung",
      });
    });
});

module.exports = app;
