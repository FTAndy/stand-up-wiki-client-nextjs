'use client'
import {useState} from 'react';
import { useQuery } from '@tanstack/react-query'
import type {Comedian} from '@/types/comdian'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getComedianNames } from '../../service'
import {useComediansStore} from  '../../store/index'
import {getComedians} from '@/service/comedian'

interface ISearchProps {
}

const Search: React.FunctionComponent<ISearchProps> = (props) => {

  const {searchValue, setSearchValue} = useComediansStore()

  const { data: comedianNamesData = [] } = useQuery<Array<Pick<Comedian, 'name'>>>({
    queryKey: ['comedianName'],
    queryFn: getComedianNames
  })

  return <div className='search-area'>
    <Autocomplete
      disablePortal
      options={comedianNamesData?.map(s => {
        return {
          label: s.name,
        }
      })}
      value={{
        label: searchValue
      }}
      onChange={async (event, newValue) => {
        const value = newValue?.label || ''
        setSearchValue(value)
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search Comedian" />}
    /> 
</div>;
};

export default Search;
