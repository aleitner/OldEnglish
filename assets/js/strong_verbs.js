function check_answer() {
    var infinitive = document.getElementById("infinitive");
    var preteriteSg = document.getElementById("preterite-sg");
    var preteritePl = document.getElementById("preterite-pl");
    var pastParticiple = document.getElementById("past-participle");
    var verbId = document.getElementById("verb-id");
    var requireMacrons = document.getElementById("macronRequired").checked;

    var verbList = getVerbList()
    var verb = verbList[verbId.innerHTML];

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

    return actual == expected
}

function random_verb() {
    var verbList = getVerbList()

    var verbIdx = Math.floor(Math.random()*verbList.length);
    var verb = verbList[verbIdx];

    set_verb(verbIdx, verb);
}

function set_verb(idx, verb) {
    document.getElementById("infinitive").value = verb.infinitive;
    document.getElementById("preterite-sg").value = ""
    document.getElementById("preterite-pl").value = ""
    document.getElementById("past-participle").value = ""
    document.getElementById("verb-class").title = "Class " + verb.verbClass + " verb";
    document.getElementById("verb-id").innerHTML = idx;
    document.getElementById("verb-meaning").innerHTML = verb.meaning;

    document.getElementById("preterite-sg-answer").title = verb.preteriteSg;
    document.getElementById("preterite-pl-answer").title = verb.preteritePl;
    document.getElementById("past-participle-answer").title = verb.pastParticiple;

    document.getElementById("infinitive-res").innerHTML = "";
    document.getElementById("preterite-sg-res").innerHTML = "";
    document.getElementById("preterite-pl-res").innerHTML = "";
    document.getElementById("past-participle-res").innerHTML = "";
}

function getVerbList() {
    var filter = document.getElementById("verb-filter").value

    filter_verbs = (filter == "0") ? strong_verbs_json : strong_verbs_json.filter(verb => verb.verbClass == filter);

    if (filter_verbs.length == 0) {
        alert("No verbs available for class " + filter);
    }

    document.getElementById("verb-filter").value = "0"

    return strong_verbs_json
}

$(".more_info").click(function () {
    var $title = $(this).find(".title");
    if (!$title.length) {
        $(this).append('<span class="title">' + $(this).attr("title") + '</span>');
    } else {
        $title.remove();
    }
});