export default function Product({ product, onClick }) {
  const {id, name, description} = product;

  return (
    <div onClick={onClick} class="flex flex-col flex-1 bg-neutral-200 hover:bg-neutral-300 ml-4 mt-4 px-4 py-4 rounded-3xl cursor-pointer">
      <h3 class="font-thin">#{id.toString().padStart(4,'0')}</h3>
      <h2 class="font-bold">{name}</h2>
      <p>{description}</p>
    </div>
  );
}
