let authToken = sessionStorage.getItem("USER_TOKEN");
let usuario = JSON.parse(sessionStorage.getItem("USER_DATA"));
let url = serverurl+'docente';

console.log(usuario);
if((authToken==null) && (usuario==null) ){
	console.log('no hay sesion');
	//location.href = "../login.html";
} else {
	console.log(authToken);
	console.log(url);

var hoy = new Date();
var dd = hoy.getDate();
var mm = hoy.getMonth()+1;
var yyyy = hoy.getFullYear();
console.log("dd: "+dd+" mm: "+mm+" yyyy: "+yyyy);
console.log(mm/6);
console.log(1/6);
console.log(12/6);
console.log(7/6);
console.log(6/6);

	window.onload = function(){

		document.getElementById("cerrars").addEventListener("click",function() {
			sessionStorage.removeItem("USER_TOKEN");
			location.href = "../login.html";
		});

	};

	const vm = new Vue({
	    el: 'main',
	    data: 
		    {
	    	asignomb:"",
		    list:true,
		    user: usuario,
		    mats: {},
		    unit:{},
			},
		methods : {
			seleccionar: seleccion,
			regresar: reglist,
			cargar : cargarmaterias,
		},
		created: cargarmaterias,
	});
/*
{
	asigns:[ {
		codigo:0,
		nombre:"",
		grupo:"",
	} ]
}
*/

function reglist(event){
	vm.list=true;
}

function seleccion (event){

	let sem ="";

	if(document.getElementById("semestre")!=null){
		sem= document.getElementById("semestre").value;
	} else {
		var hoy = new Date();
		var dd = hoy.getDate();
		var mm = hoy.getMonth()+1;
		var yyyy = hoy.getFullYear();
		if(mm>=7){
			sem=yyyy+"-2";
		} else{
			sem=yyyy+"-1";
		}
	}
	if(sem!=0){

	}

	console.log(sem);

	let asig=event.target.value;


	vm.asignomb= asig;
	vm.list=false;

	console.log(event.target.value);

	let data= {
		semestre: sem,
		materia: asig
	};

	let init = {
	  		method: 'POST',
	  		mode: 'cors', 
	  		body: JSON.stringify(data),
			headers: {
				'Authorization': 'Bearer ' + authToken
			}
		};
		let urlgra=url;
	let label="";
		if(sem!=0){
			urlgra=url+'/seguimiento/semeste';
			label='cumplimiento por unidad';
		} else {
			urlgra=url+'/seguimiento/todo';
			label='Cumplimiento semestral'
		}

	fetch(urlgra, init)
	.then(res => res.json())
	.then(function(dat){

	let datos= dat.datos;
	let labels=dat.labels;
	console.log(datos);
	console.log(labels);

	let bardata={
	datasets: [
        {
        	        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
          label               : label,
          backgroundColor     : 'rgba(60,141,188,0.9)',
          borderColor         : 'rgba(60,141,188,0.8)',
          pointRadius          : false,
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(60,141,188,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data                : datos
        }
      ],
    labels  :labels,
    }
// labels  : ['Unidad 1', 'Unidad 2', 'Unidad 3', 'Unidad 4', 'Unidad 5'],

	let canvas =document.getElementById("barChart").getContext('2d');
    let baropt = {
      responsive              : true,
      maintainAspectRatio     : true,
      datasetFill             : false,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
	    }

    };

    let barChart = new Chart(canvas, {
      type: 'bar', 
      data: bardata,
      options: baropt
    });

	})
	.catch(err => { console.log(err) });




  

}

	function cargarmaterias(){
	let sem ="";

	if(document.getElementById("selsemcons")!=null){
		sem= document.getElementById("selsemcons").value;
	} else {
		var hoy = new Date();
		var dd = hoy.getDate();
		var mm = hoy.getMonth()+1;
		var yyyy = hoy.getFullYear();
		if(mm>=7){
			sem=yyyy+"-2";
		} else{
			sem=yyyy+"-1";
		}
	}

	console.log(sem)



	let data= {semestre: sem};

	let init = {
	  		method: 'POST',
	  		mode: 'cors', 
	  		body: JSON.stringify(data),
			headers: {
				'Authorization': 'Bearer ' + authToken
			}
		};

	fetch(url+'/asignadas', init)
	.then(res => res.json())
	.then(function(dat){
		console.log(dat);
		vm.mats = dat;
	})
	.catch(err => { console.log(err) });
}

}