import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export default component$(() => {
  const navigate = useNavigate();
  const id = useLocation().params.id;
  const character = useSignal({} as Character);
  console.log(id);
  useTask$(async () => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await res.json();
    character.value = data;
  });

  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-slate-800">
      <div class="flex max-w-xl flex-col bg-slate-500 gap-3 p-4 rounded text-white">
        <img src={character.value.image} alt={character.value.name} />
        <h3>Name: {character.value.name}</h3>
        <h3>Specie: {character.value.species}</h3>
        <h3
          class={{
            "text-green-400": character.value.status === "Alive",
            "text-red-400": character.value.status !== "Alive",
            "font-bold": true,
          }}
        >
          {character.value.status === "Alive" ? "Alive" : "Dead"}
        </h3>
        <button
          onClick$={() => {
            navigate(`/`);
          }}
          class="btn px-1 py-2 bg-red-400 text-white rounded-sm"
        >
          Back to home
        </button>
      </div>
    </div>
  );
});
