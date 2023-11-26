import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Rating from '@mui/material/Rating';
import { Special } from '@/types/comdian'
import { useGlobalStore } from '@/app/(main)/store'
import { CardActionArea } from '@mui/material';
import './index.scss'

interface Props {
  className?: string
  special: Special,
  onClick?: () => void
}

export default function MediaControlCard(props: Props) {
  const { special, className, onClick } = props
  const { specialDetail, specialName, comedianName } = special
  const { coverImgURL, datetime, runtimeDuration, rating } = specialDetail
  const theme = useTheme();

  const {setPlayingSpecial} = useGlobalStore(state => state)

  return (
    <Card className={` ${className}`} sx={{ display: 'flex' }}>
      <CardActionArea 
        onClick={() => {
          setPlayingSpecial(special)
          onClick?.()
        }} 
        className='comedian-card'
      >
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={coverImgURL}
          // alt=""
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent className='body' sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              { specialName }
            </Typography>
            <Typography component="div" variant="subtitle1">
              { comedianName }
            </Typography>
            <Typography className='datetime' variant="subtitle1" component="div">
              { datetime }
            </Typography>
            <Typography className='duration' variant="subtitle1" component="div">
              { runtimeDuration }
            </Typography>
            <Typography component="legend">{parseFloat(rating)} stars</Typography>
            <Rating 
              size='large'
              name="half-rating-read" 
              defaultValue={parseFloat(rating)} 
              precision={0.5} 
              max={10} 
              readOnly 
            />
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}