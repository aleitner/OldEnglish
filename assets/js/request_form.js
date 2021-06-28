var urlIDs = [0]

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
        "tags": [],
        "desc" : ""
    }

    var title = document.getElementById("title").value;
    var authors = document.getElementById("authors").value;
    var date = document.getElementById("date").value;
    var type = document.getElementById("resource_type").value;
    var tags = document.getElementById("tags").value;
    var desc = document.getElementById("desc").value;

    for(var i = 0; i < urlIDs.length; i++) {
        var urlName = document.getElementById("urlName" + urlIDs[i]).value;
        var url = document.getElementById("url" + urlIDs[i]).value;

        if (!isEmpty(urlName) && !isEmpty(url)) {
            resource.hyperlinks = {...resource.hyperlinks, [urlName]: url}
        }
    }

    if (isEmpty(title)) {
        alert("Please specify a title")
        return
    }

    resource.title = title
    resource.date = date
    resource.type = type
    resource.desc = desc
    
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

    var url = buildURL(resource)

    window.open(url, '_blank')
}

function buildURL(resource) {
    var body = JSON.stringify(resource)
    return encodeURI(`https://github.com/aleitner/OldEnglish/issues/new?title=New+Resource+Proposal&body=${body}`)
}

function removeURL(num) {
    if (urlIDs.length <= 1) {
        return 
    }

    document.getElementById("urlDiv" + num).remove();

    var index = urlIDs.indexOf(num);
    if (index > -1) {
        urlIDs.splice(index, 1);
    }
}

function addURL() {
    var lastDiv = document.getElementById("urlDiv" + urlIDs[urlIDs.length - 1])

    var newId = newIntNotInArray(urlIDs)

    var newDiv = document.createElement("div");
    newDiv.id = "urlDiv" + newId
    newDiv.className = "form-group"

    var label = document.createElement("label");
    label.htmlFor = "urls"
    label.innerHTML = "URL"
    newDiv.appendChild(label);

    var urlName = document.createElement("input");
    urlName.type = "text"
    urlName.className = "form-control"
    urlName.id = "urlName" + newId
    urlName.placeholder = "amazon"
    newDiv.appendChild(urlName);

    var url = document.createElement("input");
    url.type = "url"
    url.className = "form-control"
    url.id = "url" + newId
    url.placeholder = "https://amazon.com/bp/coolBook"
    newDiv.appendChild(url);

    var closeButton = document.createElement("button");
    closeButton.type = "button"
    closeButton.className = "btn-close close"
    closeButton.id = "deleteURL" + newId
    closeButton.ariaLabel = "Close"
    closeButton.setAttribute( "onClick", `removeURL(${newId})` ) 
    newDiv.appendChild(closeButton);

    lastDiv.parentNode.insertBefore(newDiv, lastDiv.nextSibling);

    urlIDs.push(newId)
}

function itemIsInArray(item, arr) {
    return arr.indexOf(item) !== -1
}

function newIntNotInArray(arr) {
    var i = 0;
    while (itemIsInArray(i, arr)) {
        i++
    }

    return i
}