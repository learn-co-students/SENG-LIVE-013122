const BASE_URL = "http://localhost:3000"

// ENDPOINT: a location associated with our base url, to serve specific data 

// /characters => all of the characters stored in our db.json

// /characters/:id => retrieve the character with the given id 

// persisting: sending a request to save the data in the database

// "characterId": 1,  telling us which character the comment that was submitted belongs to 

const pokeContainer = document.querySelector("#poke-container");
const pokeForm = document.querySelector("#poke-form");
const pokeFormContainer = document.querySelector("#poke-form-container");

// The following methods will fire off on page load:

// Attach an event listener to '#poke-form' when the page loads:
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

// Make a request to the server to retrieve and load all pokemon characters onto the DOM:
function getPokemon() {
  fetch("http://localhost:3000/characters")
    .then(function (resp) {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(`${resp.status}: ${resp.statusText}`);
      }
    })
    .then(function (resp) {
      resp.forEach(function (char) {
        renderPokemon(char);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

getPokemon();

// Create a character card and append to the "#poke-container":
function renderPokemon(pokemon) {
  const pokeCard = document.createElement("div");
  pokeCard.id = `poke-${pokemon.id}`;
  pokeCard.className = "poke-card";

  pokeCard.addEventListener("click", function () {
    return showCharacter(pokemon);
  });

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
    event.stopPropagation() // stopping the bubbling
    pokeCard.remove();
  });

  pokeCard.append(pokeImg, pokeName, pokeLikes, likeNum, likesBttn, deleteBttn);
  pokeContainer.appendChild(pokeCard);

  return pokeCard;
}

// The following methods will fire off when a character card gets clicked:

// Make a request to the server given a character id and return the character with associated comments. Replace the pokeContainer contents with only the clicked character card:
function showCharacter(character) {
  fetch(`http://localhost:3000/characters/${character.id}`)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (char) {
      let pokeCard = renderPokemon(char);
      pokeCard.id = "poke-show-card";
      pokeCard.dataset.id = character.id;
      loadComments(pokeCard, char);
      pokeContainer.replaceChildren(pokeCard);
      pokeFormContainer.replaceChildren(commentsForm());
    });
}

function renderComment(commentsDiv, comment) {
  let li = document.createElement("li");
  li.textContent = comment.content;
  commentsDiv.append(li)
}

function commentsForm() {
  let form = document.createElement("form");
  form.id = "comment-form";

  // attach an event listener to the #comment-form
  form.addEventListener('submit', function(event){
    event.preventDefault()

    // my user just submitted the form, what do i do? how do i grab the value 
    let content = document.querySelector("#comment-input").value

    // need to grab the character id 
    let characterId = parseInt(document.querySelector('#poke-show-card').dataset.id)
    let newComment = {
      content: content,
      characterId: characterId
    }

    // making a POST request 

    // what endpoint am i sending this data to?
    fetch('http://localhost:3000/comments', {
      method: "POST", // providing HTTP verb for the type of request we are making
      headers: { // telling our server what type of content we are sending, and we will accept
        'Content-Type': "application/json",
        'Accept': "application/json"
      }, 
      body: JSON.stringify(newComment) // taking our JS object and making it a string so we can send it across the web 
    }) // the return value: promise 
    .then(function(resp){
      return resp.json()
    }) // the return value: another promise
    .then(function(comment){
      // to render the new comment to the DOM
      renderComment(comment)
    })
    
  })
  let commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.id = "comment-input";

  let label = document.createElement("label");
  label.className = "form-label";
  label.textContent = "Leave a comment: ";
  form.appendChild(label);

  let submit = document.createElement("input");
  submit.type = "submit";
  submit.id = "submit";

  form.append(commentInput, submit);

  return form;
}


function loadComments(pokeCard, char){

  // i want to see what char looks like:
  // debugger
  // inside dev tools console: run `char`, `char.comments`, `char.comments.length`

  // also can console.log(char) => this will only print the value. Debugger could be useful in inspecting values and testing methods
  const commentsDiv = document.createElement('div') 
  commentsDiv.id = `comment-card-${char.id}`

  const h4 = document.createElement('h4')
  h4.textContent = `${char.comments.length} comments:`

  commentsDiv.append(h4)
  pokeCard.append(commentsDiv)


  // how can i access the list of comments
  char.comments.forEach(function(comment){
      return renderComment(commentsDiv, comment)
  })
}