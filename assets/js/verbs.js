var sessionVerbs = [];
var completedVerbs = [];

function initialize() {
    sessionVerbs = verbs_json;

    set_random_verb();
}

function clear_table() {
    // Clear inputs
    document.getElementById("infinitive").value = "";
    document.getElementById("preterite-sg").value = "";
    document.getElementById("preterite-pl").value = "";
    document.getElementById("past-participle").value = "";
    document.getElementById("verb-id").innerHTML = "";
    document.getElementById("verb-meaning").innerHTML = "";

    // Clear emoji
    document.getElementById("infinitive-res").innerHTML = "";
    document.getElementById("preterite-sg-res").innerHTML = "";
    document.getElementById("preterite-pl-res").innerHTML = "";
    document.getElementById("past-participle-res").innerHTML = "";

    // Clear tooltips
    document.getElementById("verb-class").title = "";
    document.getElementById("preterite-sg-answer").title = "";
    document.getElementById("preterite-pl-answer").title = "";
    document.getElementById("past-participle-answer").title = "";
}

function set_random_verb() {
    if (sessionVerbs.length == 0) {
        clear_table();
        alert("No verbs available");
        return;
    }

    var obj = random_verb();
    set_verb(obj.idx, obj.verb);
}

function check_answer() {
    if (sessionVerbs.length == 0) {
        return;
    }

    var infinitive = document.getElementById("infinitive");
    var preteriteSg = document.getElementById("preterite-sg");
    var preteritePl = document.getElementById("preterite-pl");
    var pastParticiple = document.getElementById("past-participle");
    var verbId = document.getElementById("verb-id");
    var requireMacrons = document.getElementById("macronRequired").checked;

    var verb = sessionVerbs[verbId.innerHTML];

    if (compare(verb.infinitive, infinitive.value, requireMacrons)) {
        document.getElementById("infinitive-res").innerHTML = "✅";
    } else {
        document.getElementById("infinitive-res").innerHTML = "❌";
    }

    if (compare(verb.preteriteSg, preteriteSg.value, requireMacrons)) {
        document.getElementById("preterite-sg-res").innerHTML = "✅";
    } else {
        document.getElementById("preterite-sg-res").innerHTML = "❌";
    }

    if (compare(verb.preteritePl, preteritePl.value, requireMacrons)) {
        document.getElementById("preterite-pl-res").innerHTML = "✅";
    } else {
        document.getElementById("preterite-pl-res").innerHTML = "❌";
    }

    if (compare(verb.pastParticiple, pastParticiple.value, requireMacrons)) {
        document.getElementById("past-participle-res").innerHTML = "✅";
    } else {
        document.getElementById("past-participle-res").innerHTML = "❌";
    }
}

function compare(expected, actual, requireMacrons) {
    var actual = actual.toLowerCase().trim();

    actual = actual.replace(/ð/g, "þ");
    expected = expected.replace(/ð/g, "þ");

    actual = actual.replace(/ᵹ/g, "g");
    expected = expected.replace(/ᵹ/g, "g");

    actual = actual.replace(/ƿ/g, "w");
    expected = expected.replace(/ƿ/g, "w");

    actual = actual.replace(/ae/g, "æ");  

    if (!requireMacrons) {
        expected = expected.replace(/ǣ/g, "æ");
        expected = expected.replace(/ā/g, "a");
        expected = expected.replace(/ē/g, "e");
        expected = expected.replace(/ī/g, "i");
        expected = expected.replace(/ō/g, "o");
        expected = expected.replace(/ū/g, "u");
        expected = expected.replace(/ȳ/g, "y");
        expected = expected.replace(/ġ/g, "g");
        expected = expected.replace(/ċ/g, "c");

        actual = actual.replace(/ǣ/g, "æ");
        actual = actual.replace(/ā/g, "a");
        actual = actual.replace(/ē/g, "e");
        actual = actual.replace(/ī/g, "i");
        actual = actual.replace(/ō/g, "o");
        actual = actual.replace(/ū/g, "u");
        actual = actual.replace(/ȳ/g, "y");
        actual = actual.replace(/ġ/g, "g");
        actual = actual.replace(/ċ/g, "c");
    }

    for (const possibility of expected.split(/[ ,]+/)) {
        if (actual == possibility) {
            return true
        }
    }

    return false
}

function random_verb() {
    var verbIdx = Math.floor(Math.random()*sessionVerbs.length);
    var verb = sessionVerbs[verbIdx];

    return {
        verb: verb, 
        idx: verbIdx
    };
}

function set_verb(idx, verb) {
    switch (verb.verbClass) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
            document.getElementById("preterite-pl-row").style.display = "block";
            break
        case 'i':
        case 'ii':
        case 'iii':
            document.getElementById("preterite-pl-row").style.display = "none";
            break
        case 'pp':
        default:
    }

    document.getElementById("infinitive").value = verb.infinitive;
    document.getElementById("preterite-sg").value = ""
    document.getElementById("preterite-pl").value = ""
    document.getElementById("past-participle").value = ""
    document.getElementById("verb-id").innerHTML = idx;
    document.getElementById("verb-meaning").innerHTML = verb.meaning;

    document.getElementById("preterite-sg-answer").title = verb.preteriteSg;
    document.getElementById("preterite-pl-answer").title = verb.preteritePl;
    document.getElementById("past-participle-answer").title = verb.pastParticiple;
    document.getElementById("verb-class").title = "Class " + verb.verbClass + " verb";

    document.getElementById("infinitive-res").innerHTML = "";
    document.getElementById("preterite-sg-res").innerHTML = "";
    document.getElementById("preterite-pl-res").innerHTML = "";
    document.getElementById("past-participle-res").innerHTML = "";
}

function remove_verb() {
    var verbId = document.getElementById("verb-id").innerHTML;
    if (verbId == "") {
        return;
    }

    var verb = sessionVerbs[verbId];

    completedVerbs = [verb].concat(completedVerbs);

    verbs_json = verbs_json.filter(obj => obj.infinitive != verb.infinitive);

    onFilterChange();

    displayRemovedVerbs()
}

function displayRemovedVerbs() {
    var knownVerbs = document.getElementById("known-verbs");
    knownVerbs.innerHTML = "";

    for (const verb of completedVerbs) {
        var verbDiv = document.createElement("div");
        knownVerbs.appendChild(verbDiv);

        newContent = document.createTextNode(`${verb.infinitive}, ${verb.preteriteSg}, ${verb.preteritePl}, ${verb.pastParticiple}`);
        verbDiv.appendChild(newContent);
    }
}

function onFilterChange() {
    var checked = document.querySelectorAll('#verb-filter :checked');
    var selected = [...checked].map(option => option.value);

    sessionVerbs = selected[0] == "0" ? verbs_json : verbs_json.filter(verb => selected.includes(verb.verbClass));

    if (sessionVerbs.length == 0) {
        document.getElementById("verb-filter").value = "0";
        sessionVerbs = verbs_json;
    }

    set_random_verb();
}