const connect = require('../util/connect')
const token = require('../util/token')

exports.updateDeliveryMan = async function updateDeliveryMan(newDeliveryManData) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        if (newDeliveryManData.newData.password) {
            newDeliveryManData.newData.password = token.hashPwd(newDeliveryManData.newData.password)
        }
        result = await client.db(connect.dbName).collection('UserManager').updateOne({
            "username": newDeliveryManData.ancienNom
        }, { $set: newDeliveryManData.newData })
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}


exports.addDeliveryMan = async function addDeliveryMan(newDeliveryMan) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        newDeliveryMan.password = token.hashPwd(newDeliveryMan.password)
        result = await client.db(connect.dbName).collection('UserManager').insertOne(newDeliveryMan)
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

// newDeliveryMan = {
//     "ancienNom": "admin2",
//     "newData": {
//         "username": "admin3",
//         "email": "admin3@gmail.com",
//         "password": "root",
//         "role": "admin"
//     }
// }
// updateDeliveryMan(newDeliveryMan)


exports.findDeliveryMan = async function findDeliveryMan(condition) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('UserManager').find(condition).toArray()
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

exports.deleteDeliveryMan = async function deleteDeliveryMan(condition) {
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


