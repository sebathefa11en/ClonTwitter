let usuario = localStorage.getItem("usuario");
let token = localStorage.getItem("token");
let id = localStorage.getItem("id");

if(usuario == null && token == null && id == null){

    window.location.replace("http://127.0.0.1/APITweet/FrontTwitterClon/pages/login.html");
}

let tokenBearer = ('Bearer '+token).replace(/['"]+/g, '');

function tweets(){
fetch('http://127.0.0.1:8000/api/home', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': tokenBearer
         },
         cache: 'no-cache',
         credentials: 'same-origin',
         referrerPolicy: 'no-referrer',
         mode: 'cors',
         method: 'GET',
  
      })
      .then((response) =>  response.json())
      .then(data => {
        //console.log(data);

        let res = document.querySelector('#res');
        
        res.innerHTML = '';

        for(let item of data){
            res.innerHTML += `
            <tr>
                <td>${item.username}</td>
                <td>${item.tweet}</td>
            </tr>
            `
        }
      })
      .catch(error => {
        throw(error);
        });
}

let formulario = document.getElementById('frmtweet');

formulario.addEventListener('submit' , function(e){
  e.preventDefault();
  console.log('me diste un click');

  let datos = new FormData(formulario);

  tweetear(datos);  

})

function tweetear(datos){

  fetch('http://127.0.0.1:8000/api/home', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': tokenBearer
         },
         cache: 'no-cache',
         credentials: 'same-origin',
         referrerPolicy: 'no-referrer',
         mode: 'cors',
         method: 'POST',
         body: JSON.stringify({'tweet' : datos.get('tweet'),
                               'user_id' : id})
  
      })
      .then((response) =>  response.json())
      .then(data => {
        tweets();
      })
      .catch(error => {
        throw(error);
        });
}

tweets();