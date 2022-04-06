const connect = require('../util/connect')

async function updateRestaurant(newRestaurantData) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('UserManager').updateOne({
            "restaurant.nom": newRestaurantData.ancienNom
        }, { $set: newRestaurantData.newData })
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}


async function addRestaurant(newRestaurant) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('UserManager').insertOne(newRestaurant)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

async function deleteRestaurant(condition) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('UserManager').deleteOne(condition)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}