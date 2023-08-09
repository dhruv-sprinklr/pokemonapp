import './Card.css';
import React, { useEffect, useRef, useState, useMemo, MutableRefObject } from 'react';
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

    // const [isIntersecting, setIntersecting] = useState(false)
  
    // const observer = useMemo(() => new IntersectionObserver(
    //   ([entry]) => setIntersecting(entry.isIntersecting)
    // ), [])
  
  
    // useEffect(() => {
    //   if(ref.current)observer.observe(ref.current)
    //   return () => observer.disconnect()
    // }, [observer,ref])
  
    // return isIntersecting
  }


export default function Card({pokemon,renderModal}:{pokemon:pokeInfo,renderModal:(pokemon:pokeInfo)=>void}) {

    const cardElement = useRef<HTMLDivElement>(null);
    const isOnScreen = useOnScreen(cardElement);
    console.log(pokemon);
  
    return (
        <div className='card' ref={cardElement}>
            <h2>#{pokemon.id} {pokemon.name} </h2>
            <img src={pokemon.image} loading="lazy" alt={pokemon.name} />
            <div className="Description">
                <p>Height: {pokemon.height} </p>
                <p>Weight: {pokemon.weight}</p>
                <button onClick={()=>{renderModal(pokemon)}}>Learn More</button>   
            </div>
        </div>
    )
}