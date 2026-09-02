/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../apiConfig";
export const WishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {

  const [wishlist, setWishlist] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {

    if (!userId) {
      return;
    }

    axios
      .get(`${API_URL}/wishlist?userId=${userId}`)
      .then((res) => {
        setWishlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [userId]);

  const addToWishlist = async (product) => {

    if (!user) {
      alert("Please login first");
      return;
    }

    const alreadyExists = wishlist.find(
      (item) => item.productId === product.id
    );

    if (alreadyExists) {
      return;
    }

    const newItem = {
      userId: user.id,
      productId: product.id
    };

    try {

      const res = await axios.post(
        `${API_URL}/wishlist`,
        newItem
      );

      setWishlist([...wishlist, res.data]);

    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (productId) => {

    const item = wishlist.find(
      (item) => item.productId === productId
    );

    if (!item) return;

    try {

      await axios.delete(
        `${API_URL}/wishlist/${item.id}`
      );

      setWishlist(
        wishlist.filter((item) => item.productId !== productId)
      );

    } catch (error) {
      console.log(error);
    }
  };

  const isInWishlist = (productId) => {

    return wishlist.some(
      (item) => item.productId === productId
    );

  };

  const toggleWishlist = (product) => {

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }

  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;