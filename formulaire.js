let linkToApi = "https://character-database.becode.xyz/";


function blocker(e,id,valueMax)
{
    let element = e.currentTarget;
    let value ;
    if(id == "longDescriptionNumberMax")
    {   
         value = element.innerHTML
    }else{
         value = element.value;
    }
   
    document.querySelector('#'+id).innerHTML =value.length;
    if(value.length>valueMax)
    {
        element.style.background = 'red';
    }else{
        element.style.background = 'transparent';
    } 
}

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

function readFile() {
    
    console.log(this.files);

    if (!this.files || !this.files[0]) return;
    const FR = new FileReader();
   

    FR.addEventListener("load", function(evt) {

        let index = evt.target.result.indexOf(',');
        image64 = evt.target.result.substring(index + 1);
        return(image64)
    })
    FR.readAsDataURL(this.files[0]);
    
}



document.querySelector('#save').onclick=function(e)
{
    e.preventDefault();
    //readFile();
    let block = false;
    let inputs =document.querySelectorAll('input');
    for (input of inputs)
    {
        if(input.value =="")
        {
         input.style.background = 'red';
         block = true;
            
        }
    }




    // test 


 

  
       // let index = toDataURL(linkToApi).value.indexOf(',');
        //let image64 =toDataURL(linkToApi).value.substring(index + 1);

 
 
  //console.log(document.querySelector('input[type=file]').files[0].name);
/*let base64 ;
  toDataURL(document.querySelector('input[type=file]').files[0].name)
    .then(dataUrl => {
        base64 = dataUrl
        
      //console.log('RESULT:', dataUrl)
    })
    */
    

   //document.querySelector("#formFileLg").addEventListener("click", readFile);
    
    
//let image64;// 



//block = true
/*const toDataURL = url =>  fetch(url)
.then(response => response.blob())
.then(blob => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onloadend = () => resolve(reader.result)
  reader.onerror = reject
  reader.readAsDataURL(blob)
})).then((data)=>{
    let index = data.indexOf(',')
    var image64 = data.substring(index+1)
    
})*/

    //let image64;
   // toDataURL(linkToApi);


   // files addEventlisteener
  
/*let image64;

function readFile(files) {
    //console.log(files)
    if (!files || !files[0]) return;
    const FR = new FileReader();

     FR.addEventListener("load", function(evt) {
        //console.log(evt);
        let index = evt.target.result.indexOf(',');
         image64 = evt.target.result.substring(index + 1);
        
    });
    FR.readAsDataURL(files[0]);

    
}
readFile(document.getElementById("formFileLg").files);
console.log(image64);*/
//document.getElementById("formFileLg").addEventListener("change", readFile);

let imageBase64;

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))





    //block = true;
    if(block == false)
    {
        let firstname = document.querySelector('#nameHeroes').value;
        let shortDescription = document.querySelector('#shortDescription').value;
        let longDescription = document.querySelector('#description').innerHTML;
     
      
     
toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0')
.then(dataUrl => {
   
         let index = dataUrl.indexOf(',');
        image64 = dataUrl.substring(index + 1);
        
  //console.log('RESULT:', dataUrl)

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
                description : longDescription,
                image : image64


            }) 
            });
            const content = await rawResponse.json();
          
            console.log(content);
          })();
        })
      
    }

}



