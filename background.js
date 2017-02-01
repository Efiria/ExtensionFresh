
var xmlhttp

var clientId = "1819lz8579lfugj2y2nfcf2ftwugwai"
var userID = "ifresh_hd"

var Rnotif = false

startenxtion()

function stream(onAir) {
    if(onAir["stream"] === null) {
        chrome.browserAction.setIcon({path:"icon_off.png"})
        chrome.browserAction.setTitle({title:"Je suis en pause"})
        if(Rnotif == true)
        {
          Rnotif == false
        }
    }
    else
    {
        chrome.browserAction.setIcon({path:"icon_on.png"})
        chrome.browserAction.setTitle({title:"Aller viens !"})
        if(Rnotif == false)
        {
            doNotification()
            Rnotif = true
        }
    }
}

function getXMLDoc(url,retour)
{
    xmlhttp=new XMLHttpRequest()

    xmlhttp.onreadystatechange=retour;
    xmlhttp.open("GET",url,true);
    xmlhttp.send();

}

function startenxtion()
{
  getXMLDoc("https://api.twitch.tv/kraken/streams/"+userID+"?client_id="+clientId,function()
    {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          var myArr = JSON.parse(xmlhttp.responseText);
          stream(myArr)
        }
    })
}

chrome.browserAction.onClicked.addListener(function() {
  
  var newURL = "https://www.twitch.tv/"+userID;
  chrome.tabs.create({ url: newURL });
  
});

function doNotification() {
    chrome.notifications.create({ 
        type: "basic", 
        title: "Hey !", 
        message: "Je suis actuellement en live sur viens me rejoindre sur twitch en cliquant sur ma tête en haut à droite", 
        iconUrl: "img/icon_128.png" 
    }, function(id) { });
}

setInterval(startenxtion,40000);
startenxtion();