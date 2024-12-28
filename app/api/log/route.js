import clientPromise from '@/lib/mongodb';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const latest = searchParams.get('latest');

    try {
        const client = await clientPromise;
        console.log("Connected successfully to server");

        const db = client.db('Log');
        if (id && latest) {
            const collection = db.collection(id);
            const today = new Date().toISOString().slice(0, 10);
            const logs = await collection.find({
                logdata: today
            }).toArray();

            if (logs.length === 0) {
                return new Response(JSON.stringify({ NoofSteps: 0, NoofCals: 0, activitysession: 0, activities: [] }), {
                    status: 200
                });
            } else if (logs.length === 1) {
                return new Response(JSON.stringify({
                    NoofSteps: logs[0].NoofSteps || 0,
                    NoofCals: logs[0].NoofCals || 0,
                    activitysession: logs[0].activitysession || 0,
                    activities: logs[0].activities || []
                }), {
                    status: 200
                });
            } else {
                const aggregatedLog = logs.reduce((acc, log) => {
                    acc.NoofSteps += log.NoofSteps || 0;
                    acc.NoofCals += log.NoofCals || 0;
                    acc.activitysession += log.activitysession || 0;
                    acc.activities = [...acc.activities, ...(log.activities || [])];
                    return acc;
                }, { NoofSteps: 0, NoofCals: 0, activitysession: 0, activities: [] });

                return new Response(JSON.stringify(aggregatedLog), {
                    status: 200
                });
            } 
        } else if (id) {
            const collection = db.collection(id);
            const logs = await collection.find({}).toArray();
            if (logs.length > 0)
                return new Response(JSON.stringify(logs), {
                    status: 200
                });
            else {
                return new Response(JSON.stringify({ message: "No log found" }), {
                    status: 404
                });
            }
        } else {
            const collections = await db.listCollections().toArray();
            const allLogs = await Promise.all(collections.map(async (collection) => {
                const logs = await db.collection(collection.name).find({}).toArray();
                return { _id: collection.name, logs };
            }));
            return new Response(JSON.stringify(allLogs), {
                status: 200
            });
        }
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500
        });
    } 
}

export async function POST(request) {
    const body = await request.json(); // Parse the stream as JSON
    try {
        const client = await clientPromise;
        console.log("Connected successfully to server");
        const db = client.db('Log');
        const collection = db.collection(body.id);
        const insertlog = await collection.insertOne(body);
        return new Response(JSON.stringify({ insertlog }), {
            status: 200
        });
    } catch (err) {
        console.error(err.stack);
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500
        });
    } 
}


