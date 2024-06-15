import React from 'react'
import { CiFilter } from "react-icons/ci";
import { Input } from './ui/input';

const Search = () => {
    return (
        <div className='flex items-center gap-3'>
            <CiFilter
                size={24}
                color='#878B94'
            />
            <Input 
                type='text'
                placeholder='Buscar...'
            />
        </div>
    )
}

export default Search