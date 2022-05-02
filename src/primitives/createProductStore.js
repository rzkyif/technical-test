import { createEffect, createMemo, createSignal, onMount } from "solid-js"

const STORAGE_KEY = 'product-store';
const TEST_DATA = {
  1: {
    name: 'Apple',
    description: 'A very common fruit found literally everywhere'
  },
  2: {
    name: 'Orange',
    description: 'Another very common fruit found literally everywhere'
  },
  3: {
    name: 'Cat Toy',
    description: 'A very fun item for your cat'
  },
  4: {
    name: 'Tablet',
    description: 'A very weird stone tablet belonging to an ancient civilization'
  },
  5: {
    name: 'Smartphone',
    description: 'A very useful tool that can be addicting to some people'
  },
  6: {
    name: 'Couch',
    description: 'An instrument of resting that is very useful'
  },
  7: {
    name: 'Car',
    description: 'A useful transportation method for when it is raining'
  },
  8: {
    name: 'Speakers',
    description: 'A sound-amplifying device commonly used to play music'
  },
  9: {
    name: 'Battery',
    description: 'A commonly used storage and source of electricity'
  }
}
const TEST_NEXT = 100

export default function createProductStore() {
  const [state, setState] = createSignal({})
  const [next, setNext] = createSignal(0)
  const list = createMemo(() => {
    const currentState = state()
    return Object.keys(currentState).map((k) => {return {...currentState[k], id: k, description: currentState[k].description.length > 24 ? currentState[k].description.slice(0,21) + '...' : currentState[k].description}})
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

  function get(id) {
    return {...state()[id], id}
  }

  function add(name, description) {
    const id = next()
    setState((oldState) => {
      const newItem = {
        name,
        description
      }
      return {...oldState, [id]: newItem}
    })
    setNext((v) => v+1)
    return id
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

  function test() {
    setState(TEST_DATA)
    setNext(TEST_NEXT)
  }

  return [list, add, get, edit, remove, test];
}