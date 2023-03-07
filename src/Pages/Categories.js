import React, { useEffect } from "react";
import useFetchProducts from "../FetchingHooks/useFetchProducts";
import { useParams } from "react-router-dom";
function Categories() {
  const [data, isLoading] = useFetchProducts();
  const { title } = useParams();
  const product = data?.find((product) => product.title === title);

  useEffect(() => {
    console.log(product);
  });
  return (
    <div>
      Categories
      {product && <p>{product.title}</p>}
    </div>
  );
}

export default Categories;
