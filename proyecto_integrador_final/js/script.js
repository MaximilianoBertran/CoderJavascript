class Empleado {
    constructor(id, apellido, nombre, documento, fing, basic){
        this.id = id;
        this.apellido = apellido;
        this.nombre = nombre;
        this.documento = documento;
        this.fing = fing;
        this.basic = basic;
    }
}

class Recibo {
    constructor(id, basic, extras50, extras100, no_remu = 0, fing){
        this.id = id;
        this.basic = basic;
        this.ant = (basic * 0.01) * this.antiguedad(fing);
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
            return (cantidad * ((this.basic / 30) / regimen)) * 1.5;
        } else if(tipo == 100) {
            return (cantidad * ((this.basic / 30) / regimen)) * 2;
        } else {
            return 0;
        }
    }

    antiguedad(date) {
        let hoy = new Date();
        let fing = new Date(date);
        return hoy.getFullYear() - fing.getFullYear();
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

const ordenamiento = (array) => {
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

const generar = (listado_empleados, sueldos_liquidados) => {
    var body = document.getElementsByTagName("main")[0];
    for (let index = 0; index < listado_empleados.length; index++) {
        let sueldo = sueldos_liquidados.find(elemento => elemento.id === listado_empleados[index].id);
        var tabla   = document.createElement("table");
        tabla.className = "table table-bordered table-striped";
        body.appendChild(tabla);
        
        tabla.insertAdjacentHTML("beforeend",
            "<thead>" +
            "<tr>" +
                '<th colspan="2">Recibo de Haberes de ' + listado_empleados[index].apellido + ' ' + listado_empleados[index].nombre + ' - ' + listado_empleados[index].documento + ' - ' + date_format(listado_empleados[index].fing) + "</th>" +
            "</tr>" +
            "</thead>" +
            "<tr>" +
                '<td>Documento: ' + listado_empleados[index].documento + ' </td><td> Fecha de ingreso: ' + date_format(listado_empleados[index].fing) + "</td>" +
            "</tr>" +
            "<tr>" +
                '<td>B??sico</td>' + 
                '<td> ' + number_format(sueldo.basic) + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Antiguedad</td>' + 
                '<td> ' + number_format(sueldo.ant) + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Horas extras al 50%</td>' + 
                '<td> ' + number_format(sueldo.h50) + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Horas extras al 100%</td>' + 
                '<td> ' + number_format(sueldo.h100) + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Obra Social</td>' + 
                '<td> ' + number_format(sueldo.os) + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Ley 19032</td>' + 
                '<td> ' + number_format(sueldo.ley) + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Impuesto a las Ganancias</td>' + 
                '<td> ' + number_format(sueldo.ig) + '</td>'+
            "</tr>" +
            "<tr>" +
                '<td>Neto</td>' + 
                '<td> ' + number_format(sueldo.neto) + '</td>'+
            "</tr>"
        )
        tabla.insertAdjacentHTML("beforeend","<br>");
    }
}

const chargeData = () => {
    document.getElementById('id_agente').innerHTML = empleados[position].id;
    document.getElementById('nombre_agente').innerHTML = empleados[position].nombre;
    document.getElementById('apellido_agente').innerHTML = empleados[position].apellido;
    document.getElementById('documento_agente').innerHTML = empleados[position].documento;
    document.getElementById('fing_agente').innerHTML = date_format(empleados[position].fing);
    document.getElementById('basic_agente').innerHTML = "$ " + number_format(empleados[position].basic);
}

const chargeRecibo = (e) => {
    e.preventDefault();
    let h50 = Number(document.getElementById('h50_agente').value)
    let h100 = Number(document.getElementById('h100_agente').value)
    let no_remu = Number(document.getElementById('noremu_agente').value)
    sueldos.push(new Recibo(empleados[position].id, empleados[position].basic, h50, h100, no_remu, empleados[position].fing));
    position++;
    if(position < empleados.length) {
        chargeData();
        document.getElementById('h50_agente').value = 0;
        document.getElementById('h100_agente').value = 0;
        document.getElementById('noremu_agente').value = 0;
    } else {
        document.getElementById('infoDiv').style.display = 'none';
        empleados_sort = ordenamiento(empleados);
        generar(empleados_sort, sueldos);
    }
    if(position == (empleados.length-1)){
        document.getElementById('btn-next').innerHTML = "Finalizar";
    }
}

const salir = () => {
    sessionStorage.removeItem("username");
    window.location.reload(true);
}

function validarLogin(e){
    e.preventDefault();
    let username = document.getElementById('user').value;
    sessionStorage.setItem("username", username );
    setLogin(username);
}

function setLogin(user){
    let username = user
    document.getElementById('nombre_usuario').innerHTML = "Bienvenido <strong>" + username + "</strong>";
    document.getElementById('li-form').style.display = 'none';
    document.getElementById('li-name').style.display = 'block';
    chargeData()
    document.getElementById('infoDiv').style.display = 'block';
}

function checkLogin(){
    if(sessionStorage.getItem("username")){
        setLogin(sessionStorage.getItem("username"));
    } else {
        document.getElementById('li-form').style.display = 'block';
        document.getElementById('li-name').style.display = 'none';
        chargeData();
        document.getElementById('infoDiv').style.display = 'none';
    }
}

function number_format(x) {
    return new Intl.NumberFormat('es-AR', {style: "currency", currency: "ARS", decimal: 2}).format(x);
}

function date_format(x) {
    let d = new Date(x);
    return ((d.getDate()+1) < 10 ? '0' : '') + (d.getDate()+1) + "/" + ((d.getMonth()+1) < 10 ? '0' : '') + (d.getMonth()+1) + "/" + d.getFullYear();
}

let position = 0;

let empleados = [
    new Empleado(1,"Bond","James",22333666,'1972-08-20', 55000),
    new Empleado(3,"Perez", "Daniel", 55669988, '2015-01-12', 65000),
    new Empleado(2,"Bert", "Max", 33225588, '1986-10-25', 40000),
    new Empleado(4,"King", "Leon", 22997744, '1998-03-05', 40000)
]

let sueldos = [];



let loginForm = document.getElementById("login_form");
loginForm.addEventListener("submit", validarLogin);

let dataForm = document.getElementById("dataForm");
dataForm.addEventListener("submit", chargeRecibo);

let btnSalir = document.getElementById("btn-salir");
btnSalir.onclick = () => {
    salir();
}

checkLogin();