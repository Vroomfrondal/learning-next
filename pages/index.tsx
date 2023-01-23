import { MongoClient } from 'mongodb'
import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'

export default function HomePage(props: Record<string, string[]>) {
    // Traditional client-side rendering method
    // const [loadedMeetups, setLoadedMeetups] = useState([])
    // useEffect(() => { setLoadedMeetups(DUMMY_MEETUPS) }, [])
    return (
        <>
            <Head>
                <title>NextJS Meetups</title>
                <meta name='description' content='Browse a list of meetups near you!' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
}

// This code only executes on server on build time. Never exposed/rendered on client. Must return an object.
export async function getStaticProps() {
    // mongo POST request for data
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGO_URL!)
    const db = client.db()
    const meetupsCollection = db.collection('learnnextjs')

    const meetups = await meetupsCollection.find().toArray()
    client.close()

    return {
        props: {
            meetups: meetups.map((meetup: Record<string, string>) => ({
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
            })),
        },
        revalidate: 1, // renews data every X seconds without having to rebuild
    }
}
