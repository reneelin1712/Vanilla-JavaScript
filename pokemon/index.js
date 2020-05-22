//pokemon and pokemon-card class
let catchedPokemon = [];
let currentPokemon = {};

class Pokemon {
  constructor(id, name, height, weight, url) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.url = url;
  }
}

class PokemonCard {
  static deleteNode(e) {
    console.log(e);
    const currentBtn = e.target;
    // console.log(currentBtn);
    const btnParent = currentBtn.parentElement;
    console.log(btnParent);

    const listNodes = Array.from(btnParent.closest("ul").children);
    const index = listNodes.indexOf(btnParent);
    console.log("index is " + index);
    localStorage.setItem("myPokemons", JSON.stringify(catchedPokemon));
    const myPokemonss = JSON.parse(localStorage.getItem("myPokemons"));
    console.log("mypokemons: ", myPokemonss);

    catchedPokemon.splice(index, 1);
    btnParent.remove();
    console.log("update" + catchedPokemon);
    localStorage.setItem("myPokemons", JSON.stringify(catchedPokemon));
    const myPokemons = JSON.parse(localStorage.getItem("myPokemons"));
    console.log("retrievedObject: ", myPokemons);
  }

  static addCard(parentNode, pokemon) {
    // console.log(pokemon);
    const card = document.createElement("div");
    card.innerHTML = `<img src=${pokemon.url} /><p>${pokemon.name}</p><button class="transfer">Delete</button>
     `;
    parentNode.appendChild(card);
    const transfer = document.querySelectorAll(".transfer");
    // console.log(transfer);
    transfer.forEach(btn =>
      btn.addEventListener("click", PokemonCard.deleteNode)
    );
  }

  static replaceCard(parentNode, pokemon) {
    const card = document.createElement("div");
    card.innerHTML = `<img src=${pokemon.url} /><p>${pokemon.name}</p>
     `;
    // console.log(parentNode.firstChild);
    parentNode.replaceChild(card, parentNode.firstChild);
  }
}

// fetch random wild pokemon on the left
const randomWildPokemon = () => {
  let randomNumber = Math.floor(Math.random() * 726);
  console.log(randomNumber);
  fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
    .then(res => res.json())
    .then(pokemon => {
      //   console.log(pokemon);
      let wildPokemon = new Pokemon(
        pokemon.id,
        pokemon.name,
        pokemon.height,
        pokemon.weight,
        pokemon.sprites.front_default
      );
      //   console.log(wildPokemon);
      currentPokemon = wildPokemon;

      const leftWindow = document.querySelector("#left");
      PokemonCard.replaceCard(leftWindow, wildPokemon);
    });
};

// window.onload = randomWildPokemon;

function addLoadEvent(func) {
  let oldonload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    };
  }
}
addLoadEvent(randomWildPokemon);
addLoadEvent(function() {
  const catchedNode = document.querySelector("#catchedPokemon");
  const myPokemons = JSON.parse(localStorage.getItem("myPokemons"));
  console.log("retrievedObject: ", myPokemons);
  catchedPokemon = myPokemons;
  myPokemons.forEach(pokemon => {
    PokemonCard.addCard(catchedNode, pokemon);
  });
});

//catch a pokemon, show it on the right
const skipBtn = document.querySelector("#skip");
const catchBtn = document.querySelector("#catch");

skipBtn.addEventListener("click", randomWildPokemon);

const addToDeck = () => {
  catchedPokemon.push(currentPokemon);
  localStorage.setItem("myPokemons", JSON.stringify(catchedPokemon));
  const catchedNode = document.querySelector("#catchedPokemon");

  PokemonCard.addCard(catchedNode, currentPokemon);
  console.log("current list " + catchedPokemon);
  randomWildPokemon();
};

catchBtn.addEventListener("click", addToDeck);

//save in local storage
