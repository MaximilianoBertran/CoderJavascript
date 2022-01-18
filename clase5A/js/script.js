class Recibo {
    constructor(basic, extras50, extras100, no_remu = 0){
        this.basic = basic;
        this.h50 = this.horasExtras(50, extras50);
        this.h100 = this.horasExtras(100, extras100);
        this.remu = this.basic + this.h50 + this.h100;
        this.os = (this.remu * 0.03);
        this.ley = (this.remu * 0.03);
        this.jub = (this.remu * 0.11);
        this.bruto = this.remu + no_remu;
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

    ganancias() { 
        return 0;
    }
}

let basico = Number(prompt("Ingrese su sueldo básico"));
let h50 = Number(prompt("Ingrese número de horas extras al 50%"));
let h100 = Number(prompt("Ingrese número de horas extras al 100%"));
let no_remu = Number(prompt("Ingrese la suma de importes no remunerativos"));

let sueldo = new Recibo(basico, h50, h100, no_remu);

console.log("Básico: " + sueldo.basic);
console.log("Horas extras al 50%: " + sueldo.h50);
console.log("Horas extras al 100%: " + sueldo.h100);
console.log("Obra Social: " + sueldo.os);
console.log("Ley 19032: " + sueldo.ley);
console.log("Jubilación: " + sueldo.jub);
console.log("Impuesto a las Ganancias: " + sueldo.ig);
console.log("Neto: " + sueldo.neto);