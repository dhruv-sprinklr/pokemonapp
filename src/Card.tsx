import { PollingWatchKind } from 'typescript';
import './Card.css';
import React, { useEffect, useRef, useState, useMemo, MutableRefObject } from 'react';
import Modal from './Modal';
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

function useOnScreen(ref:React.RefObject<HTMLDivElement>) {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = useMemo(() => new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    ), [])
  
  
    useEffect(() => {
      if(ref.current)observer.observe(ref.current)
      return () => observer.disconnect()
    }, [observer,ref])
  
    return isIntersecting
  }


export default function Card(params:any) {
    const pokemon = params.pokemon;
    const returnModal = params.returnModal;
    const cardElement = useRef<HTMLDivElement>(null);
    const isOnScreen = useOnScreen(cardElement);
    console.log(pokemon);
  
    return (
        <div className='card' ref={cardElement}>
            <h2>#{pokemon.id} {pokemon.name} </h2>
            {isOnScreen&&<img src={pokemon.image} alt={pokemon.name} />}
            <div className="Description">
                <p>Height: {pokemon.height} </p>
                <p>Weight: {pokemon.weight}</p>
                <button onClick={()=>{returnModal(pokemon)}}>Learn More</button>
                
            </div>
        </div>
    )
}