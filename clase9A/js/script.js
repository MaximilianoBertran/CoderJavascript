class Empleado {
    constructor(id, apellido, nombre, documento, fing){
        this.id = id;
        this.apellido = apellido;
        this.nombre = nombre;
        this.documento = documento;
        this.fing = fing;
    }
}

class Recibo {
    constructor(id, basic, extras50, extras100, no_remu = 0, fing){
        this.id = id;
        this.basic = basic;
        this.ant = this.antiguedad(fing);
        this.h50 = this.horasExtras(50, extras50);
        this.h100 = this.horasExtras(100, extras100);
        this.remu = this.basic + this.h50 + this.h100;
        this.os = (this.remu * 0.03);
        this.ley = (this.remu * 0.03);
        this.jub = (this.remu * 0.11);
        this.bruto = this.remu + this.ant + no_remu;
        this.ig = this.ganancias();
        this.neto = this.bruto - this.os - this.ley - this.jub - this.ig;
    }

    horasExtras(tipo, cantidad, regimen = 8) {
        if(tipo == 50){
            return (cantidad * ((this.basic / (regimen + 30)) * 1.5));
        } else if(tipo == 100) {
            return (cantidad * ((this.basic / (regimen + 30)) * 2));
        } else {
            return 0;
        }
    }

    antiguedad(date) {
        let hoy = new Date();
        let fing = new Date(date);
        let ant = hoy.getFullYear() - fing.getFullYear();
        return (this.basic * 0.01) * ant;
    }

    ganancias() { 
        return 0;
    }
}

const validate = (tipo) => {
    if(tipo == 'id' || tipo == 'alf' || tipo == 'dni'){
        return true;
    } else {
        return false;
    }
}

const ordenamiento = (array, tipo = 'id') => {
    if(tipo == 'id'){
        return array.sort((a,b) => {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0; 
        });
    } else {
        return array.sort((a,b) => {
            if (a.apellido > b.apellido) {
                return 1;
            }
            if (a.apellido < b.apellido) {
                return -1;
            }
            return 0; 
        });
    }
}

const generar = (listado_empleados, sueldos_liquidados) => {
    var body = document.getElementsByTagName("main")[0];
    for (let index = 0; index < listado_empleados.length; index++) {
        let sueldo = sueldos_liquidados.find(elemento => elemento.id === listado_empleados[index].id);
        var tabla   = document.createElement("table");
        body.appendChild(tabla);
        
        tabla.insertAdjacentHTML("beforeend",
            "<tr>" +
                '<td colspan="2">Recibo de Haberes de ' + listado_empleados[index].apellido + ' ' + listado_empleados[index].nombre + ' - ' + listado_empleados[index].documento + "</td>" +
            "</tr>" +
            "<tr>" +
                '<td>Básico</td>' + 
                '<td>$' + sueldo.basic + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Antiguedad</td>' + 
                '<td>$' + sueldo.ant + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Horas extras al 50%</td>' + 
                '<td>$' + sueldo.h50 + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Horas extras al 100%</td>' + 
                '<td>$' + sueldo.h100 + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Obra Social</td>' + 
                '<td>$' + sueldo.os + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Ley 19032</td>' + 
                '<td>$' + sueldo.ley + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Impuesto a las Ganancias</td>' + 
                '<td>$' + sueldo.ig + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Neto</td>' + 
                '<td>$' + sueldo.neto + '</td>'+
            "</tr>"
        )
        tabla.insertAdjacentHTML("beforeend","<br>");
    }
}

const liquidacion = () =>{
    for (let index = 0; index < empleados.length; index++) {
        alert("Ingrese la información del empelado " + empleados[index].apellido + ' ' + empleados[index].nombre + ' - ' + empleados[index].documento);
        let basico = Number(prompt("Ingrese su sueldo básico"));
        let h50 = Number(prompt("Ingrese número de horas extras al 50%"));
        let h100 = Number(prompt("Ingrese número de horas extras al 100%"));
        let no_remu = Number(prompt("Ingrese la suma de importes no remunerativos"));
        
        sueldos.push(new Recibo(empleados[index].id, basico, h50, h100, no_remu, empleados[index].fing)); 
    } 
    
    let check = false;
    let tipo = '';
    if (empleados.length > 1) {
        while(!check){
            tipo = prompt("Ordenar empleado por ID(ingrese id), ordenar por documento (ingrese dni) o alfabeticamente (ingrese alf)");
            check = validate(tipo);
        }
    }
    empleados_sort = ordenamiento(empleados, tipo);
    
    generar(empleados_sort, sueldos);
}

function validarLogin(e){
    e.preventDefault();
    let username = document.getElementById('user').value;
    document.getElementById('nombre_usuario').innerHTML = "Bienvenido " + username;
    document.getElementById('li-form').style.display = 'none';
    document.getElementById('li-name').style.display = 'block';
    sessionStorage.setItem("username", username );
    liquidacion();
}

let empleados = [
    new Empleado(1,"Bond","James",22333666,'1972-08-20'),
    new Empleado(3,"Perez", "Daniel", 55669988, '2015-01-12'),
    new Empleado(2,"Bert", "Max", 33225588, '1986-10-25'),
    new Empleado(4,"King", "Leon", 22997744, '1998-03-05')
]

let sueldos = [];

alert("Necesita ingresar su usuario para poder operar.");

let loginForm = document.getElementById("login_form");
loginForm.addEventListener("submit", validarLogin);
