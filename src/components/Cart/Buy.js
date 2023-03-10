import React, { useEffect } from "react";
import useCart from "../../Hooks/useCart";
import { useParams } from "react-router-dom";
import AppsBar from "../../TopBar/AppBar";
export default function Buy() {
  const { title } = useParams();
  const [data] = useCart();

  const cartitem = data?.find((cart) => cart.title === title);
  useEffect(() => {
    if (cartitem) {
      console.log(cartitem);
    }
  });
  return (
    <div>
      <AppsBar />
      {cartitem && (
        <div>
          <p>{cartitem.item}</p>
          <p>{cartitem.price}</p>
        </div>
      )}
    </div>
  );
}
