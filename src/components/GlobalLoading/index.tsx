import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './index.module.scss';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return <div className={styles['gloabl-loading-container']}>
    <CircularProgress className={styles['loading']} />
  </div>;
};

export default App;
