function createElements(container,elements,data){
    for (element of elements)
    {
        let child = document.createElement(element)
        if(element =='img')
        {
            element.classList = 'card-img'
            child.src = `data:image/png;base64,`+data.image
        }
        if(element =='a')
        {
            element.classList = 'btn btn-primary'
            child.textContent = 'Learn More'  

        }
        if(element =='h3')
        {
            element.innerText = data.name
           
        }
        if(element == 'p'){
            child.innerText = data.shortDescription
        }
        container.appendChild(child)
    }
}


document.querySelector('#search').onclick = function(e)
{
 let valeur = document.querySelector('#searchBar').value;
    
    fetch('https://character-database.becode.xyz/characters?name='+valeur)
    .then(response => response.json())
    .then(datas => {
        for (data of datas){
            const div = document.createElement('div');
            createElements(div,['img','h3','a','p'],data)
            div.classList = 'card col-4'   
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
