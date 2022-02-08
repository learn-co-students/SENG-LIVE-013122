# Async JS and Fetch

### Objectives

- Define client vs server side
- Explain the request-response cycle
- Identify the importance of HTTP verbs
- Describe asynchronous functions in JavaScript
- Use fetch() to retrieve data from external API

### Using JSON Server

- Install JSON Server by running the following command in the terminal: `npm install -g json-server`
- To initialize the JSON server, run `json-server --watch db.json` while in the directory that contains the `db.json` file i.e. `SENG-LIVE-013122-phase-1/07-async-fetch`
- For this project, we will use the following endpoint: `http://localhost:3000/pokemon`

### Deliverables

#### 1. Create a function `getPokemon()`

- Fetches all pokemon via `http://localhost:3000/pokemon`

- Invokes renderPokemon() for each returned character

#### 2. Create a function `showCharacter()`

- Accepts 1 parameter, name

- Fetches the pokemon character that matches via `http://localhost:3000/pokemon?name=${name}`

- Invokes renderPokemon() for the returned character

- Replaces `pokeContainer` innerHTML with the matched character only. HINT: use `.replaceChildren()`

### Warm up exercise

1. Attach a ‘click’ event to each individual `pokeCard` div created in `renderPokemon()`

2. Define a new function, `showCharacter()` that will accept a character object parameter

3. `showCharacter()` will be used as the event handler for the click event attached to the `pokeCard`. The pokemon object defined in `renderPokemon()` should be passed as an argument to `showCharacter()`.

4. Inside the function `showCharacter()`, log the character parameter to confirm that the object is being passed successfully through each click made on the pokeCard element.

✨ BONUS: Confirm the return value of `renderPokemon()` inside `showCharacter()` using debugger. To do so:

- Add a debugger inside the function, `showCharacter()`
- In the browser, click a pokeCard element to invoke the debugger
- Navigate to the console tab in the dev tools
- Run the following line inside the console: renderPokemon(character)

### Resources

- [MDN .replaceChildren()](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren)
- [MDN debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger)
