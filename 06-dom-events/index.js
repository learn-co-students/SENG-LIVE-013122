// events: are some interaction with html elements
// target element, fire off some logic that is meant for that particular event

// event types: "click", "submit", "mouseover", "keydown"
// event listener: 
// - .addEventListener: called on our targeted element, takes in 2 arguments: ("event type"), event handler(callback function)
// event object: plain old js object that gets created after an event occurs, it gets pased into our callback function 
// event handler: callback function that operates on the event reaction, second argument to .addeventlistener()

const pokemon = [
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

const pokeContainer = document.querySelector("#poke-container");
const pokeForm = document.querySelector('#poke-form')

// targeting pokeForm and attaching event listener in the global scope 
pokeForm.addEventListener('submit', function(event){

  // preventing the forms default behavior
  event.preventDefault()
  
  // grab the values from the form that was submitted:
  const name = document.querySelector('#name-input').value
  const img = document.querySelector('#img-input').value

  // create a new pokemon object 
  let newChar = {
    id: 6, // NEEDS TO CHANGE,
    name: name,
    img: img,
    likes: 0
  }

  // need to create a card for the new pokemon and put it on the DOM
  renderPokemon(newChar)

  // reset the form to empty fields 
  pokeForm.reset()
})

pokemon.forEach(function (char) {
  renderPokemon(char);
});

function renderPokemon(pokemon) { // accepting a character obj with properties
  const pokeCard = document.createElement("div");
  pokeCard.id = `poke-${pokemon.id}`;
  pokeCard.className = "poke-card";

  const pokeImg = document.createElement("img");
  pokeImg.src = pokemon.img;
  pokeImg.alt = `${pokemon.name} image`;

  const pokeName = document.createElement("h3");
  pokeName.textContent = pokemon.name;

  // creating likes num + button 
  const pokeLikes = document.createElement("h3")
  pokeLikes.textContent = "Likes: "

  const likeNum = document.createElement("h3")
  likeNum.className = "likes-num"
  likeNum.textContent = pokemon.likes

  const likesBttn = document.createElement("button")
  likesBttn.className = "like-bttn"
  likesBttn.textContent = "♥"

  // attaching a click event to the likes bttn 
  likesBttn.addEventListener("click", function(){
      // increment the pokemon likes by 1 
      // use character that event was invoked on, to increment number of likes
      ++pokemon.likes

      // update the text on the dom to reflect the new number 
      // do we have access already to the element that holds the num?
      // how can we use that?
      likeNum.textContent = pokemon.likes

  })

  const deleteBttn = document.createElement("button")
  deleteBttn.className = "delete-bttn"
  deleteBttn.textContent = "delete"

  // attaching a click event to the deleteBttn, passing in an event handler 
  // deleteBttn.addEventListener("click", handleDelete)
  // deleteBttn.addEventListener("click", function () {
  //   pokeCard.remove();
  // });

  deleteBttn.addEventListener('click', () => handleDelete(pokeCard))
  
  pokeCard.append(pokeImg, pokeName, pokeLikes, likeNum, likesBttn, deleteBttn);
  pokeContainer.appendChild(pokeCard);
}

// function handleDelete(event){
//   // event object
//   // we're targeting the element that fired off the event
//   // moving up the dom tree to the parent of that element
//   // removing that element using .remove()
//   event.target.parentNode.remove()
// }

function handleDelete(pokeCard){
  pokeCard.remove()
}