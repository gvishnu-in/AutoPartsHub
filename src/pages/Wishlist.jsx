import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import API_URL from "../apiConfig";

const Wishlist = () => {

  const {
    wishlist,
    removeFromWishlist
  } = useContext(WishlistContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {

    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const wishlistProducts = products.filter((product) =>
    wishlist.some((item) => item.productId === product.id)
  );

  return (
    <div className="wishlist-page">

      <h2>My Wishlist</h2>

      {wishlistProducts.length === 0 ? (

        <p>Your wishlist is empty.</p>

      ) : (

        <div className="product-list">

          {wishlistProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
              onRemoveWishlist={removeFromWishlist}
            />

          ))}

        </div>

      )}

    </div>
  );
};

export default Wishlist;