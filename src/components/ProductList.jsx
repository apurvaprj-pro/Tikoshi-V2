import { Star } from "lucide-react";

const ProductList = ({ products }) => {
  console.log(products);
  return (
    <div>
      {products.map((product, index) => (
        <div key={index} className="border border-gray-500 mb-5 flex gap-5">
          <div>
            <img src={product.images[0]} className="w-[230px]" alt={product.name || 'Product Image'} />
          </div>
          <div className="py-6 flex-1">
            <h1 className="text-3xl">{product.name}</h1>
            <p className="text-sm line-clamp-2 text-gray-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae impedit, eaque id pariatur deserunt nesciunt, harum quis ratione sapiente dolores dolorem molestias modi eligendi enim maiores, soluta repudiandae porro voluptatem!
            </p>
            <p className="mt-8 text-2xl">₹{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
