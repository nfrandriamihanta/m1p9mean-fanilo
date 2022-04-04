const connect = require('../util/connect')
const token = require('../util/token')
const mailer = require('../util/mail')

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
        mailer.sendMail(user.email, {
            "subject": "Tu viens de prendre la meilleure décision de ta vie !!",
            "text": "Bonjour " + user.username + ", bienvenue chez E-Kaly! Profite du meilleur des resto de Madagascar sans bouger d'un pas"
        })
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

exports.orderFood = async function orderFood(order) {

    date = new Date()
    date.setHours(date.getHours() + 3)
    date = date.toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '')     // delete the dot and everything after
    console.log(date)
    Object.assign(order, { "dateCommande": date, "etat": "en attente" })
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('Order').insertOne(order)
        mailer.sendMail(order.client.email, {
            "subject": "Commande envoyée",
            "text": "Bonjour " + order.client.username + ", ta commande chez " + order.restaurant + " a été bien envoyée, elle est en attente de traitement"
        })
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        client.close()
    }
    return result
}

exports.findOrder = async function findOrder(user) {
    const client = connect.getClient()
    let result = null
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('Order').find(user).toArray()
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        client.close()
    }
    return result
}







