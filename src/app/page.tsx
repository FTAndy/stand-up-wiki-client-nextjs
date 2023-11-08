import './page.scss'
import Typography from '@mui/material/Typography';
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
          <Button variant="contained">Find Comedians</Button>
          <Button variant="contained">Watch Free Specials</Button>
        </div>
      </div>
    </main>
  )
}
