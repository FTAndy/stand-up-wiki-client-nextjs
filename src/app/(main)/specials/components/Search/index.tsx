'use client'
import {useCallback} from 'react';
import TextField from '@mui/material/TextField';
import debounce from 'lodash/debounce'
import {useSpecials} from '../../store';
import axios from 'axios';
import type {Special} from '@/types/comdian'

interface ISearchSpecialProps {
}

const SearchSpecial: React.FunctionComponent<ISearchSpecialProps> = (props) => {
  const {setSearchValue, setPage, setIsGlobalLoading, setSpecialList } = useSpecials()

  const debouncedOnChange = useCallback(debounce(async (newValue: string) => {
    const value = newValue || ''
    setSearchValue(value)
    setPage(1)
    setIsGlobalLoading(true)
    const res = await axios<{data: Array<Special>}>(`/api/specials?page=0&name=${value}`)
    const data = res.data
    setSpecialList([
      ...data.data,
    ])
    setIsGlobalLoading(false)
  }, 500), [])

  return <div className='search-area'>
    <TextField
      // value={searchValue}
      onChange={(event) => {
        console.log('change', event.target.value)
        debouncedOnChange(event.target.value);
      }}
      sx={{ width: 300 }}
      label="Search Special Name"
      variant="outlined"
    />        
  </div>;
};

export default SearchSpecial;
