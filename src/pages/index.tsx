"use client"
import React, {useState, useEffect, useRef} from "react";
import PokemonList from "~/components/pokemonsList";
import { IPokemSave, PokemonDTO, RequestPostSave } from "~/types/IPokemon";
import Search from "~/components/search";
import { getPokemons, saveTeam } from "~/HttpClient/fetchWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import Switch from '@mui/material/Switch';
import PokemonsSelectd from "~/components/pokemonsSelected";
import CustomModal from "~/components/modal";
import CircularProgress from '@mui/material/CircularProgress';

const endpoint:string = "pokemons" ;
export default function Home(){
    const [pokemons, setPokemons] = useState<PokemonDTO[]>([]);
    const [pokemonsSelected, setPokemonsSelectd] = useState<IPokemSave[]>([]);
    const [ searching, setSearching] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [checked, setChecked] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const offset= useRef<number>(0);
    const load= useRef<boolean>(false);

    const changeStateSelected = (name:string):Promise<void> => {
      return new Promise((resolve,reject) => {
        const listPokemons : PokemonDTO[] = [...pokemons];
        const poke:PokemonDTO | undefined =  listPokemons.find((e) => e.name === name);
        if(poke) {
          poke.selected = !(poke.selected);
          if(!poke.selected){
            removePokemonFromSelected(poke.name)
            reject()
          }
          console.log(poke.selected)
          setPokemons(listPokemons)
         resolve() 
        } 
      })
    
    }

    const validatePokemsSelected = (newPokem: IPokemSave) =>{
        return pokemonsSelected.length < 6 &&
         validateIsExistPokemon(newPokem.name) && 
         validateTypePokemon(newPokem.type)  ;
    }
    const validateIsExistPokemon = (name:string) => {
        return  pokemonsSelected.map(pok => pok.name).indexOf(name) === -1
    }
    const validateTypePokemon = (type:string) => {
        return  pokemonsSelected.map(pok => pok.type).indexOf(type) === -1
    }

    const saveTeamPokemon = (name:string) =>{
        const dataSave:RequestPostSave = {name,pokemons: pokemonsSelected}
        saveTeam(endpoint,dataSave).then((response)=> {
          setIsSaved(true)
          setIsLoading(false)
        });
    }

    const searchPokemon = () =>{
        if(searching === ""){
           setLoading(true)
            offset.current = 0;
            fetchPokemon();
            return;
        }
        getPokemons(endpoint + "/" + searching).then(response=> setPokemons(response));
        setLoading(false)
    }
    const fetchPokemon =  async () => {
      console.log(load.current)
        if(!load.current){
            load.current = true;
            return
        }
        console.log("getting pokemon")
        getPokemons(endpoint, `?limit=9&offset=${offset.current}`)
        .then((response)=> {
            offset.current = offset.current + 10;
            const responseMapped: PokemonDTO[] = response.map((r:PokemonDTO)=>{
              return{
                selected:false,
                ...r
              }
            })
            console.log(responseMapped)
            setPokemons((prevList) => prevList.concat(responseMapped))
            
        }).catch((err)=> {
            console.log(err)
        }).finally(() => {
            console.log("finally")
           })
    }


    const removePokemonFromSelected = (name:string) => {
      const pokemonFilter: IPokemSave[] = pokemonsSelected.filter(pok => pok.name !== name)
      setPokemonsSelectd(pokemonFilter)
    }

    /* HANDLES  */
    const handleOnChange = (event:React.ChangeEvent<HTMLInputElement>) => {

        setSearching(event.target.value)
    }
    const handleKeyPress =  (event:React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          searchPokemon()
        }
      }; 

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setChecked(!checked)
      }

      const handleClickEvent = (pokem:IPokemSave) =>{
        if(!checked){
            return
        }
        console.log(pokem.selected, true)
        if(validatePokemsSelected(pokem) || pokem.selected){
          changeStateSelected(pokem.name).then(() =>  setPokemonsSelectd((preventList) => preventList.concat(pokem)) )
        
      
      }
        console.log(pokemonsSelected)
      }
      const handleRemove = (name:string) => {
        removePokemonFromSelected(name)
      }

      const handleClickSearch = () => {
        searchPokemon()
      }

      const handleSave = (name: string) => {
        setIsLoading(true)
        localStorage.setItem("nameUser",name)
        saveTeamPokemon(name)
      
      };

    useEffect((()=>{
      console.log("useEffect activado")
      fetchPokemon()
    }),[])


    

    return(
        <>
        <div className="absolute top-40  w-full ">
           <section className="mb-20">
            <h5 className="text-3xl text-center"> 800 <strong>Pokemons </strong>for you to choose your favorite</h5>
           </section>
            <section className="w-4/5 mx-auto">
             <Search handleClick={handleClickSearch} handleKeyPress={handleKeyPress} handleOnChange={handleOnChange} searching={searching}/>
               
            </section>
            <section className="my-20 mx-auto  w-4/5">
           <div className="mb-10">
            <div className="mb-5">
            {pokemonsSelected.length > 0 && <PokemonsSelectd handleRemove={handleRemove} pokemonsSelected={pokemonsSelected}/> }
            {pokemonsSelected.length === 6 && <button className="mt-5 w-60 h-10 bg-green-500 rounded px-py text-zinc-100" onClick={()=>setModalOpen(true)}> Save Your Team </button> }
            </div>
            <CustomModal loading={isLoading} isSaved={isSaved} isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)} onSave={handleSave} />
           <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />
            <label className="text-sm font-mono">Choose your six Pokemons</label>
           </div>
                <InfiniteScroll 
                dataLength={pokemons.length} 
                next={fetchPokemon} 
                loader={ <p className="text-3xl text-center mt-5">  <CircularProgress /></p>}
                hasMore={loading}
                >
                  <PokemonList pokemons={pokemons} handleEventClick={handleClickEvent}/>
                
                </InfiniteScroll>
              
                
            </section>
        </div>
      
         </>
    )
}