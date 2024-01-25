import React from "react";
import { IPokemSave } from "~/types/IPokemon";
import DeleteIcon from '@mui/icons-material/Delete';
import {color} from "~/constans/color"
type IProps ={
    pokemonsSelected:IPokemSave[];
    handleRemove: (name:string) => void;
}
export default function PokemonsSelectd (props:IProps){
    const { pokemonsSelected, handleRemove } = props;
    console.log(pokemonsSelected.length)
    return(
        <section className="h-90 shadow-md w-60 border py-4">
            <h4 className="text-center font-mono text-2sm"><strong>Your Pokemons Selected</strong></h4>
            <ul className="pl-3 font-serif text-2sm pt-4">
            {pokemonsSelected.map((pokemSelected) => (
                    <li className="grid  grid-cols-3 gap-3 my-2">
                    <label>{pokemSelected.name}</label>
                    <div className={(color[pokemSelected.type])+" rounded-full h-10 w-10 ml-4"}> 
                    <img className=""  src={pokemSelected.img} alt={pokemSelected.name} /></div>
                   <div className="cursor-pointer" onClick={()=>handleRemove(pokemSelected.name)}> 
                        <DeleteIcon/>
                   </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}