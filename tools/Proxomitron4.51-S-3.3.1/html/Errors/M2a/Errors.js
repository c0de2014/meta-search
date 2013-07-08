
/* JavaScript für Proxomitron-Fehlermeldungen */


/* Übersetzung der Fehlermeldungen */
function i18n() {
	if (i18n.fertig) { return; }
	i18n.fertig = true;
	
	var stFehlertyp = document.getElementById("e1").firstChild.data;
	
	var stMeldE1 = "";
	var stMeldE2a = "";
	var stMeldE2b = "";
	var arVorgehen = new Array();
	var arGruende = new Array();
	var stErklaer = "";
	var arButtonset = null;
	
	switch (stFehlertyp) {
		case "Error opening local file":
			stMeldE1 = "Kann lokale Datei nicht öffnen";
			stMeldE2a = "Folgende Datei kann nicht geladen werden:";
			arVorgehen[0] = "Stellen Sie sicher, dass Name und Pfad korrekt sind und dass die Datei existiert.";
			arVorgehen[1] = "Wenn die Datei in einem virtuellen Namensraum liegt: Stellen Sie sicher, dass der zugehörige Listeneintrag existiert und auf den richtig Pfad verweist.";
			break;
		case "Error connecting to proxy":
			stMeldE1 = "Externer Proxy nicht erreichbar";
			stMeldE2a = "Proxomitron kann keine Verbindung zu folgendem Proxy-Server herstellen:";
			stMeldE2b = "Möglicherweise ist der Server überlastet.";
			arGruende[0] = "Der Proxyserver oder die Verbindung dahin ist überlastet.";
			arGruende[1] = "Der Proxyserver oder eine vorgeschaltete Firewall hat Ihre Anfrage verworfen.";
			arVorgehen[0] = "Wiederholen Sie Ihre Anfrage.";
			arVorgehen[1] = "Wenn das Problem fortbesteht, wenden Sie Sich an den Betreiber des Servers. (Normalerweise Ihr Provider.)";
			break;
		case "Error connecting to site":
			stMeldE1 = "Server nicht erreichbar";
			stMeldE2a = "Proxomitron kann keine Verbindung zu folgendem Webserver herstellen:";
			arGruende[0] = "Der Server ist überlastet oder die Verbindung dahin gestört.";
			arGruende[1] = "Es liegt ein Problem mit Ihrer Internetverbindung vor.";
			arVorgehen[0] = "Wiederholen Sie die Anfrage, um eine einmalige Verbindungsstörung auszuschließen.";
			arVorgehen[1] = "Prüfen Sie, ob andere Websites erreichbar sind.";
			arButtonset = [{btnName:"Google-Suche",btnUrl:"http://www.google.com/search?&q=" + window.location.hostname + window.location.pathname},
			               {btnName:"Google-Cache",btnUrl:"http://www.google.com/search?&q=cache:" + window.location.protocol + "//" + window.location.hostname + window.location.pathname},
			               {btnName:"Archive.org",btnUrl:"http://web.archive.org/web/*/" + window.location.href}];
			break;
		case "CONNECT method not supported":
			stMeldE1 = "Externer Proxy verweigert CONNECT";
			stMeldE2a = "Der externe Proxy...";
			stMeldE2b = "scheint die HTTP-Methode CONNECT nicht zu unterstützen.";
			break;
		case "SSL Error connecting to site":
			stMeldE1 = "Keine SSL-Verbindung möglich";
			stMeldE2a = "SSLeay konnte keine verschlüsselte Verbindung zu folgendem Server aufbauen:";
			arVorgehen[0] = "Wiederholen Sie den Vorgang mit geöffnetem Logfenster, um genauere Angaben zur Fehlerursache zu erhalten.";
			break;
		case "Proxomitron's brain hurts":
			stMeldE1 = "Unverständliche Anfrage";
			stMeldE2a = "Proxomitron hat keine Ahnung, was folgende Anweisung bedeuten soll:";
			stMeldE2b = "Bitte denken Sie daran, dass Proxomitron ein reiner HTTP-Proxy ist. Die Maßgeblichen Standards sind RFC 1945 und RFC 2616.";
			break;
		case "Host name lookup failed":
			stMeldE1 = "Namensauflösung fehlgeschlagen";
			stMeldE2a = "Das System konnte folgenden Hostnamen nicht auflösen:";
			stErklaer = "Windows ist es nicht gelungen, die zum angegebenen Hostnamen gehörende IP-Adresse durch eine DNS-Anfrage in Erfahrung zu bringen. Das kann viele, völlig unterschiedliche Ursachen haben.";
			arGruende[0] = "Der Nameserver hat die DNS-Anfrage beantwortet und angegeben, dass er den Hostnamen nicht kennt.";
			arGruende[1] = "Der Nameserver hat nicht auf die DNS-Anfrage geantwortet oder seine Antwort ist auf der Strecke verloren gegangen.";
			arGruende[2] = "Die DNS-Anfrage konnte aufgrund irgend eines technischen Problems nicht stattfinden. Z.B., weil Ihre Internetverbindung unterbrochen ist oder im Moment der Anfrage kurzzeitig gestört war. (Evtl. WLAN-Störung oder DSL-Zwangstrennung?)";
			arVorgehen[0] = "Überprüfen Sie, ob Sie den Hostnamen wirklich richtig geschrieben haben.";
			arVorgehen[1] = "Überprüfen Sie, ob andere Websites erreichbar sind.";
			arVorgehen[2] = "Trennen Sie Ihre Internetverbindung und bauen Sie sie neu auf. Mit etwas Glück wird Ihnen dann per DHCP ein anderer Nameserver zugewiesen, der vielleicht über einen anderen Datenbestand verfügt und den Hostnamen auflösen kann.";
			arVorgehen[3] = "Versuchen Sie, die Webseite über einen externen Proxyserver aufzurufen.";
			arVorgehen[4] = "Informieren Sie Sich über alternative/unzensierte Nameserver.";
			arVorgehen[5] = "Nutzen Sie die unten stehenden Schaltflächen.";
			arButtonset = [{btnName:"Google-Suche",btnUrl:"http://www.google.com/search?&q=" + window.location.hostname + window.location.pathname},
			               {btnName:"Google-Cache",btnUrl:"http://www.google.com/search?&q=cache:" + window.location.protocol + "//" + window.location.hostname + window.location.pathname},
			               {btnName:"Archive.org",btnUrl:"http://web.archive.org/web/*/" + window.location.href}];
			break;
		case "New config loaded":
			stMeldE1 = "Neue Konfiguration geladen";
			stMeldE2a = "Folgende Konfigurationsdatei wurde geladen:";
			break;
		case "Error loading config file":
			stMeldE1 = "Kann Konfigurationsdatei nicht laden";
			stMeldE2a = "Proxomitron konnte folgende Konfigurationsdatei nicht laden:";
			stMeldE2b = "Stellen Sie sicher, dass die Datei existiert und das richtige Format hat.";
			break;
		case "Config in use":
			stMeldE1 = "Konfigurationsdatei noch in Benutzung";
			stMeldE2a = "Proxomitron kann keine neue Konfigurationsdatei laden, solange die aktuelle bearbeitet wird. Schließen Sie alle Filter-Editor-Fenster und versuchen Sie es dann erneut.";
			break;
		default: return;
	}
	
	var obH1E1 = document.createElement("h1");
	obH1E1.appendChild(document.createTextNode(stMeldE1));
	obH1E1.id = "e1";
	
	var obDivE2 = document.createElement("div");
	obDivE2.appendChild(document.createTextNode(stMeldE2a));
	obDivE2.id = "e2";
	
	if (document.getElementById("e3")) {
		var stMeldE3 = document.getElementById("e3").firstChild.data;
		var obDivE3 = document.createElement("div");
		obDivE3.appendChild(document.createTextNode(stMeldE3));
		obDivE3.id = "e3";
		if (ProxLCO.ua.IEmode == 8) {
			obDivE3.style.lineHeight = "1.5em";
		}
		obDivE2.appendChild(obDivE3);
	}
	
	if (stMeldE2b) {
		obDivE2.appendChild(document.createTextNode(stMeldE2b));
	}
	
	var dhBlock2 = document.getElementById("block2");
	dhBlock2.replaceChild(obH1E1,document.getElementById("e1"));
	dhBlock2.replaceChild(obDivE2,document.getElementById("e2"));
	
	if (stErklaer) {
		var obExt1Div = document.createElement("div");
		obExt1Div.appendChild(document.createTextNode(stErklaer));
		obExt1Div.id = "erklaer";
		dhBlock2.appendChild(obExt1Div);
	}
	
	if (arGruende[0]) {
		var obExt2H2 = document.createElement("h2");
		obExt2H2.appendChild(document.createTextNode("Mögliche Ursachen:"));
		var obExt2Ul = document.createElement("ul");
		for (var i = 0, text; text = arGruende[i]; i++) {
			var obExt2Li = document.createElement("li");
			obExt2Li.appendChild(document.createTextNode(text));
			obExt2Ul.appendChild(obExt2Li);
		}
		dhBlock2.appendChild(obExt2H2);
		dhBlock2.appendChild(obExt2Ul);
	}
	
	if (arVorgehen[0]) {
		var obExt3H2 = document.createElement("h2");
		obExt3H2.appendChild(document.createTextNode("Mögliche Vorgehensweisen:"));
		var obExt3Ul = document.createElement("ul");
		for (var i = 0, text; text = arVorgehen[i]; i++) {
			var obExt3Li = document.createElement("li");
			obExt3Li.appendChild(document.createTextNode(text));
			obExt3Ul.appendChild(obExt3Li);
		}
		dhBlock2.appendChild(obExt3H2);
		dhBlock2.appendChild(obExt3Ul);
	}
	
	if (arButtonset) {
		var obExt4H2 = document.createElement("h2");
		obExt4H2.appendChild(document.createTextNode("Weitere Möglichkeiten:"));
		dhBlock2.appendChild(obExt4H2);
		var obExt4Form = document.createElement("form");
		obExt4Form.id = "buttonset";
		for (var i in arButtonset) {
			var obExt4Btn = document.createElement("input");
			obExt4Btn.type = "button";
			obExt4Btn.value = arButtonset[i].btnName;
			obExt4Btn.onclick = function (input) { return function() { window.location.href = input; }; }(arButtonset[i].btnUrl);
			obExt4Btn.onmouseover = function (input) { return function() { window.status = input; }; }(arButtonset[i].btnUrl);
			obExt4Btn.onmouseout = function() { window.status = ''; };
			if (ProxLCO.ua.IEmode <= 5) {
				obExt4Btn.style.marginLeft = "0.5em";
			}
			obExt4Form.appendChild(obExt4Btn);
		}
		dhBlock2.appendChild(obExt4Form);
	}
	
	if (ProxLCO.ua.IEmode <= 8) {
		cssFuerIE();
	}
}

