import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import axios from 'axios'
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
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}
