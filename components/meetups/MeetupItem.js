import { useRouter } from 'next/router'
import Image from 'next/image'

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {
  const router = useRouter();

  const showDetailHandler = () => {
    router.push(`/${props.id}`)
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <Image className={classes.inputImg} src={props.image} alt={props.title} width={800} height={450} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
