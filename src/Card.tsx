import './Card.css';
import React, { useEffect, useRef, useState, useMemo, MutableRefObject } from 'react';


function useOnScreen(ref:React.RefObject<HTMLDivElement>) {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = useMemo(() => new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    ), [ref])
  
  
    useEffect(() => {
      if(ref.current)observer.observe(ref.current)
      return () => observer.disconnect()
    }, [ref])
  
    return isIntersecting
  }


export default function Card(pokemon:{name:string, image:string,height:number,weight:number,id:number}) {
    const cardElement = useRef<HTMLDivElement>(null);
    const isOnScreen = useOnScreen(cardElement);
  
    return (
        <div className='card' ref={cardElement}>
            <h2>#{pokemon.id} {pokemon.name} </h2>
            {isOnScreen&&<img src={pokemon.image} alt={pokemon.name} />}
            <div className="Description">
                <p>Height: {pokemon.height} </p>
                <p>Weight: {pokemon.weight}</p>
            </div>
        </div>
    )
}