const apiUrl = "https://character-database.becode.xyz/characters";
const cardsContainer = document.querySelector('#cardContainer')

fetch(apiUrl)
.then(response => response.json())
.then(data => renderCharacters(data));



function renderCharacters(characters) {
    characters.forEach(character => {    
        const div = document.createElement('div');
        const image = document.createElement('img');
        const name = document.createElement('h3');
        const species = document.createElement('p');
        const btnMore = document.createElement('a');    
        const imgBase = character.image
        const characterID = character.id;
        div.classList = 'card col-4'
        image.classList = 'card-img'
        btnMore.classList = 'btn btn-primary'    
        image.src = `data:image/png;base64,${imgBase}`
        name.innerText = character.name
        species.innerText = character.shortDescription
        btnMore.textContent = 'Learn More'
        btnMore.href = "singeCharacter.html?id="+characterID;    
        div.appendChild(image)
        div.appendChild(name)
        div.appendChild(species)
        div.appendChild(btnMore)
        cardsContainer.appendChild(div)  });
};