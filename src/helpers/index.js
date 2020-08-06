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

export const createNewArr = (mealsOrDrinks, numOfItens) => {
  let newArrFoods = [];
  if (mealsOrDrinks.length > numOfItens) {
    for (let index = 0; index < numOfItens; index += 1) {
      newArrFoods.push(mealsOrDrinks[index]);
    }
  } else newArrFoods = [...mealsOrDrinks];
  return newArrFoods;
};