/* CSS2-Ersatz fuer Internet Explorer */
function cssFuerIE() {
	if (ProxLCO.ua.IEmode <= 7) {
		var dhBlock = document.createElement("div");
		dhBlock.style.textAlign = "right";
		dhBlock.style.paddingTop = "0.5em";
		dhBlock.style.marginTop = "2em";
		dhBlock.style.marginLeft = "78px";
		dhBlock.style.marginRight = "78px";
		dhBlock.style.borderTop = "solid #b6bcc6 1px";
		dhBlock.style.fontSize = "0.9em";
		dhBlock.appendChild(document.createTextNode("Proxomitron Webfilter"));
		document.getElementById("block1").appendChild(dhBlock);
	}
	if (ProxLCO.ua.IEmode == 5) {
		dhBlock.style.width = "100%";
	}
	if (ProxLCO.ua.IE7) {
		var dhBlock2 = document.getElementById("d1");
		dhBlock2.style.position = "absolute";
		dhBlock2.style.display = "block";
		dhBlock2.style.backgroundImage = "url(ErrBG.png)";
		dhBlock2.style.backgroundRepeat = "no-repeat";
		dhBlock2.style.width = "350px";
		dhBlock2.style.height = "315px";
		dhBlock2.style.right = "0px";
		dhBlock2.style.bottom = "0px";
		dhBlock.style.width = "100%";
	}
}

