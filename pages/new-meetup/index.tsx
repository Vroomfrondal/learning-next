import NewMeetupForm from '../../components/meetups/NewMeetupForm'

export default function NewMeetupPage() {
    const addMeetupHandler = async (enteredMeetupData: Record<string, string>) => {
        console.log(enteredMeetupData)
        // request to API route (internal api inside /api)
        const response = await fetch('/api/new-meetup')
    }

    return (
        <>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}
