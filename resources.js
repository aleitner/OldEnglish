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

        var titleCell = row.insertCell(0);
        var authorsCell = row.insertCell(1);
        var hyperlinksCell = row.insertCell(2);
        var dateCell = row.insertCell(3);
        var typeCell = row.insertCell(4);

        titleCell.innerHTML = resource.title;
        dateCell.innerHTML = resource.date;
        typeCell.innerHTML = resource.type;
        
        // Set Authors
        var authors = ""
        for(var k = 0; k < resource.authors.length; k++) {
            authors = `${authors} ${resource.authors[k]},`
        }

        // Remove ending comma
        authors = authors.slice(0, -1)

        authorsCell.innerHTML = authors;

        // Set Hyperlinks
        var urls = ""
        for (const [key, value] of Object.entries(resource.hyperlinks)) {
            urls = `${urls} <a href="${value}">${key}</a>` 
        }

        hyperlinksCell.innerHTML = urls 
    }
}