import React, { useEffect } from "react";
import useCart from "../../Hooks/useCart";
import AppsBar from "../../TopBar/AppBar";
import CartTable from "./CartTable";
export default function Cart() {
  const [data, loading] = useCart();

  useEffect(() => {
    // console.log(data);
  });
  return (
    <div>
      <AppsBar />
      {/* {data?.map((cart) => (
        <p key={cart.id}>{cart.item}</p>
      ))} */}
      <CartTable data = {data}/>
    </div>
  );
}
