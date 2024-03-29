function isEmpty(str) {
    return (!str || str.length === 0 );
}

function loadResources() {
    var table = document.getElementById("resourcesTableBody");

    var rowIndex = 0;
    for(var i = 0; i < resources_json.length; i++) {
        var resource = resources_json[i];

        if (isEmpty(resource.title)) {
            continue
        }

        var row = table.insertRow(rowIndex);

        var titleCell = row.insertCell(0);
        var authorsCell = row.insertCell(1);
        var hyperlinksCell = row.insertCell(2);
        var dateCell = row.insertCell(3);
        var typeCell = row.insertCell(4);
        var tagsCell = row.insertCell(5);

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
            urls = `${urls} <a target="_blank" rel="noopener noreferrer" href="${value}">${key}</a>,` 
        }

        // Remove ending comma
        urls = urls.slice(0, -1)

        hyperlinksCell.innerHTML = urls 

        var tags = ""
        for(var j = 0; j < resource.tags.length; j++) {
            tags = `${tags} ${resource.tags[j]},`
        }

        // Remove ending comma
        tags = tags.slice(0, -1)

        tagsCell.innerHTML = tags

        rowIndex++
    }

    // We want to load this after we populate the table
    $('#resourcesTable').DataTable({
        scrollY:        "300px",
        scrollX:        true,
        scrollCollapse: true,
        columnDefs: [
            { width: '20%', targets: 0 }
        ],
        fixedColumns: true
    });

    new $.fn.dataTable.FixedHeader( table );
}