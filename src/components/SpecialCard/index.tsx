import { useTheme } from '@mui/material/styles';
import styles from './index.module.scss'
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
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import { CardActionArea } from '@mui/material';


interface Props {
  special: Special,
  onClick?: () => void
}

export default function MediaControlCard(props: Props) {
  const { special, onClick } = props
  const { specialDetail, specialName, comedianName, TMDBInfo } = special
  const { coverImgURL, datetime, runtimeDuration, rating } = specialDetail
  const theme = useTheme();

  const {setPlayingSpecial} = useGlobalStore(state => state)

  return (
    <Card sx={{ display: 'flex' }}>
      <CardActionArea
        onClick={() => {
          setPlayingSpecial(special)
          onClick?.()
        }}
        className={styles['comedian-card']}
      >
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={coverImgURL}
          // alt=""
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent className={styles['body']} sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              { specialName }
            </Typography>
            <Typography component="div" variant="subtitle1">
              { comedianName }
            </Typography>
            <Typography className={styles['datetime']} variant="subtitle1" component="div">
              { datetime }
            </Typography>
            <Typography className={styles['duration']} variant="subtitle1" component="div">
              { runtimeDuration }
            </Typography>
            <Typography component="legend">{parseFloat(rating)} stars</Typography>
            { TMDBInfo?.vttSubtitle ? <ClosedCaptionIcon /> : '' }
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
