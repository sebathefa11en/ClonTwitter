let usuario = localStorage.getItem("usuario");
let token = localStorage.getItem("token");
let id = localStorage.getItem("id");

if(usuario == null && token == null && id == null | usuario == undefined && token == undefined && id == undefined){

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
            <div class="wrappert bordes">
              <img src="https://via.placeholder.com/75" alt="" class="onet circular--square">
              <div class="bordes twot textoWhite">
                <label class="textoWhite">@${item.username}</label>
              </div>
              <div class="bordes twott textoWhite">
                <label class="textoWhite">${item.tweet}</label>
              </div>
            </div>
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
        document.getElementById('tweetin').value = '';
        tweets();
      })
      .catch(error => {
        throw(error);
      });
}

tweets();