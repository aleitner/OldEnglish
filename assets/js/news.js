// Issue must have one of these labels in order to show up
var labels = ['news']
// Issue must be created by one of these users in order to show up
var users = ['aleitner', 'fadiend', 'Wynmill']
// Issue repo location
var repo = "aleitner/OldEnglish"

var converter = new showdown.Converter({
    tables: true, 
    simplifiedAutoLink: true
});

// Retrieve all issues and populate
window.onload = function() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    var issues = getIssues()

    var mainIssue = issues[0]
    if (params.post != null) {
        const iss = getIssueByNumber(issues, params.post)
        if (iss != null) {
            mainIssue = iss;
        }
    }

    if (issues.length > 0) {
        var comments = getCommentsForIssue(mainIssue.number)
        populateRecent(mainIssue)
        populateOlderIssuesList(issues)

        if (comments.length > 0) {
            populateComments(comments)
        }
    }
}

function getIssueByNumber(issues, issueNumber) {
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].number == issueNumber) {
            return issues[i];
        }
    }
}

// synchronous get request
// TODO: Make async
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader('Content-type', 'application/vnd.github.v3+json');
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

// getIssues from github api
function getIssues() {
    var resp = httpGet(`https://api.github.com/repos/${repo}/issues`)
    respAsJSON = JSON.parse(resp)
    return filterIssues(respAsJSON)
}

// getCommentsForIssue from github api by issue id
function getCommentsForIssue(issue_number) {
    var resp = httpGet(`https://api.github.com/repos/${repo}/issues/${issue_number}/comments`)
    return JSON.parse(resp)
}

// Redirect to issue page for comment
function commentButton(postID) {
    var url = `http://github.com/${repo}/issues/${postID}`
    window.open(url, '_blank')
}

// populateRecent will populate the most recent issue in the center of the page
function populateRecent(newsPost) {
    var issueTitle = document.getElementById("issueTitle")
    issueTitle.innerHTML = `<a href="${newsPost.html_url}">${newsPost.title}</a>`

    var issueMeta = document.getElementById("issueMeta")
    var date = `<em><font size="-1">Posted on ${newsPost.created_at.slice(0,10)}</font></em>`
    var author = `<em><font size="-1">By <a href="${newsPost.user.html_url}">${newsPost.user.login}</a></font></em>`
    issueMeta.innerHTML = date + " " + author

    var issueBody = document.getElementById("issueBody")
    issueBody.innerHTML = converter.makeHtml(newsPost.body)

    var commentButtonDiv = document.getElementById("commentButton")
    commentButtonDiv.innerHTML = ""
    var commentButton = document.createElement("button");
    commentButton.type = "button"
    commentButton.className = "btn btn-primary"
    commentButton.setAttribute( "onClick", `commentButton(${newsPost.number})` ) 
    commentButton.innerText = "Comment"
    commentButtonDiv.appendChild(commentButton);
}

// populateComments into div with id issueComments
function populateComments(comments) {
    var commentsDiv = document.getElementById("issueComments")
    for(var i = 0; i < comments.length; i++) {
        var comment = comments[i]
        var date = `<em><font size="-1">${comment.created_at.slice(0,10)}</font></em>`
        var author = `<a href="${comment.user.html_url}">${comment.user.login}</a>`
        var body = converter.makeHtml(comment.body)

        post = document.createElement("p");
        post.innerHTML = `<b>${author}</b> ${date} <br />${body}<br /><br />`
        commentsDiv.appendChild(post);
    }
}

// populateOlderIssuesList into div with id olderIssuesList
function populateOlderIssuesList(newsPosts) {
    var olderIssuesList = document.getElementById("olderIssuesList")
    // Clear the old posts
    olderIssuesList.innerHTML = ""

    var olderIssues = document.getElementById("olderIssues")
    olderIssues.innerHTML = "Previous Posts"

    // newsPosts[0] is not old so we start at newsPosts[1]
    for (var i = 1; i< newsPosts.length; i++) {
        populateOlderIssue(newsPosts[i])
        if (i > 10) {
            break
        }
    }

    post = document.createElement("li");
    post.innerHTML = `<a href="https://github.com/${repo}/labels/news">See all...</a>`
    olderIssuesList.appendChild(post);
}

function populateOlderIssue(newsPost) {
    var olderPosts = document.getElementById("olderIssuesList")

    post = document.createElement("li");
    post.innerHTML = `<a href="${newsPost.html_url}">${newsPost.title}</a>`
    olderPosts.appendChild(post);
}

// filterIssues will out issues that don't have a valid level or author
function filterIssues(posts) {
    var filteredPosts = []

    for (var i = 0; i < posts.length; i++) {
        if (doesIssueHaveValidLabel(posts[i]) && doesIssueHaveValidUser(posts[i])) {
            filteredPosts.push(posts[i])
        }
    }

    return filteredPosts
}

function doesIssueHaveValidLabel(post) {
    for (var i = 0; i < post.labels.length; i++) {
        console.log()
        if (labels.indexOf(post.labels[i].name) != -1) {
            return true
        }
    }

    return false
}

function doesIssueHaveValidUser(post) {
    if (users.indexOf(post.user.login) != -1) {
        return true
    }

    return false
}

showdown.extension('bootstrap-tables', {
	type: 'output',
	filter: (html) => {
		const regex = /<table>/g;
		return html.replace(regex, '<table class="table table-bordered">');
	},
});