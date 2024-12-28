import clientPromise from '@/lib/mongodb';

export async function GET(req) {
    // Do whatever you want
    const { pathname } = req.nextUrl;
    const email = pathname.split('/').pop();

    try{
    const client = await clientPromise;
    console.log("Connected successfully to server");

    const db = client.db('Users');
    const collection = db.collection('User');
    const user = await collection.findOne({email : email});
    if (user)
    return new Response(JSON.stringify(user), {
        status: 200
      })
    else {
      
      return new Response(JSON.stringify({ message: "user not found" }) ,{
      status: 404
      })
    }
    }
    catch (err) {
      return new Response(JSON.stringify({ message: err.message }) ,{
        status: 500
      })
    } 
    
  }


  export async function POST(request) {
    // Do whatever you want
    const body = await request.json(); // Parse the stream as JSON


     try{
    const client = await clientPromise;
    console.log("Connected successfully to server");
    const db = client.db('Users');
    const collection = db.collection('User');
    const insertUser = await collection.updateOne({email:body.email},{$set:body},{upsert: true });
    return new Response({insertUser}, {
        status: 200
    })
    }
    catch (err) {
    console.error(err.stack);
    } 
    
  }


