import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUPS = [
    {
        id: '1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Frankfurter_Altstadt_mit_Skyline_2019.jpg',
        address: '1235 Majestic Ridge City, St',
        description: 'This is my first meetup!',
    },
    {
        id: '2',
        title: 'A Second Meetup',
        image: 'https://cdn.britannica.com/01/701-050-5323A0DD/Romer-town-hall-Germany-Frankfurt-am-Main.jpg',
        address: '512 Stanford Ln, City, St',
        description: 'This is my second meetups',
    },
    {
        id: '3',
        title: 'A Third Meetup',
        image: 'https://cdn.britannica.com/18/167918-050-72648AF8/Night-view-Romerberg-Germany-Frankfurt-am-Main.jpg',
        address: '91293 Cherry Ridge City, St',
        description: 'This is my third meetups',
    },
    {
        id: '4',
        title: 'A Fourth Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Brandberg_Mountain_Panorama.jpg/1024px-Brandberg_Mountain_Panorama.jpg',
        address: '91293 Cherry Ridge City, St',
        description: 'This is my fourth meetups',
    },
]

export default function HomePage(props: Record<string, string[]>) {
    // Traditional client-side rendering method
    // const [loadedMeetups, setLoadedMeetups] = useState([])
    // useEffect(() => { setLoadedMeetups(DUMMY_MEETUPS) }, [])
    return <MeetupList meetups={props.meetups} />
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
