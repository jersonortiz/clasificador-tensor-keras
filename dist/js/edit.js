let authToken = sessionStorage.getItem("USER_TOKEN");
const url = 'http://localhost:8000/estudiante';
if(authToken==null){
	console.log('no hay sesion');
	location.href = "../login.html";
} else {
	const usr = JSON.parse(atob(authToken.split('.')[1]));
	const vm = new Vue({
	    el: 'main',
	    data: 
		    {
		    user: usr
			},
		methods: {
		}

	});


	window.onload = function(){

		document.getElementById("guardarconf").addEventListener("click", edifunc,true );

		document.getElementById("cerrars").addEventListener("click",function() {
			sessionStorage.removeItem("USER_TOKEN");
			location.href = "../login.html";
		});

		function edifunc(event){
			event.preventDefault();
			const url = 'http://localhost:8000/usuario/editar';
		
			let nom= document.getElementById("nom").value;
			let apel= document.getElementById("apel").value;
			let corr= document.getElementById("correo").value;
			let pass= document.getElementById("pass").value;
			let confpass= document.getElementById("confpass").value;


			if(pass===confpass){
				let mj= document.getElementById('msj3');

			
				let data = {
					
					nombre:nom,
					apellido:apel,
					correo:corr,
					password: pass,
				  };
				console.log(data);
			    let heads = new Headers();
			    let aut= "Bearer " + authToken;
			    heads.append("Content-Type", "application/json");
			    heads.append("Authorization", aut);

				let init = {
			  		method: 'POST',
			  		body: JSON.stringify(data),
			  		mode: 'cors', 
			  		headers: heads
				};

				fetch(url,init)
				.then((resp) => resp.json())
				.then(function(data){
			
				let msjdiv= document.getElementById("msj3");
				msjdiv.insertAdjacentHTML( 'afterbegin','<div class="alert alert-success alert-dismissible">'+
					'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
					'<h5><i class="icon fas fa-check"></i> Alert!</h5>'+
					'Cambio exitoso</div>' );

				})
				.catch(function(err){
					console.log(err);

					let msjdiv= document.getElementById("msj3");
					msjdiv.insertAdjacentHTML( 'afterbegin','<div class="alert alert-warning alert-dismissible">'+
				'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
				'<h5><i class="icon fas fa-exclamation-triangle"></i> Alert!</h5>'+
				'Hubo un problema de conexion , intente mas tarde</div>' );

				});
			} else {

			let msjdiv= document.getElementById('msj3');

			msjdiv.insertAdjacentHTML( 'afterbegin', '<div class="alert alert-warning alert-dismissible">'+
			'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
			'<h5><i class="icon fas fa-exclamation-triangle"></i> Alert!</h5>'+
			'Error , las contraseñas no coinciden</div>');

			}
		}
	}

}