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
var header;
var easy;
var medium;
var hard;
var new_ball;
var new_paddle1;
var new_paddle2;
var game_started = false;
var tries = 0;
var ball_maxVelocity;
var play_button;

function preload() {
    game.load.image('paddle', 'assets/paddle.png');
    game.load.image('ball', 'assets/ball.png');
    game.load.bitmapFont('font', 'assets/font.png', 'assets/font.xml');
    game.load.image('easy', 'assets/easy.png');
    game.load.image('medium', 'assets/medium.png');
    game.load.image('hard', 'assets/hard.png');
    game.load.image('logo', 'assets/ponglogo.png');
    game.load.image('play', 'assets/play.png');
}
function create() {
    ball_maxVelocity = 500;
    menu();
}
function update() {
    if(game_started == true) {
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
}
function menu() {
    game.stage.backgroundColor = '#ffffff';
    header = game.add.sprite(game.world.centerX - 200, 0, 'logo');
    play_button = game.add.sprite(game.world.centerX - 100, game.world.centerY - 100, 'play', game.input.onDown.add(function() {
        header.destroy();
        play_button.destroy();
        play_game();
    }));
}
function play_game() {
    game_started = true;
    if(tries == 0) {
        paddle1 = create_paddle(0, game.world.centerY);
        paddle2 = create_paddle(game.world.width - 8, game.world.centerY);
        ball_launched = false;
        ball_velocity = 700;
        ball = create_ball(game.world.centerX, game.world.centerY);
        //game.input.onDown.add(launch_ball, this);
        score1_text = game.add.bitmapText(128, 128, 'font', '0', 64);
        score2_text = game.add.bitmapText(game.world.width - 128, 128, 'font', '0', 64);
        score1 = 0;
        score2 = 0;
        //
        game.stage.backgroundColor = '#000000';
        game.input.onDown.removeAll();
        game.input.onDown.add(function(){
            if(ball_launched == false) {
                launch_ball();
            } 
        });
    //}
    } else if(tries != 0) {
        game.stage.backgroundColor = '#000000';
        game.input.onDown.removeAll();
        score2 = 0;
        // game.events.onInputDown.removeAll();
        paddle1.visible = true;
        paddle2.visible = true;
        ball_velocity = 700;
        ball.visible = true;
        score1_text.visible = true;
        score2_text.visible = true;
        game.input.onDown.add(function(){
            if(ball_launched == false) {
                launch_ball();
            } 
        });
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
    } else {
        ball.body.velocity.x = -ball_velocity;
        ball.body.velocity.y = ball_velocity;
        ball_launched = true;
    }
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
            menu();
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
            menu();
        });
    }
}