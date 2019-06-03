class ConnectWithSP {

    constructor() {
        this.context;
        this.hostContext;
        this.listRowCollection;
        this.list;
        this.user;
        this.listItem;
    }

    connectionToSP() {
        this.context = new SP.ClientContext.get_current();
        let hostUrl = decodeURIComponent(this.getQueryStringParameter("SPHostUrl"));
        this.hostContext = new SP.AppContextSite(this.context, hostUrl);
    }

    loadLists() {
        this.listRowCollection = this.hostContext.get_web().get_lists().getByTitle("Members").getItems("");
        this.list = this.hostContext.get_web().get_lists().getByTitle("Members");
    }
   
    loadListItem(id) {
        this.list = this.hostContext.get_web().get_lists().getByTitle("Members");
        this.listItem = this.list.getItemById(id);
    }
    
    getUserName() {
        this.user = this.context.get_web().get_currentUser();

        this.context.load(this.user);
    }
    //Funktion för att ta fram ett värde 
    getQueryStringParameter(paramToRetrieve) {
        var params =
            document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] === paramToRetrieve)
                return singleParam[1];
        }
    }
}
