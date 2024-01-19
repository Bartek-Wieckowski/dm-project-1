import { useReducer } from 'react';

interface IState {
  productName: string;
  quantity: number;
}

type Action =
  | { type: 'ADD'; payload: IState }
  | { type: 'REMOVE'; payload: string }
  | { type: 'INC_QTY'; payload: { productName: string } }
  | { type: 'DEC_QTY'; payload: { productName: string } }
  | { type: 'CLEAR' };

const initialState: IState[] = [];

function reducer(state: IState[], action: Action): IState[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter((item) => item.productName !== action.payload);
    case 'INC_QTY':
      return state.map((item) =>
        item.productName === action.payload.productName
          ? { ...item, quantity: item.quantity++ }
          : item
      );
    case 'DEC_QTY':
      return state
        .map((item) =>
          item.productName === action.payload.productName
            ? { ...item, quantity: Math.max(item.quantity--, 0) }
            : item
        )
        .filter((item) => item.quantity > 0);
    case 'CLEAR':
      return (state = []);

    default:
      throw new Error('Unknown action type');
  }
}

export default function Cart() {
  const [cart, dispatch] = useReducer(reducer, initialState);

  const addToCart = () => {
    const newProduct: IState = {
      productName: 'iPad',
      quantity: 1,
    };

    dispatch({ type: 'ADD', payload: newProduct });
  };
  const removeFromCart = (productName: string) => {
    dispatch({ type: 'REMOVE', payload: productName });
  };
  const incQty = (productName: string) => {
    dispatch({ type: 'INC_QTY', payload: { productName } });
  };
  const decQty = (productName: string) => {
    dispatch({ type: 'DEC_QTY', payload: { productName } });
  };
  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  const isProductInCart = (productName: string): boolean => {
    return cart.some((item) => item.productName === productName);
  };

  //   TODO: GDYBY BYŁO WIECEJ CZASU TUTAJ RÓWNIEŻ MNIEJSZE KOMPONENTY

  return (
    <div className="grid grid-cols-[200px_1fr] items-center px-10 text-stone-200">
      <div>
        <p>iPad</p>
        <button
          className={`rounded-md bg-teal-400 p-4 text-stone-200 ${
            isProductInCart('iPad') ? 'opacity-50' : ''
          }`}
          onClick={addToCart}
          disabled={isProductInCart('iPad')}
        >
          add to cart
        </button>
      </div>
      <div className="px-4 py-3">
        <h1>Cart checkout</h1>
        <ul className="mt-3 divide-y divide-stone-200 border-b">
          {cart.map((item) => (
            <li
              className="py-3 sm:flex sm:items-center sm:justify-between"
              key={item.productName}
            >
              <p className="mb-1 sm:mb-0">
                {item.quantity}&times; {item.productName}
              </p>
              <div className="flex items-center justify-between sm:gap-6">
                <button
                  onClick={() => decQty(item.productName)}
                  className="inline-block rounded-full bg-yellow-400 px-2.5 py-1 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-3.5 md:py-2"
                >
                  -
                </button>
                <span className="text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => incQty(item.productName)}
                  className="inline-block rounded-full bg-yellow-400 px-2.5 py-1 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-3.5 md:py-2"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.productName)}
                  className="inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-5 md:py-2.5 "
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={clearCart}
          className="mt-6 inline-block rounded-full bg-rose-400 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-rose-300 focus:bg-rose-300 focus:outline-none focus:ring focus:ring-rose-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-5 md:py-2.5"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}
