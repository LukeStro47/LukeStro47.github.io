var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-main', { preload: preload, create: create, update: update});
var paddle1;
var paddle2;
var ball;
var ball_launched;
var ball_velocity;
var score1_text;
var score2_text;
var score1;
var score2;
var gameover_text;
var winner_text;
var click_text;
var button_new;
var winner_player2;
var tries = 0;
var ball_maxVelocity;

///
var initialized = false;

function initGDApi(){
    if(!initialized){
        var settings = {
            gameId: "a14a0ff02d134dbb9d93633fcc7c18f2",
            userId: "EA51BF13-86AB-4B46-87CD-F21772DCF44B-s1",
            resumeGame: resumeGame,
            pauseGame: pauseGame,
            onInit: function (data) {
                initialized = true;
            },
            onError: function (data) {
                console.log("Error:"+data);
            }
        };
        (function(i,s,o,g,r,a,m){
            i['GameDistribution']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)};i[r].l=1*new Date();a=s.createElement(o);m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a, m);
        })(window, document, 'script', '//html5.api.gamedistribution.com/libs/gd/api.js', 'gdApi');
        gdApi(settings);
        /*function resumeGame() {
            console.log("Resume game");
        }
        function pauseGame() {
            console.log("Pause game");
        }*/
    }
}
initGDApi();
///

