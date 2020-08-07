const saveToLocalStorage = (key, value) => {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export default saveToLocalStorage;

export const createNewCategories = (categoriesList) => {
  const newArrCategories = [];
  if (categoriesList.length > 0) {
    for (let index = 0; index < 5; index += 1) {
      newArrCategories.push(categoriesList[index]);
    }
  }
  return newArrCategories;
};

export const getLocalStorage = (key) => {
  const local = localStorage.getItem(key);
  if (!local) {
    return [];
  }
  return JSON.parse(local);
};

export const createNewArr = (mealsOrDrinks, numOfItens = 12) => {
  let newArrFoods = [];
  if (mealsOrDrinks.length > numOfItens) {
    for (let index = 0; index < numOfItens; index += 1) {
      newArrFoods.push(mealsOrDrinks[index]);
    }
  } else newArrFoods = [...mealsOrDrinks];
  return newArrFoods;
};

export const keysToArray = (measures, name) =>
  Object.keys(measures)
    .filter((item) => item.startsWith(name))
    .map((item) => measures[item])
    .filter((item) => item !== '' && item !== null);

export const getIngredients = (measures) => {
  const ingredientsKeys = keysToArray(measures, 'strIngredient');
  const measureKeys = keysToArray(measures, 'strMeasure');
  return ingredientsKeys.map((item, index) => ({
    ingredient: item,
    measure: measureKeys[index],
  }));
};

export const recomendationItemKeys = (pathname) => {
  if (pathname.includes('/bebidas')) {
    return { id: 'idMeal', strName: 'strMeal', strThumb: 'strMealThumb' };
  }
  return { id: 'idDrink', strName: 'strDrink', strThumb: 'strDrinkThumb' };
};
