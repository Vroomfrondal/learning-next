// POST request to /api/new-meetup URL

import { MongoClient } from 'mongodb'

// Basic API route which will insert meetups in out DB
async function handler(request: any, response: any) {
    if (request.method === 'POST') {
        const data = await request.body
        // const { title, image, address, description } = data

        try {
            // This file isn't ever rendered client side anyway... but still keep it out of source
            const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGO_URL!)
            const db = client.db()
            const meetupsCollection = db.collection('learnnextjs')

            const result = await meetupsCollection.insertOne(data)
            console.log(result)
            client.close()

            // Send HTTP Status after closing connection
            await response.status(201).json({ message: 'Meetup created in DB!' })
        } catch (err) {
            console.log(err)
        }
    }
}

export default handler