function preload() {
    game.load.image('paddle', 'assets/paddle.png');
    game.load.image('ball', 'assets/ball.png');
    game.load.bitmapFont('font', 'assets/font.png', 'assets/font.xml');
    game.load.image('easy', 'assets/easy.png');
    game.load.image('medium', 'assets/medium.png');
    game.load.image('hard', 'assets/hard.png');
    game.load.image('logo', 'assets/ponglogo.png')
}
function create() {
   /* if(tries < 1) {
        paddle1 = create_paddle(0, game.world.centerY);
        paddle2 = create_paddle(game.world.width - 8, game.world.centerY);
        ball_launched = false;
        ball_velocity = 700;
        ball = create_ball(game.world.centerX, game.world.centerY);
        //game.input.onDown.add(launch_ball, this);
        game.input.onDown.add(function(){
            if(ball_launched == false) {
                launch_ball();
            } 
        });
        score1_text = game.add.bitmapText(128, 128, 'font', '0', 64);
        score2_text = game.add.bitmapText(game.world.width - 128, 128, 'font', '0', 64);
        score1 = 0;
        score2 = 0;
    }else if(tries == 2) {
        /*gameover_text.visible = false;
        winner_text.visible = false;
        click_text.visible = false
        paddle1.visible = true;
        paddle2.visible = true;
        ball_velocity = 700;
        ball.visible = true;
        game.input.onDown.add(function(){
            if(ball_launched == false) {
                launch_ball();
            } 
        });
        score1_text.visible = true;
        score2_text.visible = true;
        /*score1 = 0;
        score2 = 0;
    } else {
        game.input.onDown.removeAll();
        score2 = 0;
        // game.events.onInputDown.removeAll();
        paddle1.visible = true;
        paddle2.visible = true;
        ball_velocity = 700;
        ball.visible = true;
        game.input.onDown.add(function(){
            if(ball_launched == false) {
                launch_ball();
            } 
        });
        score1_text.visible = true;
        score2_text.visible = true;
    }*/
    play();
}
function update() {
    score1_text.text = score1;
    score2_text.text = score2;
    control_paddle(paddle1, game.input.y);
    game.physics.arcade.collide(paddle1, ball);
    game.physics.arcade.collide(paddle2, ball);
    if(ball.body.blocked.left) {
        score2 += 1;
        launch_ball();
        score2 = score2;
    } else if(ball.body.blocked.right) {
        score1 += 1;
        launch_ball();
    }
    paddle2.body.velocity.setTo(ball.body.velocity.y);
    paddle2.body.velocity.x = 0;
    paddle2.body.maxVelocity.y = ball_maxVelocity;
    if(score2 == 7) {
        /*paddle1.visible = false;
        paddle2.visible = false;
        ball.visible = false;
        score1_text.visible = false;
        score2_text.visible = false;
        gameover_text = game.add.bitmapText(200, 100, 'font', '0', 64);
        gameover_text.text = 'Gameover';
        winner_text = game.add.bitmapText(140, 200, 'font', '0', 64);
        winner_text.text = 'Player 2 Wins!';
        click_text = game.add.bitmapText(35, 300, 'font', '0', 64);
        click_text.text = 'Click to Play Again.';
        game.input.onDown.add(function(){
            create();
            tries += 1;
            score1 = 0;
            score2 = 0;
            gameover_text.visible = false;
            winner_text.visible = false;
            click_text.visible = false;
        });*/
        score1 = 0;
        score2 = 0;
        winner_player2 = true;
        gameOver();
    } else if(score1 == 7) {
        score1 = 0;
        score2 = 0;
        winner_player2 = false;
        gameOver();
    }
}
function create_paddle(x,y) {
    var paddle = game.add.sprite(x, y, 'paddle');
    paddle.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(paddle);
    paddle.body.collideWorldBounds = true;
    paddle.body.immovable = true;
    paddle.scale.setTo(0.5, 0.5);
    return paddle;
}
function control_paddle(paddle, y) {
    paddle.y = y;
    if(paddle.y < paddle.height / 2) {
        paddle.y = paddle.height / 2;
    } else if(paddle.y > game.world.height - paddle.height / 2) {
        paddle.y = game.world.height - paddle.height / 2;
    }
}
function create_ball(x, y) {
    var ball = game.add.sprite(x, y, 'ball');
    ball.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1, 1);
    return ball;
}
function launch_ball() {
    if(ball_launched) {
        ball.x = game.world.centerX;
        ball.y = game.world.centerY;
        ball.body.velocity.setTo(0, 0);
        ball_launched = false;
        pauseGame();
    } else {
        ball.body.velocity.x = -ball_velocity;
        ball.body.velocity.y = ball_velocity;
        ball_launched = true;
        resumeGame();
    }
}
function resumeGame() {
    console.log("Resume game");
}
function pauseGame() {
    console.log("Pause game");
}
function gameOver() {
    if(winner_player2 == true) {   
        score1 = 0;
        score2 = 0;
        paddle1.visible = false;
        paddle2.visible = false;
        ball.visible = false;
        score1_text.visible = false;
        score2_text.visible = false;
        gameover_text = game.add.bitmapText(200, 100, 'font', '0', 64);
        gameover_text.text = 'Gameover';
        winner_text = game.add.bitmapText(140, 200, 'font', '0', 64);
        winner_text.text = 'Player 2 Wins!';
        click_text = game.add.bitmapText(35, 300, 'font', '0', 64);
        click_text.text = 'Click to Play Again.';
        game.input.onDown.removeAll();
        score2 = 0;
        score1 = 0;
        game.input.onDown.add(function(){
            game.input.onDown.removeAll();
            score2 = 0;
            create();
            tries += 1;
            gameover_text.visible = false;
            winner_text.visible = false;
            click_text.visible = false;
            play();
        });
    } else if(winner_player2 == false) {
        score1 = 0;
        score2 = 0;
        paddle1.visible = false;
        paddle2.visible = false;
        ball.visible = false;
        score1_text.visible = false;
        score2_text.visible = false;
        gameover_text = game.add.bitmapText(200, 100, 'font', '0', 64);
        gameover_text.text = 'Gameover';
        winner_text = game.add.bitmapText(140, 200, 'font', '0', 64);
        winner_text.text = 'Player 1 Wins!';
        click_text = game.add.bitmapText(35, 300, 'font', '0', 64);
        click_text.text = 'Click to Play Again.';
        game.input.onDown.removeAll();
        score2 = 0;
        score1 = 0;
        game.input.onDown.add(function(){
            game.input.onDown.removeAll();
            score2 = 0;
            create();
            tries += 1;
            gameover_text.visible = false;
            winner_text.visible = false;
            click_text.visible = false;
            play();
        });
    }
}
function play() {
    if(tries < 1) {
        game.stage.backgroundColor = '#ffffff';
        var header = game.add.sprite(game.world.centerX - 200, 0, 'logo');
        var easy = game.add.sprite(166.5, game.world.centerY/* - (149 / 2)*/, 'easy', game.input.onDown.add(function() {
            easy_start();
        }));
        var medium = game.add.sprite(325.5, game.world.centerY, 'medium', game.input.onDown.add(function() {
            medium_start();
        }));
        var hard = game.add.sprite(484.5, game.world.centerY, 'hard', game.input.onDown.add(function() {
            hard_start();
        }));
        paddle1 = create_paddle(0, game.world.centerY);
        paddle2 = create_paddle(game.world.width - 8, game.world.centerY);
        ball_launched = false;
        ball_velocity = 0;
        ball = create_ball(game.world.centerX, game.world.centerY - 100);
        //game.input.onDown.add(launch_ball, this);
        /*game.input.onDown.add(function(){
            if(ball_launched == false) {
                launch_ball();
            } 
        });*/
        score1_text = game.add.bitmapText(-128, -128, 'font', '0', 64);
        score2_text = game.add.bitmapText(game.world.width + 128, -128, 'font', '0', 64);
        score1 = 0;
        score2 = 0;
        
    } else {
        game.stage.backgroundColor = '#ffffff';
        var header = game.add.sprite(game.world.centerX - 200, 0, 'logo');
        var easy = game.add.sprite(166.5, game.world.centerY/* - (149 / 2)*/, 'easy', game.input.onDown.add(function() {
            easy_start();
            header.kill();
            easy.kill();
            medium.kill();
            hard.kill();
        }));
        var medium = game.add.sprite(325.5, game.world.centerY, 'medium', game.input.onDown.add(function() {
            medium_start();
            header.kill();
            easy.kill();
            medium.kill();
            hard.kill();
        }));
        var hard = game.add.sprite(484.5, game.world.centerY, 'hard', game.input.onDown.add(function() {
            hard_start();
            header.kill();
            easy.kill();
            medium.kill();
            hard.kill();
        }));
    }
    /*easy.events.onInputDown.add(easy_start, this);
    medium.events.onInputDown.add(medium_start, this);
    hard.events.onInputDown.add(hard_start, this);*/
    function easy_start() {
        ball_maxVelocity = 300;
        header.kill();
        easy.kill();
        medium.kill();
        hard.kill();
        start_game();
    }
    function medium_start() {
        ball_maxVelocity = 411.76;
        header.kill();
        easy.kill();
        medium.kill();
        hard.kill();
        start_game();
    }
    function hard_start() {
        ball_maxVelocity = 570;
        header.kill();
        easy.kill();
        medium.kill();
        hard.kill();
        start_game();
    }
    function start_game() {    
        header.kill();
        easy.kill();
        medium.kill();
        hard.kill();
        game.stage.backgroundColor = '#000000'
        game.input.onDown.removeAll();
        score2 = 0;
        paddle1.visible = true;
        paddle2.visible = true;
        ball_velocity = 700;
        ball.visible = true;
        game.input.onDown.add(function(){
            if(ball_launched == false) {
                launch_ball();
            } 
        });
        score1_text.visible = true;
        score2_text.visible = true;
        score1_text = game.add.bitmapText(128, 128, 'font', '0', 64);
        score2_text = game.add.bitmapText(game.world.width - 128, 128, 'font', '0', 64);
        //}
    }
}
/*if(tries < 1) {
    paddle1 = create_paddle(0, game.world.centerY);
    paddle2 = create_paddle(game.world.width - 8, game.world.centerY);
    ball_launched = false;
    ball_velocity = 700;
    ball = create_ball(game.world.centerX, game.world.centerY);
    //game.input.onDown.add(launch_ball, this);
    game.input.onDown.add(function(){
        if(ball_launched == false) {
            launch_ball();
        } 
    });
    score1_text = game.add.bitmapText(128, 128, 'font', '0', 64);
    score2_text = game.add.bitmapText(game.world.width - 128, 128, 'font', '0', 64);
    score1 = 0;
    score2 = 0;
} else {*/