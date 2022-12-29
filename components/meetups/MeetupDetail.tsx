/* eslint-disable @next/next/no-img-element */
import classes from './MeetupDetail.module.css'

export default function MeetupDetail(props: any) {
    return (
        <section className={classes.detail}>
            <img src={props.imageURL} alt={props.alt} />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    )
}
