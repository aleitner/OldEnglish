var urlIDs = [0]
var resources = [];

// clearResourceForm will remove all data from the form fields
function clearResourceForm() {
    document.getElementById("title").value = "";
    document.getElementById("authors").value = "";
    document.getElementById("date").value = "";
    document.getElementById("resource_type").value = "Book";
    document.getElementById("tags").value = "";
    document.getElementById("desc").value = "";

    for(var i = 0; i < urlIDs.length; i++) {
        if (i == 0) {
            document.getElementById("urlName" + urlIDs[i]).value = "";
            document.getElementById("url" + urlIDs[i]).value = "";
        } else {
            document.getElementById("urlName" + urlIDs[i]).remove()
            document.getElementById("url" + urlIDs[i]).remove()
            document.getElementById("deleteURL" + urlIDs[i]).remove()
        }
    }

    urlIDs = [0]
}

//clearResources will clear all resources from the form
function clearResources() {
    if (!confirm("Are you sure you want to clear the resources?")) {
      return
    }

    clearResourceForm()
    resources = []

    document.getElementById("resources").innerHTML = ""
}

// addResource will add resource to array of resources
function addResource() {
    // Get current resource
    let resource = getResourceFromPage()
    if (resource == null) {
        alert("Please specify a title")
        return
    }

    // push resource to array
    resources.push(resource)
    document.getElementById("resources").innerHTML += `{${resource.title}} `

    // clear out the form fields
    clearResourceForm()
}

// getResourceFromPage will read the form fields and create a json object
function getResourceFromPage() {
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

    if (isEmpty(title)) {
        return null
    }

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

    return resource
}

// getAllResources will get current resource 
// along with the already existing array of previously added resources
function getAllResources() {
    allResources = []
    for (var i = 0; i < resources.length; i++) {
        allResources.push(resources[i])
    }

    var resource = getResourceFromPage()
    if (resource != null) {
        allResources.push(resource)
    }

    return allResources
}

// submitResource will open a URL to submit resources as an issue.
function submitResource() {
    allResources = getAllResources()

    if (allResources.length == 0) {
        alert("Please specify a resource")
        return
    }

    var url = buildURL(allResources)

    console.log(url)
    window.open(url, '_blank')
}

// copyResource will copy all resources to clipboard
function copyResource() {

    allResources = JSON.stringify(getAllResources())
    var trimmedResources = allResources.substring(1, allResources.length-1);

    var el = document.createElement('textarea')
    el.style.value = "hidden"
    el.value = trimmedResources
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

    alert("Copied to clipboard!")
}

// buildURL will build a url to create an issue with resources JSON object as the description
function buildURL(resource) {
    var body = JSON.stringify(resource)

    // We remove the [] from the ends
    var trimmedBody = body.substring(1, body.length-1);

    return encodeURI(`https://github.com/aleitner/OldEnglish/issues/new?title=New+Resource+Proposal&body=${trimmedBody}`)
}

// removeURL will remove one of the URL fields
function removeURL(num) {
    if (urlIDs.length <= 1) {
        return 
    }

    document.getElementById("urlDiv" + num).remove();

    var index = urlIDs.indexOf(num);
    if (index > -1) {
        urlIDs.splice(index, 1);
    }

    if (urlIDs.length < 5) {
        document.getElementById("addButton").disabled = false
    }
}

// addURL will add a new URL field
function addURL() {
    var lastDiv = document.getElementById("urlDiv" + urlIDs[urlIDs.length - 1])

    var newId = newIntNotInArray(urlIDs)

    var newURLDiv = document.createElement("div");
    newURLDiv.id = "urlDiv" + newId
    newURLDiv.className = "form-group row"

    // Close Button Column Div
    closeButtonDiv = document.createElement("div");
    closeButtonDiv.className = "col-sm-2"
    newURLDiv.appendChild(closeButtonDiv);

    // Close button
    var closeButton = document.createElement("button");
    closeButton.type = "button"
    closeButton.className = "btn-close close"
    closeButton.id = "deleteURL" + newId
    closeButton.ariaLabel = "Close"
    closeButton.setAttribute( "onClick", `removeURL(${newId})` ) 
    closeButtonDiv.appendChild(closeButton);

    // Url Name Column Div
    urlNameColumnDiv = document.createElement("div");
    urlNameColumnDiv.className = "col-sm-2"
    newURLDiv.appendChild(urlNameColumnDiv);

    // URL Name
    var urlName = document.createElement("input");
    urlName.type = "text"
    urlName.className = "form-control"
    urlName.id = "urlName" + newId
    urlName.placeholder = "amazon"
    urlNameColumnDiv.appendChild(urlName);

    // Url string Column Div
    urlColumnDiv = document.createElement("div");
    urlColumnDiv.className = "col-sm-6"
    newURLDiv.appendChild(urlColumnDiv);

    // URL string
    var url = document.createElement("input");
    url.type = "url"
    url.className = "form-control"
    url.id = "url" + newId
    url.placeholder = "https://amazon.com/bp/coolBook"
    urlColumnDiv.appendChild(url);

    lastDiv.parentNode.insertBefore(newURLDiv, lastDiv.nextSibling);

    urlIDs.push(newId)

    if (urlIDs.length >= 5) {
        document.getElementById("addButton").disabled = true
    }
}

// isEmpty checks if a string is empty
function isEmpty(str) {
    return (!str || str.length === 0 );
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