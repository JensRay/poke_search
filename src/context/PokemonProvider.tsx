import { ReactNode } from 'react'

import PokemonContext from './PokemonContext';

interface Props {children?: ReactNode}

const PokemonProvider = ({children}: Props) => {
  return (

    <PokemonContext.Provider value={{
      // filterSearchedPokes:''
      searchedPhrase: '', setSearchedPhrase: ''
    }}>
{children}
  </PokemonContext.Provider>
    )
}

export default PokemonProvider;
