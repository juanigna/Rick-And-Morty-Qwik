import { component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { DocumentHead, useNavigate } from "@builder.io/qwik-city";

interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null | number;
}

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
  const page = useSignal(1);
  const classOptions = useStore({
    color: "text-red-400",
  });
  const dataCharacters = useStore({
    info: {} as Info,
    characters: [] as Character[],
  });
  useTask$(async ({ track }) => {
    track(() => page.value);
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page.value}`
    );

    const data = await res.json();
    dataCharacters.characters = data?.results;
    dataCharacters.info = data?.info;
  });

  return (
    <>
      <div class="flex flex-col min-h-screen items-center justify-center min-w-[1200px] mx-auto bg-slate-800 text-white">
        <h3 class="text-3xl font-bold">Rick and Morty Characters</h3>
        <div class=" p-4 rounded-sm grid grid-cols-3 justify-center items-center w-9/12 gap-3">
          {dataCharacters.characters.map((ch) => (
            <div
              key={ch.id}
              class="flex max-w-xl flex-col bg-slate-500 gap-3 p-4 rounded text-white hover:bg-slate-400 transition-colors"
              onClick$={() => navigate(`character/${ch.id}`)}
            >
              <img src={ch.image} alt={ch.name} />
              <h3>Name: {ch.name}</h3>
              <h3>Specie: {ch.species}</h3>
            </div>
          ))}
        </div>
        <div class="flex gap-2 my-3 justify-center items-center">
          <button
            class={"btn px-1 py-2 bg-red-400 text-white rounded-sm "}
            onClick$={() => page.value--}
            disabled={page.value <= 1 ? true : false}
          >
            Prev page
          </button>
          <h2 class="rounded-[100%] bg-slate-400 text-black px-2 text-lg">
            {page.value}
          </h2>
          <button
            class="btn px-1 py-2 bg-red-400 text-white rounded-sm"
            onClick$={() => page.value++}
            disabled={page.value >= dataCharacters.info.pages ? true : false}
          >
            Next page
          </button>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Rick and Morty app",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
