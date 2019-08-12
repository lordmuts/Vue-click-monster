
new Vue ({
    el: '#app',
    data: {
        gameIsRunning: false,
        playerHealth: 100,
        monsterHealth: 100,
        turns: []
        
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack() {            
           var damage = this.calculateDemage(3, 10);
           this.monsterHealth -= damage;
           this.turns.unshift({
               isPlayer: true,
               text: 'Player hits Monster for ' + damage 
           });
           if (this.checkWin()) {
               return;
           } 
           this.monsterAttack();
        },
        specialAttack() {
            var damage = this.calculateDemage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster hard for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            
            this.monsterAttack();
        },
        heal(){
            if(this.playerHealth <= 50) {
            this.playerHealth += 10;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10' 
            })
            this.monsterAttack();
            this.checkWin();

        },
        giveUp(){
            this.playerHealth = 0;
            this.checkWin();

        },
        calculateDemage(min, max) {
            return Math.max(Math.floor(Math.random() * max ) + 1, min)
        },
        monsterAttack() { 
            var damage = this.calculateDemage(5, 12);
            this.playerHealth -= damage
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            })
        },
            

        checkWin() {

            if(this.monsterHealth <= 0) {
                if(confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunnig = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunnig = false;
                }
                return true;
            } 
            return false;
        }
    
    }
})