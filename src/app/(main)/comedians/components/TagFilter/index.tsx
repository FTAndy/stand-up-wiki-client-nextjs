'use client'
import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useComediansStore} from '../../store';

interface ITagFilterProps {
}

const limitedGenres = [
  'Blue', 
  'Improvisational', 
  'Political', 
  'Satirical', 
  'Deadpan', 
  'Cringe', 
  'Dark', 
  'Surreal', 
  'Anecdotal', 
  'One-liner', 
  'Slapstick', 
  'Situational', 
  'Absurdist', 
  'Clean', 
  'Shock', 
  'Nerd', 
  'Cultural', 
  'Storytelling', 
  'Impressionist', 
  'Sardonic', 
  'Parodic', 
  'Self-deprecating'
].map(s => {
  return {title: s}
})


const TagFilter: React.FunctionComponent<ITagFilterProps> = (props) => {
  const {tagList, setTagList, setGlobalLoading, setComedianList, setPage} = useComediansStore()

  return <div className='tagFilter-container'>
    <Autocomplete
      multiple
      id="tags"
      value={(tagList || []).map(v => {
        return {
          title: v
        }
      })}
      onChange={async (event, newValue) => {
        event.preventDefault()
        setTagList([
          ...newValue.map(s => s.title)
        ]);
      }}
      options={limitedGenres}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.title}
            {...getTagProps({ index })}
            key={option.title}
          />
        ))
      }
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Tags" placeholder="Tags" />
      )}
    />
  </div>;
};

export default TagFilter;
