function addMembers() {
    document.getElementById("memberForm").style.display = "block";
    document.getElementById("startDiv").style.display = "none";
    document.getElementById("membersList").style.display = "none";
    document.getElementById("updateMem").style.display = "none";
    document.getElementById("profileSideBar").style.display = "none";
    document.getElementById("saveMem").style.display = "block";
    clearInputs();
}
function cancel() {
    clearInputs();
    document.getElementById("startDiv").style.display = "block";
    document.getElementById("membersList").style.display = "none";
    document.getElementById("memberForm").style.display = "none";
}
function addNew(saveOrUpdate) {

    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var instrument = document.getElementById("instrument").value;
    var bandname = document.getElementById("bandname").value;
    var genre = document.getElementById("genre").value;
    var active = document.getElementById("active").value;
    var category = document.getElementById("category").value;
    var createdNewDate = new Date().toLocaleDateString();

    var SpConnect = new ConnectWithSP();

    SpConnect.connectionToSP();
    SpConnect.loadLists();
    SpConnect.getUserName();

    var newItem;

    var creationInfo = new SP.ListItemCreationInformation();
    if (saveOrUpdate === 1) {

        newItem = SpConnect.list.addItem(creationInfo);
    }
    else if (saveOrUpdate === 2) {

        var updateItem = parseInt(document.getElementById("hiddenId").value);
        //   console.log(updateItem);
        newItem = SpConnect.list.getItemById(updateItem);
    }

    newItem.set_item("Title", firstname);
    newItem.set_item("lastname", lastname);
    newItem.set_item("instrument", instrument);
    newItem.set_item("bandname", bandname);
    newItem.set_item("Genre", genre);
    newItem.set_item("Active", active);
    newItem.set_item("category", category);
    newItem.set_item("createdDate", createdNewDate);
    newItem.update();
    SpConnect.context.load(SpConnect.listRowCollection);
    SpConnect.context.load(SpConnect.user);
    SpConnect.context.load(newItem);

    SpConnect.context.executeQueryAsync(onSuccess, onFail);

    function onSuccess() {
        for (var i = document.getElementById("membersList").rows.length; i > 1; i--)
            document.getElementById("membersList").deleteRow(i - 1);
      //  document.getElementById("membersList").style.display = "none";
        let id = newItem.get_id();
        //console.log(id);
        getString(SpConnect.listRowCollection, SpConnect.user);
        document.getElementById("hiddenId").value = id;

      
    }

    // This function is executed if the above call fails
    function onFail() {
        alert('ops, something went terrible wrong');
    }
    document.getElementById("memberForm").style.display = "none";
    document.getElementById("startDiv").style.display = "block";
    document.getElementById("membersList").style.display = "block";
}


function getString(listItems, userName) {
   
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
        // Create an empty <tr> element and add it to the 1st position of the table:
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
        cell5.innerHTML = currentItem.get_item('Genre');
        cell6.innerHTML = activeIcon;
        cell7.hidden = currentItem.get_item('category');
        cell8.innerHTML = currentItem.get_item('createdDate').format("yyyy-MM-dd");
        cell9.hidden = currentItem.get_id();
        cell10.innerHTML = "<div><button type='button' class='btn btn-primary buttonStyle' id='tableButton'onclick='deleteMember(" + currentItem.get_id() + ")' data - toggle='modal' data - target='#exampleModal'>Delete</button></div><div><button type='button' class='btn btn-primary buttonStyle' id='tableButton'  onclick='changeMember(" + currentItem.get_id() + ")' data - toggle='modal' data - target='#exampleModal'>Edit</button></div>";
    }
}

function changeMember(id) {
    // console.log(id);
    document.getElementById("membersList").style.display = "none";
    document.getElementById("saveMem").style.display = "none";
    document.getElementById("updateMem").style.display = "block";

    var SpConnect = new ConnectWithSP();

    SpConnect.connectionToSP();
    SpConnect.getUserName();
    SpConnect.loadListItem(id);
    SpConnect.context.load(SpConnect.listItem);
    SpConnect.context.load(SpConnect.user);

    SpConnect.context.executeQueryAsync(onSuccess, onFail);

    function onSuccess() {

        document.getElementById("memberForm").style.display = "block";
        var currentItem = SpConnect.listItem;

        document.getElementById("firstname").value = currentItem.get_item('Title');
        document.getElementById("lastname").value = currentItem.get_item('lastname');
        document.getElementById("instrument").value = currentItem.get_item('instrument');
        document.getElementById("bandname").value = currentItem.get_item('bandname');
        document.getElementById("genre").value = currentItem.get_item('Genre');
        document.getElementById("active").value = currentItem.get_item('Active');
        document.getElementById("category").value = currentItem.get_item('category');
        //   document.getElementById("createdDate").value = currentItem.get_item('createdDate').format("yyyy-MM-dd");
        document.getElementById("hiddenId").value = currentItem.get_id();
    }

    function onFail() {
        alert("ops, something went wrong");
    }
    document.getElementById("memberForm").style.display = "none";
}

function deleteMember(id) {
    //  console.log(id);
    var SpConnect = new ConnectWithSP();

    SpConnect.connectionToSP();
    SpConnect.loadLists();
    SpConnect.loadListItem(id);
    SpConnect.getUserName();

   // var deleteItem1 = parseInt(document.getElementById("hiddenId").value);
    //console.log(deleteItem1);
    var deleteItem = id;
    var itemToDelete = SpConnect.list.getItemById(deleteItem);

    itemToDelete.deleteObject();
    SpConnect.context.load(SpConnect.listRowCollection);
    SpConnect.context.load(SpConnect.user);
    SpConnect.context.executeQueryAsync(onSuccessMember, onFailMember);

    function onSuccessMember() {

        for (var i = document.getElementById("membersList").rows.length; i > 1; i--)
            document.getElementById("membersList").deleteRow(i - 1);

        getString(SpConnect.listRowCollection, SpConnect.user);
        document.getElementById("membersList").style.display = "block";
    }

    function onFailMember() {
        alert("aawww, bummer, something went totally crazy!");
    }
}

function clearInputs() {
    var inputElements = document.getElementsByTagName("input");
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].type === 'text') {
            inputElements[i].value = '';
        }
    }
}