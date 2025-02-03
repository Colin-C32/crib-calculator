const fs = require("fs");
const valueHandScore = JSON.parse(fs.readFileSync("./pre-computed/5CardHands.json", "utf8"));
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}

class Hand {
    constructor() {
        this.hand = [];
    }

    addCardToHand(card) {
        this.hand.push(card);
    }

    setCut(card) {
        this.cut = card;
    }

    clearHand() {
        this.hand = [];
    }

    getHandValueString() {
        let handValueString = "";

        for (let card of this.hand) {
            handValueString += card.rank;
        }

        console.log(handValueString);
        return handValueString;
    }

    getSortedValueWithCut() {
        let fullHand = this.getHandValueString() + this.cut.rank;
        return fullHand.split("").sort((a, b) => values.indexOf(a) - values.indexOf(b)).join("");
    }

    getSuitScore() {
        let suitsInHand = new Set([]);

        for (let card of this.hand) {
            suitsInHand.add(card.suit);
        }
        console.log(suitsInHand);

        if (suitsInHand.size > 1) {
            return 0;
        }

        suitsInHand.add(this.cut.suit);
        
        if (suitsInHand.size > 1) {
            return 4;
        }
    
        return 5;
    }

    getJackScore() {
        if (this.cut.rank == 'J') {
            return 2;
        }

        let jacks = new Set([]);

        for (let card of this.hand) {
            if (card.rank == 'J') {
                jacks.add(card.suit);
            }
        }
        
        if (jacks.has(this.cut.suit)) {
            return 1;
        }
        return 0;
    }

    getHandScore() {
        let handWithCut = this.getSortedValueWithCut();
        return valueHandScore[handWithCut] + this.getSuitScore() + this.getJackScore();
    }
}

let hand = new Hand();

hand.addCardToHand(new Card("3", 'D'));
hand.addCardToHand(new Card("T", 'D'));
hand.addCardToHand(new Card("T", 'C'));
hand.addCardToHand(new Card("2", 'S'));
hand.setCut(new Card("A", "C"));

fullSortedHand = hand.getSortedValueWithCut();
console.log(hand.getHandScore());