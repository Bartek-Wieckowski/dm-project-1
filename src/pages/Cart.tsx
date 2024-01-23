import { useReducer } from "react";
import Button from "../components/Button";

interface IState {
  productName: string;
  quantity: number;
}

type Action =
  | { type: "ADD"; payload: IState }
  | { type: "REMOVE"; payload: string }
  | { type: "INC_QTY"; payload: { productName: string } }
  | { type: "DEC_QTY"; payload: { productName: string } }
  | { type: "CLEAR" };

const initialState: IState[] = [];

function reducer(state: IState[], action: Action): IState[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((item) => item.productName !== action.payload);
    case "INC_QTY":
      return state.map((item) =>
        item.productName === action.payload.productName ? { ...item, quantity: item.quantity++ } : item
      );
    case "DEC_QTY":
      return state
        .map((item) =>
          item.productName === action.payload.productName
            ? { ...item, quantity: Math.max(item.quantity--, 0) }
            : item
        )
        .filter((item) => item.quantity > 0);
    case "CLEAR":
      return (state = []);

    default:
      throw new Error("Unknown action type");
  }
}

export default function Cart() {
  const [cart, dispatch] = useReducer(reducer, initialState);

  const addToCart = () => {
    const newProduct: IState = {
      productName: "iPad",
      quantity: 1,
    };

    dispatch({ type: "ADD", payload: newProduct });
  };
  const removeFromCart = (productName: string) => {
    dispatch({ type: "REMOVE", payload: productName });
  };
  const incQty = (productName: string) => {
    dispatch({ type: "INC_QTY", payload: { productName } });
  };
  const decQty = (productName: string) => {
    dispatch({ type: "DEC_QTY", payload: { productName } });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const isProductInCart = (productName: string): boolean => {
    return cart.some((item) => item.productName === productName);
  };

  return (
    <div className="grid grid-cols-[200px_1fr] items-center px-10 text-stone-200">
      <div>
        <p>iPad</p>
        <Button type="button" onClick={addToCart} disabled={isProductInCart("iPad")} btnStyles="btnAdd">
          Dodaj do koszyka
        </Button>
      </div>
      <div className="px-4 py-3">
        <h1>Cart checkout</h1>
        <ul className="mt-3 divide-y divide-stone-200 border-b">
          {cart.map((item) => (
            <li className="py-3 sm:flex sm:items-center sm:justify-between" key={item.productName}>
              <p className="mb-1 sm:mb-0">
                {item.quantity}&times; {item.productName}
              </p>
              <div className="flex items-center justify-between sm:gap-6">
                <Button type="button" onClick={() => decQty(item.productName)} btnStyles="btnQty">
                  -
                </Button>
                <span className="text-sm font-medium">{item.quantity}</span>
                <Button type="button" onClick={() => incQty(item.productName)} btnStyles="btnQty">
                  +
                </Button>
                <Button type="button" onClick={() => removeFromCart(item.productName)} btnStyles="btnDelete">
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Button type="button" onClick={clearCart} btnStyles="btnDelete">
          Clear cart
        </Button>
      </div>
    </div>
  );
}
