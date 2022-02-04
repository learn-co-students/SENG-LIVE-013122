# Exercise:

1. Using the `document.getElementById()` method, select the 'Site search...' input box, id `'#main-q'`, at the top of the provided MDN document.

    document.getElementById('main-q')

2. The goal of this challenge is to return ALL the `'p'` tags on the provided MDN document. Consider which of the selectors discussed would be best applied here by first inspecting the page and reviewing the DOM. Once completed, the return should be a list of nodes. What array method can be used to log each element to the console? Go ahead and test this out in your console.  

    document.getElementsByTagName('p')

    document.querySelectorAll('p').forEach((p) => console.log(p))

    let ps = document.querySelectorAll('p')
    ps.forEach((p) => console.log(p))

    for (const p of ps){
        console.log(p)
    }

3. Now that we have seen how to create an element and append it to the DOM, add the following capabilities to renderPokemon:
    ✔️ Creates an "h3" element for each Pokemon and stores the element in a variable (pokeName)
	✔️ Use textContent() to fill in the heading with the character name. 

    const pokeName = document.createElement("h3");
    pokeName.textContent = character.name;

    pokeCard.appendChild(pokeName);

4. (Stretch Challenge) After updating the header image of the web page, using a combination `.innerHTML()` and a string, consider a better way to append this header image to the DOM. What method and steps can be taken to allow for the use of `.replaceChild()` [MDN .replaceChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild)

const headerImg = document.createElement('img')
const h1 = document.querySelector('h1')
console.log(h1)
headerImg.id = "header-img"
headerImg.src = "https://external-preview.redd.it/tQged7mKJ3cUpNMq5IMeceZvyKP3cTyHqhNmKEQ0Vv8.png?auto=webp&s=fb5fd61cae0bc9cde2bc2a006b1e2aeb0c935ce9"

header.replaceChild(headerImg, h1)