import "./Modal.css";

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

export default function Modal({
  pokemon,
  renderModal,
}: {
  pokemon: pokeInfo;
  renderModal: (pokemon: pokeInfo | null) => void;
}) {
  function backgroundClick(e: any) {
    if (e.target.className === "modalParent") {
      renderModal(null);
    }
  }
  return (
    <div
      className="modalParent"
      onClick={(e) => {
        backgroundClick(e);
      }}
    >
      <div className="modal">
        <h2>
          #{pokemon.id} {pokemon.name}{" "}
        </h2>
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
  );
}
