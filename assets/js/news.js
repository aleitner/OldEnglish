function loadBlogposts() {
    var resp = httpGet("https://api.github.com/repos/aleitner/OldEnglish/issues")
    respAsJSON = JSON.parse(resp)
    console.log(respAsJSON)
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader('Content-type', 'application/vnd.github.v3+json');
    xmlHttp.send(null);
    return xmlHttp.responseText;
}