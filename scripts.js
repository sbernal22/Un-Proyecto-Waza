const grid= document.getElementById("charliemons_grid")
async function fetchData() {
    const numeros = Array.from({length: 100}, (_, i) => i + 1);
    numeros.sort(() => Math.random() - 0.5);

    for(let num of numeros){
        const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
        const data= await res.json();
        const card = `
            <div class="charliemon_card">
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <h3 style="text-transform: capitalize;">Charlie${data.name}</h3>
                <p>ID: #${data.id}</p>
            </div>
        `;
        grid.innerHTML+=card;
    }
}
fetchData();

document.querySelector("form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const grid_search= document.getElementById("charliemons_grid_search")
    const nameorid=document.getElementById("sCharliemon").value.toLowerCase();
    async function searchCharliemon() {
        const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${nameorid}`);
        if(!res.ok){
            alert("Pokemon or id not found!");
            return;
        }
        const data= await res.json();
        const card = `
            <div class="charliemon_card">
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <h3 style="text-transform: capitalize;">Charlie${data.name}</h3>
                <p>ID: #${data.id}</p>
            </div>
        `;
        grid_search.innerHTML+=card;
    }
    searchCharliemon();
});