const fs = require("fs");

const fullHandScore = JSON.parse(
    fs.readFileSync("./pre-computed/5CardHands.json", "utf8")
);
const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
];

function sortByValue(hand) {
    return hand
        .split("")
        .sort((a, b) => values.indexOf(a) - values.indexOf(b))
        .join("");
}

function getThrownCards(fullHand, keptHand) {
    const cardCount = {};

    for (let char of fullHand) {
        cardCount[char] = (cardCount[char] || 0) + 1;
    }

    for (let char of keptHand) {
        cardCount[char] = cardCount[char] - 1;
    }

    let thrownCards = "";

    for (const key in cardCount) {
        while (cardCount[key] > 0) {
            thrownCards += key;
            cardCount[key]--;
        }
    }

    return thrownCards;
}

function generateCardCombinations(size) {
    const cardValues = [...Array(8).keys()]
        .map((i) => (i + 2).toString())
        .concat(["T", "J", "Q", "K", "A"]);

    function cartesianProduct(arr, repeat) {
        if (repeat === 1) {
            return arr.map((el) => [el]);
        }
        return cartesianProduct(arr, repeat - 1).flatMap((hand) =>
            arr.map((el) => [...hand, el])
        );
    }
    return cartesianProduct(cardValues, size).map((hand) => hand.join(""));
}

function handCombinations(str, k) {
    const results = [];

    function combine(prefix, start) {
        if (prefix.length === k) {
            results.push(prefix);
            return;
        }
        for (let i = start; i < str.length; i++) {
            combine(prefix + str[i], i + 1);
        }
    }

    combine("", 0);
    return results;
}

function getAverageHandScore(allCards, keptHand, hands) {
    let totalScore = 0;
    for (let i = 0; i < values.length; i++) {
        multiples = 4 - (allCards[values[i]] ?? 0);
        if (multiples == 0) {
            continue;
        }
        handWithCut = sortByValue(keptHand + values[i]);
        score = fullHandScore[handWithCut];
        totalScore += score * multiples;
    }

    return totalScore / hands;
}

function suitScore(hand, cut) {
    let suitsInHand = new Set([]);

    for (let suit of hand) {
        suitsInHand.add(suit);
    }

    if (suitsInHand.size > 1) {
        return 0;
    }

    suitsInHand.add(cut);

    if (suitsInHand.size > 1) {
        return 4;
    }

    return 5;
}

function jackScore(knownCards, hand) {
    let jackSuits = new Set([]);
    let suits = {};
    let total = 0;

    for (let card of hand) {
        if (card.rank === "J") {
            jackSuits.add(card.suit);
        }
    }

    for (let card of knownCards) {
        suits[card.suit] = (suits[card.suit] ?? 0) + 1;
    }

    for (let jack of jackSuits) {
        total += 13 - suits[jack];
    }
    return total;
}

function getAverageCribScore(allCards, thrownCards, hands) {
    othersThrown = generateCardCombinations(2);
    possibleHands = 0;
    totalScore = 0;

    for (let i = 0; i < othersThrown.length; i++) {
        let otherCards = othersThrown[i];
        fullCrib = otherCards + thrownCards;
        hiddenCardsMultiples =
            (4 - (allCards[otherCards[0]] ?? 0)) *
            (4 - (allCards[otherCards[1]] ?? 0));

        if (hiddenCardsMultiples <= 0) {
            continue;
        }
        let cardMap = { ...allCards };

        cardMap[otherCards[0]] = (cardMap[otherCards[0]] ?? 0) + 1;
        cardMap[otherCards[1]] = (cardMap[otherCards[1]] ?? 0) + 1;

        for (let i = 0; i < values.length; i++) {
            multiples = 4 - (cardMap[values[i]] ?? 0);
            if (multiples <= 0) {
                continue;
            }

            cribWithCut = sortByValue(fullCrib + values[i]);
            score = fullHandScore[cribWithCut];
            totalScore += score * multiples * hiddenCardsMultiples;
            possibleHands += hiddenCardsMultiples * multiples;
        }
    }
    return totalScore / possibleHands;
}

function calculateMainHandScore(fullHand) {
    possibilities = handCombinations(fullHand, 4);
    cards = {};
    options = {};

    for (let i = 0; i < fullHand.length; i++) {
        if (cards[fullHand[i]] === undefined) {
            cards[fullHand[i]] = 1;
        } else {
            cards[fullHand[i]]++;
        }
    }

    for (let i = 0; i < possibilities.length; i++) {
        thrownCards = getThrownCards(fullHand, possibilities[i]);

        avgCribScore = getAverageCribScore(
            cards,
            thrownCards,
            52 - fullHand.length
        );
        avgHandScore = getAverageHandScore(
            cards,
            possibilities[i],
            52 - fullHand.length
        );

        if (avgCribScore + avgHandScore > max) {
            finalHand = thrownCards;
            max = avgCribScore + avgHandScore;
        }
    }
}

calculateMainHandScore("2222K3");
