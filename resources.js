// Filter table
$(document).ready(function(){
    $("#tableSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function isEmpty(str) {
    return (!str || str.length === 0 );
}

function loadResources() {
    var table = document.getElementById("myTable");

    for(var i = 0; i < resources_json.length; i++) {
        var resource = resources_json[i];

        var row = table.insertRow(i);

        var title = row.insertCell(0);
        var author = row.insertCell(1);
        var url = row.insertCell(2);
        var date = row.insertCell(3);
        var type = row.insertCell(4);

        title.innerHTML = resource.title;
        author.innerHTML = resource.author;
        date.innerHTML = resource.date;
        type.innerHTML = resource.type;

        var urls = ""
        for (const [key, value] of Object.entries(resource.free)) {
            urls = `${urls} <a href="${value}">${key}</a>` 
        }

        var urls = ""
        for (const [key, value] of Object.entries(resource.purchase)) {
            urls = `${urls} <a href="${value}">${key}</a>` 
        }

        if (!isEmpty(resource.url)) {
            urls = `${urls} <a href="${resource.url}">Link</a>` 
        }

        url.innerHTML = urls 
    }
}