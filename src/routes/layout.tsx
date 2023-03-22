import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="page">
      <main>
        <Slot />
      </main>
    </div>
  );
});
