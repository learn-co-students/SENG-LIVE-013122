// What is ES6?

// ES6 => ECMAScript 2015

// latest version of the ECMAScript standard, introduced new features syntax that

// we have been using already (i.e., arrows, const, let, etc.)

// syntactic sugar => easier to write, read and scale

// Declaring Arrow Functions vs. Regular Functions

// Destructuring arrays

// let student1 = students[0]
// let student2 = students[1]
// let student3 = students[2]
// let student4 = students[3]

// let [student1, , student3, student4] = students

// NEED TO keep the order of our variables aligned with their values

// Destructuring objects
// order doesnt matter
// IMPORTANT: the variable names should match the property name

// const pokemon = {
//   name: "Squirtle",
//   img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
//   likes: 0,
//   id: 7
// }

// const {likes, id, name, image} = pokemon

// Spread operator
// can be used with arrays and objects
// creates a shallow copy of the data structure

const pokeContainer = document.querySelector("#poke-container");
const pokeForm = document.querySelector("#poke-form");
const pokeFormContainer = document.querySelector("#poke-form-container");
let commentsDiv;

pokeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.querySelector("#name-input").value;
  const img = document.querySelector("#img-input").value;

  let newChar = {
    name: name,
    img: img,
    likes: 0,
  };

  fetch("http://localhost:3000/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newChar),
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (character) {
      renderPokemon(character);
      pokeForm.reset();
    });
});

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
        likeNum.textContent = character.likes;
      });
  });

  const deleteBttn = document.createElement("button");
  deleteBttn.className = "delete-bttn";
  deleteBttn.textContent = "delete";
  deleteBttn.addEventListener("click", function (event) {
    event.stopPropagation();

    fetch(`http://localhost:3000/characters/${pokemon.id}`, {
      method: "DELETE",
    })
      .then(function (resp) {
        return resp.json();
      })
      .then(pokeCard.remove());
  });

  pokeCard.append(pokeImg, pokeName, pokeLikes, likeNum, likesBttn, deleteBttn);
  pokeContainer.appendChild(pokeCard);

  return pokeCard;
}

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
