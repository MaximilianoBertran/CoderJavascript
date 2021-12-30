first_number = parseInt(Math.random() * (10 - 0) + 0);
second_number = parseInt(Math.random() * (10 - 0) + 0);
input_number = parseInt(prompt("Ingrese resultado de " + first_number + " x " + second_number));
if(input_number == (first_number*second_number)){
    console.log("Correcto!")
} else {
    console.log("Incorrecto, sigue practicando")
}
