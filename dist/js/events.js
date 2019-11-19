window.onload = function(){

	document.getElementById("login").addEventListener("click", loginfunc,true );

	document.getElementById("recuperar").addEventListener("click", recuperfunc,true );

}

	function loginfunc(event){
		event.preventDefault();
		
		let url = serverurl+'login';
		let usr= document.getElementById("cod").value;
		let pass = document.getElementById("pass").value;
		let auth = {};
		let data = {codigo: usr , password: pass };
		let init = {
	  		method: 'POST',
	  		headers: {
	  			'Accept':'application/json',
	  			'Content-type':'application/json',
	  			'Access-Control-Allow-Origin':'*'
	  		},
	  		body: JSON.stringify(data),
			cache: 'default'
		};

		fetch(url,init)
		.then((resp) => resp.json())
		.then(function(data){
			if(data) {
				let token = data.token;
				sessionStorage.setItem("USER_TOKEN", token);
				console.log(token);

				let re =JSON.parse(atob(token.split('.')[1]));
				let url2 = serverurl+'persona/codigo/'+re.sub;
				auth= re.authorities;
		
			    let heads = new Headers();
				heads.append('Accept', 'application/json');
				heads.append('Content-type', 'application/json');
				heads.append('Access-Control-Allow-Origin', '*');
				heads.append('Authorization',token);
				let init2 = {
						method: 'GET',
						headers: heads,
						cache: 'default'
				};
				return fetch(url2,init2);

			} else {
		
				let msjdiv= document.getElementById("msjerr");
				msjdiv.insertAdjacentHTML( 'afterbegin','<div class="alert alert-warning alert-dismissible">'+
				'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
				'<h5><i class="icon fas fa-exclamation-triangle"></i> Alert!</h5>'+
				'contraseña incorreta</div>' );
			}
		})
		.then((resp) => resp.json())
		.then(function(data){
			sessionStorage.setItem("USER_DATA",JSON.stringify(data));

				let tipo = 1;
				switch(auth[1]) {
					case 'ROLE_ESTUDIANTE':
						location.href = "estudiante/dashboard.html";
						break;
					case 'ROLE_DOCENTE':
						location.href = "docente/dashboard.html";
						break;
					case 'ROLE_ADMINISTRADOR':
						location.href = "admin/dashboard.html";
						break;
				}
		})
		.catch(function(err){
			console.log(err);
			let msjdiv= document.getElementById("msjerr");
				msjdiv.insertAdjacentHTML( 'afterbegin','<div class="alert alert-warning alert-dismissible">'+
				'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
				'<h5><i class="icon fas fa-exclamation-triangle"></i> Alert!</h5>'+
				'error de conexion , no se puede conectar con el servidor</div>' );
		});
		
	}


function recuperfunc(event){
	event.preventDefault();
	const url = 'http://localhost:8888/usuario/recuperar';
	let corr= document.getElementById("reccorreo").value;
	let data = {correo: corr };
	let init = {
	  		method: 'POST',
	  		body: JSON.stringify(data),
	  		headers: {
	  			'Accept':'application/json',
	  			'Content-type':'application/json',
	  			'Access-Control-Allow-Origin':'*'
	  		},
		};
	fetch(url,init)
	.then((resp) => resp.json())
	.then(function(data){
		let msjdiv= document.getElementById("msjrecu");
		msjdiv.insertAdjacentHTML( 'afterbegin','<div class="alert alert-success alert-dismissible">'+
		'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
		'<h5><i class="icon fas fa-check"></i> Alert!</h5>'+
		'se ha enviado un correo a '+ correo +' por favor verifique su vandeja de entrada</div>' );

	})
	.catch(function(err){
	let msjdiv= document.getElementById("msjrecu");
		msjdiv.insertAdjacentHTML( 'afterbegin','<div class="alert alert-warning alert-dismissible">'+
		'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
		'<h5><i class="icon fas fa-exclamation-triangle"></i> Alert!</h5>'+
		'error de conexion , no se puede conectar con el servidor</div>' );
});

}