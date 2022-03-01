var fundo, fundo_image;
var jogador, jogador_image, jogador_morte;
var obstaculo1, obstaculo1_image, obstaculo1_die, obstaculo2, obstaculo2_image, obstaculo2_die, obstaculo3, obstaculo3_image, obstaculo3_die;
var grupoObstaculo1, grupoObstaculo2, grupoObstaculo3;
var pontuacao = 0;
var etapaJogo = 'JOGAR';
var gameOver, gameOver_image;
var som1;

function preload(){
  fundo_image = loadImage("images/Road.png");
  jogador_image = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  jogador_morte = loadImage("caixa.jpg");
  
  obstaculo1_image = loadAnimation("man.png", 'man2.png', 'man3.png');
  obstaculo1_die = loadImage("caixa.jpg");
  
  obstaculo2_image = loadAnimation("images/opponent4.png","images/opponent5.png");
  obstaculo2_die = loadImage("caixa.jpg");
  
  obstaculo3_image = loadAnimation("images/opponent7.png","images/opponent8.png");
  obstaculo3_die = loadImage("caixa.jpg");
  
  som1 = loadSound("sound/bell.mp3");
  gameOver_image = loadImage("images/gameOver.png");
  
}

function setup(){ 
createCanvas(800,300);
  fundo = createSprite(00, 150);
  fundo.addImage('fundo_image', fundo_image);
  jogador = createSprite(200, 150, 20, 50);
  jogador.addAnimation('jogador_image', jogador_image);
  jogador.addImage('player_die', jogador_morte);
  jogador.scale = 0.06;
  gameOver = createSprite(600, 150, 300, 150);
  gameOver.addImage('gameOver_image', gameOver_image);
  
  grupoObstaculo1 = new Group();
  grupoObstaculo2 = new Group();
  grupoObstaculo3 = new Group();
}

function draw() {
  background(0);
  if (etapaJogo === 'JOGAR') {
    obstaculos();
    jogador.y = mouseY;
    fundo.velocityX = -(4 + pontuacao/100);
    camera.position.x = jogador.x;
    camera.position.y = jogador.y;
    gameOver.visible = false;  
    
//pontuação
  pontuacao = pontuacao + (Math.round(frameRate()/60));
    
  if(fundo.x < -100) {
    fundo.x = fundo.width/4;
  }
  if(keyDown('space') && etapaJogo === 'JOGAR') {
    som1.play();
  }
  if(jogador.isTouching(grupoObstaculo1)) {
    etapaJogo = 'ENCERRAR';
    obstaculo1.changeAnimation('obs1_die', obstaculo1_die);
    jogador.changeAnimation('player_die', jogador_morte);
    jogador.scale = 1;
    pontuacao = 0;
  }
  if(jogador.isTouching(grupoObstaculo2)){
    etapaJogo = 'ENCERRAR';
    obstaculo2.changeAnimation('obs2_die', obstaculo2_die);
    jogador.changeAnimation('player_die', jogador_morte);
    jogador.scale = 1;
    obstaculo2.scale = 1;
    pontuacao = 0;
  }
  if(jogador.isTouching(grupoObstaculo3)) {
    etapaJogo = 'ENCERRAR';
    obstaculo3.changeAnimation('obs3_die', obstaculo3_die);
    obstaculo3.scale = 1;
    jogador.changeAnimation('player_die', jogador_morte);
    jogador.scale = 1;
    pontuacao = 0;
  }
  }
  else if(etapaJogo === 'ENCERRAR') {
    gameOver.visible = true;
    fundo.velocityX = 0;
    pontuacao = 0;
    grupoObstaculo1.setLifetimeEach(-1);
    grupoObstaculo2.setLifetimeEach(-1);
    grupoObstaculo3.setLifetimeEach(-1);
    grupoObstaculo1.setVelocityXEach(0);
    grupoObstaculo2.setVelocityXEach(0);
    grupoObstaculo3.setVelocityXEach(0);
    if(keyDown('up')) {
      reset();
    }
  }

  drawSprites();
  if(etapaJogo === 'ENCERRAR') {
  fill('white');
  textSize(20);
  text('Aperte a seta para cima, se quiser reiniciar', 500, 200);
  }
  fill('white');
  textSize(20);
  text('Score: '+ pontuacao, camera.position.x - 200, camera.position.y);
}
function obstaculos() {
  if(frameCount% 200 === 0) {
    sorteio = Math.round(random(1,3));
    switch(sorteio) {
          case 1: obstaculo1 = createSprite(810, Math.round(random(250, 50)), 20, 50); obstaculo1.addAnimation('obs1_img', obstaculo1_image); obstaculo1.addImage('obs1_die', obstaculo1_die);
                  obstaculo1.velocityX = -(3 + pontuacao/100); obstaculo1.scale = 1; grupoObstaculo1.add(obstaculo1);
        break;
          case 2: obstaculo2 = createSprite(810, Math.round(random(250, 50)), 20, 50); obstaculo2.addAnimation('obs2_img', obstaculo2_image); obstaculo2.addImage('obs2_die', obstaculo2_die); obstaculo2.velocityX = -(2 + pontuacao/100); obstaculo2.lifetime = 415; grupoObstaculo2.add(obstaculo2); obstaculo2.scale = 0.06;
        break;
        case 3: obstaculo3 = createSprite(810, Math.round(random(250, 50)), 20, 50); obstaculo3.addAnimation('obs3_img', obstaculo3_image); obstaculo3.addImage('obs3_die', obstaculo3_die); obstaculo3.velocityX = -(4 + pontuacao/100); obstaculo3.lifetime = 212; obstaculo3.scale = 0.06; grupoObstaculo3.add(obstaculo3);
        break;
    }
  }
}
function reset() {
  etapaJogo = 'JOGAR';
  gameOver.visible = false;
  grupoObstaculo1.destroyEach();
  grupoObstaculo2.destroyEach();
  grupoObstaculo3.destroyEach();
  pontuacao = 0;
  grupoObstaculo1.setLifetimeEach(280);
  grupoObstaculo2.setLifetimeEach(415);
  grupoObstaculo3.setLifetimeEach(212);
  grupoObstaculo1.setVelocityXEach(-3);
  grupoObstaculo2.setVelocityXEach(-2);
  grupoObstaculo3.setVelocityXEach(-4); 
  jogador.changeAnimation('jogador_image', jogador_image);
  jogador.scale = 0.06;
}