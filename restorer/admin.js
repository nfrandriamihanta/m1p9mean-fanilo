const connect = require('../util/connect')
const token = require('../util/token')

exports.updateRestaurant = async function updateRestaurant(newRestaurantData) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        if (newRestaurantData.newData.password) {
            newRestaurantData.newData.password = token.hashPwd(newRestaurantData.newData.password)
        }
        result = await client.db(connect.dbName).collection('UserManager').updateOne({
            "restaurant.nom": newRestaurantData.ancienNom
        }, { $set: newRestaurantData.newData })
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

// newRestaurantData = {
//     "ancienNom": "restoUpdated",
//     "newData": {
//         "restaurant.nom": "testResto",
//         "restaurant.lieu": "testLieu",
//         "password": "12345"
//     }
// }
// updateRestaurant(newRestaurantData)

exports.addRestaurant = async function addRestaurant(newRestaurant) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        newRestaurant.password = token.hashPwd(newRestaurant.password)
        result = await client.db(connect.dbName).collection('UserManager').insertOne(newRestaurant)
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

// newResto = {
//     "username": "testResto",
//     "email": "testResto@gmail.com",
//     "password": "12345",
//     "restaurant": {
//         "nom": "testResto",
//         "lieu": "testLieu",
//         "description": "testDescription",
//         "specialite": "testSpecialite",
//     }
// }
// addRestaurant(newResto)

exports.deleteRestaurant = async function deleteRestaurant(condition) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('UserManager').deleteOne(condition)
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

// condition = {
//     "restaurant.nom": "restoUpdated"
// }
// deleteRestaurant(condition)


exports.calculateProfitsPerResto = async function calculateProfitsResto(data) {
    const client = connect.getClient()
    let result = null
    console.log(new Date())
    try {
        await client.connect()
        if (data.gte && data.lte) {
            result = await client.db(connect.dbName).collection('Order').aggregate([
                {
                    $match: {
                        "dateCommande": {
                            $gte: data.gte, $lte: data.lte
                        }
                    }
                },
                {
                    $group: { "_id": "$restaurant", "beneficeTotalResto": { $sum: "$beneficeTotal" }, "beneficeTotalEkaly": { $sum: "$beneficeEkaly" } }
                }
            ]).toArray()
        } else {
            result = await client.db(connect.dbName).collection('Order').aggregate([
                {
                    $group: { "_id": "$restaurant", "beneficeTotalResto": { $sum: "$beneficeTotal" }, "beneficeTotalEkaly": { $sum: "$beneficeEkaly" } }
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

// data = {
//     "gte": 1649289600000,
//     "lte": 1649635200000
// }
// calculateProfitsResto(data)
