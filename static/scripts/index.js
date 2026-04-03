const grid= document.getElementById("charliemons_grid");
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
                <button id="fav_button">❤️</button>
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
    const error_msg= document.getElementById("error_msg");

    async function searchCharliemon() {
        error_msg.style.display="none";
        const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${nameorid}`);
        if(!res.ok){
            error_msg.style.display="block";
            error_msg.textContent="Charliemon or id not found";
            return;
        }
        const data= await res.json();
        const card = `
            <div class="charliemon_card">
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <h3 style="text-transform: capitalize;">Charlie${data.name}</h3>
                <p>ID: #${data.id}</p>
                <button id="fav_button">❤️</button>
            </div>
        `;
        grid_search.innerHTML+=card;
    }
    searchCharliemon();
    
});