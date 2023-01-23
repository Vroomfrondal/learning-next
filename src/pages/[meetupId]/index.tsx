import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'
import MeetupDetail from '../../components/meetups/MeetupDetail'

export default function MeetupId(props: any) {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name='description'
                    content={`Checking out meetup ${props.meetupData.title}`}
                />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    )
}

// Required in dynamic pages where useRouter can't be used (inside next function props)
export async function getStaticPaths() {
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGO_URL!)
    const db = client.db()
    const meetupsCollection = db.collection('learnnextjs')

    const meetups = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray()
    client.close()

    return {
        fallback: 'blocking', // tells next that array contains all possible values. was false during development
        paths: meetups.map((meetup: Record<string, string>) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    }
}

// Since Data isn't changing often. Page pregenerated during build process.
export async function getStaticProps(context: any) {
    const meetupId = context.params.meetupId // matching folder name [meetupId]
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGO_URL!)
    const db = client.db()
    const meetupsCollection = db.collection('learnnextjs')

    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) })
    client.close()

    return {
        props: {
            meetupData: {
                id: selectedMeetup!._id.toString(),
                title: selectedMeetup!.title,
                address: selectedMeetup!.address,
                image: selectedMeetup!.image,
                description: selectedMeetup!.description,
            },
        },
    }
}
