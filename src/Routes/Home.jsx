import { ContextGlobal } from "../Components/utils/global.context";
import Card from "../Components/Card";
import { useContext } from "react";

const Home = () => {
  const { data } = useContext(ContextGlobal);
  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {data.length
          ? data.map((dentista) => <Card {...dentista} key={dentista.id} />)
          : null}
      </div>
    </>
  );
};
export default Home;
