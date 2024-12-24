import { MongoClient } from 'mongodb';


export async function GET() {
    // Do whatever you want
    const client = new MongoClient(process.env.MONGODB_URI);
    try{
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db('DBTest');
    const collection = db.collection('tests');
    const users = await collection.find({}).toArray();
    return new Response(users, {
        status: 200
      })
    }
    catch (err) {
    console.error(err.stack);
    } 
    
  }

  export async function POST(request) {
    // Do whatever you want
    const client = new MongoClient(process.env.MONGODB_URI);
    try{
    await client.connect();
    console.log("Connected successfully to server");
    const formData = await request.formData()
    const name = formData.get('name')
    const age = formData.get('age')
    const db = client.db('DBTest');
    const collection = db.collection('tests');
    const insertResult = await collection.insertOne({ name, age });
    return new Response({insertResult}, {
        status: 200
    })
    }
    catch (err) {
    console.error(err.stack);
    } 
    
  }


