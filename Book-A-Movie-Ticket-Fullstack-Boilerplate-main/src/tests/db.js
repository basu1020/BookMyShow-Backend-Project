const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongod = new MongoMemoryServer()

let isConnected = false

exports.connect = async () => {
    if (isConnected) {
        return
    }
    const uri = await mongod.getUri()
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    await mongoose.connect(uri, mongooseOpts)
    isConnected = true
}

exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoose.disconnect()
    await mongod.stop()
    isConnected = false
}

exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections
    for (const key in collections){
        const collection = collections[key]
        collection.deleteMany()
    }
}