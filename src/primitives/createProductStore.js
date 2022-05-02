import { createEffect, createMemo, createSignal, onMount } from "solid-js"

const STORAGE_KEY = 'product-store';

export default function createProductStore() {
  const [state, setState] = createSignal({})
  const [next, setNext] = createSignal(0)
  const list = createMemo(() => {
    const currentState = state()
    return Object.keys(currentState).map((k) => {return {...currentState[k], id: k}})
  })

  onMount(() => {
    const currentState = localStorage.getItem(STORAGE_KEY+'-state');
    if (currentState) {
      setState(JSON.parse(currentState));
    }
    const currentNext = localStorage.getItem(STORAGE_KEY+'-next');
    if (currentNext) {
      setNext(parseInt(currentNext));
    }

  })

  createEffect((initial) => {
    const currentState = state()
    if (!initial) {
      localStorage.setItem(STORAGE_KEY+'-state', JSON.stringify(currentState));
    }
    return false
  }, true)

  createEffect((initial) => {
    const currentNext = next()
    if (!initial) {
      localStorage.setItem(STORAGE_KEY+'-next', currentNext);
    }
    return false
  }, true)

  function add(name, description) {
    setState((oldState) => {
      const newItem = {
        name,
        description
      }
      return {...oldState, [next()]: newItem}
    })
    setNext((v) => v+1);
  }

  function edit(id, name=null, description=null) {
    setState((oldState) => {
      const editedItem = oldState[id]

      if (name) editedItem.name = name
      if (description) editedItem.description = description
      
      return {...oldState}
    })
  }

  function remove(id) {
    setState((oldState) => Object.keys(oldState).filter((k) => k != id).reduce((obj, key) => { obj[key] = oldState[key]; return obj }, {}))
  }

  return [list, add, edit, remove];
}