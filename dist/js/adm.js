let authToken = sessionStorage.getItem("USER_TOKEN");
let usuario = JSON.parse(sessionStorage.getItem("USER_DATA"));
let url = serverurl+'admin';
let grupo={};

console.log(usuario);
if((authToken==null) && (usuario==null) ){
	console.log('no hay sesion');
	location.href = "../login.html";
} else {
	console.log(authToken);
	console.log(url);

	const vm = new Vue({
	    el: 'main',
	    data: 
		    {
		    user: usuario,
			},
	});

	window.onload = function(){
	 

	    document.getElementById("cerrars").addEventListener("click",function() {
	            sessionStorage.removeItem("USER_TOKEN");
	            location.href = "../login.html";
	        });

	    let xlsinp = document.getElementById("xls-input");
	    console.log(typeof xlsinp)

	    if(xlsinp){
		   
		    xlsinp.addEventListener("change",fileReader,false);
		    document.getElementById("subirxls").addEventListener("click" , subirxls,false);
		}
	}

}



function subirxls(event){

    if(grupo && grupo.length){

        let init = {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Authorization':token
            },
            body: JSON.stringify(grupo),
            cache: 'default'
        };

        fetch(url+'grupo/nuevo',init)
        .then((resp) => resp.json())
        .then(function(data){
        let msjdiv= document.getElementById("msjres");
        msjdiv.insertAdjacentHTML( 'afterbegin','<div class="alert alert-success alert-dismissible">'+
        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
        '<h5><i class="icon fas fa-check"></i> Alert!</h5>'+
        'se ha subido el archivo exitosamente</div>' );

        })
        .catch(function(err){
    let msjdiv= document.getElementById("msjres");
        msjdiv.insertAdjacentHTML( 'afterbegin','<div class="alert alert-warning alert-dismissible">'+
        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
        '<h5><i class="icon fas fa-exclamation-triangle"></i> Alert!</h5>'+
        'Hubo un problema al conectar , por favor verifique su conexion a internet</div>' );
        });
    } else {
    let msjdiv= document.getElementById("msjres");
        msjdiv.insertAdjacentHTML( 'afterbegin','<div class="alert alert-warning alert-dismissible">'+
        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+
        '<h5><i class="icon fas fa-exclamation-triangle"></i> Alert!</h5>'+
        'Por favor seleccione un archivo valido</div>' );
    }




}

function fileReader(oEvent) {

    let oFile = oEvent.target.files[0];
    let sFilename = oFile.name;
    let reader = new FileReader();
    reader.onload = function (e) {
        let data = e.target.result;
        data = new Uint8Array(data);
        let workbook = XLSX.read(data, {type: 'array'});
        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        let xlsout = XLSX.utils.sheet_to_json(worksheet,{header:1});
    
        let cogr = xlsout[1][0].split('-');
        let grup =
        {
        codigo_materia: cogr[0],
        grupo: cogr[1],
        nombre_materia: xlsout[1][1],
        codigo_docente: xlsout[1][2],
        nombre_docente: xlsout[1][3],
        numero_matriculados: xlsout[1][5]
        };
        let estudents =[];
        
        for(let i=xlsout.length-1 ; i>=5;i--){
            let est = 
            {
                codigo_estudiante : xlsout[i][0],
                nombre_estudiante: xlsout[i][1]
            }
            estudents.push(est);
        }

        grupo={
            grupo:grup,
            estudiantes: estudents
        };
        console.log(JSON.stringify(grupo));

    };
    reader.readAsArrayBuffer(oFile);

}