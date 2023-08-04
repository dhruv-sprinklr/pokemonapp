import React from 'react';
import Card from './Card';
import { useEffect, useState } from "react";

type pokemonFunc=(pokemonContainer:pokeInfo[])=>pokeInfo[]
type setPokemonContainer = (pokemonFunc:pokemonFunc)=>void;

type pokeInfo = {
    name: string,
    types: any[],
    image: string,
    id: number,
    height: number,
    weight: number
}
async function returnPokemonInfo(pokemon:{name:string, url:string},setPokemonContainer:any){
    fetch(pokemon.url)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            const pokeInfo = {
                name: data.name,
                types: data.types,
                image: data.sprites.front_default,
                id: data.id,
                height: data.height,
                weight: data.weight
            }
            setPokemonContainer((pokemonContainer:pokeInfo[])=>[...pokemonContainer, pokeInfo]);
        });
}


let stopEffect=false;
export default function Collection() {
    const [pokemonContainer, setPokemonContainer] = useState([] as pokeInfo[]);
    const [apiEndpoint, setApiEndpoint] = useState('https://pokeapi.co/api/v2/pokemon?limit=151' as string);
    useEffect(() => {
        console.log("fetching")
       if(!stopEffect){
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                for(let pokemon of data.results){
                     returnPokemonInfo(pokemon,setPokemonContainer);
                }
            });
       }
       return () => {stopEffect=true};
    }, [apiEndpoint]);

    return (
        <div className='Collection'>
            
            
            {   
                pokemonContainer.map((pokemon:pokeInfo,index:number) => {
                    return (
                       
                           <Card key={index} {...pokemon} />

                    )   
                })
            }
           
        </div>
    );
    
}
