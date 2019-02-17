class relevanceElem {
    constructor(elem, relevance) {
        this.elem = elem;
        this.relevance = relevance;
    }
}

class relevanceQueue {
    constructor() {
        this.items = [];
    }

    enqueueR(item, relevance) {
        var object = new relevanceElem(item, relevance);
        var within = false;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].relevance < relevance) {
                this.items.splice(i, 0, object);
                within = true;
                break;
            }
        }
        if (!within) {
            this.items.push(object);
        }
    }

    delete(index) {
        this.items.splice(index, 1);
    }

    clear() {
        while (this.items.length > 0) {
            this.delete(0);
        }
    }

    printQueue() {
        for (var i = 0; i < this.items.length; i++) {
            console.log("Title: " + this.items[i].elem + ", Relevance: " + this.items[i].relevance + "\n");
        }
    }

    returnQueue() {
        return this.items;
    }
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0){
            costs[s2.length] = lastValue;
        }
    }
    return costs[s2.length];
}


function genRelevance(criterionString, testString) {
    // https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
    var longer = criterionString;
    var shorter = testString;
    if (criterionString.length < testString.length) {
        longer = testString;
        shorter = criterionString;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function sortRelevance(criterionString, articleArray) {
    results = new relevanceQueue();
    for (var i = 0; i < articleArray.length; i++) {
        results.enqueueR(articleArray[i], genRelevance(criterionString, articleArray[i]));
    }

    console.log("Comparing against: " + criterionString + "\n");
    results.printQueue();
}

function main(){
  testArr = [
    "Trump declares national emergency, and provokes a constitutional clash",
    "Trump declares emergency over wall, inviting likely court fight",
    "Buffeted by Retail Upheaval, Payless to Liquidate All U.S. Stores"
  ];
  testString = "Trump declares national emergency, and provokes a constitutional clash";
  sortRelevance(testString, testArr);
}

main();