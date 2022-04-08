const connect = require('../util/connect')

exports.updateRestaurant = async function updateRestaurant(newRestaurantData) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
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
//     "ancienNom": "testResto",
//     "newData": {
//         "restaurant.nom": "restoUpdated",
//         "restaurant.lieu": "lieuUpdated"
//     }
// }
// updateRestaurant(newRestaurantData)

exports.addRestaurant = async function addRestaurant(newRestaurant) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
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