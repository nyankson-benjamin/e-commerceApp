import React from "react";
import ProductSkeleton from "../components/ProductSkeleton";

import ProductSlider from "../components/Slider/ProductSlider";

function RelatedProducts({ related, loading, product }) {
  return (
    <div className="productCard" style={{ height: "200px" }}>
      {loading ? <ProductSkeleton /> : <ProductSlider data={related} />}
    </div>
  );
}

export default RelatedProducts;
