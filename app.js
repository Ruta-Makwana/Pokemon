"strict";

// select container class so we can add pokemon cards on it
const container = document.querySelector(".container");

// you can directly change innerHTML of container but this logic is not enough now.
// below is for static stats, now we are using dynamic stats
/* container.innerHTML = 
    `
        <div class="pokemon-card">
        <h2>Blaziken</h2>
        <div>
            <img src="./images/Blaziken.jpg" alt="Blaziken">
        </div>
        <div class="stats">
            <div class="stat">
                <p>Stamina:</p>
                <button class="decrease">-</button>
                <span id="stamina">1</span>
                <button class="increase">+</button>
            </div>
            <div class="stat">
                <p>Defence:</p>
                <button class="decrease">-</button>
                <span id="defence">1</span>
                <button class="increase">+</button>
            </div>
            <div class="stat">
                <p>Attack:</p>
                <button class="decrease">-</button>
                <span id="attack">1</span>
                <button class="increase">+</button>
            </div>
            <p>Remaining Points: <span class="remaining-points">7</span></p>
        </div>
        </div>
    `;
 */

// create data; objects inside of array
let pokemons = [
  {
    name: "Blaziken",
    image: "./images/Blaziken.jpg",
    stamina: 2,
    defence: 1,
    attack: 3,
    remaining: 4,
  },
  {
    name: "Charizard",
    image: "./images/Charizard.jpg",
    stamina: 5,
    defence: 1,
    attack: 1,
    remaining: 3,
  },
];

// to add more pokemons data
// to add more objects inside this array

// 1st:  can use push method to add new item to array
/* pokemons.push({
    name: "Garchomp",
    image: "./images/Garchomp.jpg",
    stamina: 5,
    defence: 1,
    attack: 1,
    remaining: 3,
}) */

// 2nd: spread operator used to copy previous objects and new object added later on
pokemons = [
  ...pokemons,
  {
    name: "Garchomp",
    image: "./images/Garchomp.jpg",
    stamina: 5,
    defence: 1,
    attack: 1,
    remaining: 3,
  },
];

// dynamic pokemon card rendering

function renderPokemonCards() {
  const html = pokemons.map(
    (pokemon) =>
      `
        <div class="pokemon-card card d-flex justify-center bg-light mx-auto" id="${pokemon.name}">
        <h2 class="text-center">${pokemon.name}</h2>
        <div>
            <img class="card-img-top" src="${pokemon.image}" alt="Blaziken">
        </div>
        <div class="stats card-body">
            <div class="stat text-center">
                <p>Stamina:</p>
                <button class="decrease stamina btn btn-danger">-</button>
                <span id="stamina">${pokemon.stamina}</span>
                <button class="increase stamina btn btn-primary">+</button>
            </div>
            <div class="stat text-center">
                <p>Defence:</p>
                <button class="decrease defence btn btn-danger">-</button>
                <span id="defence">${pokemon.defence}</span>
                <button class="increase defence btn btn-primary">+</button>
            </div>
            <div class="stat text-center">
                <p>Attack:</p>
                <button class="decrease attack btn btn-danger">-</button>
                <span id="attack">${pokemon.attack}</span>
                <button class="increase attack btn btn-primary">+</button>
            </div>
            <p class="text-center">Remaining Points: <span class="remaining-points">${pokemon.remaining}</span></p>
        </div>
        </div>
    `
  );

  container.innerHTML = html.join("");
}

renderPokemonCards();

container.addEventListener("click", (e) => {
    // get element
    // console.log(e.target);

    // get parent element
    //console.log(e.target.parentElement);

    // get parent#s parent element
    //console.log(e.target.parentElement.parentElement);

    // get id 
    // finds closest class named pokemon-card and reaches its id
    // console.log(e.target.closest(".pokemon-card").id);

    // we are getting the name because we need to change the fields(stamina etc.) by name, not all the fields of the pokemons
    const name = e.target.closest(".pokemon-card").id;

    // it checks all classes inside of target and gives false if name contains no 'increase' class
    // gives true if it contains the class 'increase'
    // console.log(e.target.classList.contains("increase"));

    // we get fields by checking class name that we added(stamina, defence, attack)
    let field;
    if(e.target.classList.contains("stamina")){
        field = "stamina";
    } else if(e.target.classList.contains("defence")){
        field = "defence";
    } else if(e.target.classList.contains("attack")){
        field = "attack";
    }
    // console.log(field)

    // check if pokemon.name from pokemons data and name that we get from variable 'name' are same or not
    // find index number of pokemons where pokemon name equals to name that we get from clicking
    // blaziken index 0, charizard index 2, garchomp index 3
    const index = pokemons.findIndex((pokemon) => pokemon.name === name)
    // console.log(index);

    // get the number written inside the fields
    console.log(pokemons[index][field]);

    // increase or decrease the values of the fields by pressing the +- buttons
    // using ternary operator. if contains increase, do +1, otherwise do -1
    const amount = e.target.classList.contains('increase') ? 1: -1

    pokemons[index][field] += amount;
    pokemons[index].remaining -= amount;

    renderPokemonCards();


    // TODO: write check for remaining points 
    // not working right now
/*     if(pokemons[index].remaining > 0 && pokemons[index][field] > 0){
        pokemons[index][field] += amount;
        pokemons[index].remaining -= amount;
    } else if(pokemons[index].remaining === 0 && pokemons[index][field] > 0){
        if(amount === -1){
            pokemons[index][field] += amount;
            pokemons[index].remaining -= amount;
        }
    } */
})
