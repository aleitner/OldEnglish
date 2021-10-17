function check_answer() {
    var infinitive = document.getElementById("infinitive");
    var preteriteSg = document.getElementById("preterite-sg");
    var preteritePl = document.getElementById("preterite-pl");
    var pastParticiple = document.getElementById("past-participle");
    var verbId = document.getElementById("verb-id");
    var requireMacrons = document.getElementById("macronRequired").checked;
    console.log(requireMacrons);

    var verb = strong_verbs_json[verbId.innerHTML];

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
    var actual = actual.toLowerCase()

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
    }

    return actual == expected
}

function random_verb() {
    var verbIdx = Math.floor(Math.random()*strong_verbs_json.length);

    set_verb(verbIdx)
}

function set_verb(idx) {
    var verb = strong_verbs_json[idx];

    var infinitive = document.getElementById("infinitive");
    var preteriteSg = document.getElementById("preterite-sg");
    var preteritePl = document.getElementById("preterite-pl");
    var pastParticiple = document.getElementById("past-participle");
    var verbClass = document.getElementById("verb-class");
    var verbId = document.getElementById("verb-id");

    infinitive.value = verb.infinitive;
    preteriteSg.value = ""
    preteritePl.value = ""
    pastParticiple.value = ""
    verbClass.title = "Class " + verb.verbClass + " verb";
    verbId.innerHTML = idx;

    document.getElementById("preterite-sg-answer").title = verb.preteriteSg;
    document.getElementById("preterite-pl-answer").title = verb.preteritePl;
    document.getElementById("past-participle-answer").title = verb.pastParticiple;

    document.getElementById("infinitive-res").innerHTML = "";
    document.getElementById("preterite-sg-res").innerHTML = "";
    document.getElementById("preterite-pl-res").innerHTML = "";
    document.getElementById("past-participle-res").innerHTML = "";
}