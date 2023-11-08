import './page.scss'
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <main className='main'>
      <div className='cover'></div>
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
