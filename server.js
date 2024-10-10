const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config();

const userModel = require('./models/Users')
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI


const app = express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/contact', async (req, res) => {
    const { email, message } = req.body;

    try {
        let user = await userModel.findOne({ email });
        if (user) {
            user.message?.push(message);
            await user.save();
            return res.status(200).json({
                message: "Message added successfully",
                insertedId: user._id
            });
        } else {
            const new_contact = new userModel(req.body);
            const result = await new_contact.save();

            return res.status(201).json({
                message: "The user was added successfully",
                insertedId: result._id
            });
        }

    } catch (error) {
        res.status(500).json({
            error: "An error occurred: " + error.message
        })
    }
})

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on port: ", PORT)
    })
})
