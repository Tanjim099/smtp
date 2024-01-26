const express = require("express");
const cors = require("cors")
const bodyParser = require('body-parser');
const sendMail = require("./utils/sendMail");
require("dotenv").config()

const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and HTTP authentication to be sent cross-origin
    optionsSuccessStatus: 204, // Some legacy browsers (IE11) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.post("/sendmail", async (req, res) => {
    const { name, email, number, projectName } = req.body;
    if (!email || !name || !number) {
        res.status(501).send({
            success: false,
            message: "All fields are required"
        })
        return
    }
    const text = `Name:- ${name} \n Email:- ${email} \n Phone Number:- ${number}`;
    const subject = projectName || "Total Environment Over the Rainbow";
    sendMail(email, subject, text);
    res.status(200).send({
        success: true,
        message: "Email sent successfully"
    })
})

// const PORT = 8081;
app.listen(process.env.PORT, () => {
    console.log(`Server running on port no ${process.env.PORT}`)
});