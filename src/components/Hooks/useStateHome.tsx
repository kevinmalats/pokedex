import { useRef, useState } from "react";
import { getPokemons, saveTeam } from "~/HttpClient/fetchWrapper";
import { IPokemSave, PokemonDTO, RequestPostSave } from "~/types/IPokemon";

const endpoint:string = "pokemons" ;
 export default function UsestateHome(){
    const [pokemons, setPokemons] = useState<PokemonDTO[]>([]);
    const [pokemonsSelected, setPokemonsSelectd] = useState<IPokemSave[]>([]);
    const [ searching, setSearching] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [checked, setChecked] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const offset= useRef<number>(0);
    const load= useRef<boolean>(false);

    const validatePokemsSelected = (newPokem: IPokemSave) =>{
        //console.log(pokemonsSelected.indexOf(newPokem))
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
        saveTeam(endpoint,dataSave).then((response)=> console.log(response));
    }

    const searchPokemon = () =>{
        if(searching === ""){
           setLoading(true)
            offset.current = 0;
            fetchPokemon();
            return;
        }
        getPokemons(endpoint + "/" + searching).then((response)=> setPokemons(response));
        setLoading(false)
    }
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
 }