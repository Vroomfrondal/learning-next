// import { useEffect, useState } from 'react'
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
    // const [loadedMeetups, setLoadedMeetups] = useState<Record<string, string>[]>([])

    // Send HTTP Request for Data. This is the traditional client-side rendering method
    // useEffect(() => {
    //     setLoadedMeetups(DUMMY_MEETUPS)
    // }, [])

    return <MeetupList meetups={props.meetups} />
}

// This code only executes on server on build time. And never on client side. Must return object
// Instead of rendering client side
export function getStaticProps() {
    // fetch data from API
    return {
        props: {
            meetups: DUMMY_MEETUPS,
        },
    }
}
