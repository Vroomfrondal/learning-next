import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function NewMeetupPage() {
    const router = useRouter()

    const addMeetupHandler = async (enteredMeetupData: Record<string, string>) => {
        // internal api inside /api
        try {
            const request = await axios.post('/api/new-meetup', enteredMeetupData)
            const data = await request.data

            console.log(data)
            router.push('/') // to disable back button, use router.replace()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <Head>
                <title>Create a meetup</title>
                <meta name='description' content='Create any new meetup to start socializing!' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}
