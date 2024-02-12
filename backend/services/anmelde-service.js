// const express = require("express");
// const app = express();
// const UserModel = require("./user-model");
// const bcrypt = require("bcrypt");

// class AnmeldeService extends BaseService { }

// app.post("/registrierung", (req, res) => {
//     bcrypt.hash(req.body.password, 10).then((hash) => {
//         const userModel = new UserModel({
//             email: req.body.email,
//             password: hash,
//         });

//         userModel
//             .save()
//             .then((result) => {
//                 res.status(201).json({
//                     message: "Benutzer erstellt",
//                     result: result,
//                 });
//             })
//             .catch((err) => {
//                 res.status(500).json({
//                     error: err,
//                 });
//             });
//     });
// });

// module.exports = new AnmeldeService(AnmeldeModel);

// app.post("/login", (req, res) => {
//     let benutzerGefunden;

//     UserModel.findOne({ email: req.body.email })
//         .then((email) => {
//             if (!email) {
//                 return res.status(401).json({
//                     message: "Benutzer nicht gefunden",
//                 });
//             }
//             benutzerGefunden = email;
//             return bcrypt.compare(req.body.password, email.password);
//         })
//         .then((result) => {
//             if (!result) {
//                 return res.status(401).json({
//                     message: "Passwort ist nicht korrekt",
//                 });
//             }
//             //Benutzer und Passwort in Datenbank
//             //Erstellung des Anmelde Tokens
//             //npm install --save jsonwebtoken
//             //Hash-Token hier manuell erstellt, da ausreichend für Zweck
//             const token = jwt.sign(
//                 { username: benutzerGefunden.username, userId: benutzerGefunden._id },
//                 "Hash-Token",
//                 {}
//             );
//             return res.status(200).json({
//                 token: token,
//             });
//         })
//         .catch((err) => {
//             return res.status(401).json({
//                 message: "Fehler bei der Anmeldung",
//             });
//         });
// });

// module.exports = app;