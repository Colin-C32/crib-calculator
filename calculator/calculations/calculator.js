/*const fs = require("fs");

const fullHandScore = JSON.parse(
    fs.readFileSync("./pre-computed/5CardHands.json", "utf8")
);*/

const fullHandScore = require("@/assets/5CardHands.json");

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

function getThrownCardsOld(fullHand, keptHand) {
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
        if (cards[fullHand[i].rank] === undefined) {
            cards[fullHand[i].rank] = 1;
        } else {
            cards[fullHand[i].rank]++;
        }
    }
    console.log(possibilities);

    for (let i = 0; i < possibilities.length; i++) {
        let thrownCards = getThrownCardsOld(fullHand, possibilities[i]);

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
    }
}

// calculateMainHandScore("2222K3");

function getJackSuits(keptCards, hand) {
    let jackSuits = new Map();

    for (const card of keptCards) {
        if (card.rank === "J") {
            jackSuits.set(card.suit, new Set());
        }
    }

    for (const card of hand) {
        if (jackSuits.has(card.suit)) {
            jackSuits.get(card.suit).add(card.rank);
        }
    }

    return jackSuits;
}

function getJacksScore(jackSuits, rank) {
    let score = 0;
    for (const [key, value] of jackSuits) {
        if (!jackSuits.get(key).has(rank)) {
            score += 1;
        }
    }
    return score;
}

function getFlushSuit(cards) {
    let suitMap = new Map();

    for (let i = 0; i < cards.length; i++) {
        let suit = cards[i].suit;

        if (!suitMap.has(suit)) {
            suitMap.set(suit, 1);
        } else {
            suitMap.set(suit, suitMap.get(suit) + 1);
        }
    }

    if (suitMap.size < 2) {
        return [...suitMap.keys()][0];
    }

    return "";
}

function getFlushScore(flushSuit, value, fullHand) {
    for (const card of fullHand) {
        if (card.rank === value && card.suit === flushSuit) {
            return 0;
        }
    }

    return 1;
}

function getCardRankString(cards) {
    let rankString = "";
    for (const card of cards) {
        rankString += card.rank;
    }
    return rankString;
}

function getSortedRanks(hand) {
    return hand
        .split("")
        .sort((a, b) => values.indexOf(a) - values.indexOf(b))
        .join("");
}

function getHandScore(cardCount, rankMap, keptCards, fullHand) {
    let jackSuits = getJackSuits(keptCards, fullHand);
    let flushSuit = getFlushSuit(keptCards);
    let cardRanks = getCardRankString(keptCards);

    let maxHandScore = 0;
    let minHandScore = 30;
    let totalScore = 0;
    const totalHands = 52 - cardCount;

    for (let i = 0; i < values.length; i++) {
        let multiples = 4 - (rankMap[values[i]] ?? 0);
        if (multiples == 0) {
            continue;
        }
        let handRanksWithCut = getSortedRanks(cardRanks + values[i]);
        let handScore = fullHandScore[handRanksWithCut];
        let jacksScore = getJacksScore(jackSuits, values[i]);
        let flushExtraPoint = 0;

        if (flushSuit) {
            handScore += 4;
            flushExtraPoint = getFlushScore(flushSuit, values[i], fullHand);
        }

        totalScore += handScore * multiples;
        totalScore += flushExtraPoint;
        totalScore += jacksScore;

        if (jacksScore > 0) {
            maxHandScore = Math.max(
                1 + handScore + flushExtraPoint,
                maxHandScore
            );
            minHandScore = Math.min(
                Math.floor(jacksScore / 4) + handScore,
                minHandScore
            );
        } else {
            maxHandScore = Math.max(handScore + flushExtraPoint, maxHandScore);
            minHandScore = Math.min(handScore, minHandScore);
        }
    }

    return [totalScore / totalHands, maxHandScore, minHandScore];
}

function getThrownCards(allCards, keptCards) {
    const difference = allCards.filter(
        (item2) =>
            !keptCards.some(
                (item1) =>
                    item1.color === item2.color &&
                    item1.index === item2.index &&
                    item1.rank === item2.rank &&
                    item1.suit === item2.suit
            )
    );

    return difference;
}

function generateHandCombinations(hand, k) {
    function helper(start, path) {
        if (path.length === k) {
            result.push([...path]);
            return;
        }

        for (let i = start; i < hand.length; i++) {
            path.push(hand[i]);
            helper(i + 1, path);
            path.pop();
        }
    }

    let result = [];
    helper(0, []);
    return result;
}

export default function digestHandScoring(hand) {
    let rankMap = new Map();
    let suitMap = new Map();

    for (let i = 0; i < hand.length; i++) {
        let rank = hand[i].rank;
        let suit = hand[i].suit;

        if (!rankMap.has(rank)) {
            rankMap.set(rank, 1);
        } else {
            rankMap.set(rank, rankMap.get(rank) + 1);
        }

        if (!suitMap.has(suit)) {
            suitMap.set(suit, 1);
        } else {
            suitMap.set(suit, suitMap.get(suit) + 1);
        }
    }

    const possibilities = generateHandCombinations(hand, 4);

    let highestAverageScoreHand = possibilities[0];
    let highestPotentialScoreHand = possibilities[1];
    let highestBaseScoreHand = possibilities[2];

    for (let i = 0; i < possibilities.length; i++) {
        const thrownCards = getThrownCards(hand, possibilities[i]);

        let handScoreData = getHandScore(
            hand.length,
            rankMap,
            possibilities[i],
            hand
        );
    }
}
