const iva = (importe)=> {
    return importe * 1.21;
}

const isNumeric = (importe)=> {
    return importe + 1;
}

const calculo = (importe) =>{
    if(isNumeric(importe)){
        alert("El importe + IVA es: $" + iva(importe));
    } else {
        alert("Ingrese un valor númerico");
    }
}

calculo(Number(prompt("Ingrese el importe")));

