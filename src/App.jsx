import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
//components
import Meal from "./Components/Meal";
import logo from "./assets/logo.png";
//icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://site--delivery-backend--4w9wbptccl4w.code.run"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const { restaurant, categories } = data;

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
      <header>
        <div className="container">
          <img src={logo} alt="" />
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <div>
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="tartines" />
        </div>
      </section>
      <main>
        <div className="container">
          <section className="col-left">
            {data.categories.map((category) => {
              if (category.meals.length !== 0) {
                return (
                  <div key={category.name}>
                    <h2>{category.name}</h2>
                    <div className="meals-container">
                      {category.meals.map((meal) => {
                        return <Meal key={meal.id} meal={meal} />;
                      })}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </section>
          <section className="col-right">
            <div>
              <h2>Panier</h2>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
