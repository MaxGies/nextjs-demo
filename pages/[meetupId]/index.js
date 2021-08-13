import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head'
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = (props) => {
    return(
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="discription" content={props.meetupData.description} />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    );
}

export const getStaticPaths = async () => {
    const client = await MongoClient.connect('mongodb+srv://maxgies:YfwIYpeLqeHDocyA@cluster0.bvxyf.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db(); 

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return{
        fallback: 'blocking', //if route not match and fallback is false then 404
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() }})),
    }
}

export const getStaticProps = async (context) => {
    //fetchData here

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://maxgies:YfwIYpeLqeHDocyA@cluster0.bvxyf.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db(); 

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

    client.close();
    
    return{
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
            },
        }
    }
}

export default MeetupDetails;