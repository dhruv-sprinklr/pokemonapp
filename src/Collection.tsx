import React from 'react';
import Card from './Card';
import { useEffect, useState } from "react";
import { type } from 'os';
import Modal from './Modal';

type pokemonFunc=(pokemonContainer:pokeInfo[])=>pokeInfo[]
type setPokemonContainer = (pokemonFunc:pokemonFunc)=>void;

type pokeInfo = {
    name: string,
    type: string,
    image: string,
    id: number,
    height: number,
    weight: number,
    ability: string,
    move: string
}
async function returnPokemonInfo(pokemon:{name:string, url:string},setPokemonContainer:any){
     await fetch(pokemon.url)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            const pokeInfo = {
                name: data.name,
                type: data.types[0].type.name,
                image: data.sprites.front_default,
                id: data.id,
                height: data.height,
                weight: data.weight,
                ability: data.abilities[0].ability.name,
                move: data.moves[0].move.name

            }
            setPokemonContainer((pokemonContainer:pokeInfo[])=>[...pokemonContainer, pokeInfo]);
        });
}


let stopEffect=false;
export default function Collection() {
    const [pokemonContainer, setPokemonContainer] = useState([] as pokeInfo[]);
    const [apiEndpoint, setApiEndpoint] = useState('https://pokeapi.co/api/v2/pokemon?limit=151' as string);
    const [showModal,setShowModal]=useState(<div></div>);
    useEffect(() => {
        console.log("fetching")
       if(!stopEffect){
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(async (data) => {
                for(let pokemon of data.results){
                    await returnPokemonInfo(pokemon,setPokemonContainer);
                }
            });
       }
       return () => {stopEffect=true};
    }, [apiEndpoint]);

    useEffect(()=>{
        const detectEscKey = window.addEventListener("keydown", (e) => {
            if(e.key === "Escape"){
                setShowModal(<div></div>);
            }
        });
        return () => {window.removeEventListener("keydown",detectEscKey)};
    },[]);

    function returnModal(pokemon:pokeInfo){
        console.log("returning modal");
        setShowModal(<Modal {...pokemon}/>);
    }

    return (
        <div className='Collection'>
            
            
            {   
                pokemonContainer.map((pokemon:pokeInfo,index:number) => {
                    return (
                           <Card key={index} {...{pokemon,returnModal}} />
                    )   
                })
            }
            {showModal}
           
        </div>
    );
    
}
