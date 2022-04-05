const connect = require('../util/connect')

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
            "client.username": order.client,
            "dateCommande": order.dateCommande
        }, { $set: { "etat": order.etat } })
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}


// order = {
//     "client": "Ny Aina Fanilo",
//     "dateCommande": "2022-04-03 20:17:26",
//     "etat": "cours"
// }
// updateOrder(order)