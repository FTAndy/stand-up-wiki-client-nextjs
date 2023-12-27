
import styles from './page.module.scss'
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import Link from 'next/link'
import Button from '@mui/material/Button';
import { getTop5Comedians } from '@/app/(main)/dbActions/homePage'

export const revalidate = 3600 * 24 * 7 // 1 week

// TODO: add role based access control https://authjs.dev/guides/basics/role-based-access-control
export default async function Home() {
  const top5Comedians = await getTop5Comedians()

  // TODO: build CI with 
  // github action https://github.com/vercel/examples/tree/main/ci-cd/github-actions

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
      { top5Comedians.map(c => {
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
