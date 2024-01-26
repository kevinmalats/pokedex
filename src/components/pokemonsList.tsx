
import React from "react";
import { IPokemSave, PokemonDTO } from "~/types/IPokemon";
import {color} from "~/constans/color"

type Iprops = {
    pokemons:PokemonDTO[]
    handleEventClick:(pokemonSave: IPokemSave) => void;
}

export default function PokemonList(props:Iprops){
    const {pokemons, handleEventClick} = props;
  

return(
   <>
    {pokemons.length > 0 ?  <ul className="grid grid-cols-3  gap-3 w-full ">
        {pokemons.map((pokemon, index)=>(
            
            <li key={index}>
               <a onClick={()=> handleEventClick({name:pokemon.name, img:pokemon.sprites.front_default, type:pokemon?.types[0]?.type.name || ""})} className="cursor-pointer">
                    <div className="flex ">
                        <div className="grid grid-rows-3 gap-20 w-55 max-w-8 h-60 shadow-md  pl-2 ">
                            {/* Name */}
                            <div className=" mt-5">
                                <h4 className="text-3xl font-black">{pokemon.name}</h4>
                            </div>
                            {/* Attack Defense */}
                            <div className="w-full my-2  flex">
                              <div className="mx-2">
                                <div className="rounded-full  h-10 w-10 text-center border-2 border-black flex items-center ">
                                        <span className="m-auto font-black ">{pokemon.attack}</span>                                     
                                </div>
                               <div className=" opacity-70 "><label>Attack</label></div> 
                              </div>
                              <div className="mx-2">
                                <div className="rounded-full  h-10 w-10 text-center border-2 border-black flex items-center ">
                                        <span className="m-auto font-black">{pokemon.defense}</span>                                     
                                </div>
                               <div className=" opacity-70"><label>Defense</label></div> 
                              </div>
                            </div>
                              {/* Power */}
                            <div className=" flex ">
                                <div className="rounded-full bg-green-400 w-20 h-5 flex items-center text-center">
                                    <span className="m-auto my-2 text-xs">Grass</span>
                                </div>
                                <div className="rounded-full bg-blue-400 w-20 h-5 flex items-center text-center">
                                    <span className="m-auto my-2  text-xs ">Poison</span>
                                </div>
                            </div>
                        </div>
                    <div className={ (color[pokemon?.types[0]?.type.name || ""] || 'bg-gray-500') +" rounded  w-2/3 flex"}>
                        <img src={pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_default }
                          alt={pokemon.name} 
                           className=" h-30 m-auto w-60  max-h-28" />
                    </div>
                    </div>    
                </a>
        </li>
        ))}
    </ul>
    :<div className="text-center">
        <h1 className="text-7xl"> Resource Not Found</h1>
    </div>

    }
   </>
)
}