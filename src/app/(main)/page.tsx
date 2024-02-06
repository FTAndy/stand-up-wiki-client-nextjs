
import styles from './page.module.scss'
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import Link from 'next/link'
import Button from '@mui/material/Button';
import { cache } from 'react'
import { getTop5Comedians } from '@/dbService/getTop5Comedians'

export const revalidate = 3600 * 24 * 7 // 1 week

const backgroundMap = {
  0: 'https://standup-wiki.azureedge.net/images/1-george-carlin.jpeg',
  1: 'https://standup-wiki.azureedge.net/images/1-chappelle.jpeg',
  2: 'https://standup-wiki.azureedge.net/images/1-louis-min.jpeg',
  3: 'https://standup-wiki.azureedge.net/images/1-bill-min.jpeg',
  4: 'https://standup-wiki.azureedge.net/images/1-Richard-min.jpeg',
} as const

// TODO: add role based access control https://authjs.dev/guides/basics/role-based-access-control
export default async function Home() {
  const top5Comedians = await getTop5Comedians()
  // TODO: add speical attached songs
  // TODO: responsive design https://mui.com/material-ui/react-grid/
  // TODO: refresh the some special subtitle, some special subtitle missing in the database even if there is a subtitle in opensubtitle
  return (
    <main className={styles.main}>

      { top5Comedians.map((c, index) => {
        return <div
          style={{
            left: `${(index) * 20}%`,
          }}
          key={c.id}
          className={styles.backgroundImage}
        >
          <Image
            fill={true}
            priority={true}
            src={backgroundMap[index as keyof typeof backgroundMap]}
            style={{
              objectFit: 'cover',
            }}
            alt="Picture of great comedians"
          />
          <Link
            href={`/profile/${c.comedianId}`}
            className={styles.cover}
          />
        </div>
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
