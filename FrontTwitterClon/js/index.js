    var modal = document.getElementById("tvesModal");
    var btn = document.getElementById("registro");
    var span = document.getElementsByClassName("close")[0];
    var body = document.getElementsByTagName("body")[0];

    btn.onclick = function() {
        modal.style.display = "block";

        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    }

    span.onclick = function() {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";

            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    }


    var modal2 = document.getElementById("tvesModal2");
    var btn2 = document.getElementById("login");
    var span2 = document.getElementsByClassName("close2")[0];
    var body2 = document.getElementsByTagName("body")[0];

    btn2.onclick = function() {
        modal2.style.display = "block";

        body2.style.position = "static";
        body2.style.height = "100%";
        body2.style.overflow = "hidden";
    }

    span2.onclick = function() {
        modal2.style.display = "none";

        body2.style.position = "inherit";
        body2.style.height = "auto";
        body2.style.overflow = "visible";
    }

    window.onclick = function(event) {
        if (event.target == modal2) {
            modal2.style.display = "none";

            body2.style.position = "inherit";
            body2.style.height = "auto";
            body2.style.overflow = "visible";
        }
    }

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

let formulario2 = document.getElementById('frmregister');

formulario2.addEventListener('submit' , function(e){
    e.preventDefault();
    console.log('me diste un click');

    let datos = new FormData(formulario2);

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

