// contexts/FavoritesContext.js
import React, { createContext, useState, useContext } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (song) => {
    const exists = favorites.find((s) => s.id === song.id);
    if (exists) setFavorites((f) => f.filter((s) => s.id !== song.id));
    else setFavorites((f) => [song, ...f]);
  };

  const isFavorite = (id) => favorites.some((s) => s.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
