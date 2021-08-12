import Head from 'next/head'
import { MongoClient } from 'mongodb'

import MeetupList from '../components/meetups/MeetupList'
import { Fragment } from 'react'

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://www.thaifly.com/image/data/img_thaifly/article/Japan/kyoto.jpg',
//         address: 'Some address 5,12345 Some City',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://photos.smugmug.com/Kyoto/Honeymoon-in-Kyoto/i-LdmsJPZ/0/26b66d84/XL/shutterstock_626644001-XL.jpg',
//         address: 'Some address 10,12345 Some City',
//         description: 'This is a second meetup!'
//     },
// ]

const HomePage = (props) => {

    return(
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='discription' content='Bla Bla Blaaa' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

// refrest every times that get data from server
// export const getServerSideProps = async (context) => {
//     const req = context.req;
//     const res = context.res;

//     //fetchData here
//     return{
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export const getStaticProps = async () => {
    //fetchData here

    const client = await MongoClient.connect('mongodb+srv://maxgies:YfwIYpeLqeHDocyA@cluster0.bvxyf.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db(); 

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return{
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address:  meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 10
    }
}

export default HomePage;