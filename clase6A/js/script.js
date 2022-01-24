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

let empleados = [
    {id: 1,apellido: "Bond", nombre: "James",documento: 22333666, fing: '1972-08-20'},
    {id: 2,apellido: "Perez", nombre: "Daniel",documento: 55669988, fing: '2015-01-12'},
    {id: 3,apellido: "Bert", nombre: "Max",documento: 33225588, fing: '1986-10-25'},
    {id: 4,apellido: "King", nombre: "Leon",documento: 22997744, fing: '1998-03-05'}
]

let sueldos = [];

for (let index = 0; index < empleados.length; index++) {
    alert("Ingrese la información del empelado " + empleados[index].apellido + ' ' + empleados[index].nombre + ' - ' + empleados[index].documento);
    let basico = Number(prompt("Ingrese su sueldo básico"));
    let h50 = Number(prompt("Ingrese número de horas extras al 50%"));
    let h100 = Number(prompt("Ingrese número de horas extras al 100%"));
    let no_remu = Number(prompt("Ingrese la suma de importes no remunerativos"));
    
    sueldos.push(new Recibo(empleados[index].id, basico, h50, h100, no_remu, empleados[index].fing)); 
}

for (let index = 0; index < empleados.length; index++) {
    let sueldo = sueldos.find(elemento => elemento.id === empleados[index].id);
    console.log("Recibo de Haberes de " + empleados[index].apellido + ' ' + empleados[index].nombre + ' - ' + empleados[index].documento);
    console.log("Básico: " + sueldo.basic);
    console.log("Antiguedad: " + sueldo.ant);
    console.log("Horas extras al 50%: " + sueldo.h50);
    console.log("Horas extras al 100%: " + sueldo.h100);
    console.log("Obra Social: " + sueldo.os);
    console.log("Ley 19032: " + sueldo.ley);
    console.log("Jubilación: " + sueldo.jub);
    console.log("Impuesto a las Ganancias: " + sueldo.ig);
    console.log("Neto: " + sueldo.neto);
    console.log(" ")
}