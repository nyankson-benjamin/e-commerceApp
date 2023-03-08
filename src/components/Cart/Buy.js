import React from "react";
import useCart from "../../Hooks/useCart";
import { useParams } from "react-router-dom";
import AppsBar from "../../TopBar/AppBar";
export default function Buy() {
  const { item } = useParams();
  const [data] = useCart();

  const cartitem = data?.find((cart) => cart.item === item);
  return (
    <div>
      <AppsBar />
      {cartitem && (
        <div>
          <p>{cartitem.item}</p>
        </div>
      )}
    </div>
  );
}
