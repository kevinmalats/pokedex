
import React from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
type Iprops = {
    searching:string;
    handleOnChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyPress:(event:React.KeyboardEvent<HTMLInputElement>) => void;
    handleClick:() => void;

}

export default function Search(props:Iprops){
    const {searching, handleKeyPress, handleOnChange, handleClick} = props 
    return (
        <>
            <div className="w-full mx-auto">
            <label  className="relative block">  
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <SearchRoundedIcon onClick={handleClick}/>
                </span>
                <input 
                value={searching}
                onChange={handleOnChange}
                onKeyDown={handleKeyPress}
                className="shadow-md px-7 text-secundary placeholder:italic placeholder:text-slate-500  py-2 w-full border rounded-full" 
                type="text" placeholder="Search your pokemon"/>

                </label>
        </div>
        </>
    )
}