import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextGlobal } from "./utils/global.context";

export const getFavStorage = () => {
  const localData = localStorage.getItem("favs");
  return localData ? JSON.parse(localData) : [];
};
const removeFavStorage = (id) => {
  const StorageFavorito = getFavStorage();
  const index = StorageFavorito.findIndex((fav) => fav.id === id);
  if (index !== -1) {
    StorageFavorito.splice(index, 1);
    localStorage.setItem("favs", JSON.stringify(StorageFavorito));
    alert("odontologo eliminado exitosamente");
  } else {
    alert("Error, desconocemos que pudo haber sucedido, intenta nuevamente");
  }
};
const setFavStorage = (dentista) => {
  const StorageFavorito = getFavStorage();
  const ListaFavoritos = StorageFavorito.filter((fav) => {
    return fav.id === dentista.id;
  });
  if (ListaFavoritos.length === 0) {
    StorageFavorito.push(dentista);
    localStorage.setItem("favs", JSON.stringify(StorageFavorito));
    alert("odontologo agregado exitosamente");
  } else {
    alert("este odontologo ya fue agregado a favoritos");
  }
};

const Card = ({ name, username, id }) => {
  const { theme } = useContext(ContextGlobal);
  const isDarkMode = theme === "dark" || false;


  const isFavorited = (id) => {
    const LocalData = getFavStorage();
    const ListaFavoritos = LocalData.filter((fav) => {
      return fav.id === id;
    });
    return ListaFavoritos.length === 1;
  };

  const addFav = () => {
    setFavStorage({ name, username, id });
  };
  const removeFav = () => {
    removeFavStorage(id);
  };
  const favorite = isFavorited(id);
  return (
    <div className={`card ${isDarkMode ? "dark" : "light"}`}>
      <img src="/images/doctor.jpg" alt="doctor" />
      <Link to={`/dentista/${id}`}>
        <h5>{name}</h5>
      </Link>
      <p>{username}</p>
      <button onClick={favorite ? removeFav : addFav} className={`${isDarkMode ? "dark" : "light"}`} >
        {favorite ? "❌ Eliminar de favoritos" : "⭐ Añadir a favoritos"} 
      </button>
    </div>
  );
};
export default Card;