import './page.scss'
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import Link from 'next/link'
import Button from '@mui/material/Button';

export default function Home() {
  return (
    // TODO: Image optimization
    // TODO: hover on and highlight figure
    <main className='main'>
      <Image
        fill={true}
        priority={true}
        src="https://andycdn-fndbfaewgxbve2ha.z01.azurefd.net/images/background-1-min.webp"
        style={{
          objectFit: 'cover',
        }}
        alt="Picture of the comedians"
      />
      <div className='cover'>
      </div>
      <div className='headline'>
        <Typography variant="h1" gutterBottom>
          Just Standup
        </Typography>
        <Typography variant="h1" gutterBottom>
          Specials For Free
        </Typography>
        <div className='buttons'>
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
