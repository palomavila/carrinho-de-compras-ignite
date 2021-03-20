import React from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';

import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.amount * product.price),
  }));
  const total = formatPrice(
    cart.reduce((sumTotal, { amount, price }) => sumTotal + amount * price, 0),
  );

  function handleProductIncrement(productId: number, amount: number) {
    updateProductAmount({
      productId,
      amount,
    });
  }

  function handleProductDecrement(productId: number, amount: number) {
    updateProductAmount({
      productId,
      amount,
    });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cart.length ? (
            cartFormatted.map(
              ({ id, title, image, amount, priceFormatted, subTotal }) => (
                <tr key={id} data-testid="product">
                  <td>
                    <img src={image} alt={title} />
                  </td>
                  <td>
                    <strong>{title}</strong>
                    <span>{priceFormatted}</span>
                  </td>
                  <td>
                    <div>
                      <button
                        type="button"
                        data-testid="decrement-product"
                        disabled={amount <= 1}
                        onClick={() => handleProductDecrement(id, amount - 1)}
                      >
                        <MdRemoveCircleOutline size={20} />
                      </button>
                      <input
                        type="text"
                        data-testid="product-amount"
                        readOnly
                        value={amount}
                      />
                      <button
                        type="button"
                        data-testid="increment-product"
                        onClick={() => handleProductIncrement(id, amount + 1)}
                      >
                        <MdAddCircleOutline size={20} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{subTotal}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={() => handleRemoveProduct(id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ),
            )
          ) : (
            <tr>
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          )}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
