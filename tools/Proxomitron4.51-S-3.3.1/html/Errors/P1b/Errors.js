
/* JavaScript für Proxomitron-Fehlermeldungen */


/* Übersetzung der Fehlermeldungen */
function i18n() {
	if (i18n.fertig) { return; }
	i18n.fertig = true;
	
	var stFehlertyp = document.getElementById("e1").firstChild.data;
	
	var stMeldE1 = "";
	var stMeldE2a = "";
	var stMeldE2b = "";
	
	switch (stFehlertyp) {
		case "Error opening local file":
			stMeldE1 = "Fehler: Kann lokale Datei nicht öffnen";
			stMeldE2a = "Folgende Datei kann nicht geladen werden:";
			stMeldE2b = "Stellen Sie sicher, dass Name und Pfad korrekt sind und dass die Datei existiert.";
			break;
		case "Error connecting to proxy":
			stMeldE1 = "Fehler: Externer Proxy nicht erreichbar";
			stMeldE2a = "Proxomitron kann keine Verbindung zu folgendem Proxy-Server herstellen:";
			stMeldE2b = "Möglicherweise ist der Server überlastet.";
			break;
		case "Error connecting to site":
			stMeldE1 = "Fehler: Server nicht erreichbar";
			stMeldE2a = "Proxomitron kann keine Verbindung zu folgendem Webserver herstellen:";
			stMeldE2b = "Möglicherweise ist der Server überlastet oder die Verbindung dahin gestört.";
			break;
		case "CONNECT method not supported":
			stMeldE1 = "Fehler: Externer Proxy verweigert CONNECT";
			stMeldE2a = "Der externe Proxy...";
			stMeldE2b = "scheint die HTTP-Methode CONNECT nicht zu unterstützen.";
			break;
		case "SSL Error connecting to site":
			stMeldE1 = "Fehler: Keine SSL-Verbindung möglich";
			stMeldE2a = "SSLeay konnte keine verschlüsselte Verbindung zu folgendem Server aufbauen:";
			stMeldE2b = "Wiederholen Sie den Vorgang mit geöffnetem Logfenster, um genauere Angaben zur Fehlerursache zu erhalten.";
			break;
		case "Proxomitron's brain hurts":
			stMeldE1 = "Fehler: Unverständliche Anfrage";
			stMeldE2a = "Proxomitron hat keine Ahnung, was folgende Anweisung bedeuten soll:";
			stMeldE2b = "Bitte denken Sie daran, dass Proxomitron ein reiner HTTP-Proxy ist. Die Maßgeblichen Standards sind RFC 1945 und RFC 2616.";
			break;
		case "Host name lookup failed":
			stMeldE1 = "Fehler: Namensauflösung fehlgeschlagen";
			stMeldE2a = "Das System konnte folgenden Hostnamen nicht auflösen:";
			stMeldE2b = "Sind Sie sicher, dass der Name richtig geschrieben ist?";
			break;
		case "New config loaded":
			stMeldE1 = "Neue Konfiguration geladen";
			stMeldE2a = "Folgende Konfigurationsdatei wurde geladen:";
			break;
		case "Error loading config file":
			stMeldE1 = "Fehler: Kann Konfigurationsdatei nicht laden";
			stMeldE2a = "Proxomitron konnte folgende Konfigurationsdatei nicht laden:";
			stMeldE2b = "Stellen Sie sicher, dass die Datei existiert und das richtige Format hat.";
			break;
		case "Config in use":
			stMeldE1 = "Fehler: Konfigurationsdatei noch in Benutzung";
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
		obDivE2.appendChild(obDivE3);
	}
	
	if (stMeldE2b) {
		obDivE2.appendChild(document.createTextNode(stMeldE2b));
	}
	
	document.getElementById("block2").replaceChild(obH1E1,document.getElementById("e1"));
	document.getElementById("block2").replaceChild(obDivE2,document.getElementById("e2"));
	
	if (ProxLCO.ua.IEmode <= 7) {
		cssFuerIE();
	}
}

/* CSS2-Ersatz fuer Internet Explorer */
function cssFuerIE() {
		var dhHr = document.createElement("hr");
		document.getElementById("block1").appendChild(dhHr);
		dhHr.style.marginTop = "1em";
		var dhBlock = document.getElementById("d5");
		dhBlock.appendChild(document.createTextNode("Proxomitron Webfilter"));
		dhBlock.style.fontStyle = "oblique";
}

var ProxLCO = {};
ProxLCO.ua = { IEmode: 100, CompatBack: false, CompatCss1: false };
if (document.compatMode == "BackCompat") { ProxLCO.ua.CompatBack = true; }
else if (document.compatMode == "CSS1Compat") { ProxLCO.ua.CompatCss1 = true; }
if (navigator.userAgent.indexOf("MSIE") != -1 && document.createElement("div").addBehavior) {
	if (document.documentMode) { ProxLCO.ua.IEmode = document.documentMode; }
	else {
		if (ProxLCO.ua.CompatBack) { ProxLCO.ua.IEmode = 5; }
		else if (navigator.userAgent.indexOf("MSIE 6.") != -1 && ProxLCO.ua.CompatCss1) { ProxLCO.ua.IEmode = 6; }
		else if (navigator.userAgent.indexOf("MSIE 7.") != -1 && ProxLCO.ua.CompatCss1) { ProxLCO.ua.IEmode = 7; }
	}
}

if (window.addEventListener) {
	window.addEventListener("load",i18n,false);
	window.addEventListener("DOMContentLoaded",i18n,false);
}
else if (window.attachEvent) {
	window.attachEvent("onload",i18n);
}
