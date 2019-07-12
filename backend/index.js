const express    = require("express");
const cors       = require("cors");
const bodyParser = require("body-parser");
const webpush = require('web-push')
//svE1mZfISzUGe8b5Mm7rcNCDTCixxImbcWH3yBH0SCE

//feVGGKFbWoI:APA91bGJ-XMvA6BOpfl06K9o4oLPZEBJcDNMeaBregQ4lgD4pFDgp5vLmbsa0jaGP2b9FQutwYVkq22SPO971U3Fote6QpHIzVWPs7J02iuHb9YiXsAwPbmrXEFrpECt7yn7PVdM7Dj4
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 4000;
const vapidKeys = {
    publicKey:
        'BDcEZIZj3WnoBxVGqL713C7XauAj-vXuFfGvruKJlS8vfK5afi-ZaWokNHghVc1cADMkhOX9ZPTSs5yiEmKBsMI',
    privateKey: 'svE1mZfISzUGe8b5Mm7rcNCDTCixxImbcWH3yBH0SCE',
};

webpush.setVapidDetails(
    'mailto:myuserid@email.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)


app.get("/", (req, res) => res.send("Hello World!"));

const dummyDb = {subscription : null}; //dummy in memory store

const saveToDatabase = async subscription => {
    // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
    // Here you should be writing your db logic to save it.
    dummyDb.subscription = subscription;
};

// The new /save-subscription endpoint
app.post("/save-subscription", async (req, res) => {
    const subscription = req.body;
    console.log(req.body);
    await saveToDatabase(subscription); //Method to save the subscription to Database
    res.json({message : "success"});
});

//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend) => {
    webpush.sendNotification(subscription, dataToSend)
}
//route to test send notification
app.get('/send-notification', (req, res) => {
    console.log(dummyDb.subscription)
    const subscription = dummyDb.subscription //get subscription from your databse here.
    const message = 'Hello World'
    sendNotification(subscription, message)
    res.json({ message: 'message sent' })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
