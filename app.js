// create an express app
const express = require("express")
const bodyParser = require("body-parser");
const router = express.Router();
const app = express()

const user = require("./user/user")
const restorer = require("./restorer/restorer")
const admin = require("./restorer/admin")
const deliver = require("./restorer/deliver")
const cors = require('cors');


app.use(cors({
    origin: '*'
}));
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use the express-static middleware
app.use(express.static("public"))

// add router in the Express app.
app.use("/", router);


// app.all('/*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });


// define the first route
router.get("/", function (req, res) {
    res.send("<h1>Server is working well!</h1>")
})

router.post("/connexion", async function (req, res) {
    let result = {}
    try {
        result = await user.signIn(req.body)
        console.log(result)
        if (result) res.status(200).json({
            "message": "Authentification réussie",
            "status": 200,
            "res": result
        })
        else res.status(200).json({
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

router.post("/inscription", async function (req, res) {
    let result = {}
    try {
        result = await user.signUp(req.body)
        console.log(result)
        if (result) res.status(200).json({
            "message": "Inscription réussie",
            "status": 200,
            "res": result
        })
        else res.status(200).json({
            "message": "Inscription échouée",
            "status": 400,
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": "Inscription échouée",
            "status": 400
        })
    }
})

router.get("/listeResto", async function (req, res) {
    let result = {}
    try {
        result = await user.findAllResto()
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/recherche", async function (req, res) {
    let result = {}
    try {
        result = await user.search(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.get("/resto/:resto", async function (req, res) {
    let result = {}
    try {
        result = await user.findRestoByName(req.params.resto)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/commander", async function (req, res) {
    let result = {}
    try {
        result = await user.orderFood(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/commande", async function (req, res) {
    let result = {}
    try {
        result = await user.findOrder(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/plat/modification", async function (req, res) {
    let result = {}
    try {
        result = await restorer.updateFood(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/commande/modification", async function (req, res) {
    let result = {}
    try {
        result = await restorer.updateOrder(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/commande/assignation", async function (req, res) {
    let result = {}
    try {
        result = await restorer.assignOrder(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/gestion-commandes", async function (req, res) {
    let result = {}
    try {
        result = await restorer.findOrder(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/benefice-resto", async function (req, res) {
    let result = {}
    try {
        result = await restorer.calculateProfits(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/ajout-restaurant", async function (req, res) {
    let result = {}
    try {
        result = await admin.addRestaurant(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/modification-restaurant", async function (req, res) {
    let result = {}
    try {
        result = await admin.updateRestaurant(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/suppression-restaurant", async function (req, res) {
    let result = {}
    try {
        result = await admin.deleteRestaurant(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})


router.post("/ajout-livreur", async function (req, res) {
    let result = {}
    try {
        result = await deliver.addDeliveryMan(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/modification-livreur", async function (req, res) {
    let result = {}
    try {
        result = await deliver.updateDeliveryMan(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/suppression-livreur", async function (req, res) {
    let result = {}
    try {
        result = await deliver.deleteDeliveryMan(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/livreur", async function (req, res) {
    let result = {}
    try {
        result = await deliver.findDeliveryMan(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})

router.post("/deconnexion", async function (req, res) {
    let result = {}
    try {
        result = await user.logOut(req.body)
        console.log(result)
        res.status(200).json({
            "status": 200,
            "res": result
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            "message": e,
            "status": 400
        })
    }
})


// start the server listening for requests
app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));