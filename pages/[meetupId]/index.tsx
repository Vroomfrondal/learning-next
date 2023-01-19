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
            description={'Viola, your first meetup.'}
        />
    )
}

// Required in dynamic pages where useRouter can't be used (inside next function props)
export async function getStaticPaths() {
    return {
        fallback: false, // tells next that array contains all possible values.
        paths: [{ params: { meetupId: '1' } }, { params: { meetupId: '2' } }],
    }
}

// Since Data isn't changing often. Page pregenerated during build process.
export function getStaticProps(context: any) {
    const meetupId = context.params.meetupId // matching folder name [meetupId]

    console.log(context)
    console.log(meetupId)
    return {
        props: {
            meetupData: {
                image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Frankfurter_Altstadt_mit_Skyline_2019.jpg',
                id: meetupId,
                title: 'First meetup',
                address: '123 Springfield Ln. City, St',
                description: 'Viola, your first meetup.',
            },
        },
    }
}
