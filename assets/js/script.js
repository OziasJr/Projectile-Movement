// Declarando as variáveis necessárias para os cálculos e animações

var theCanvas = document.getElementById("theCanvas");
var context = theCanvas.getContext("2d");
var play = document.getElementById('play').value;
var distance_x = document.getElementById('distance_x').value;
var distance_y = document.getElementById('distance_y').value;
var angle = document.getElementById('angle').value;
var time = document.getElementById('time').value;
var velInicial = 0;
var g = 9.81;



//--------------------------Por Diego Rasero de la Fuente---diegolo.r8-(at)-gmail.com
// Definición de variables ----------------------------------------------------------
var Vo; // Velocidad inicial 
var gra; // angulo de tiro
var t; // variable tiempo h*3600 + m+60 + s + (.01*cs)
var g; // gravedad
var h; // variable para la altura maxima
var ai; // variable para el ángulo que describe la trayectoria en cualquier instante
// componentes vectoriales de la velocidad en cada instante
var vx;
var vy;
// variable go con valor: true = cronometro encendido, false = cronometro apagado.
var go;
//crea variables para las unidades de tiempo para el cronometro
var cs; // centesimas de segundo
var s;  // segundos
var m;  // minutos
var h;  // horas
//
var nmarca = 0; //número que aparece delante de cada marca en el tiempo
var mem;
// variables para los ejes de coordenadas
var x = 0;
var y = 0;
var yp = 0; // la y que representara graficamente se le restara la altura del canvas para que el origen este abajo. 
//
var color; //color del tiro
//--------------------------------------------------------------------------------------
//Ponemos en marcha el tiempo nada más cargar la pagina
window.onload = setInterval(crono, 10); //

function redondeo(numero) {
        var original = parseFloat(numero);
        var result = Math.round(original * 100) / 100;
        return result;
}

function gradosaleat() {
        document.forma.grados.value = aleatorio(0, 90);
        comprobar()
}

function aleatorio(inferior, superior) {
        var numPos = superior - inferior;
        var aleat = Math.random() * numPos;
        aleat = Math.floor(aleat);
        return parseInt(inferior) + aleat;
}

function colorAleatorio() {
        return "rgb(" + aleatorio(0, 255) + "," + aleatorio(0, 255) + "," + aleatorio(0, 100) + ")";
}

function dibuja() {
        var canvas = document.getElementById('screen');
        var ctx = canvas.getContext('2d');
        //------------------------------------------------------------------------------------
        ctx.fillStyle = color;
        //ctx.fillRect (parseInt(x/10), parseInt(yp/10), 2, 2); con un rectangulo
        ctx.beginPath();
        ctx.arc(x / 10, yp / 10, .8, 0, Math.PI * 2, false); // con un circulo cada punto
        ctx.fill();
        if (pmarca == true) { dibujarmarca() }
}

function borra() {
        var canvas = document.getElementById('screen');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 500, 500);

}
//--------------------------------------------------------------------------------------------------------
function calculacoordenadas(t) {
        // refresca las variables 
        // cambio grados a radianes
        gra = ((parseFloat(document.forma.grados.value) * Math.PI) / 180);
        g = parseFloat(document.forma.gravedad.value); // lee la gravedad
        Vo = parseFloat(document.forma.vo.value);
        //
        // calculo de las coordenadas     
        x = ((Vo * t * (Math.cos(gra))));
        y = ((Vo * t * (Math.sin(gra))) - (.5) * g * (t * t));
        yp = 1490 - y;

        // componentes vectoriales de la velocidad en cada instante
        vx = (Math.cos(gra) * Vo);
        vy = (((Math.sin(gra)) * (Vo)) - (g * t));
        // angulo en cada instante
        ai = Math.atan(vy / vx) * (180 / Math.PI);

        // imprime datos  
        document.forma.x.value = redondeo(x);
        document.forma.y.value = redondeo(y);

        document.forma.ai.value = redondeo(ai);
        document.forma.vx.value = redondeo(vx);
        document.forma.vy.value = redondeo(vy);

        // condición para parar el tiro cuando llege a cero
        if (t > 0) {
        if (y <= 0) {
                go = false; // stop
        }
        }

        dibuja();


}

