function openProfile(id) {

    var div = document.getElementById(id);

    if (div.style.display === "block") {
        div.style.display = "none";
    }
    else {
        div.style.display = "block";
        showProfileSideBar();
    }
}

function showProfileSideBar() {
    document.getElementById("profileForm").style.display = "none";
    var user = _spPageContextInfo.userDisplayName;

    var SpConnect = new ConnectWithSP();
    SpConnect.connectionToSP();
    SpConnect.loadLists();
    SpConnect.context.load(SpConnect.listRowCollection);
    SpConnect.context.executeQueryAsync(onSuccess, onFail);

    function onSuccess() {
        getProfileList(SpConnect.listRowCollection, user);
    }

    function onFail() {
        alert("It did´t work out");
    }
}
function getProfileList(listItems, user) {

    var listEnumerator = listItems.getEnumerator();

    while (listEnumerator.moveNext()) {

        var currentItem = listEnumerator.get_current();
        var firstLastname = currentItem.get_item('Title') + " " + currentItem.get_item('lastname');

        if (firstLastname === user) {
            document.getElementById("addProfile").style.display = "none";
            document.getElementById('profile').style.display = "block";
            var nameId = currentItem.get_id();
            //  console.log(nameId);
            name(nameId);
        }
        if (firstLastname !== user) {
            document.getElementById("addProfile").style.display = "block";
        }
    }
}
function name(nameId) {
    var fillName = nameId;
    var SpConnect = new ConnectWithSP();

    SpConnect.connectionToSP();
    SpConnect.loadLists();
    SpConnect.loadListItem(fillName);
    SpConnect.context.load(SpConnect.listItem);
    SpConnect.context.load(SpConnect.listRowCollection);

    SpConnect.context.executeQueryAsync(onSuccess, onFail);

    function onSuccess() {

        var currentItem = SpConnect.listItem;

        document.getElementById("showProfileFirstname").innerHTML = currentItem.get_item('Title');
        document.getElementById("showProfileLastname").innerHTML = currentItem.get_item('lastname');
        document.getElementById("showProfileInstrument").innerHTML = currentItem.get_item('instrument');
        document.getElementById("showProfileBandname").innerHTML = currentItem.get_item('bandname');
        document.getElementById("showProfileGenre").innerHTML = currentItem.get_item('Genre');
        document.getElementById("ShowProfileActive").innerHTML = currentItem.get_item('Active');
        document.getElementById("showProfileCreatedDate").innerHTML = currentItem.get_item('createdDate').format("yyyy-MM-dd");
        document.getElementById("showProfileHiddenId").innerHTML = currentItem.get_id();
    }

    function onFail() {
        alert("ops, something went wrong");
    }
}

function showProfileForm() {
    document.getElementById("profileSideBar").style.display = "block";
    document.getElementById("profileForm").style.display = "block";
    document.getElementById("addProfile").style.display = "none";
    document.getElementById("profile").style.display = "none";
    document.getElementById("updateProfile").style.display = "none";
}

function cancelProfile() {
    document.getElementById("profile").style.display = "block";
    document.getElementById("profileForm").style.display = "none";
}


