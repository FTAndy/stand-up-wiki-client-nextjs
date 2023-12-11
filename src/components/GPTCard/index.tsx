import * as React from 'react';
import './index.scss'

interface IGPTCardProps {
  description: string;
  avatarUrl: string;
  name: string;
  url: string;
}


const GPTCard: React.FunctionComponent<IGPTCardProps> = (props) => {
  const {
    description,
    avatarUrl,
    name,
    url
  } = props;
  return <div className='GPT-card-container'>
    {}
  </div>;
};

export default GPTCard;
