let linkToApi = "https://character-database.becode.xyz/";
let postID =(new URLSearchParams(window.location.search)).get('id');

function blocker(e,id,valueMax)
{
  
    let element = e.currentTarget;
    let value ;
   
    document.querySelector('#'+id).innerHTML =value.length;
    if(value.length>valueMax)
    {
        element.style.background = 'red';
    }else{
        element.style.background = 'transparent';
    } 
}


  
let  editor =ClassicEditor
.create( document.querySelector( '#description' ) )
editor.then( editor => {
 
  editor.model.document.on('change:data', (evt, data) => { 
   
      document.querySelector('#longDescriptionNumberMax').innerHTML = editor.getData().length       
  });

} )

   
    
document.querySelector('#nameHeroes').onkeyup = function(e)
{

    blocker(e,'nameNumberMax',20);   
}

document.querySelector('#shortDescription').onkeyup = function(e)
{
    blocker(e,'ShirDescriptionNumberMax',70);
    
}

document.querySelector('#description').onkeyup = function(e)
{
    
    blocker(e,'longDescriptionNumberMax',350); 
}



document.querySelector('#formFileLg').onchange = function(e)
{
    loadFile(e);
}

let loadFile= function(e)
{
    
    let output = document.querySelector('#previewsPicture img');
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
      }
}


let image64;

 


function renderOneCharacter(data)
{
    document.querySelector('#nameHeroes').value = data.name
    document.querySelector('#shortDescription').value = data.shortDescription;
    editor.then(editor=>editor.setData(data.description))
    document.querySelector('input[type=file]').innerHTML = `data:image/png;base64`+data.image
}
function renderOneByPostID(postID)
{
    fetch(linkToApi+'characters/'+postID)
    .then(response => response.json())
    .then(data => renderOneCharacter(data));
}

if(postID!=null){
    renderOneByPostID(postID)
    let fullName =  document.querySelector('#nameHeroes').value;
    let shortDescription =document.querySelector('#shortDescription').value;
   
}


     toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))
  
document.querySelector('#save').onclick=function(e)
{
    e.preventDefault();
  
    if(postID == null){
        
  
        let block = false;
        let inputs =document.querySelectorAll('.form-control');

        for (input of inputs)
        {
       
            if(input.value =="")
            {
            input.style.background = 'red';
            block = true;
            
                
            }
        }

        if(block == false)
        {
            toDataURL(document.querySelector('input[type=file]').files[0].name)
            .then(dataUrl => {
                insert(dataUrl); 
            })


        }

   

   



    if(block == false)
    {
        let firstname = document.querySelector('#nameHeroes').value;
        let shortDescription = document.querySelector('#shortDescription').value;
        //let longDescription = document.querySelector('#description').innerHTML;
     
        
     
toDataURL(document.querySelector('input[type=file]').files[0].name)
.then(dataUrl => {
    
         let index = dataUrl.indexOf(',');
        image64 = dataUrl.substring(index + 1);
        editor.then(editor=>{

        (async () => {
            const rawResponse = await fetch(linkToApi+ "characters", {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                name: firstname,
                shortDescription:shortDescription,
                description :  editor.getData(),
                image : image64


            }) 
            });
            const content = await rawResponse.json();
            
          })();
        })
        })

    }


    }else{
       
        const newCharacter = {
          name: document.querySelector('#nameHeroes').value ,
          shortDescription: document.querySelector('#shortDescription').value,
        }
        toDataURL(document.querySelector('input[type=file]').files[0].name)
        .then(dataUrl => {
            update(dataUrl);    
        })

    }
}


function insert(dataUrl)
{
    let firstname = document.querySelector('#nameHeroes').value;
    let shortDescription = document.querySelector('#shortDescription').value;
    image64 = base64(dataUrl)
    editor.then(editor=>{
        insertOrUpdate(postID,firstname,shortDescription,editor.getData(),image64);
    })
    
}

function base64(url)
{
    let index = url.indexOf(',');
    image64 = url.substring(index + 1); 
    return image64;
}

function update(dataUrl)
{
   
    image64 = base64(dataUrl);
    let firstname = document.querySelector('#nameHeroes').value;
    let shortDescription = document.querySelector('#shortDescription').value;
    editor.then(editor=>{
        insertOrUpdate(postID,firstname,shortDescription,editor.getData(),image64);
    })
}

function insertOrUpdate(postID,firstname,shortDescription,description,image)
{
    let link
    let method
    if(postID == null){
        link =linkToApi+ "characters";
        method = 'POST'
    }
    else{
        link = "https://character-database.becode.xyz/characters/"+postID;
        method = "PUT"
    }
    fetch(link, {
        method: method,
        //Le header défini que les données qu'on envoi seront en format JSON (metadata, complément d'information à destination de l'API)
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          name:firstname ,
          shortDescription:shortDescription,
          description : description,
          image :image
      })
    })
}



