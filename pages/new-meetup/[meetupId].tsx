/* eslint-disable @next/next/no-img-element */
import MeetupDetail from '../../components/meetups/MeetupDetail'

export default function MeetupId() {
    return (
        <MeetupDetail
            imageURL={
                'https://upload.wikimedia.org/wikipedia/commons/0/08/Frankfurter_Altstadt_mit_Skyline_2019.jpg'
            }
            alt={'test'}
            title={'First Meetup'}
            address={'123 Springfield Ln. City, St'}
            dsecription={"Viola, you're attending your first meetup"}
        />
    )
}
