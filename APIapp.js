let gallery = document.querySelector("#gallery");
let filter = document.querySelector("#filter");
let mode={mode: 'no-cors'};
let btn=document.querySelector("#btn");
let inputfirst=document.querySelector("#first")
let inputlast=document.querySelector("#last");
let inputurl=document.querySelector("#url");
let inputemail=document.querySelector("#email");
let form=document.querySelector("form");



fetch("http://localhost:3000/api/v1/users")
  .then(responde => responde.json())
  .then(result => {
    gallery.innerHTML="";

     for(i=0;i<result.length;i++){
    gallery.insertAdjacentHTML("beforeend",rander(result[i]));
    console.log(result)
     }
  })


///////to post
btn.addEventListener("click",function(e){
e.preventDefault;


let data={
  userName:inputfirst.value,
  lastName:inputlast.value,
  email:inputemail.value,
  url:inputurl.value
};
  fetch("http://localhost:3000/api/v1/users",{
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then(responde => responde.json())
  .then(result => {
console.log(result.userName)
    if(result.userName=="exists"){

      confirm("already exist");
    }else{
  
  gallery.insertAdjacentHTML("beforeend",rander(result));
    }

    })
  


  

})



function rander(result){
  return `<div class="card"><p>userName${result.userName}</p>
  <p>email${result.email}</p>
           <img src="${result.url}">
           <br>
           <button id="${result.id}">delete</button></div>
  `
    }

gallery.addEventListener("click",function(e){
 let btn=document.querySelector("button")
  console.log(btn.getAttribute("id"))
if(e.target.tagName=="BUTTON"){
  
  fetch(`http://localhost:3000/api/v1/users/${e.target.getAttribute("id")}`,{method: 'DELETE'})
  .then(responde => {
    if (responde.status == 200) {
  
      e.target.parentElement.innerHTML="has been deleted";}

  })
  

  
}



})
