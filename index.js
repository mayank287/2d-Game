// This Games Uses Good Level of Maths
// Enivorment Setup
const canvas = document.createElement("canvas");
document.querySelector(".myGame").appendChild(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight;

const context = canvas.getContext("2d");


let difficulty = 2;
const form = document.querySelector("form");
const scoreBoard = document.querySelector(".score")




// Basic Functions 



//Difficulty Level Setup
document.querySelector("input").addEventListener("click", (e) => {
    e.preventDefault();

    //Making Form Invisble
    form.style.display = "none";

    //making Score board visble
    scoreBoard.style.display = "block";


    //getting Diffculty selected By user 

    const userValue = document.getElementById("difficulty").value;
    if (userValue === "Easy") {

        setInterval(spawnEnemy, 1000);
        return difficulty = 5;
    }

    if (userValue === "Medium") {

        setInterval(spawnEnemy, 900);
        return difficulty = 8;


    } if (userValue === "Hard") {
        setInterval(spawnEnemy, 500);
        return difficulty = 10;



    } if (userValue === "Insane") {
        setInterval(spawnEnemy, 250);
        return difficulty = 12;



    }
})


// Creating all Classes



// Setting Player Position to Center 

playerPosition = {
    x: canvas.width / 2,
    y: canvas.height / 2

}


// Creating Player class
class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        context.beginPath();

        context.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        context.fillStyle = this.color;

        context.fill();



    }
}

// Creating Weapon Class
class Weapon {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;

    }

    draw() {
        context.beginPath();

        context.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        context.fillStyle = this.color;

        context.fill();



    }

    update() {

        this.draw();
        (this.x += this.velocity.x),
            (this.y += this.velocity.y);

    }


}



// Creating Enemy Class 
class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;

    }

    draw() {
        context.beginPath();

        context.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        context.fillStyle = this.color;

        context.fill();



    }

    update() {

        this.draw();
        (this.x += this.velocity.x),
            (this.y += this.velocity.y);

    }


}


// Main Game Logic


const mayank = new Player(playerPosition.x,
    playerPosition.y,
    15,
    "white"
);




// Creating Player Object, Weapons Array, Enemy Array etc 

const Weapons = []

const enemies = [];


// Function To Spawn Enemy at Random Location
const spawnEnemy = () => {

    // Generating Random size of enemy
    const enemySize = Math.random() * (40 - 5) + 5

    // Generating Random Color For enemy
    const enemyColor = `rgb(${Math.random() * 250},${Math.random() * 250},${Math.random() * 250})`

    //Random in Enemy Spawn Position
    let random;

    // Making Enemy Loaction Random but Only from outside of screen

    if (Math.random < 0.5) {
        // Making X equal to very left off a screen or very right off of screen and setting y To any where vertically 


        random = {
            x: Math.random() < 0.5 ? canvas.width + enemySize : 0 - enemySize,
            y: Math.random() * canvas.height
        };
    }

    else {
        // Making Y equal to very left off a screen or very right off of screen and setting X To any where vertically 

        random = {
            x: Math.random() * canvas.width,
            y: Math.random() < 0.5 ? canvas.height + enemySize : 0 - enemySize,
        };

    };


    // Finding Angel between center (means Player Position ) and enemy position 
    const myAngel = Math.atan2(
        canvas.height / 2 - random.y,
        canvas.width / 2 - random.x
    );
    // Making velocity or speed of enemy by multipling chosen difficulty to radian
    const velocity = {
        x: Math.cos(myAngel) * difficulty,
        y: Math.sin(myAngel) * difficulty
    }


    enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity))
}

// Creating Animation Function
let animationId;
function animation() {
    //Making Recursion
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Clearing canvas on Each Frame
    animationId = requestAnimationFrame(animation)


    // Drawing Player
    mayank.draw();

    // Generating Bullets
    Weapons.forEach((weapon, weaponIndex) => {

        weapon.update();

        if (weapon.x + weapon.radius < 1 ||
             weapon.y + weapon.radius < 1 ||
              weapon.x - weapon.radius > canvas.width ||
               weapon.y - weapon.radius > canvas.height) {
            weapons.splice(weaponIndex, 1)
        }

    })



    // Generating enemies 
    enemies.forEach((enemy, enemyIndex) => {
        enemy.update();
        const distanceBetweenPlayerandEnemy = Math.hypot(abhi.x - enemy.x, abhi.y - enemy.y)
        if (distanceBetweenPlayerandEnemy - abhi.radius - enemy.radius < 1) {
            cancelAnimationFrame(cancelAnimationFrame)

        }

    });

    Weapons.forEach((weapon, weaponIndex) => {
        const distanceBetweenWeaponandEnemy = Math.hypo(weapon.x - enemy.x, weapon.y - enemy.y)
        if (distanceBetweenWeaponandEnemy - weapon.radius - enemy.radius < 1) {
            setTimeout(() => {
                enemies.splice(enemyIndex, 1);
                weapons.splice(weaponIndex, 1)

            }, 0);
        }
    })


}



// Adding Event Listeners

//event Listener for Light Weapon aka Left Click
canvas.addEventListener("click", (e) => {
    //finding angel between player position(center) and click co-ordinates
    const myAngel = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2)
    // Making Const speed for light weapon
    const velocity = {
        x: Math.cos(myAngel) * 6,
        y: Math.sin(myAngel) * 6,
    }

    //Adding light weapon in weapons array 
    Weapons.push(new Weapon(canvas.width / 2, canvas.height / 2, 3, `red`, velocity));
})
animation();