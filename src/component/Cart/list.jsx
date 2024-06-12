function List({ id, imageSrc, productName, price, quantity, increaseQuantity, decreaseQuantity, removeFromCart }) {
  return (
    <tr className=" shadow-sm my-3">
      <td className="py-4 flex items-center">
        <img
          src={imageSrc}
          alt=""
          className="mr-3"
          width={"30px"}
          height={"30px"}
        />
        {productName}
      </td>
      <td className="py-4">${price}</td>
      <td className="py-4">
        <div className="flex items-center">
          <input
            type="number"
            className="w-12 h-8 border border-gray-400 rounded text-center"
            value={quantity}
            readOnly
          />
          <div className="flex flex-col">
            <button onClick={() => increaseQuantity(id)}>
              <i className="bi bi-arrow-up-short"></i>
            </button>
            <button onClick={() => decreaseQuantity(id)}>
              <i className="bi bi-arrow-down-short"></i>
            </button>
          </div>
        </div>
      </td>
      <td className="py-4">${(price * quantity).toFixed(2)}</td>
      <td>
        <button onClick={() => removeFromCart(id)}>
          <i className="bi bi-trash3"></i>
        </button>
      </td>
    </tr>
  );
}

export default List;
