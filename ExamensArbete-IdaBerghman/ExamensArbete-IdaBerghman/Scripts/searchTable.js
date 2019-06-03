function getSearchData() {
    document.getElementById("profileSideBar").style.display = "none";
    document.getElementById("memberForm").style.display = "none";

    var SpConnect = new ConnectWithSP();
    SpConnect.connectionToSP();
    SpConnect.loadLists();
    SpConnect.getUserName();

    var viewData = document.getElementById('options').value;

    if (viewData === "All") {
        for (var iw = document.getElementById("membersList").rows.length; iw > 1; iw--)
            document.getElementById("membersList").deleteRow(iw - 1);
        document.getElementById("membersList").style.display = "block";
    }

    if (viewData === "Member") {

        for (var i = document.getElementById("membersList").rows.length; i > 1; i--)
            document.getElementById("membersList").deleteRow(i - 1);

        var selectedValue = document.getElementById("searchText").value;
        var selectedOption = document.getElementById("options").value;
        var camlQuery = new SP.CamlQuery();

        var query = "<View><Query><Where><And><Contains><FieldRef Name='Title'/><Value Type='Text'>" + selectedValue + "</Value></Contains><Contains><FieldRef Name='category'/><Value Type='Text'>" + selectedOption + "</Value></Contains></And></Where></Query></View>";

        camlQuery.set_viewXml(query);

        SpConnect.listRowCollection = SpConnect.hostContext.get_web().get_lists().getByTitle("Members").getItems(camlQuery);

        document.getElementById("membersList").style.display = "block";
    }

    getAllListItems();


    function getAllListItems() {

        SpConnect.context.load(SpConnect.listRowCollection);
        SpConnect.context.load(SpConnect.user);

        SpConnect.context.executeQueryAsync(onSuccess, onFail);

        function onSuccess() {
            //  console.log("success");
            getMemberList(SpConnect.listRowCollection, SpConnect.user);
        }

        function onFail() {
            //  console.log("fail");
            alert("It did´t work out");
        }

    }
}
function getMemberList(listItems, userName) {

    var listEnumerator = listItems.getEnumerator();
    // Find a <table> element with id="myTable":
    var table = document.getElementById("membersList");

    while (listEnumerator.moveNext()) {

        var currentItem = listEnumerator.get_current();

        if (currentItem.get_item('Active') === "Yes") {
            var activeIcon = "<i class='far fa-check-circle'></i>";
        }
        else if (currentItem.get_item('Active') === "No") {
            activeIcon = "<i class='far fa-times-circle'></i>";
        }
        var row = table.insertRow(1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);


        cell1.innerHTML = currentItem.get_item('Title');
        cell2.innerHTML = currentItem.get_item('lastname');
        cell3.innerHTML = currentItem.get_item('instrument');
        cell4.innerHTML = currentItem.get_item('bandname');
        cell5.innerHTML = activeIcon;
        cell6.innerHTML = currentItem.get_item('createdDate').format("yyyy-MM-dd");
        cell7.innerHTML = currentItem.get_item('Genre');
        cell8.hidden = currentItem.get_item('category');
        cell9.hidden = currentItem.get_id();
        cell10.innerHTML = "<div><button type='button' class='btn tableButton divStyle' onclick='deleteMember(" + currentItem.get_id() + ")' data - toggle='modal' data - target='#exampleModal'>Delete</button></div><div><button type = 'button' class='btn tableButton divStyle' onclick = 'changeMember(" + currentItem.get_id() + ")' data - toggle='modal' data - target='#exampleModal'>Edit</button></div>";
    }
}

function sortTable(sortName) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("membersList");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            if (sortName === 3) {
                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];
                /* Check if the two rows should switch place,
               * based on the direction, asc or desc: */
                if (dir === "asc") {
                    if (x.innerHTML > y.innerHTML) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML < y.innerHTML) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            else if (sortName === 4) {
                x = rows[i].getElementsByTagName("TD")[3];
                y = rows[i + 1].getElementsByTagName("TD")[3];
                /* Check if the two rows should switch place,
               * based on the direction, asc or desc: */
                if (dir === "asc") {
                    if (x.innerHTML > y.innerHTML) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML < y.innerHTML) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
