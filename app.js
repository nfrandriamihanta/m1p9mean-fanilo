// create an express app
const express = require("express")
const bodyParser = require("body-parser");
const router = express.Router();
const app = express()

const user = require("./user/user")


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use the express-static middleware
app.use(express.static("public"))

// add router in the Express app.
app.use("/", router);

// define the first route
router.get("/", function (req, res) {
    res.send("<h1>Server is working well!</h1>")
})

router.post("/connexion", function (req, res) {
    let result = {}
    try {
        result = user.signIn(req.body)
        console.log(result)
        if (result) res.status(200).json({
            "message": "Authentification réussie",
            "status": 200,
            "res": result
        })
        else result.status(400).json({
            "message": "Authentification échouée",
            "status": 400,
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": "Authentification échouée",
            "status": 400
        })
    }
})

// start the server listening for requests
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));