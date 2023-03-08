import React from "react";
import useCart from "../../Hooks/useCart";
import { useParams } from "react-router-dom";
import AppsBar from "../../TopBar/AppBar";
export default function Buy() {
  const { title } = useParams();
  const [data] = useCart();

  const cartitem = data?.find((cart) => cart.title === title);

  return (
    <div>
      <AppsBar />
      {cartitem && (
        <div>
          <p>{cartitem.title}</p>
          <p>{cartitem.price}</p>
        </div>
      )}
    </div>
  );
}
