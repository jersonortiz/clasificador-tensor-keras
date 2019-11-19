let authToken = sessionStorage.getItem("USER_TOKEN");
let usuario = JSON.parse(sessionStorage.getItem("USER_DATA"));
let url = serverurl+'estudiante';
console.log(usuario);
if((authToken==null) && (usuario==null) ){
	console.log('no hay sesion');
	location.href = "../login.html";
} else {
console.log(authToken);

console.log(url);


// me base en:
//https://medium.com/@maison.moa/using-jwt-json-web-tokens-to-authorize-users-and-protect-api-routes-3e04a1453c3e

Vue.component('selecc-materia', {
	props: ['mates', 'calmate'],
	methods : {
		seleccionar: function (event) {
			this.calificar =true;

		    console.log(event.target.value);

		    let caldat= {codigo:event.target.value};
		    let heads = new Headers();
		    
		

			heads.append("Accept", "application/json");
		    heads.append("Content-Type", "application/json");
		    heads.append("Authorization", authToken);
			let init = 
			{
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(caldat), 
				headers: heads
			};
			fetch(url+'/materias/infocalificar',init)
			.then((resp) => resp.json())
			.then(function(data){
				vm.calmat=data;
				console.log(data);
			})
			.catch(err => {console.log(err)});
		} ,
		calif: function (event) {
			this.calificar =false;
			this.relcal=true;

		 
		    let heads = new Headers();
		    let unidad= event.target.value;
			let valor= 4;
			let radios = document.getElementsByName("cumplim");
			for (let i = 0; i < radios.length; i++) {       
			    if (radios[i].checked) {
			       valor = radios[i].value;
			        break;
			    }
      }

		    let datos = {
		    	codigo: vm.calmat.codigo,
		    	grupo:vm.calmat.grupo,
		    	unidad:unidad,
		    	valor:valor
		    }

			heads.append("Accept", "application/json");
		    heads.append("Content-Type", "application/json");
		    heads.append("Authorization", authToken);
			let init = 
			{
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(datos), 
				headers: heads
			};

			fetch(url+'/materias/calificar',init)
			.then((resp) => resp.json())
			.then(function(data){

				console.log(data);
			})
			.catch(err => {console.log(err)});




		},
		closmen: function (event) {
			this.relcal=false;
		}
	},
    data() {
        return {
            calificar: false,
            relcal:false,
        }
    },

});

const vm = new Vue({
    el: 'main',
    data: 
	    {
	    mat : { },
	    user: usuario,
	    calmat:
		    {
				succes:false,
				codigo: 0,
				grupo: '',
				docente: '',
				unidades : [
					{
					nombre: '',
					horaspre: 0,
					horasind: 0,
					temas: [
						{
						nombre: ''
						}
					]
			        }
		        ]

		    }
		},
	methods: {
	},
	created: cargarmaterias,

});


function cargarmaterias(){

	let init = {
	  		method: 'POST',
	  		mode: 'cors', 
			headers: {
				'Authorization': 'Bearer ' + authToken
			}
		};

	fetch(url+'/materias', init)
	.then(res => res.json())
	.then(function(dat){
		vm.mat = dat;
	})
	.catch(err => { console.log(err) });
}


window.onload = function(){
	document.getElementById("cerrars").addEventListener("click",function() {
		sessionStorage.removeItem("USER_TOKEN");
		location.href = "../login.html";
	});
}

}