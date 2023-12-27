
import styles from './page.module.scss'
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import {getMongoDbClient} from '@/service/mongo-client'
import Link from 'next/link'
import Button from '@mui/material/Button';
import { Comedian } from '@/types/comdian';

// export const dynamic = 'force-static'

// TODO: add role based access control https://authjs.dev/guides/basics/role-based-access-control
export default async function Home() {
  const MongoClient = await getMongoDbClient()

  const Database = MongoClient.db("standup-wiki");
  const Comedian = Database.collection("comedian");

  const orderedNames = ['George Carlin', 'Dave Chappelle', 'Louis C.K.', 'Bill Burr', 'Richard Pryor'];

  // TODO: cache to redis
  const comedians = await Comedian.find<Comedian>({
    name: { $in: orderedNames }
  }).toArray()

  const sortedComedians = orderedNames.map(name => comedians.find(comedian => comedian.name === name)).filter(comedian => comedian !== undefined);

  const comedianCovers = sortedComedians.map((s, index) => {
    return {
      id: index,
      comedianId: s?._id.toString(),
    }
  })

  // TODO: add check https://vercel.com/docs/observability/checks-overview
  return (
    <main className={styles.main}>
      <Image
        fill={true}
        priority={true}
        src="https://standup-wiki.azureedge.net/images/comedians-4x-min.jpeg"
        style={{
          objectFit: 'cover',
        }}
        alt="Picture of great comedians"
      />
      { comedianCovers.map(c => {
        return <Link
          href={`/profile/${c.comedianId}`} 
          key={c.id} 
          className={styles.cover} 
          style={{
            left: `${(c.id) * 20}%`,
          }}
        />
      }) }
      <div className={styles.content}></div>
      <div className={styles.headline}>
        <Typography variant="h1" gutterBottom>
          Just Standup
        </Typography>
        <Typography variant="h1" gutterBottom>
          Specials For Free
        </Typography>
        <div className={styles.buttons}>
          <Link href='/comedians'>
            <Button variant="contained">Find Comedians</Button>
          </Link>
          <Link href='/specials'>
            <Button variant="contained">Watch Free Specials</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
