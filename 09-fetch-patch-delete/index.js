// RESTful routing: standard for how routes are defined and their respective purpose

// http://localhost:3000/characters: where our collection of characters currently lives

// http://localhost:3000/characters/:id => need an existing id, return a single resource(the character with the given id)

// PATCH: updating, updating a characters properties(likes)
// endpoint that we are going to use: /characters/:id
// send some data: method, content type, data that we are updating the item to
// the body of the request should indicate which properties are being updated
//

// DELETE: deleting a single object
// characters/:id

const BASE_URL = "http://localhost:3000";

const pokeContainer = document.querySelector("#poke-container");
const pokeForm = document.querySelector("#poke-form");
const pokeFormContainer = document.querySelector("#poke-form-container");
let commentsDiv;

// The following methods will fire off on page load:

// Attach an event listener to '#poke-form' when the page loads:
pokeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.querySelector("#name-input").value;
  const img = document.querySelector("#img-input").value;

  let newChar = {
    name: name,
    img: img,
    likes: 0,
  };
  // write the method to persist this new character:

  // POST
  fetch("http://localhost:3000/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newChar),
  }) //
    .then(function (resp) {
      return resp.json();
    }) //
    .then(function (character) {
      renderPokemon(character);
      pokeForm.reset();
    });
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
    event.stopPropagation();
    ++pokemon.likes;

    let likesNum = { likes: pokemon.likes };
    fetch(`http://localhost:3000/characters/${pokemon.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(likesNum),
    })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (character) {
        likeNum.textContent = character.likes; // pessimistic rendering
      });
  });

  // optimistic rendering: going to happen faster
  // likeNum.textContent = pokemon.likes;
  const deleteBttn = document.createElement("button");
  deleteBttn.className = "delete-bttn";
  deleteBttn.textContent = "delete";
  deleteBttn.addEventListener("click", function (event) {
    event.stopPropagation(); // stopping the bubbling

    // pessimistic example:
    fetch(`http://localhost:3000/characters/${pokemon.id}`, {
      // what should i send with this request:

      // do i have any data to send?
      method: "DELETE",
    }) // promise 
      .then(function (resp) {
        return resp.json();
      })
      .then(pokeCard.remove())

      // optimistic example

      // fetch(`http://localhost:3000/characters/${pokemon.id}`, {
      //   method: "DELETE",
      // }) 
      // pokeCard.remove()
    
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

function renderComment(comment) {
  let li = document.createElement("li");
  li.textContent = comment.content;
  commentsDiv.append(li);
}

function commentsForm() {
  let form = document.createElement("form");
  form.id = "comment-form";

  // attach an event listener to the #comment-form
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let content = document.querySelector("#comment-input").value;

    let characterId = parseInt(
      document.querySelector("#poke-show-card").dataset.id
    );

    let newComment = {
      content: content,
      characterId: characterId,
    };

    // making a POST request
    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (comment) {
        renderComment(comment);
        form.reset();
        // renderComment(commentsDiv, comment)
      });
  });

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

function loadComments(pokeCard, char) {
  commentsDiv = document.createElement("div");
  commentsDiv.id = `comment-card-${char.id}`;

  const h4 = document.createElement("h4");
  h4.textContent = `${char.comments.length} comments:`;

  commentsDiv.append(h4);
  pokeCard.append(commentsDiv);

  char.comments.forEach(function (comment) {
    return renderComment(comment);
  });
}