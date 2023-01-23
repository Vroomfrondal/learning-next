/* eslint-disable @next/next/no-img-element */
import { MongoClient, ObjectId } from 'mongodb'
import MeetupDetail from '../../components/meetups/MeetupDetail'

export default function MeetupId(props: any) {
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
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
        fallback: false, // tells next that array contains all possible values.
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
    console.log('test: ', selectedMeetup)

    // return { props: { meetupData: JSON.stringify(selectedMeetup) } }
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
