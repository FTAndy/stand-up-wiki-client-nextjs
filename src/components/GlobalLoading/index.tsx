import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './index.scss'

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return <div className='gloabl-loading-container'>
    <CircularProgress className='loading' />
  </div>;
};

export default App;
