const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cryptoRandomString = require("crypto-random-string");
const config = require("../config/auth.config");
const nodemailer = require("nodemailer");
exports.signup = async (req, res) => {
    let obj = req.body;
    console.log(obj)
    let user = new User();
    for (let p in obj) {
        user[p] = obj[p];
    };
    user.password = bcrypt.hashSync(obj.password, 8);
    let secretCode = await cryptoRandomString(128);
    user.secretCode = secretCode;
    user.save((err, response) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        let transporter = nodemailer.createTransport(config.mailTransporter);
        let mailData = {
            from: '"User Chat App" <dummym431@gmail.com>',
            to: response.email,
            subject: 'Email Verification for USer Chat App',
            text: 'That was easy!',
            html: `<p>Click <a href="${config.url}verification/verify-account/${response.id}/${secretCode}">here</a> to Verify your account</p>`
        };
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                return res.send({ message: "User registered successfully! Mail Error" });
            }
            res.send({ message: "User registered successfully! Mail Success" });
        })
    })
}

exports.signin = (req, res) => {
    let uname = req.body.username;
    let pw = req.body.password;
    User.findOne({ username: uname }, async (err, user) => {
        if (err) {
            return res.render('verify-error', { error: err });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }
        const match = await bcrypt.compare(pw, user.password);
        if (!match) {
            return res.status(400).send({ message: "Invalid Password" });
        }
        let token = jwt.sign({
            id: user._id
        }, config.secret, { expiresIn: 86400 });

        res.send({
            accessToken: token,
            message: "User Loggedin Suuccessfully"
        })
    })
}


exports.verify = (req, res) => {
    let uid = req.params.uid;
    let secretCode = req.params.secretCode;
    User.findOne({ _id: uid }, (err, user) => {
        if (err) {
            return res.render('verify-error', { error: err });
        }
        if (!user) {
            return res.render('verify-error', { error: "User Not Found" });
        }
        if (secretCode !== user.secretCode) {
            return res.render('verify-error', { error: "Invalid Secret Code" });
        }
        User.updateOne({ _id: uid }, { $set: { isVerified: true }, $unset: { secretCode: secretCode } }, (err, response) => {
            if (err) {
                return res.render('verify-error', { error: err });
            }
            return res.render('verified');
        })
    })
}



