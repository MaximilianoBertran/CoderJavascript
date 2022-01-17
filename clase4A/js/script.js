const ganancias = (bruto) => { 
    return 0;
}

const calculo = (basic, extras50, extras100, no_remu = 0) => { 
    let os = basic * 0.03;
    let h50 = extras50 * ((basic / 240) * 1.5).toFixed(2);
    let h100 = extras100 * ((basic / 240) * 2).toFixed(2);
    let remu = basic + h50 + h100;
    let ley = remu * 0.03;
    let jub = remu * 0.11;
    let bruto = remu + no_remu;
    let ig = ganancias(bruto);
    let neto = bruto - os - ley - jub - ig;

    return detalle = {
        "h50" : extras50,
        "h100" : extras100,
        "os" : os,
        "ley" : ley,
        "jub" : jub,
        "ganancias" : ig,
        "neto" : neto
    };
}

let basico = Number(prompt("Ingrese su sueldo básico"));
let h50 = Number(prompt("Ingrese número de horas extras al 50%"));
let h100 = Number(prompt("Ingrese número de horas extras al 100%"));
let no_remu = Number(prompt("Ingrese la suma de importes no remunerativos"));

let sueldo = calculo(basico, h50, h100, no_remu);

console.log("Básico: " + basico);
console.log("Horas extras al 50%: " + sueldo['h50']);
console.log("Horas extras al 100%: " + sueldo['h100']);
console.log("Obra Social: " + sueldo['os']);
console.log("Ley 19032: " + sueldo['ley']);
console.log("Jubilación: " + sueldo['jub']);
console.log("Impuesto a las Ganancias: " + sueldo['ganancias']);
console.log("Neto: " + sueldo['neto']);