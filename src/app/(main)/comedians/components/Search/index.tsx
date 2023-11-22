'use client'
import {useState} from 'react';
import useSWR from 'swr'
import type {Comedian} from '@/types/comdian'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useComediansStore} from  '../../store/index'
import {getComedians} from '@/service/comedian'

interface ISearchProps {
}

const Search: React.FunctionComponent<ISearchProps> = (props) => {

  const {setPage, searchValue, comedianList, setComedianList, setGlobalLoading, setSearchValue} = useComediansStore()

  const { data: comedianNamesData = [] } = useSWR<Array<Pick<Comedian, 'name'>>>('/api/comedianNames')

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
        setPage(1)
        setGlobalLoading(true)
        const comedians = await getComedians({
          name: value
        })
        setComedianList([
          ...comedians,
        ])
        setGlobalLoading(false)
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search Comedian" />}
    /> 
</div>;
};

export default Search;
