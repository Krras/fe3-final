
import { ContextGlobal } from "../Components/utils/global.context";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

const Detail = () => {
  const { theme } = useContext(ContextGlobal);
  const isDarkMode = theme === "dark" || false;
  const { id } = useParams();
  const [dentista, setDentista] = useState(undefined);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDentista(data);
       }); }, [id]);
  return (
    <>
      <h1>Detalles del Odontologo {dentista?.name} </h1>
      {dentista ? (
        <section>

          <div className="detailDentista">

            <div className={`card ${isDarkMode ? "dark" : "light"}`}>

              <div>
                <img src="/images/doctor.jpg" alt="doctor placeholder" />
              </div>

              <div>
                <ul>
                  <li>Nombre: {dentista.name}</li>
                  <li>Email: {dentista.email}</li>
                  <li>Telefono: {dentista.phone}</li>
                  <li>Página Web: {dentista.website}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};
export default Detail;
