const { MongoClient } = require('mongodb')
const dbName = "E-Kaly"
exports.dbName = dbName

exports.getClient = function getClient() {
    const uri = "mongodb+srv://nfrandria:dreamcomestrue@m1p9mean-fanilo.vaxze.mongodb.net/E-kaly?retryWrites=true&w=majority"
    const client = new MongoClient(uri)
    return client
    // try {
    //     await client.connect()
    //     await listDatabases(client)
    // } catch (e) {
    //     console.error(e)
    // } finally {
    //     await client.close()
    // }
}

exports.listDatabases = async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    databasesList.databases.forEach(db => {
        console.log(db.name)
    })
}
