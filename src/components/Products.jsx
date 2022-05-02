import { createSignal, For } from "solid-js";
import createProductStore from "../primitives/createProductStore";

export default function Products() {
  const [list, add, edit, remove] = createProductStore();

  return (
    <div id="solid" class="counter">
      <button onClick={() => {add('hello', 'kitty')}}>-</button>
      <For each={list()} fallback={<div>Loading...</div>}>
        {(item) => <div><h1>{item.name}</h1><p>{item.description}</p><button onClick={() => remove(item.id)}>DELETE THIS</button></div>}
      </For>
    </div>
  );
}
