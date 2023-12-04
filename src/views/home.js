//import los components

import { filterOrder } from "../components/filterOrder.js";
import { Header } from "../components/header.js";
import { Footer } from "../components/Footer.js";
import { renderCards } from "../components/cards.js";
import { stats } from "../components/stats.js";
import data from "../data/data.js";
import {
  filterByAffiliation,
  filterBySpecies,
  sortData,
  clearData,
  computeStats,
  ageSumatory,
} from "../lib/dataFuntion.js";
import { apiKeyButton } from "../components/buttonApiKey.js";

export const home = () => {
  let valueSelectSpecies = "";
  let valueSelectAffiliation = "";
  let resultDataFilteredBySpecies = "";
  let resultDataFilteredByAffiliation = "";

  const homeView = document.createElement("div");
  homeView.className = "viewcomponents";
  const cardView = document.createElement("section");
  cardView.className = "cardsBox";
  const headerComponent = Header("home");
  homeView.innerHTML = headerComponent;
  const statsComponent = stats();
  const filterOrderComponent = filterOrder();
  const cardsComponent = renderCards(data);
  const footerComponent = Footer();
  const apiKeyButtonComponent = apiKeyButton();

  //primero el appenchild agrega y despues se escucha
  homeView.appendChild(statsComponent);
  homeView.appendChild(filterOrderComponent);
  homeView.appendChild (apiKeyButtonComponent);
  cardView.appendChild(cardsComponent);
  homeView.appendChild(cardView);
  homeView.appendChild(footerComponent);


  const statsResult = homeView.querySelector("#stats");
  const ageSumResult = homeView.querySelector("#sumAges");
  const filterSpecies = homeView.querySelector("#filterSpecies");
  const filterAffiliation = homeView.querySelector("#filteraffiliation");
  const selectSort = homeView.querySelector("#sortBy");
  const buttonClear = homeView.querySelector("#clearFilter");
  const buttonOpenApiKey = homeView.querySelector("#buttonApiKey");

  statsResult.innerHTML = "Resultado de tu selección: " + computeStats(data);
  ageSumResult.innerHTML = "Sumatoria de edades: " + ageSumatory(data);

  filterSpecies.addEventListener("change", (event) => {
    const value = event.target.value;
    valueSelectSpecies = value;
    const dataFiltrada = filterBySpecies(data, "speciesCharacter", value);
    const cardsComponent = renderCards(dataFiltrada);
    cardView.innerHTML = "";
    cardView.appendChild(cardsComponent);
    resultDataFilteredBySpecies = dataFiltrada;
    statsResult.innerHTML =
      "Resultado de tu selección: " + computeStats(dataFiltrada);
    ageSumResult.innerHTML =
      "Sumatoria de edades: " + ageSumatory(dataFiltrada);
  });

  filterAffiliation.addEventListener("change", (event) => {
    const value = event.target.value;
    valueSelectAffiliation = value;
    const dataFiltrada = filterByAffiliation(
      data,
      "affiliationCharacter",
      value
    );
    const cardsComponent = renderCards(dataFiltrada);
    cardView.innerHTML = "";
    cardView.appendChild(cardsComponent);
    resultDataFilteredByAffiliation = dataFiltrada;
    statsResult.innerHTML =
      "Resultado de tu selección: " + computeStats(dataFiltrada);
    ageSumResult.innerHTML =
      "Sumatoria de edades: " + ageSumatory(dataFiltrada);
  });

  selectSort.addEventListener("change", (event) => {
    const clearedData = clearData([
      ...resultDataFilteredBySpecies,
      ...resultDataFilteredByAffiliation,
    ]);
    const sortBy = event.target.value;
    let sortedData = [];
    if (resultDataFilteredBySpecies || resultDataFilteredByAffiliation) {
      sortedData = sortData(clearedData, sortBy);
    } else {
      sortedData = sortData(data, sortBy);
    }
    const cardsComponent = renderCards(sortedData);
    cardView.innerHTML = "";
    cardView.appendChild(cardsComponent);
    statsResult.innerHTML =
      "Resultado de tu selección: " + computeStats(clearedData);
    ageSumResult.innerHTML = "Sumatoria de edades: " + ageSumatory(clearedData);
  });

  buttonClear.addEventListener("click", (event) => {
    const cardsComponent = renderCards(data);
    cardView.innerHTML = "";
    cardView.appendChild(cardsComponent);
    filterSpecies.selectedIndex = 0;
    filterAffiliation.selectedIndex = 0;
    selectSort.selectedIndex = 0;
    resultDataFilteredBySpecies = "";
    resultDataFilteredByAffiliation = "";
    statsResult.innerHTML = "Resultado de tu selección: " + computeStats(data);
    ageSumResult.innerHTML = "Sumatoria de edades: " + ageSumatory(data);
  });


  return homeView;
};
