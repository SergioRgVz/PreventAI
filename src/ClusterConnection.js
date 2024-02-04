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

 // This function creates a database and collection if they do not exist.
export async function executeUserCrudOperations() {
    const uri = process.env.DB_CODE_URI;
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('user');
        const collection = db.collection('tecnhicians');
        console.log('Connected to user.tecnhicians collection');
    let name = "joce antonio";
    // CREATE AN USER
    //    console.log('CREATE Technician');
    //    await createUserTechnician(collection, 'John Smith');
    //    await createUserTechnician(collection, 'Pepito Perez');

    //Find a user by name in the database
    console.log(await findTechnicianByName(collection, 'John Smith'));
    name = await findTechnicianByName(collection, 'Pepito Perez');

    // console.log('UPDATE Student\'s Password');
    // await updateTecnhiciansByName(collection, 'John Smith', { password: '1234' });
    // console.log(await findTechnicianByName(collection, 'John Smith'));

    // console.log('DELETE Student');
    // await deleteTecnhiciansByName(collection, 'John Smith');
    // await deleteTecnhiciansByName(collection, 'Pepito Perez');
    // console.log(await findTechnicianByName(collection, 'John Smith'));
    
    return name;

    } finally {
        await mongoClient.close();
    }
}

//Insert a single Technician into the collection
export async function createUserTechnician(collection, name) {
    const Tecnhician = {
        name: name,
        id_user: 1,
        password: '123456789',
    };

    await collection.insertOne(Tecnhician);
}

 //find  all technicians from the database
export async function findTechnicianByName(collection, name) {
    return collection.find({ name }).toArray();
}

 //update a single technician by name
export async function updateTecnhiciansByName(collection, name, updatedFields) {
    await collection.updateMany(
        { name },
        { $set: updatedFields }
    );
}

 //delete a single technician by name
export async function deleteTecnhiciansByName(collection, name) {
    await collection.deleteMany({ name });
}