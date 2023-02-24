import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { sanityClient, urlFor } from "../sanity"

export default function Home({ pets }) {

  console.log(pets)
  //console.log(pets[0].image.asset._ref)
  return (
    <div className={styles.container}> 
      {pets.map(x =>  <div style={{marginTop: '35px'}}><img style={{maxWidth: '300px'}} src={urlFor(x.image.asset._ref)}></img><h4>{x.name}</h4></div>)}
    </div>
  )
}

export const getServerSideProps = async () => {

  //get all pets and all owners
  //const query = `*[ _type == "pet"]  {..., owner->}`

  //get all pets that have Mary Jane as an owner 
  const query = `*[ _type == "pet" && owner-> name == "Mary Jane"]`   
  const pets = await sanityClient.fetch(query)

  if (!pets.length) {
    return {
      props: {
        pets: [],
      },
    }
  } else {
    return {
      props: {
        pets,
      },
    }
  }
}
