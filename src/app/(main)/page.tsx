import './page.scss'
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import Link from 'next/link'
import Button from '@mui/material/Button';

export default function Home() {
  return (
    // TODO: make a very high quality picture for Image optimization
    // TODO: hover on and highlight figure
    <main className='main'>
      <Image
        fill={true}
        priority={true}
        src="https://standup-wiki.azureedge.net/images/background-1-min.webp"
        style={{
          objectFit: 'cover',
        }}
        alt="Picture of great comedians"
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
