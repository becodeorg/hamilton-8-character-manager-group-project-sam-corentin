document.querySelector('#search').onclick = function(e)
{
 let valeur = document.querySelector('#searchBar').value;
    
    fetch('https://character-database.becode.xyz/characters?name='+valeur)
    .then(response => response.json())
    .then(datas => {
        for (data of datas){
            const div = document.createElement('div');
            const image = document.createElement('img');
            const name = document.createElement('h3');
            const species = document.createElement('p');
            const btnMore = document.createElement('a');    
            const imgBase = data.image
            div.classList = 'card col-4'
            image.classList = 'card-img'
            btnMore.classList = 'btn btn-primary'    
            image.src = `data:image/png;base64,`+data.image
            name.innerText = data.name
            species.innerText = data.shortDescription
            btnMore.textContent = 'Learn More'    
            div.appendChild(image)
            div.appendChild(name)
            div.appendChild(species)
            div.appendChild(btnMore)
            cardsContainer.appendChild(div)
        }
    });
       

       
             
      
        
    e.preventDefault();
    let value  =document.querySelector('#searchBar').value
    let container =document.querySelector('#cardContainer')
   


    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
