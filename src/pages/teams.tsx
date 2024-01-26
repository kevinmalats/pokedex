import { CircularProgress } from "@mui/material";
import React, {useState, useEffect} from "react";
import { getPokemons } from "~/HttpClient/fetchWrapper";
import { color } from "~/constans/color";
import { IPokemSave } from "~/types/IPokemon";



export default function Teams(){
    const [pokemonsTeams, setPokemonsTeams] = useState<IPokemSave[]>([]);
    const [nameUser, setNameUser] = useState<string>("");
    const getTeams = () => {
        const name:string | null= localStorage.getItem("nameUser");
        if(!name)
        return;
        setNameUser(name)
        const endpoint: string = "pokemons/teams/"+name
        getPokemons(endpoint).then(res => setPokemonsTeams(res) )
    }

    useEffect(()=>{
        getTeams();
    },[])
    return(
        <section className="bg-green-200 h-full m-auto mt-20 w-2/3  ">
            <h1 className="text-center py-20 text-3xl font-mono"> MY TEAMS</h1>
            {pokemonsTeams.length > 0 ?(
               <>
                  <ul className="grid grid-cols-6 grid-rows-3 gap-3 h-full ml-5">
                 {pokemonsTeams.map((pokTeam)=>(
                     <li className="h-full">
                         <div className={ (color[pokTeam.type || ""] || 'bg-gray-500') +" rounded w-2/3 h-4/5 shadow-sm h-full m-auto"}>
                             <img className="h-full" src={pokTeam.img}></img>
                         </div>
                         <h3 className="text-2sm text-center"><strong>{pokTeam.name}</strong></h3>
                     </li>
                 ))}
                 
             </ul>
             <h1 className="text-center font-sans text-4xl pb-5 capitalize">{nameUser}</h1>
               </>
            ):(
                 <div className="mx-auto text-center">
                    <CircularProgress />
                 </div>
            )}
           
        </section>
    )
}