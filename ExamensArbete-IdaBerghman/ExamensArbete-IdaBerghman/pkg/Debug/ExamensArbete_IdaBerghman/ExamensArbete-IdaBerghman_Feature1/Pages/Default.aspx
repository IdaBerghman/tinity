<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
    <!-- datatables.net file-->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.18/kt-2.5.0/r-2.2.2/sl-1.2.6/datatables.min.css" />
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.18/kt-2.5.0/r-2.2.2/sl-1.2.6/datatables.min.js"></script>


    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript" src="../Scripts/connectSP.js"></script>
    <script type="text/javascript" src="../Scripts/memberForm.js"></script>
    <script type="text/javascript" src="../Scripts/searchTable.js"></script>
    <script type="text/javascript" src="../Scripts/Profile.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Tinity music
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="containerDiv">
        <div class="topHeader">
            <i onclick="openProfile('profileSideBar')" class="fas fa-align-justify hamburger" id="hamburger"></i>
            <div id="profileSideBar">
                <button type="button" onclick="showProfileForm()" id="addProfile" class="btn buttonStyle">Add new profile</button>
                <div id="profile">
                    <p>Welcome </p>
                    <div class="profileName">                        
                        <span id="showProfileFirstname"> </span></>
                       <span id="showProfileLastname"> </span>
                    </div>
                    <h6>Instrument:</h6>
                    <p id="showProfileInstrument"></p>
                    <h6>Bandname:</h6>
                    <p id="showProfileBandname"></p>
                    <h6>Genre:</h6>
                    <p id="showProfileGenre"></p>
                    <h6>Active:</h6>
                    <p id="ShowProfileActive"></p>
                    <h6>Created:</h6>
                    <p id="showProfileCreatedDate"></p>
                    <p hidden id="showProfileCategory"></p>
                    <p hidden id="showProfileHiddenId"></p>
                    <button type="button" onclick="changeProfile(showProfileHiddenId)" id="editprofile" class="btn buttonStyle">Edit</button>
                </div>
                <div class="profileForm" id="profileForm">
                    <form class="addMembersForm">
                        <div class="form-group formStyle">
                            <label for="inputFirstName">Firstname</label>
                            <input type="text" class="form-control" id="profileFirstname" placeholder="Firstname" />
                        </div>
                        <div class="form-group formStyle">
                            <label for="inputLastName">Lastname</label>
                            <input type="text" class="form-control" id="profileLastname" placeholder="Lastname" />
                        </div>
                        <div>
                            <label for="inputInstrument">Instrument</label>
                            <select id="profileInstrument">
                                <option value="guitar">Guitar</option>
                                <option value="singing">Singing</option>
                                <option value="keyboard">Keyboard</option>
                                <option value="bass">Bass</option>
                                <option value="choir">Choir</option>
                                <option value="string">String</option>
                                <option value="drums">Drums</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group formStyle">
                            <label for="inputbandName">Bandname</label>
                            <input type="text" class="form-control" id="profileBandname" placeholder="Bandname" />
                        </div>
                        <div class="form-group formStyle">
                            <label for="inputGenre">Genre</label>
                            <input type="text" class="form-control" id="profileGenre" placeholder="Genre" />
                        </div>
                        <div>
                            <label for="inputActive">Active</label>
                            <select id="profileActive">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div class="hidden">
                            <input type="hidden" value="user" id="profileCategory" />
                        </div>
                        <div class="hidden">
                            <input type="hidden" id="profileHiddenId" />
                        </div>
                        <div class="buttons">
                            <button type="button" onclick="addNewProfile(6)" id="updateProfile" class="btn buttonStyle">Update</button>
                            <button type="button" onclick="addNewProfile(5)" id="saveProfile" class="btn buttonStyle">Save</button>
                            <button type="button" onclick="cancelProfile()" class="btn buttonStyle">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="navlinks">
                <button type="button" onclick="home()" class="buttonStyle">Home</button>
                |
                 <button type="button" onclick="addMembers()" class="buttonStyle">Add member</button>
            </div>

            <div id="startDiv">
                <div class="searchDiv">
                    <input type="text" name="search" id="searchText" placeholder="search name..." />
                    <select id="options" class="dropdownStyle">
                        <option value="All">All</option>
                        <option value="Member">Member</option>
                    </select>
                    <button type="button" class="searchButton" onclick="getSearchData()">Search</button>
                </div>
            </div>
            <div>
                <!--MembersList-->
                <div class="row justify-content-center">
                    <table class="table table-dark table-hover" id="membersList">
                        <tr>
                            <th class="nameSort" onclick="sortTable(3)">Firstname <i class="fa fa-sort float-right" aria-hidden="true"></i></th>
                            <th>Lastname</th>
                            <th>Instrument</th>
                            <th class="nameSort" onclick="sortTable(4)">Bandname <i class="fa fa-sort float-right" aria-hidden="true"></i></th>
                            <th>Active</th>
                            <th>Created</th>
                            <th>Genre</th>
                            <th hidden>Category</th>
                            <th hidden>Id</th>
                            <th></th>
                        </tr>
                    </table>
                </div>
                <!--MemberForm-->
                <div class="memberForm" id="memberForm">
                    <form class="addMembersForm">
                        <div class="form-group formStyle">
                            <label for="inputFirstName">Firstname</label>
                            <input type="text" class="form-control" id="firstname" placeholder="Firstname" />
                        </div>
                        <div class="form-group formStyle">
                            <label for="inputLastName">Lastname</label>
                            <input type="text" class="form-control" id="lastname" placeholder="Lastname" />
                        </div>
                        <div>
                            <label for="inputInstrument">Instrument</label>
                            <select id="instrument">
                                <option value="guitar">Guitar</option>
                                <option value="singing">Singing</option>
                                <option value="keyboard">Keyboard</option>
                                <option value="bass">Bass</option>
                                <option value="choir">Choir</option>
                                <option value="strings">Strings</option>
                                <option value="drums">Drums</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group formStyle">
                            <label for="inputbandName">Bandname</label>
                            <input type="text" class="form-control" id="bandname" placeholder="Bandname" />
                        </div>
                        <div class="form-group formStyle">
                            <label for="inputGenre">Genre</label>
                            <input type="text" class="form-control" id="genre" placeholder="Genre" />
                        </div>
                        <div>
                            <label for="inputActive">Active</label>
                            <select id="active">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div class="hidden">
                            <input type="hidden" value="Member" id="category" />
                        </div>
                        <div class="hidden">
                            <input type="hidden" id="hiddenId" />
                        </div>
                        <div class="buttons">
                            <button type="button" onclick="addNew(1)" id="saveMem" class="btn buttonStyle">Save</button>
                            <button type="button" onclick="addNew(2)" id="updateMem" class="btn buttonStyle">Update</button>
                            <button type="button" onclick="cancel()" class="btn buttonStyle">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
