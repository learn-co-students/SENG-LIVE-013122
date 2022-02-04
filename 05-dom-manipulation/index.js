const pokemons = [
  {
    id: 1,
    name: "bulbasaur",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    likes: 4,
  },
  {
    id: 2,
    name: "ivysaur",
    img: "https://images.cults3d.com/6VgkTLM1j-CTAMhEJTtsRV1z6N8=/516x516/https://files.cults3d.com/uploaders/14845535/illustration-file/5d09c257-51ed-4d65-aa36-3f9201af34c4/ivysaur.png",
    likes: 21,
  },
  {
    id: 3,
    name: "venusaur",
    img: "https://images.saymedia-content.com/.image/t_share/MTc2MjYwODQ5NTk2NTcyODYy/pokemon-venusaur-nicknames.png",
    likes: 7,
  },
  {
    id: 4,
    name: "charmander",
    img: "https://pixy.org/download/1207107/",
    likes: 20,
  },
  {
    id: 5,
    name: "charmeleon",
    img: "https://static.pokemonpets.com/images/monsters-images-800-800/5-Charmeleon.webp",
    likes: 11,
  },
];

// identify css selectors
// class: reserve these for when we want to select a series of elements at once .classname
// id: unique for every elemnt #idname
// element

// how do we access elements(select elements)

// document.getElementById('id')
// - take an id as argument
// - it will return the first match
// - its only going to return 1 element

const pokeForm = document.getElementById("poke-form");
// console.log(pokeForm)

// document.getElementsByClassName('class-name')
// - accept a class name
// return multiple elements, HTMLCollection
// use Array.from() to conver to an array

const label = document.getElementsByClassName("form-label");
// console.log(label)

// document.querySelector()
// accept class, id and element
// will return the first element it finds

const lectureDiv = document.querySelector("#lecture-goals");

// console.log(lectureDiv)

// document.querySelectorAll()
// accepts class, id and element
// return a collection: node list
// can use .forEach to iterate over

const allDivs = document.querySelectorAll("div");
// console.log(allDivs)

// create elements

// document.createElement(element)

const pokeContainer = document.querySelector("#poke-container");

pokemons.forEach(function (char) {
  // build a method that takes each character data
  // creates some content regarding that data
  // put it on the web page

  renderPokemon(char);
});

function renderPokemon(character) {
  console.log(character);

  // create a div
  const pokeCard = document.createElement("div"); // a node
  pokeCard.id = `poke-${character.id}`;
  pokeCard.className = "poke-card";

  // slap a thing on the DOM

  // fill the card in with a characters img
  const pokeImg = document.createElement("img");
  pokeImg.src = character.img;
  pokeImg.alt = `${character.name} image`;

  const pokeName = document.createElement("h3");
  pokeName.textContent = character.name;

  pokeCard.append(pokeImg, pokeName);
  // pokeCard.appendChild(pokeName);
  pokeContainer.appendChild(pokeCard);
  // .innerHTML += // append to the rest of the content
  // .innerHTML = // replace all the content
}

// .appendChild
// requires a node as its parameter
// only takes in 1 parameter

// .append
// will accept a string
// does not have to be nodes
// can pass in multiple parameters

// updating elements

const headerDiv = document.querySelector("#header");
headerDiv.innerHTML = `<img id="header-img"
src="https://external-preview.redd.it/tQged7mKJ3cUpNMq5IMeceZvyKP3cTyHqhNmKEQ0Vv8.png?auto=webp&s=fb5fd61cae0bc9cde2bc2a006b1e2aeb0c935ce9"
/>`;

// remove elements

const lectureGoals = document.querySelector("#lecture-goals");
lectureGoals.remove();
