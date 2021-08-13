import Image from 'next/image'
import classes from './MeetupDetail.module.css'

const MeetupDetail = (props) => {
    return(
        <section className={classes.detail}>
            <Image className={classes.inputimg} src={props.image} alt={props.title}  width={800} height={450} />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    )
}

export default MeetupDetail;