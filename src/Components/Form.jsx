import { useState } from "react";

const Form = () => {
  const [Data, setData] = useState({
    nombre: "",
    email: "",
  });
  const handleChange = (e) => {
    const campo = e.target.name;
    const valor = e.target.value;
    setData({ ...Data, [campo]: valor });
  };
  const handleSubmit = (e) => {

    e.preventDefault();

    const testName = /^.{5,}$/.test(Data.nombre);
    const testEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(Data.email);

    let form = document.querySelector("form");
    let mensajes = document.querySelectorAll("p");

    mensajes.forEach((e) => {
      e.remove();
    });

    if (testName === false || testEmail === false) {
      let error = document.createElement("p");
      error.innerHTML = "Por favor verifique su información nuevamente.";
      form.after(error);
    } else {
      let msg = document.createElement("p");
      msg.innerHTML = `Gracias ${Data.nombre}, te contactaremos cuanto antes vía mail.`;
      form.after(msg);
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="nombre"
            value={Data.nombre}
            name="nombre"
            onChange={handleChange}
            required
          />
          <input
            placeholder="email"
            value={Data.email}
            name="email"
            onChange={handleChange}
            required
          />
          <button>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
