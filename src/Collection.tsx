import Card from "./Card";
import { useEffect, useState, SetStateAction } from "react";
import Modal from "./Modal";

type pokeInfo = {
  name: string;
  type: string;
  image: string;
  id: number;
  height: number;
  weight: number;
  ability: string;
  move: string;
};
async function returnPokemonInfo(
  pokemon: { name: string; url: string },
  setPokemonContainer: any
) {
  await fetch(pokemon.url)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      const pokeInfo = {
        name: data.name,
        type: data.types[0].type.name,
        image: data.sprites.front_default,
        id: data.id,
        height: data.height,
        weight: data.weight,
        ability: data.abilities[0].ability.name,
        move: data.moves[0].move.name,
      };
      setPokemonContainer((pokemonContainer: pokeInfo[]) => [
        ...pokemonContainer,
        pokeInfo,
      ]);
    });
}

export default function Collection() {
  const [pokemonContainer, setPokemonContainer] = useState([] as pokeInfo[]);
  const [apiEndpoint, setApiEndpoint] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=30" as string
  );
  const [showModal, setShowModal] = useState(<div></div>);
  const [isLoading, setIsLoading] = useState(false);
  let stopEffect = false;
  //console.log("rendering");
  async function fetchData() {
    setIsLoading(true);
    console.log("loading start");
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then(async (data) => {
        for (let pokemon of data.results) {
          await returnPokemonInfo(pokemon, setPokemonContainer);
        }
        console.log("loading end", data.next);
        setApiEndpoint(data.next);
      })
      .then(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    //console.log("fetching",apiEndpoint)
    if (!stopEffect) {
      fetchData();
      return () => {
        stopEffect = true;
      };
    }
  }, []);

  useEffect(() => {
    const detectEscKey = window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setShowModal(<div></div>);
      }
    });
    return () => {
      window.removeEventListener("keydown", detectEscKey);
    };
  }, []);

  function renderModal(pokemon: pokeInfo | null) {
    console.log("rendering modal");
    if (pokemon) setShowModal(<Modal {...{ pokemon, renderModal }} />);
    else setShowModal(<div></div>);
  }

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight - 1200 ||
      isLoading
    )
      return;

    console.log("fetching more");
    fetchData();
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="Collection">
      {pokemonContainer.map((pokemon: pokeInfo, index: number) => {
        return <Card key={index} {...{ pokemon, renderModal }} />;
      })}
      {showModal}
    </div>
  );
}
