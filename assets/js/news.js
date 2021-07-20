var labels = ['news']
var users = ['aleitner']
var repo = "aleitner/OldEnglish"

function loadBlogposts() {
    var newsPosts = getPosts()

    if (newsPosts.length > 0) {
        var comments = getCommentsForPost(newsPosts[0].number)
        populateRecent(newsPosts[0])
        populateOldPostsList(newsPosts)

        if (comments.length > 0) {
            populateComments(comments)
        }
    }
}

function getPosts() {
    var resp = httpGet(`https://api.github.com/repos/${repo}/issues`)
    respAsJSON = JSON.parse(resp)
    return filterPosts(respAsJSON)
}

function getCommentsForPost(issue_number) {
    var resp = httpGet(`https://api.github.com/repos/${repo}/issues/${issue_number}/comments`)
    return JSON.parse(resp)
}

function populateComments(comments) {
    var commentsDiv = document.getElementById("comments")
    for(var i = 0; i < comments.length; i++) {
        var comment = comments[i]
        var date = `<em><font size="-1">${comment.created_at.slice(0,10)}</font></em>`
        var author = `<a href="${comment.user.html_url}">${comment.user.login}</a>`
        var body = htmlify(comment.body)

        post = document.createElement("p");
        post.innerHTML = `<b>${author}</b> ${date} <br />${htmlify(body)}<br /><br />`
        commentsDiv.appendChild(post);
    }
}

function commentButton(postID) {
    var url = `http://github.com/${repo}/issues/${postID}`
    window.open(url, '_blank')
}

function populateOldPostsList(newsPosts) {
    var olderPostsList = document.getElementById("olderPostsList")
    // Clear the old posts
    olderPostsList.innerHTML = ""

    var olderPostsTitle = document.getElementById("olderPostsTitle")
    olderPostsTitle.innerHTML = "Previous Posts"

    // newsPosts[0] is not old so we start at newsPosts[1]
    for (var i = 1; i< newsPosts.length; i++) {
        populateOldPost(newsPosts[i])
        if (i > 10) {
            break
        }
    }

    post = document.createElement("li");
    post.innerHTML = `<a href="https://github.com/aleitner/OldEnglish/labels/news">See all...</a>`
    olderPostsList.appendChild(post);
}

function populateOldPost(newsPost) {
    var olderPosts = document.getElementById("olderPostsList")

    post = document.createElement("li");
    post.innerHTML = `<a href="${newsPost.html_url}">${newsPost.title}</a>`
    olderPosts.appendChild(post);
}

function populateRecent(newsPost) {
    var postTitle = document.getElementById("postTitle")
    postTitle.innerHTML = `<a href="${newsPost.html_url}">${newsPost.title}</a>`

    var postMeta = document.getElementById("postMeta")
    var date = `<em><font size="-1">Posted on ${newsPost.created_at.slice(0,10)}</font></em>`
    var author = `<em><font size="-1">By <a href="${newsPost.user.html_url}">${newsPost.user.login}</a></font></em>`
    postMeta.innerHTML = date + " " + author

    var postBody = document.getElementById("postBody")
    postBody.innerHTML = htmlify(newsPost.body)

    var commentButtonDiv = document.getElementById("commentButton")
    commentButtonDiv.innerHTML = ""
    var commentButton = document.createElement("button");
    commentButton.type = "button"
    commentButton.className = "btn btn-primary"
    commentButton.setAttribute( "onClick", `commentButton(${newsPost.number})` ) 
    commentButton.innerText = "Comment"
    commentButtonDiv.appendChild(commentButton);

}

function htmlify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    replacePattern4 = /\r?\n/gim;
    replacedText = replacedText.replace(replacePattern4, '<br />');

    return replacedText;
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