function hmax() { // calculo de la altura maxima
        gra = ((parseFloat(document.forma.grados.value) * Math.PI) / 180);
        g = parseFloat(document.forma.gravedad.value); // lee la gravedad
        Vo = parseFloat(document.forma.vo.value);
        h = (((Vo * Math.sin(gra)) * (Vo * Math.sin(gra))) / (2 * g));
        //otra forma: alert ( ((Vo*Math.sin(gra)*((Math.sin(gra)*Vo)/g)-(.5*g*Math.pow(((Math.sin(gra)*Vo)/g),2)))) )
        document.forma.hmax.value = redondeo(h);
}
//------------------------------------------------------------------------------------------------------------------
function calc() { // calcula los valores en un tiempo determinado
        //lee variables 
        cs = parseFloat(document.forma.cs.value);
        s = parseFloat(document.forma.s.value);
        m = parseFloat(document.forma.m.value);
        h = parseFloat(document.forma.h.value);
        t = (h * 3600 + m * 60 + s + cs * 0.01);
        calculacoordenadas(t);
}

// para el cronometro
function stop() {
        go = false; //stop
        //lee variables 
        cs = parseFloat(document.forma.cs.value);
        s = parseFloat(document.forma.s.value);
        m = parseFloat(document.forma.m.value);
        h = parseFloat(document.forma.h.value);
        // mientras que solo tengan una cifra a�ade un cero delante
        if (h < 10) { h = '0' + h; }
        if (m < 10) { m = '0' + m; }
        if (s < 10) { s = '0' + s; }
        if (cs < 10) { cs = '0' + cs; }
        alert('Parado en ' + '\"' + h + ':' + m + ':' + s + ':' + cs + '\"');
}

// enciende el cronometro
function start() {
        go = true; // valor verdadero para la variable go
        color = colorAleatorio(); // cambia el color del trazado
}

function crono() {
        //si go es verdadero haz
        if (go == true) {
        //lee variables 
        cs = parseFloat(document.forma.cs.value);
        s = parseFloat(document.forma.s.value);
        m = parseFloat(document.forma.m.value);
        h = parseFloat(document.forma.h.value);
        // suma una centesima de segundo
        cs++;
        if (cs > 100) {
                s = (s + parseInt(cs / 100));
                cs = cs % 100;
        }

        if (cs == 100) { //segundero
                cs = 0;
                s++; //suma un segundo
        }

        if (s == 60) { //minutero
                s = 0;
                m++; //suma un minuto
        }
        //condición para pasar el exceso de segundos a minutos por si se desea introducir el valor en segundos    
        if (s > 60) {
                m = m + parseInt(s / 60);
                s = s % 60;
        }

        if (m == 60) { //horas
                m = 0;
                h++; //suma una hora
        }

        if (m > 60) {
                h = h + parseInt(m / 60);
                m = m % 60;
        }

        // obtención del tiempo en segundos
        t = (h * 3600 + m * 60 + s + cs * 0.01);
        //

        // mientras que solo tengan una cifra a�ade un cero delante
        if (h < 10) { h = '0' + h; }
        if (m < 10) { m = '0' + m; }
        if (s < 10) { s = '0' + s; }
        if (cs < 10) { cs = '0' + cs; }
        // imprime el tiempo                        
        document.forma.cs.value = cs;
        document.forma.s.value = s;
        document.forma.m.value = m;
        document.forma.h.value = h;

        calculacoordenadas(t);
        }
}

function reset() {
        document.forma.cs.value = "00";
        document.forma.s.value = "00";
        document.forma.m.value = "00";
        document.forma.h.value = "00";
        document.forma.x.value = "0";
        document.forma.y.value = "0";
}


// función para añadir una nueva marca
function marca() {
        //lee variables 
        cs = parseFloat(document.forma.cs.value);
        s = parseFloat(document.forma.s.value);
        m = parseFloat(document.forma.m.value);
        h = parseFloat(document.forma.h.value);
        // mientras que solo tengan una cifra a�ade un cero delante
        if (h < 10) { h = '0' + h; }
        if (m < 10) { m = '0' + m; }
        if (s < 10) { s = '0' + s; }
        if (cs < 10) { cs = '0' + cs; }
        nmarca++;
        if (nmarca < 10) { nmarca = '0' + nmarca; }
        div = document.createElement("div");
        div.setAttribute("id", "marca");
        texto = document.createTextNode(nmarca + '- t: ' + '\"' + h + ':' + m + ':' + s + ':' + cs + '\" x: ' + x + ' y: ' + y + ' V:( ' + vx + ' , ' + vy + ' ) A: ' + ai + '');
        div.appendChild(texto);
        document.getElementById("contenedormarcas").appendChild(div);
}

// función que borra las marcas acumuladas en el div contenedormarcas
function resetmarcas() {
        nmarca = 0;
        document.getElementById("contenedormarcas").innerHTML = '';
}

// función que comprueba los campos
function comprobar() {
        //if (document.forma.)
        hmax();
}
