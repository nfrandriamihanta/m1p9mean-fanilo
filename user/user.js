const connect = require('../util/connect')
const token = require('../util/token')

async function test() {
    const client = connect.getClient()
    try {
        await client.connect()
        await connect.listDatabases(client)
    } catch (e) {

    } finally {
        client.close()
    }
}

exports.signIn = async function signIn(user) {
    const client = connect.getClient()
    date = null
    let result = {}
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('UserManager').findOne(user)
        if (result) {
            date = Date()
            result.token = token.generateToken(result.username, date)
            await client.db(connect.dbName).collection('UserManager').updateOne({
                "username": result.username,
                "password": result.password
            }, { $set: result })
        }
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}


exports.signUp = async function signUp(user) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('UserManager').insertOne(user)
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

exports.findAllResto = async function findAllResto() {
    const client = connect.getClient()
    let result = null
    let filter = { "role": "restaurateur" }
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('UserManager').find(filter).toArray()
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

exports.findRestoByName = async function findRestoByName(name) {
    const client = connect.getClient()
    let result = null
    let filter = { "restaurant.nom": name }
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('UserManager').findOne(filter)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}


exports.search = async function search(filter) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('UserManager').find(filter).toArray()
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

// search({ "role": "restaurateur", "restaurant.nom": { '$regex': "^venus$", "$options": "i" } })




