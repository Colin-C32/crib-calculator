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

function getCribJackScore(rankMap, combo, cribRankString, cut) {
    let jackCount = 0;

    for (const card of combo) {
        if (!rankMap.has(card)) {
            rankMap.set(card, 1);
        } else {
            rankMap.set(card, rankMap.get(card) + 1);
        }
    }

    for (const rank of cribRankString) {
        if (rank === "J") {
            jackCount += 1;
        }
    }

    return jackCount * (4 - (rankMap.get(cut) ?? 0));
}

function hasDuplicates(str) {
    return new Set(str).size < str.length;
}

function getCribFlushScore(thrownCards, fullHand, fullCribRankString, cut) {
    if (hasDuplicates(fullCribRankString + cut)) {
        return 0;
    }
    let suit = thrownCards[0].suit;

    let suitSet = new Set();

    for (const card of fullHand) {
        if (card.suit === suit) {
            suitSet.add(card.rank);
        }
    }

    let count = 0;
    for (const rank of fullCribRankString) {
        if (suitSet.has(rank)) {
            count += 1;
        }
    }
    if (suitSet.has(cut)) {
        count += 1;
    }

    if (thrownCards.size - count === 0) {
        return 5;
    }

    return 0;
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
        let multiples = 4 - (rankMap.get(values[i]) ?? 0);
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

function getMultiples(rankMap, combo, cut) {
    for (const card of combo) {
        if (!rankMap.has(card)) {
            rankMap.set(card, 1);
        } else {
            rankMap.set(card, rankMap.get(card) + 1);
        }
    }
    return 4 - (rankMap.get(cut) ?? 0);
}

function getComboMultiples(rankMap, combo) {
    let comboMultiple = 1;
    for (const card of combo) {
        if (!rankMap.has(card)) {
            rankMap.set(card, 3);
        } else {
            rankMap.set(card, rankMap.get(card) - 1);
        }

        comboMultiple *= 3 - (rankMap.get(card) ?? 0);
    }

    return comboMultiple;
}

function getCribScore(fullHand, rankMap, suitMap, thrownCards) {
    let otherThrownCards = generateRankCombinations(4 - thrownCards.length);
    let cribRankString = "";
    for (const card of thrownCards) {
        cribRankString += card.rank;
    }

    let maxCribScore = 0;
    let minCribScore = 30;
    let totalScore = 0;
    let totalHands = 0;

    for (const cards of otherThrownCards) {
        let fullCribRankString = cribRankString + cards.join("");
        let comboMultiples = getComboMultiples(new Map(rankMap), cards);

        for (let i = 0; i < values.length; i++) {
            let multiples =
                getMultiples(new Map(rankMap), cards, values[i]) *
                comboMultiples;

            if (multiples <= 0) {
                continue;
            }

            totalHands += multiples;

            let cribRanksWithCut = getSortedRanks(
                fullCribRankString + values[i]
            );

            let cribScore = fullHandScore[cribRanksWithCut];

            let jacksScore = getCribJackScore(
                new Map(rankMap),
                new Map(suitMap),
                cards,
                fullCribRankString,
                values[0]
            );
            let flushScore = getCribFlushScore(
                thrownCards,
                fullHand,
                fullCribRankString,
                values[i]
            );

            totalScore += cribScore * multiples;
            totalScore += flushScore;

            if (jacksScore > 0) {
                maxCribScore = Math.max(
                    1 + cribScore + flushScore,
                    maxCribScore
                );
                minCribScore = Math.min(
                    Math.floor(jacksScore / 4) + cribScore,
                    minCribScore
                );
            } else {
                maxCribScore = Math.max(cribScore + flushScore, maxCribScore);
                minCribScore = Math.min(cribScore, minCribScore);
            }
        }
    }

    return [totalScore / totalHands, maxCribScore, minCribScore];
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

function generateRankCombinations(k) {
    function helper(start, combo) {
        if (combo.length === k) {
            result.push([...combo]);
            return;
        }
        for (let i = start; i < values.length; i++) {
            combo.push(values[i]);
            helper(i, combo); // Allow same index again
            combo.pop();
        }
    }

    const result = [];
    helper(0, []);
    return result;
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

export default function digestHandScoring(hand, isUserCrib) {
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

    let highestAverageScore = 0;
    let highestPotentialScore = 0;
    let highestBaseScore = 0;

    let averageScoreData = {};
    let potentialScoreData = {};
    let baseScoreData = {};

    for (let i = 0; i < possibilities.length; i++) {
        const thrownCards = getThrownCards(hand, possibilities[i]);

        let handScoreData = getHandScore(
            hand.length,
            rankMap,
            possibilities[i],
            hand
        );

        let cribScoreData = getCribScore(hand, rankMap, suitMap, thrownCards);

        let handData = {
            keptCards: possibilities[i],
            thrownCards: thrownCards,
            averageTotalScore: isUserCrib
                ? handScoreData[0] + cribScoreData[0]
                : handScoreData[0] - cribScoreData[0],
            averageHandScore: handScoreData[0],
            averageCribScore: cribScoreData[0],
            baseScore: isUserCrib
                ? handScoreData[2] + cribScoreData[2]
                : handScoreData[2] - handScoreData[2],
            highestPossible: isUserCrib
                ? handScoreData[1] + handScoreData[2]
                : handScoreData[1] - handScoreData[2],
        };

        if (isUserCrib) {
            if (handScoreData[0] + cribScoreData[0] >= highestAverageScore) {
                averageScoreData = handData;
                highestAverageScore = handScoreData[0] + cribScoreData[0];
            }
            if (handScoreData[1] + cribScoreData[1] >= highestPotentialScore) {
                potentialScoreData = handData;
                highestPotentialScore = handScoreData[1] + cribScoreData[1];
            }
            if (handScoreData[2] + cribScoreData[2] >= highestBaseScore) {
                baseScoreData = handData;
                highestBaseScore = handScoreData[2] + cribScoreData[2];
            }
        } else {
            if (handScoreData[0] - cribScoreData[0] >= highestAverageScore) {
                averageScoreData = handData;
                highestAverageScore = handScoreData[0] - cribScoreData[0];
            }
            if (handScoreData[1] - cribScoreData[1] >= highestPotentialScore) {
                potentialScoreData = handData;
                highestPotentialScore = handScoreData[1] - cribScoreData[1];
            }
            if (handScoreData[2] - cribScoreData[2] >= highestBaseScore) {
                baseScoreData = handData;
                highestBaseScore = handScoreData[2] - cribScoreData[2];
            }
        }
    }

    return [averageScoreData, potentialScoreData, baseScoreData];
}
