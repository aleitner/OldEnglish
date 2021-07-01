var newsPosts = []
var labels = ['news']
var users = ['aleitner']

function loadBlogposts() {
    var resp = httpGet("https://api.github.com/repos/aleitner/OldEnglish/issues")
    respAsJSON = JSON.parse(resp)
    newsPosts = filterPosts(respAsJSON)
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader('Content-type', 'application/vnd.github.v3+json');
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function filterPosts(posts) {
    var filteredPosts = []

    for (var i = 0; i < posts.length; i++) {
        if (doesPostHaveValidLabel(posts[i]) && doesPostHaveValidUser(posts[i])) {
            filteredPosts.push(posts[i])
        }
    }

    return filteredPosts
}

function doesPostHaveValidLabel(post) {
    for (var i = 0; i < post.labels.length; i++) {
        console.log()
        if (labels.indexOf(post.labels[i].name) != -1) {
            return true
        }
    }

    return false
}

function doesPostHaveValidUser(post) {
    if (users.indexOf(post.user.login) != -1) {
        return true
    }

    return false
}
