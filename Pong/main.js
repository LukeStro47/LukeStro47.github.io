var game = new Phaser.Game(800, 600, Phaser.AUTO, 'world-of-pong', { preload: preload, create: create, update: update}, document.getElementById('game-main'));
var paddle1;
var paddle2;
var ball;
var ball_launched;
var ball_velocity;
var score1_text;
var score2_text;
var score1;
var score2;

function preload() {
    game.load.image('paddle', 'assets/paddle.png');
    game.load.image('ball', 'assets/ball.png');
    game.load.bitmapFont('font', 'assets/font.png', 'assets/font.xml');
}
function create() {
    paddle1 = create_paddle(0, game.world.centerY);
    paddle2 = create_paddle(game.world.width - 8, game.world.centerY);
    ball_launched = false;
    ball_velocity = 700;
    ball = create_ball(game.world.centerX, game.world.centerY);
    game.input.onDown.add(launch_ball, this);
    score1_text = game.add.bitmapText(128, 128, 'font', '0', 64);
    score2_text = game.add.bitmapText(game.world.width - 128, 128, 'font', '0', 64);
    score1 = 0;
    score2 = 0;
}
function update() {
    score1_text.text = score1;
    score2_text.text = score2;
    control_paddle(paddle1, game.input.y);
    game.physics.arcade.collide(paddle1, ball);
    game.physics.arcade.collide(paddle2, ball);
    if(ball.body.blocked.left) {
        score2 += 1;
    } else if(ball.body.blocked.right) {
        score1 += 1;
    }
    paddle2.body.velocity.setTo(ball.body.velocity.y);
    paddle2.body.velocity.x = 0;
    paddle2.body.maxVelocity.y = ball_velocity / 2.5;
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