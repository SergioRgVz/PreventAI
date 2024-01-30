import { MongoClient } from 'mongodb';

export async function connectToCluster(uri) {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
 
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }

 export async function executeUserCrudOperations() {
    // const uri = process.env.DB_URI;
    const uri = "mongodb+srv://sergiorodriguezvazquez:2F8tvbJd69oScQ9h@preventaidb.ffgcgti.mongodb.net/?retryWrites=true&w=majority";
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
    } finally {
        await mongoClient.close();
    }
 }