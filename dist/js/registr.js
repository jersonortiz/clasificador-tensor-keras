window.onload = function(){
let authToken = sessionStorage.getItem("USER_TOKEN");
let usuario = JSON.parse(sessionStorage.getItem("USER_DATA"));
//listfacultades();

function listfacultades(){
				let init = {
		  		method: 'GET',
		  		mode: 'cors', 
		  		headers:{
		    	'Content-Type': 'application/json'
				}
			};
			let url=serverurl+'facultad/todos'

			fetch(url,init)
			.then((resp) => resp.json())
			.then(function(data){
			vm.facultades=data;
			})
			.catch(function(err){
				console.log(err);
			});

}


const vm = new Vue({
    el: 'main',
    data: 
	    {
	    	nomcam:'',
	    	mostfor:false,
	    	tireg:2,
	    	facultades:{nombre:''},
	    	departamentos:{nombre:''},
	    	programas:{nombre:''}
		},
	methods:{
		seleccionar: function (event) {
			vm.mostfor=true;
			let tipo= document.getElementById("seltipo").value;
			let facultad= document.getElementById("selfacultad").value;
			let init = {
		  		method: 'GET',
		  		mode: 'cors', 
		  		headers:{
		    	'Content-Type': 'application/json'
				}
			};
			switch(tipo){
				case 1:
					url=serverurl+'programa/todos/'+facultad
					fetch(url,init)
					.then((resp) => resp.json())
					.then(function(data){
						vm.programas=data;
					})
					.catch(function(err){
						console.log(err);
					});
					break;
				case 2:
					url=serverurl+'departamento/todos/'+facultad
					fetch(url,init)
					.then((resp) => resp.json())
					.then(function(data){
						vm.departamentos=data;
					})
					.catch(function(err){
						console.log(err);
					});
					break;
				case 3:
					url=serverurl+'programa/todos/'+facultad
					fetch(url,init)
					.then((resp) => resp.json())
					.then(function(data){
						vm.programas=data;
					})
					.catch(function(err){
					break;
					});
			}	
		},
		regreso : function (event){
			vm.mostfor=false;
		}

	}


});

	function regisfunc(event){
		event.preventDefault();

		let cod= document.getElementById("codigo").value;
		let nom= document.getElementById("nom").value;
		let apel= document.getElementById("apel").value;
		let corr= document.getElementById("correo").value;
		let pass= document.getElementById("pass").value;
		let confpass= document.getElementById("confpass").value;
		let tipo= document.getElementById("seltipo").value;

		if(pass===confpass){
			
			let data = {
				codigo: cod ,
				nombre:nom,
				apellido:apel,
				correo:corr,
				password: pass,
				tipo:tipo
			  };
			console.log(data);

			let init = {
		  		method: 'POST',
		  		body: JSON.stringify(data),
		  		mode: 'cors', 
		  		headers:{
		    	'Content-Type': 'application/json'
				}
			};

			fetch(url,init)
			.then((resp) => resp.json())
			.then(function(data){
				console.log(data);
				window.alert("Registro exitoso");
				location.href = "./login.html";

			})
			.catch(function(err){
				console.log(err);

			});
		} else {

			let msjdiv= document.getElementById("msj3");
			msjdiv.insertAdjacentHTML( 'afterbegin', '<div class="alert alert-warning alert-dismissible">'+
			'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
			'<h5><i class="icon fas fa-exclamation-triangle"></i> Alert!</h5>'+
			'Error , las contraseñas no coinciden</div>');

		}	
	}



	document.getElementById("buttonregstro").addEventListener("click",regisfunc,true );

}

