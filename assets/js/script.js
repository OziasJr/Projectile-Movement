// Definição das variáveis

var Vo; // Velocidade Inícial 
var gra; // Ângulo de Tiro
var t; // Variável Tempo h*3600 + m+60 + s + (.01*cs)
var g; // Gravidade
var h; // Variável para a Altura Máxima
var ai; // Variável para o ângulo que descreve a trajetória em qualquer instante

// Componentes do vetor de velocidade em cada instante
var vx;
var vy;

// Variável go com valor: true = cronômetro ligado, false = cronômetro desligado
var go;

// Variáveis de tempo para o cronômetro
var cs; // Sentésimos de segundo
var s;  // Segundo
var m;  // Minutos
var h;  // Horas

var nmarca = 0; // Número que aparece na frente de cada marca no tempo
var mem;

// Variáveis ​​para eixos
var x = 0;
var y = 0;
var yp = 0; // O y que representará graficamente a altura da tela, será subtraído de forma que a origem fique para baixo

var color; // Variável para a cor do tiro

// Começamos o tempo assim que clicar em "Começar"
window.onload = setInterval(crono, 10); //

function redondeo(numero) {
var original = parseFloat(numero);
var result = Math.round(original * 100) / 100;
return result;
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
ctx.fillStyle = color;
// ctx.fillRect (parseInt(x/10), parseInt(yp/10), 2, 2); // Com um retângulo
ctx.beginPath();
ctx.arc(x / 10, yp / 10, .8, 0, Math.PI * 2, false); // Com um círculo em cada ponto 
ctx.fill();
if (pmarca == true) { dibujarmarca() }
}

function borra() {
var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, 500, 500);

}

function calculacoordenadas(t) {

// Conversão Graus para Radianos
gra = ((parseFloat(document.forma.grados.value) * Math.PI) / 180); // Obtém o valor do ângulo digitado pelo usuário
g = parseFloat(document.forma.gravedad.value); // Obtém o valor da gravidade digitado pelo usuário

Vo = parseFloat(document.forma.vo.value); // Obtém o valor da velocidade inicial digitado pelo usuário

// Cálculo das Coordenadas     
x = ((Vo * t * (Math.cos(gra))));
y = ((Vo * t * (Math.sin(gra))) - (.5) * g * (t * t));
yp = 1490 - y;

// Componentes do vetor de velocidade em cada instante
vx = (Math.cos(gra) * Vo);
vy = (((Math.sin(gra)) * (Vo)) - (g * t))

// Ângulo a cada momento
ai = Math.atan(vy / vx) * (180 / Math.PI);

// Imprime os Dados  
document.forma.x.value = redondeo(x);
document.forma.y.value = redondeo(y);

document.forma.ai.value = redondeo(ai);
document.forma.vx.value = redondeo(vx);
document.forma.vy.value = redondeo(vy);

// Condição para parar o tiro quando chegar a zero
if (t > 0) {
if (y <= 0) {
        go = false; // Parar
}
}

dibuja();


}

function hmax() { // Cálculo da Altura Máxima
gra = ((parseFloat(document.forma.grados.value) * Math.PI) / 180);
g = parseFloat(document.forma.gravedad.value);
Vo = parseFloat(document.forma.vo.value);
h = (((Vo * Math.sin(gra)) * (Vo * Math.sin(gra))) / (2 * g));
//otra forma: alert ( ((Vo*Math.sin(gra)*((Math.sin(gra)*Vo)/g)-(.5*g*Math.pow(((Math.sin(gra)*Vo)/g),2)))) )
document.forma.hmax.value = redondeo(h);
}

// Cálculo de valores de um tempo determinado
function calc() {
cs = parseFloat(document.forma.cs.value);
s = parseFloat(document.forma.s.value);
m = parseFloat(document.forma.m.value);
h = parseFloat(document.forma.h.value);
t = (h * 3600 + m * 60 + s + cs * 0.01);
calculacoordenadas(t);
}

// Para o cronômetro
function stop() {
go = false;
cs = parseFloat(document.forma.cs.value);
s = parseFloat(document.forma.s.value);
m = parseFloat(document.forma.m.value);
h = parseFloat(document.forma.h.value);

// Contanto que eles tenham apenas um dígito, adicione um zero à esquerda
if (h < 10) { h = '0' + h; }
if (m < 10) { m = '0' + m; }
if (s < 10) { s = '0' + s; }
if (cs < 10) { cs = '0' + cs; }
}

// Liga o cronômetro
function start() {
go = true; // Valor verdadeiro para a variável go
color = colorAleatorio(); // Muda a cor do tracejado
}

function crono() {

// Se for verdedeiro, faça tal coisa
if (go == true) {

// As variáveis
cs = parseFloat(document.forma.cs.value);
s = parseFloat(document.forma.s.value);
m = parseFloat(document.forma.m.value);
h = parseFloat(document.forma.h.value);

// Adicipna um centésimo de segundo
cs++;
if (cs > 100) {
        s = (s + parseInt(cs / 100));
        cs = cs % 100;
}

if (cs == 100) { // Segundos
        cs = 0;
        s++; // Soma um segundo
}

if (s == 60) { // Minutos
        s = 0;
        m++; // Soma um minuto
}

// Condição para alterar o excesso de segundos para minutos caso você queira inserir o valor em segundos
if (s > 60) {
        m = m + parseInt(s / 60);
        s = s % 60;
}

if (m == 60) { // Hpras
        m = 0;
        h++; // Soma uma hora
}

if (m > 60) {
        h = h + parseInt(m / 60);
        m = m % 60;
}

// Obtém o tempo em segundos
t = (h * 3600 + m * 60 + s + cs * 0.01);

// Contanto que eles tenham apenas um dígito, adiciona um zero à esquerda
if (h < 10) { h = '0' + h; }
if (m < 10) { m = '0' + m; }
if (s < 10) { s = '0' + s; }
if (cs < 10) { cs = '0' + cs; }

// Imprime o tempo                        
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


// Função para adicionar uma nova marca
function marca() {

// Lê as variáveis
cs = parseFloat(document.forma.cs.value);
s = parseFloat(document.forma.s.value);
m = parseFloat(document.forma.m.value);
h = parseFloat(document.forma.h.value);

// Contanto que eles tenham apenas um dígito, adiciona um zero à esquerda
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

// Função que limpa as marcas acumuladas no container
function resetmarcas() {
nmarca = 0;
document.getElementById("contenedormarcas").innerHTML = '';
}

// Função que verifica os campos
function comprobar() {
//if (document.forma.)
hmax();
}