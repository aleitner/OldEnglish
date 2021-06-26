function isEmpty(str) {
    return (!str || str.length === 0 );
}

function submitResource() {
    var resource = {
        "title" : "",
        "authors": [],
        "date": "",
        "type" : "",
        "hyperlinks": {},
        "tags": []
    }

    var title = document.getElementById("title").value;
    var authors = document.getElementById("authors").value;
    var date = document.getElementById("date").value;
    var type = document.getElementById("resource_type").value;
    var urlName = document.getElementById("urlName").value;
    var url = document.getElementById("url").value;
    var tags = document.getElementById("tags").value;
    var desc = document.getElementById("desc").value;

    if (isEmpty(title)) {
        alert("Please specify a title")
        return
    }

    resource.title = title
    resource.date = date
    resource.type = type

    if (!isEmpty(urlName) && !isEmpty(url)) {
        resource.hyperlinks = {[urlName]: url}
    }
    
    if (!isEmpty(authors)) {
        resource.authors = authors.split(',').map(function(item) {
            return item.trim()
        });
    }

    if (!isEmpty(tags)) {
        resource.tags = tags.split(',').map(function(item) {
            return item.trim()
        });
    }

    var url = buildURL(resource, desc)

    window.open(url, '_blank')
}

function buildURL(resource, desc) {
    var body = JSON.stringify(resource)
    return encodeURI(`https://github.com/aleitner/OldEnglish/issues/new?title=New+Resource+Proposal&body=${body}+${desc}`)
}