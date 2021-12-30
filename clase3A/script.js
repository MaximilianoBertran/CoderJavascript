let count = 0;
let questions = 10
for (let i = 0; i < questions; i++) {
    first_number = parseInt(Math.random() * (10 - 0) + 0);
    second_number = parseInt(Math.random() * (10 - 0) + 0);
    input_number = parseInt(prompt("Ingrese resultado de " + first_number + " x " + second_number));
    if(input_number == (first_number*second_number)){
        count++;
        console.log("Correcto!")
    } else {
        console.log("Incorrecto!")
    }
}
switch (true) {
    case (count == questions):
        console.log("Tu calificasion es Perfecta! Respondiste bien " + count + " de " + questions + " operaciones")
        break;
    case (count < questions && count >= (questions * 70 / 100)):
        console.log("Tu calificasion es Aprobado! Respondiste bien " + count + " de " + questions + " operaciones")
        break;
    case (count < (questions * 70 / 100) && count >= 0):
        console.log("Tu calificasion es Desaprobado! Respondiste bien " + count + " de " + questions + " operaciones")
        break;
    default:
        console.log("Hubo un error en el conteo de tus respuestas, vuelve a intentarlo. Disculpas por las molestias")
        break;
}

