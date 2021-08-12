import { useRouter } from 'next/router'
import { Fragment } from 'react';
import Head from 'next/head'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetupPage = () => {
    const router = useRouter();

    const addMeetupHandler = async (enteredMeetupData) => {
        const responce = await fetch('/api/new-meetup',{
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await responce.json();
        console.log(data)

        router.push('/');
    }

     return(
         <Fragment>
            <Head>
                <title>ADD NEW Meetup</title>
                <meta name='discription' content='Add Bla Bla Blaaa' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
         </Fragment>
    )
}

export default NewMeetupPage;