import { useEffect, useState } from "react";
import axios from "axios";
import SelectList from "./SelectList";

const kBaseUrl = "https://wfd-back-end.herokuapp.com/search";

const foodListToJson = (ingredient) => {
  const { id, food } = ingredient;
  return { id, food };
};

function GetIngr({ rhash }) {
  const [ingredientData, setIngredientData] = useState([]);

  useEffect(() => {
    const loadRecipe = async () => {
      const result = await axios(`${kBaseUrl}/${rhash}/ingr`);
      const ingredients = result.data.map(foodListToJson);
      setIngredientData(ingredients);
    };
    loadRecipe();
  }, []);

  return <SelectList items={ingredientData} />;
}

export default GetIngr;
