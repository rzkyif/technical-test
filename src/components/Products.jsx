import { createSignal, For, onMount } from "solid-js"
import createProductStore from "../primitives/createProductStore"
import Product from "./Product"

const DEFAULT_PRODUCT = {
  id: null,
  name: "", 
  description: ""
}

export default function Products() {
  const [list, add, get, edit, remove, test] = createProductStore()
  const [currentModal, setCurrentModal] = createSignal(false)
  const [currentProduct, setCurrentProduct] = createSignal(DEFAULT_PRODUCT)

  onMount(() => {
    document.addEventListener('keydown', (e) => {
      const modal = currentModal()
      const product = currentProduct()
      if (e.key == 'Escape') {
        closeModal()
      } else if (e.key == 'Enter') {
        if (modal == 'view') {
          closeModal()
        } else if (modal == 'edit') {
          e.preventDefault()
          saveProduct()
        }
      } else if (e.key == 'Delete' && modal == 'view' && product.id != null) {
        deleteProduct(product.id)
      } 
    })
  })

  function addProduct() {
    setCurrentProduct(DEFAULT_PRODUCT)
    setCurrentModal('edit')
  }

  function viewProduct(id) {
    if (id == null) {
      closeModal()
    } else {
      setCurrentProduct(get(id))
      setCurrentModal('view')
    }
  }

  function editProduct(id) {
    setCurrentProduct(get(id))
    setCurrentModal('edit')
  }

  function saveProduct() {
    const product = currentProduct();
    let id = product.id
    if (id === null) {
      id = add(product.name, product.description)
    } else {
      edit(id, product.name, product.description)
    }
    viewProduct(id)
  }

  function deleteProduct(id) {
    remove(id);
    setCurrentModal(false)
  }

  function closeModal() {
    setCurrentModal(false)
  }

  return (
    <div id="products" class="flex flex-col min-h-[50vh]">
      <div id="products-modal-view" class={`fixed inset-0 flex flex-col justify-center items-center bg-black/20 backdrop-blur-md ${currentModal()=="view" ? '' : 'hidden'}`}>
        <div class="relative flex flex-col py-8 px-6 m-4 min-w-[50vw] min-h-[50vh] bg-neutral-200 rounded-3xl">
          <h2>#{currentProduct().id ? currentProduct().id.toString().padStart(4,'0') : ''}</h2>
          <h1 class="text-2xl mt-4">{currentProduct().name}</h1>
          <p class="mt-4">{currentProduct().description}</p>
          <div class="flex mt-auto text-lg font-bold">
            <button class="pl-4 font-bold hover:underline" onClick={() => editProduct(currentProduct().id)}>Edit</button>
            <button class="pl-4 font-bold hover:underline" onClick={() => deleteProduct(currentProduct().id)}>Delete</button>
            <button class="pl-4 ml-auto font-bold hover:underline" onClick={() => closeModal()}>Close</button>
          </div>
        </div>
      </div>
      <div id="products-modal-edit" class={`fixed inset-0 flex flex-col justify-center items-center bg-black/20 backdrop-blur-md ${currentModal()=="edit" ? '' : 'hidden'}`}>
        <div class="relative flex flex-col py-8 px-6 m-4 min-w-[50vw] min-h-[50vh] bg-neutral-200 rounded-3xl">
          <label class="mb-2 font-bold" for="products-modal-name">Product Name</label>
          <input id="products-modal-name" class="mb-4 p-2" type="text" placeholder="e.g. Apple" 
            value={currentProduct().name} 
            onInput={(e) => setCurrentProduct((oldProduct) => {return {...oldProduct, name: e.currentTarget.value}})}>
          </input>
          <label class="mb-2 font-bold" for="products-modal-description">Product Description</label>
          <textarea id="products-modal-description" class="mb-4 p-2" placeholder="e.g. A bright red fruit that is sweet and tasty" 
            value={currentProduct().description}
            onInput={(e) => setCurrentProduct((oldProduct) => {return {...oldProduct, description: e.currentTarget.value}})}>
          </textarea>
          <div class="mt-auto ml-auto text-lg font-bold">
            <button class="pl-4 font-bold hover:underline" onClick={() => saveProduct()}>Save</button>
            <button class="pl-4 font-bold hover:underline" onClick={() => viewProduct(currentProduct().id)}>Cancel</button>
          </div>
        </div>
      </div>
      <div id="products-topbar" class="flex text-4xl">
        <h1 class="">Products</h1>
        <button class="ml-auto font-bold" onClick={() => addProduct()}>+</button>
      </div>
      <ul id="products-list" class="px-4 py-8 flex flex-wrap">
        <For each={list()}>
          {(product) => <Product product={product} onClick={() => viewProduct(product.id)}/>}
        </For>
      </ul>
      <button onClick={() => test()}>Inject Test Data</button>
    </div>
  );
}
