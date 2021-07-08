let formulario = document.getElementById('frmregister');

formulario.addEventListener('submit' , function(e){
    e.preventDefault();
    console.log('me diste un click');

    let datos = new FormData(formulario);

    //console.log(datos.get('name'));
    //console.log(datos.get('email'));
    //console.log(datos.get('password'));
    //console.log(datos.get('username'));

    fetch('http://127.0.0.1:8000/api/register', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
         },
         cache: 'no-cache',
         credentials: 'same-origin',
         referrerPolicy: 'no-referrer',
         mode: 'cors',
         method: 'POST',
         body: JSON.stringify({'name' : datos.get('name'),
                               'email' : datos.get('email'),
                                'password' : datos.get('password'),
                                'username' : datos.get('username')})
  
      })
      .then((response) =>  response.json())
      .then(data => {
        console.log(data); 
        window.location.replace("http://127.0.0.1/APITweet/FrontTwitterClon/index.html");
      })
      .catch(error => {
        throw(error);
        });
})