var ProxLCO = {};
ProxLCO.ua = { IEmode: 100, IEpre7: false, CompatBack: false, CompatCss1: false };
if (document.compatMode == "BackCompat") { ProxLCO.ua.CompatBack = true; }
else if (document.compatMode == "CSS1Compat") { ProxLCO.ua.CompatCss1 = true; }
if (navigator.userAgent.indexOf("MSIE") != -1 && document.createElement("div").addBehavior) {
	if (document.documentMode) { ProxLCO.ua.IEmode = document.documentMode; }
	else {
		if (ProxLCO.ua.CompatBack) { ProxLCO.ua.IEmode = 5; }
		else if (navigator.userAgent.indexOf("MSIE 6.") != -1 && ProxLCO.ua.CompatCss1) { ProxLCO.ua.IEmode = 6;}
		else if (navigator.userAgent.indexOf("MSIE 7.") != -1 && ProxLCO.ua.CompatCss1) { ProxLCO.ua.IEmode = 7; }
		if (navigator.userAgent.indexOf("MSIE 7.") != -1 ) { ProxLCO.ua.IE7 = true; }
	}
}	

if (window.addEventListener) {
	window.addEventListener("load",i18n,false);
	window.addEventListener("DOMContentLoaded",i18n,false);
}
else if (window.attachEvent) {
	window.attachEvent("onload",i18n);
}
