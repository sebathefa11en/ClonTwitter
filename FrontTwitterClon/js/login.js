let formulario = document.getElementById('frmlogin');


formulario.addEventListener('submit' , function(e){
    e.preventDefault();
    console.log('me diste un click');

    let datos = new FormData(formulario);

    fetch('http://127.0.0.1:8000/api/login', {
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
         body: JSON.stringify({
            'email' : datos.get('email'),
            'password' : datos.get('password')
        })
  
      })
      .then((response) => response.json())
      .then(data => {
          console.log(data)
          localStorage.setItem("token", JSON.stringify(data['token']));
          localStorage.setItem("usuario", JSON.stringify(data['username']));
          localStorage.setItem("id", JSON.stringify(data['id']));
          window.location.replace("http://127.0.0.1/APITweet/FrontTwitterClon/pages/home.html");
        });
})

