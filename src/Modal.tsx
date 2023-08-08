import React from "react";
import './Modal.css';

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

  export default function Modal(pokemon:pokeInfo){
    return(
        <div className="modalParent">
            <div className="modal">
                <h2>#{pokemon.id} {pokemon.name} </h2>
                <img src={pokemon.image} alt={pokemon.name} />
                <div className="Description">
                    <p>Height: {pokemon.height} </p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Ability: {pokemon.ability}</p>
                    <p>Move: {pokemon.move}</p>
                    <p>Type: {pokemon.type}</p>
                </div>
            </div>
        </div>
    )
  }