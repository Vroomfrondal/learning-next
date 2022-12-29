import NewMeetupForm from '../../components/meetups/NewMeetupForm'

export default function NewMeetupPage() {
    const addMeetupHandler = (enteredMeetupData: any) => {
        console.log(enteredMeetupData)
    }

    return (
        <>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}
