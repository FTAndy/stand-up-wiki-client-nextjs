import {useRef, useState, useEffect} from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { useGlobalStore } from '@/app/(main)/store'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';

enum tabState {
  comment,
  wiki
}


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Typography>{children}</Typography>
      )}
    </div>
  );
}


interface ITabProps {
}

const TabComponent: React.FunctionComponent<ITabProps> = (props: ITabProps) => {
  const { playingSpecial, currentComedian, setCurrentComedian } = useGlobalStore()
  const [curTab, setCurTab] = useState<tabState>(tabState.wiki)
  const wikiElement = useRef<HTMLDivElement>(null) 


  useEffect(() => {
    console.log(currentComedian, wikiElement.current, curTab === tabState.wiki)
    // Only proceed if the current comedian has wiki details and the ref is attached to an element
    if (currentComedian?.AIGeneratedContent?.wikiDetail && wikiElement.current && curTab === tabState.wiki) {
      // Check if the element can have a shadow root and doesn't already have one
      if (wikiElement.current.shadowRoot === null) {
        try {
          const shadow = wikiElement.current.attachShadow({ mode: 'closed' });
          const wikiContainer = document.createElement("section");
          wikiContainer.innerHTML = currentComedian.AIGeneratedContent.wikiDetail;
          shadow.appendChild(wikiContainer);

          // Return a cleanup function
          return () => {
            // Ensure the shadow root still exists
            if (wikiElement.current && wikiElement.current.shadowRoot) {
              const shadowRoot = wikiElement.current.shadowRoot;
              // Use shadowRoot.contains to ensure the element is still in the shadow DOM
              if (shadowRoot.contains(wikiContainer)) {
                shadowRoot.removeChild(wikiContainer);
              }
            }
          };
        } catch (error) {
          console.error('Error attaching shadow root:', error);
        }
      } else {
        console.warn('Shadow root already exists for this element.');
      }
    }
  }, [curTab, currentComedian]);
  
  return <div className='tab-container'>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={curTab} 
          onChange={(event: React.SyntheticEvent, newValue: tabState) => {
            setCurTab(newValue);
          }}>
          <Tab label="Comment"  />
          <Tab label="Wikipedia"  />
        </Tabs>
      </Box>
      {/* <CustomTabPanel value={curTab} index={0}>
        { playingSpecial && currentComedian &&
          <div className='discuss-secion'>
            <DiscussionEmbed
                shortname='standupwiki'
                config={
                    {
                        // TODO: change to active thread
                        url: window.location.href,
                        identifier: `${currentComedian._id}_${playingSpecial.specialName}`,
                        title: `${currentComedian.name}_${playingSpecial.specialName}`,
                        // language: 'zh_TW' //e.g. for Traditional Chinese (Taiwan)	
                    }
                }
            />   
          </div>
          }
      </CustomTabPanel> */}
      <CustomTabPanel value={curTab} index={1}>
        <div ref={wikiElement}>
        </div>
      </CustomTabPanel>

  </div>;
};

export default TabComponent;
