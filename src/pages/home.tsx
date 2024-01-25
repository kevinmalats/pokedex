import React, {useState, useEffect, useRef} from "react";
import PokemonList from "~/components/pokemonsList";
import { PokemonDTO } from "~/types/IPokemon";
import Search from "~/components/search";
import { getPokemons } from "~/HttpClient/fetchWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import Switch from '@mui/material/Switch';


const endpoint:string = "pokemons" ;
export default function Home(){
    const [pokemons, setPokemons] = useState<PokemonDTO[]>([]);
    const [ searching, setSearching] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [checked, setChecked] = useState<boolean>(false);
    const offset= useRef<number>(0);
    const load= useRef<boolean>(false);

    const fetchPokemon =  async () => {
        if(!load.current){
            load.current = true;
            return
        }
        getPokemons(endpoint, `?limit=9&offset=${offset.current}`)
        .then((response)=> {
            offset.current = offset.current + 10
            setPokemons((prevList) => prevList.concat(response))
            
        }).catch((err)=> {
            console.log(err)
        }).finally(() => {
            console.log("finally")
           })
    }

    /* HANDLES  */
    const handleOnChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setSearching(event.target.value)
    }
    const handleKeyPress =  (event:React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            getPokemons(endpoint + "/" + searching).then((response)=> setPokemons(response))
        }
      }; 

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setChecked(!checked)
      }

    useEffect((()=>{
      fetchPokemon()
    }),[])


    

    return(
        <>
        <div className="absolute top-40  w-full ">
           <section className="mb-20">
            <h5 className="text-3xl text-center"> 800 <strong>Pokemons </strong>for you to choose your favorite</h5>
           </section>
            <section className="w-4/5 mx-auto">
             <Search handleKeyPress={handleKeyPress} handleOnChange={handleOnChange} searching={searching}/>
               
            </section>
            <section className="my-20 mx-auto  w-4/5">
           <div className="mb-10">
           <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />
            <label>Choose six Pokemons</label>
           </div>
                <InfiniteScroll 
                dataLength={pokemons.length} 
                next={fetchPokemon} 
                loader={ <p className="text-3xl text-center"> Loading Pokemon</p>}
                hasMore={loading}
                >
                    <PokemonList pokemons={pokemons}/>
                </InfiniteScroll>
                
            </section>
        </div>
      
         </>
    )
}