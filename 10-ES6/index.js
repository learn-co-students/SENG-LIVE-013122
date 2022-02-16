// // What is ES6?

// // ES6 => ECMAScript 2015

// // latest version of the ECMAScript standard, introduced new features syntax that

// // we have been using already (i.e., arrows, const, let, etc.)

// // syntactic sugar => easier to write, read and scale

// // Declaring Arrow Functions vs. Regular Functions

// // shorter syntax/ callback functions 
// // it needs to be declared before called 

// // arr = [0,1,2]

// // function myFunction(){

// // }

// const myFunction = el => console.log(el)

// // arr.forEach((el) => myFunction(el))

// // each element is being implicity passed in to myFunction
// arr.forEach(myFunction)


// // Destructuring arrays
// let students = ["bridget", "rodney", "omar", "batoul"]

// // let student1 = students[0]
// // let student2 = students[1]
// // let student3 = students[2]
// // let student4 = students[3]

// let [student1, , student3, student4] = students

// // NEED TO keep the order of our variables aligned with their values

// // Destructuring objects
// // order doesnt matter
// // IMPORTANT: the variable names should match the property name

// // const pokemon = {
// //   name: "Squirtle",
// //   img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
// //   likes: 0,
// //   id: 7
// // }

// // let name = pokemon.name 
// // let img = pokemon.img 

// // const {likes, id, name, img:image} = pokemon

// // Spread operator
// // avoid mutating the original object/array 
// // can be used with arrays and objects
// // creates a shallow copy of the data structure

// let newStudentsArr = [...students, "tunisia"]
// console.log(newStudentsArr)
// console.log(students)


// objects spread operator 

// Object.assign 




// async / await 
// 1. we need to identify the function as async 
// const myFun = async () => {}

// 2. make the request, store in variable 
// let resp = await fetch(....)

// 3. take resp, jsonify it, and then do something with it
// let data = await resp.json()
// do something with data 



const BASE_URL = "http://localhost:3000"
const pokeContainer = document.querySelector("#poke-container");
const pokeForm = document.querySelector("#poke-form");
const pokeFormContainer = document.querySelector("#poke-form-container");
let commentsDiv;

// async/await 
// syntactic sugar for fetch request 

// async function myFunc(){
// }
const getPokemon = async () =>  {
  try {
    let resp = await fetch(`${BASE_URL}/characters`)
    if (resp.ok) {
      let characters = await resp.json();
      characters.forEach(renderPokemon)
    } else {
      throw new Error(`${resp.status}: ${resp.statusText}`);
    }
  } catch (err) {
    console.log(err)
  }
}

const createPokemon = async (event) => {
  event.preventDefault();
  const name = document.querySelector("#name-input").value;
  const img = document.querySelector("#img-input").value;


  // simplified object creation ES6
  let newChar = {
    name, // 'name: name', we can simplify by combining as name
    img, // 'img: img'
    likes: 0,
  };

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newChar),
  }

  let resp = await fetch("http://localhost:3000/characters", configObj)
  let character = await resp.json()  
  renderPokemon(character);
  pokeForm.reset();
}

const init = () => {
  getPokemon()
  // pokeForm.addEventListener("submit", (event) => createPokemon(event));
  // even shorter syntax 
  pokeForm.addEventListener("submit", createPokemon);
}

init()

const createPokeCard = ({ id }) => { // destructuring the id from pokemon
  // let {id} = pokemon // destructuring 
  const pokeCard = document.createElement("div");
  pokeCard.id = `poke-${id}`;
  pokeCard.className = "poke-card";
  pokeCard.addEventListener("click", () => showCharacter(id));
  return pokeCard
}

const createImgEl = (src, altText) => {
  const img = document.createElement("img");
  img.src = src; //pokemon.img
  img.alt = `${altText} image`; //pokemon.name
  return img 
}

const createH3El = (text, className = "pokedex") => {
  const h3 = document.createElement("h3");
  h3.textContent = text;
  h3.className = className 
  return h3
}

const createBttn = (value, className = "pokedex", eventHandler) => {
  const bttn = document.createElement("button");
  bttn.className = className;
  bttn.textContent = value;
  bttn.addEventListener('click', eventHandler)
  return bttn
}

// async/await 
const handleLike = async (event, pokemon, likeNum) => {
    event.stopPropagation();
    ++pokemon.likes;

    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({likes: pokemon.likes}),
    }

    let resp = await fetch(`${BASE_URL}/characters/${pokemon.id}`, configObj)
    let character = await resp.json()
    likeNum.textContent = character.likes;
}

const handleDelete = async (event, pokeCard, id) => {
    event.stopPropagation();

    let configObj = {
      method: "DELETE",
    }

    // optimistic 
    await fetch(`${BASE_URL}/characters/${id}`, configObj)
    pokeCard.remove();
    
    // pessimistic 
    // let resp = await fetch(`${BASE_URL}/characters/${id}`, configObj)
    // if (resp.ok){
    //   pokeCard.remove();
    // }
}

function renderPokemon(pokemon) {
  const card = createPokeCard(pokemon)
  const pokeImg = createImgEl(pokemon.img, pokemon.name)
  const pokeName = createH3El(pokemon.name)
  const pokeLikes = createH3El("Likes: ")
  const likeNum = createH3El(pokemon.likes, "likes-num");
  const likesBttn = createBttn("♥", "like-bttn", (e) => handleLike(e, pokemon, likeNum))
  const deleteBttn = createBttn("delete", "delete-bttn", (e) => handleDelete(e, card, pokemon.id));
  card.append(pokeImg, pokeName, pokeLikes, likeNum, likesBttn, deleteBttn);
  pokeContainer.appendChild(card);
  return card;
}

function showCharacter(id) {
  fetch(`http://localhost:3000/characters/${id}`)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (char) {
      let pokeCard = renderPokemon(char);
      pokeCard.id = "poke-show-card";
      pokeCard.dataset.id = id;
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
