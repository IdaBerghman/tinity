window.onload = () => {
    var SpConnect = new ConnectWithSP();
    SpConnect.connectionToSP();
 };

function home() {
    document.getElementById("profileSideBar").style.display = "none";
    document.getElementById("memberForm").style.display = "none";
    document.getElementById("startDiv").style.display = "block";
    document.getElementById("membersList").style.display = "none";
}
