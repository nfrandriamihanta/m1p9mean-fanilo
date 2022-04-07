const connect = require('../util/connect')
const mailer = require('../util/mail')

exports.updateFood = async function updateFood(newFoodData) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('UserManager').updateOne({
            "restaurant.nom": newFoodData.restaurant.nom
        }, { $set: { "restaurant.plat": newFoodData.restaurant.plat } })
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

// newFoodData = {
//     "username": "ANDRIAMAMONJY",
//     "email": "andriamamonjy@gmail.com"
//     , "password": "12345",
//     "role": "restaurateur",
//     "restaurant":
//     {
//         "nom": "Venus",
//         "lieu": "67Ha",
//         "description": "Venus est un petit restaurant spécialisé dans les plats de cuisine chinoise notamment le fameux mine sao",
//         "specialite": "Cuisine chinoise",
//         "plat": [{
//             "nom": "Mine sao simple",
//             "prix": 5000,
//             "benefice": 2000
//         }, {
//             "nom": "Mine sao poulet",
//             "prix": 10000,
//             "benefice": 5000
//         },
//         {
//             "nom": "Mine sao crevette",
//             "prix": 12000, "benefice": 6000
//         },
//         {
//             "nom": "Mine sao spéciale",
//             "prix": 15000,
//             "benefice": 7000
//         },
//         {
//             "nom": "Soupe atody",
//             "prix": 2000,
//             "benefice": 1000
//         }
//             , {
//             "nom": "Soupe garnie"
//             , "prix": 12000,
//             "benefice": 6000
//         },
//         {
//             "nom": "Soupe garnie spéciale"
//             , "prix": 15000,
//             "benefice": 7000
//         }]
//     }
// }

// updateFood(newFoodData)

exports.updateOrder = async function updateOrder(order) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('Order').updateOne({
            "client.username": order.client.username,
            "dateCommande": order.dateCommande
        }, { $set: { "etat": order.etat } })
        mailer.sendMail(order.client.email, {
            "subject": "Changement d'état de la commande",
            "text": "Bonjour " + order.client.username + ", ta commande chez " + order.restaurant + " a été changé en commande " + order.etat
        })
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}


exports.findOrder = async function findOrder(filter) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('Order').find(filter).toArray()
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        client.close()
    }
    return result
}

// findOrder({
// "restaurant": "Venus",
// "etat": "en attente"
// })

// order = {
//     "client": "Ny Aina Fanilo",
//     "dateCommande": "2022-04-03 20:17:26",
//     "etat": "cours"
// }
// updateOrder(order)

// async function findOrderBtwDates(gte, lte, restaurant, client) {
//     let result = null
//     try {
//         result = await client.db(connect.dbName).collection('Order').find({
//             "dateCommande": {
//                 $gte: ISODate(gte), $lte: ISODate(lte)
//             },
//             "restaurant": restaurant
//         }).toArray()
//         console.log(result)
//     } catch (e) {
//         console.error(e)
//     } finally {

//     }
//     return result
// }

// function sumBenefice(listOrder, beneficiaire) {
//     let result = 0
//     for (order of listOrder) {
//         if (beneficiaire === "restaurant")
//             result += order.beneficeTotal
//         if (beneficiaire === "ekaly")
//             result += order.beneficeEkaly
//     }
//     return result
// }

// async function findBenefice(filter) {
//     const client = connect.getClient()
//     let result = null
//     try {
//         await client.connect()
//         let listOrder = await findOrderBtwDates(filter.gte, filter.lte, filter.restaurant, client)
//         if (result.length !== 0) {
//             result = sumBenefice(listOrder, filter.beneficiaire)
//         }
//     } catch (e) {
//         console.error(e)
//     } finally {
//         client.close()
//     }
//     return result
// }

exports.calculateProfits = async function calculateProfits(data) {
    const client = connect.getClient()
    let result = null
    console.log(new Date())
    try {
        await client.connect()
        if (data.gte && data.lte) {
            result = await client.db(connect.dbName).collection('Order').aggregate([
                {
                    $match: {
                        "restaurant": data.restaurant, "dateCommande": {
                            $gte: data.gte.getTime(), $lte: data.lte.getTime()
                        }
                    }
                },
                {
                    $group: { "_id": "$dateCommande", "beneficeTotalResto": { $sum: "$beneficeTotal" }, "beneficeTotalEkaly": { $sum: "$beneficeEkaly" } }
                }
            ]).toArray()
        } else {
            console.log("tsy misy filtre")
            result = await client.db(connect.dbName).collection('Order').aggregate([
                {
                    $match: {
                        "restaurant": data.restaurant
                    }
                },
                {
                    $group: { "_id": "$dateCommande", "beneficeTotalResto": { $sum: "$beneficeTotal" }, "beneficeTotalEkaly": { $sum: "$beneficeEkaly" } }
                }
            ]).toArray()
        }

        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        client.close()
    }
    return result
}
