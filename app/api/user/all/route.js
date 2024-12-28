import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        console.log("Connected successfully to server");

        const db = client.db('Users');
        const collection = db.collection('User');
        const users = await collection.find({}, { projection: { name: 1, image: 1 } }).toArray();
        return new Response(JSON.stringify(users), {
            status: 200
        });
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500
        });
    }
}
