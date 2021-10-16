function check_answer() {
    var infinitive = document.getElementById("infinitive");
    var preteriteSg = document.getElementById("preterite-sg");
    var preteritePl = document.getElementById("preterite-pl");
    var pastParticiple = document.getElementById("past-participle");
    var verbId = document.getElementById("verb-id");

    var verb = strong_verbs_json[verbId.innerHTML];

    if (infinitive.value == verb.infinitive) {
        document.getElementById("infinitive-res").innerHTML = "✅";
    } else {
        document.getElementById("infinitive-res").innerHTML = "❌";
    }

    if (preteriteSg.value == verb.preteriteSg) {
        document.getElementById("preterite-sg-res").innerHTML = "✅";
    } else {
        document.getElementById("preterite-sg-res").innerHTML = "❌";
    }

    if (preteritePl.value == verb.preteritePl) {
        document.getElementById("preterite-pl-res").innerHTML = "✅";
    } else {
        document.getElementById("preterite-pl-res").innerHTML = "❌";
    }

    if (pastParticiple.value == verb.pastParticiple) {
        document.getElementById("past-participle-res").innerHTML = "✅";
    } else {
        document.getElementById("past-participle-res").innerHTML = "❌";
    }
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