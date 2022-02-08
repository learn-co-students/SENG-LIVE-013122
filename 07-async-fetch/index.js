// endpoint: point on a web application that will send particular data 

// API: application program interface: interface that allows access and *change information

// CRUD actions on data: create, read, update and delete 

// http verbs: get, post, patch, delete 

// fetch: a function that we are going to use to make a request/ http verbs are going to be included inside this fetch request to indicate the type of action we want to make


// need to make a request to retrieve all pokemon from the server 
// the way to comunicate this request with our server is going to be by using the fetch method 

// url is the place we are directing hte request to, second argument is an object full of key/value pairs pertaining to the request
// by default fetch is making a GET request
// fetch is asynchronous 

// // GET REQUEST:
// fetch(URL) // return a Promise object
// // .then() => after the fetch request is complete, and response is received
// // anonymous callback function
// .then(function(response){ // response here is a readable stream
//   return response.json() // take the response and jsonify it
// }) // another promise object 
// .then(function(data){
//   // now we can do something with the requested data
// })
// .catch(function(err){
//   // do something with the err
// })

const pokeContainer = document.querySelector("#poke-container");
const pokeForm = document.querySelector("#poke-form");

pokeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.querySelector("#name-input").value;
  const img = document.querySelector("#img-input").value;

  let newChar = {
    id: 6, // NEEDS TO CHANGE,
    name: name,
    img: img,
    likes: 0,
  };

  renderPokemon(newChar);
  pokeForm.reset();
});

function getPokemon(){
  fetch("http://localhost:3000/pokemon")
  .then(function(resp){
    if (resp.ok){
      return resp.json()
    } else {
      throw new Error(`${resp.status}: ${resp.statusText}`)
    }
  })
  .then(function(resp){ 
    console.log(resp)
    // need to call renderPokemon for each character object inside pokemonArr

    resp.forEach(function(char){
      renderPokemon(char)
    })
  })
  .catch(function(err){
    console.log(err)
  })
}

getPokemon()

function renderPokemon(pokemon) {
  const pokeCard = document.createElement("div");
  pokeCard.id = `poke-${pokemon.id}`;
  pokeCard.className = "poke-card";

  // event handler going to be the callback function passed into addEventListener
  pokeCard.addEventListener("click", () => showCharacter(pokemon));

  // pokeCard.addEventListener("click", function(){
  //   return showCharacter(pokemon)
  // });

  const pokeImg = document.createElement("img");
  pokeImg.src = pokemon.img;
  pokeImg.alt = `${pokemon.name} image`;

  const pokeName = document.createElement("h3");
  pokeName.textContent = pokemon.name;

  const pokeLikes = document.createElement("h3");
  pokeLikes.textContent = "Likes: ";

  const likeNum = document.createElement("h3");
  likeNum.className = "likes-num";
  likeNum.textContent = pokemon.likes;

  const likesBttn = document.createElement("button");
  likesBttn.className = "like-bttn";
  likesBttn.textContent = "♥";
  likesBttn.addEventListener("click", function (event) {
    event.stopPropagation()
    ++pokemon.likes;
    likeNum.textContent = pokemon.likes;
  });

  const deleteBttn = document.createElement("button");
  deleteBttn.className = "delete-bttn";
  deleteBttn.textContent = "delete";
  deleteBttn.addEventListener("click", function (event) {
    event.stopPropagation()
    pokeCard.remove();
  });

  pokeCard.append(pokeImg, pokeName, pokeLikes, likeNum, likesBttn, deleteBttn);
  pokeContainer.appendChild(pokeCard);

  return pokeCard
}

function showCharacter(character){
  fetch(`http://localhost:3000/pokemon?name=${character.name}`) // what am i getting back here? a promise
  .then(function(resp){
    return resp.json() //jsonify the response from fetch
  }) // what am i getting now? another promise 
  .then(function(char){
    console.log(char[0])

    // need to render this pokemon card
    // remove all other cards on the DOM 
    let pokeCard = renderPokemon(char[0])
    pokeContainer.replaceChildren(pokeCard)
  })
}

// every endpoint will have different data 