function addNewProfile(saveOrUpdate) {

    var profileFirstname = document.getElementById("profileFirstname").value;
    var profileLastname = document.getElementById("profileLastname").value;
    var profileInstrument = document.getElementById("profileInstrument").value;
    var profileBandname = document.getElementById("profileBandname").value;
    var profileGenre = document.getElementById("profileGenre").value;
    var profileActive = document.getElementById("profileActive").value;
    var profileCategory = document.getElementById("profileCategory").value;
    var profileCreatedNewDate = new Date().toLocaleDateString();

    var SpConnect = new ConnectWithSP();

    SpConnect.connectionToSP();
    SpConnect.loadLists();
    SpConnect.getUserName();

    var newItem;

    var creationInfo = new SP.ListItemCreationInformation();
    if (saveOrUpdate === 5) {

        newItem = SpConnect.list.addItem(creationInfo);
    }
    else if (saveOrUpdate === 6) {

        var updateItem = document.getElementById("showProfileHiddenId").innerHTML;
        //console.log(updateItem);
        newItem = SpConnect.list.getItemById(updateItem);
    }

    newItem.set_item("Title", profileFirstname);
    newItem.set_item("lastname", profileLastname);
    newItem.set_item("instrument", profileInstrument);
    newItem.set_item("bandname", profileBandname);
    newItem.set_item("Genre", profileGenre);
    newItem.set_item("Active", profileActive);
    newItem.set_item("category", profileCategory);
    newItem.set_item("createdDate", profileCreatedNewDate);
    newItem.update();
    SpConnect.context.load(SpConnect.listRowCollection);
    SpConnect.context.load(SpConnect.user);
    SpConnect.context.load(newItem);

    SpConnect.context.executeQueryAsync(onSuccess, onFail);

    function onSuccess() {

        let id = newItem.get_id();
        //     console.log(id);
        getProfileString(SpConnect.listRowCollection, id);
        document.getElementById("profile").style.display = "block";
        document.getElementById("profileForm").style.display = "none";
        document.getElementById("profileForm").style.display = "none";
    }
    // This function is executed if the above call fails 
    function onFail() {
        alert('Oooooh, now you did something wrong!');
    }
}


function getProfileString(listItems, id) {
    // console.log(id);

    var user = _spPageContextInfo.userDisplayName;
    var listEnumerator = listItems.getEnumerator();

    while (listEnumerator.moveNext()) {

        var currentItem = listEnumerator.get_current();
        var firstLastname = currentItem.get_item('Title') + " " + currentItem.get_item('lastname');

        if (firstLastname === user) {

            document.getElementById("profileSideBar").style.display = "block";
            document.getElementById("profile").style.display = "block";
            document.getElementById("addProfile").style.display = "none";
            document.getElementById("profileForm").style.display = "none";

            document.getElementById("showProfileFirstname").innerHTML = currentItem.get_item('Title');
            document.getElementById("showProfileLastname").innerHTML = currentItem.get_item('lastname');
            document.getElementById("showProfileInstrument").innerHTML = currentItem.get_item('instrument');
            document.getElementById("showProfileBandname").innerHTML = currentItem.get_item('bandname');
            document.getElementById("showProfileGenre").innerHTML = currentItem.get_item('Genre');
            document.getElementById("ShowProfileActive").innerHTML = currentItem.get_item('Active');
            document.getElementById("showProfileCreatedDate").innerHTML = currentItem.get_item('createdDate').format("yyyy-MM-dd");
            document.getElementById("showProfileHiddenId").innerHTML = currentItem.get_id();

        }
        else {
            document.getElementById("addProfile").style.display = "block";
        }
    }
}

function changeProfile(id) {

    var updateProfile = id.innerHTML;
    // console.log(updateProfile);

    document.getElementById("profile").style.display = "none";
    document.getElementById("profileForm").style.display = "block";
    document.getElementById("saveProfile").style.display = "none";
    document.getElementById("updateProfile").style.display = "block";

    var SpConnect = new ConnectWithSP();

    SpConnect.connectionToSP();
    SpConnect.loadLists();
    SpConnect.loadListItem(updateProfile);
    SpConnect.context.load(SpConnect.listItem);
    SpConnect.context.load(SpConnect.listRowCollection);

    SpConnect.context.executeQueryAsync(onSuccess, onFail);

    function onSuccess() {

        var currentItem = SpConnect.listItem;

        document.getElementById("profileFirstname").value = currentItem.get_item('Title');
        document.getElementById("profileLastname").value = currentItem.get_item('lastname');
        document.getElementById("profileInstrument").value = currentItem.get_item('instrument');
        document.getElementById("profileBandname").value = currentItem.get_item('bandname');
        document.getElementById("profileGenre").value = currentItem.get_item('Genre');
        document.getElementById("profileActive").value = currentItem.get_item('Active');
        document.getElementById("profileCategory").value = currentItem.get_item('category');
        // document.getElementById("createdDate").value = currentItem.get_item('createdDate').format("yyyy-MM-dd");
        document.getElementById("profileHiddenId").value = currentItem.get_id();
    }

    function onFail() {
        alert("ops, something went wrong");
    }
}

