let cronometro;
let cuentaRegresiva;
let tiempoInicial = 0;
let tiempoRestante = 0;

document.getElementById('start').addEventListener('click', iniciarCronometro);
document.getElementById('stop').addEventListener('click', detenerCronometro);
document.getElementById('reset').addEventListener('click', reiniciarCronometro);
document.getElementById('cuentaRegresivaForm').addEventListener('submit', iniciarCuentaRegresiva);

function iniciarCronometro() {
    if (!cronometro) {
        cronometro = setInterval(actualizarCronometro, 1000);
    }
}

function detenerCronometro() {
    clearInterval(cronometro);
    cronometro = null;
}

function reiniciarCronometro() {
    detenerCronometro();
    tiempoInicial = 0;
    document.getElementById('cronometro').textContent = '00:00:00';
}

function actualizarCronometro() {
    tiempoInicial++;
    const horas = Math.floor(tiempoInicial / 3600);
    const minutos = Math.floor((tiempoInicial % 3600) / 60);
    const segundos = tiempoInicial % 60;
    document.getElementById('cronometro').textContent = 
        `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function iniciarCuentaRegresiva(event) {
    event.preventDefault();
    const fechaFinal = new Date(document.getElementById('fechaFinal').value).getTime();
    if (isNaN(fechaFinal)) {
        alert('Por favor, ingresa una fecha válida.');
        return;
    }

    clearInterval(cuentaRegresiva);
    cuentaRegresiva = setInterval(() => actualizarCuentaRegresiva(fechaFinal), 1000);
}

function actualizarCuentaRegresiva(fechaFinal) {
    const ahora = new Date().getTime();
    tiempoRestante = fechaFinal - ahora;

    if (tiempoRestante <= 0) {
        clearInterval(cuentaRegresiva);
        document.getElementById('cuentaRegresiva').textContent = '00:00:00';
        alert('¡Tiempo terminado!');
        return;
    }

    const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

    document.getElementById('cuentaRegresiva').textContent = 
        `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}