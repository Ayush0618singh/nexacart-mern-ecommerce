import { createContext, useState } from "react";

export const WishlistContext = createContext();
function WishlistProvider({ children }) {
    const[wishlistItems, setWishlistItems] = useState([]);

    return (
        <WishlistContext.Provider value={{ wishlistItems, setWishlistItems }}>
            {children}

        </WishlistContext.Provider>

    );
}

export default WishlistProvider;