
/* What the Proxomitron is thinking... */
document.write("<title>Was Proxomitron gerade denkt...</title>");




function createXMLHttpRequest() {
	var xhr = false;
	if (window.XMLHttpRequest) {
		try {
			xhr = new XMLHttpRequest(); // Moderne Browser, IE7
		}
		catch (e) { }
	}
	else if (window.ActiveXObject) {
		try {
			xhr = new ActiveXObject('Microsoft.XMLHTTP'); // IE6, IE5
		}
		catch(e) { }
	}
	return xhr;
}

function doHttpGet(url,dhzielElem) {
	if (!url) { return false; }
	var obXhr = createXMLHttpRequest();
	if (!obXhr) {
		dhzielElem.innerHTML = "Fehler: XMLHttpRequest nicht verfügbar";
		return false;
	}
	var timeout = setTimeout(function() {
		obXhr.abort();
		dhzielElem.innerHTML = "Fehler: Timeout";
	}, 10000);
	obXhr.open("GET", url, true);
	obXhr.onreadystatechange = function() {
		if(obXhr.readyState == 4) {
			clearTimeout(timeout);
			if (obXhr.status == 200) {
				var arDaten = obXhr.responseText.split(";");
				dhzielElem.innerHTML = arDaten[0] + "-Edition, Version " + arDaten[1];
			}
			else {
				dhzielElem.innerHTML = "Fehler: " + obXhr.status + " " + obXhr.statusText;
			}
		}
	};
	obXhr.send(null);
	return true;
}

function i18n() {
	if (i18n.fertig) { return; }
	i18n.fertig = true;
	
	var arH2 = document.getElementsByTagName("h2");
	if (arH2 && arH2[0]) {
		var dhH2 = arH2[0].firstChild;
		switch (dhH2.data) {
			case "Proxomitron Internal Info":
				dhH2.data = "Proxomitron Laufzeitdaten";
				break;
			case "Recent URLs":
				dhH2.data = "Letzte URLs";
				break;
			case "Blocklist Information":
				dhH2.data = "Listeninformationen";
				break;
			default: break;
		}
		dhH2.data = dhH2.data.replace(/Information for List /, "Statistik der Liste ");
	
	}
	
	var arH3 = document.getElementsByTagName("h3");
	for (var i = 0, dhKnoten; dhKnoten = arH3[i]; i++) {
		var dhH3 = dhKnoten.firstChild;
		switch (dhH3.data) {
			case "Excluded List":
				dhH3.data = "Negativ-Einträge";
				break;
			case "Non-Hashed Items":
				dhH3.data = "Nicht hashbare Einträge";
				break;
			case "Hashed Items":
				dhH3.data = "Hashbare Einträge";
				break;
			default: break;
		}
	}
	
	var arTh = document.getElementsByTagName("th");
	for (var i = 0, dhKnoten; dhKnoten = arTh[i]; i++) {
		var dhTh = dhKnoten.firstChild;
		switch (dhTh.data) {
			// Recent URLs
			case "State":
				dhTh.data = "Status";
				break;
			case "Con":
				dhTh.data = "Verb.-Nr.";
				break;
			case "Code":
				dhTh.data = "HTTP-Code";
				break;
			case "Type":
				dhTh.data = "Content-Type";
				break;
			case "Length":
				dhTh.data = "Bytes";
				break;
			// Blocklist Information
			case "File":
				dhTh.data = "Dateiname";
				break;
			case "Items":
				dhTh.data = "Einträge";
				break;
			// Information for List ...
			case "Line":
				dhTh.data = "Zeile";
				break;
			case "Scans":
				dhTh.data = "Vergleiche";
				break;
			case "Hits":
				dhTh.data = "Treffer";
				break;
			case "Match":
				dhTh.data = "Ausdruck";
				break;
			default: break;
		}
		
		if (dhKnoten.title) {
			switch (dhKnoten.title) {
				// Recent URLs
				case "Connection state":
					dhKnoten.title = "Verbindungsstatus";
					break;
				case "Connection number (from log window)":
					dhKnoten.title = "Verbindungsnummer (wie auch im Logfenster)";
					break;
				case "Server Return Code":
					dhKnoten.title = "HTTP-Statuscode vom Server";
					break;
				case "URL Content-Type":
					dhKnoten.title = "Content-Type laut Server";
					break;
				case "URL Content-Length":
					dhKnoten.title = "Übertragene Datenmenge";
					break;
				// Blocklist Information
				case "List name":
					dhKnoten.title = "Listenname laut Konfiguration";
					break;
				case "List Filename":
					dhKnoten.title = "Dateiname der Liste";
					break;
				case "Number of items in list":
					dhKnoten.title = "Anzahl der Einträge";
					break;
				case "Size of Prefix based hash":
					dhKnoten.title = "Länge der Einträge der Präfix-basierten Hash-Tabelle";
					break;
				case "Size of URL based hash":
					dhKnoten.title = "Länge der Einträge der URL-Hash-Tabelle";
					break;
				case "List header flags":
					dhKnoten.title = "Flags im Listenkopf";
					break;
				// Information for List ...
				case "Line number in file":
					dhKnoten.title = "Zeilennummer in der Listendatei";
					break;
				case "Number of checks this session":
					dhKnoten.title = "Eintrag wurde (seit dem Programmstart) X mal verglichen";
					break;
				case "Number of matches this session":
					dhKnoten.title = "Eintrag hat (seit dem Programmstart) bei X Vergleichen einen Treffer ergeben";
					break;
				case "Prefix hash size":
					dhKnoten.title = "Anzahl der Zeichen, die in die Präfix-basierte Hash-Tabelle einsortiert werden konnten";
					break;
				case "URL hash size":
					dhKnoten.title = "Anzahl der Zeichen, die in die URL-Hash-Tabelle einsortiert werden konnten";
					break;
				default: break;
			}
		}
	
	}
	
	if (window.location.href == "http://local.ptron/.pinfo/") {
		var dhUlPi = document.getElementById("pi");
		if (dhUlPi) {
			var dhUlPiLi0ATx = dhUlPi.childNodes[0].firstChild.firstChild;
			var dhUlPiLi1ATx = dhUlPi.childNodes[1].firstChild.firstChild;
			if (dhUlPiLi0ATx.data == "Recent URLs") {
				dhUlPiLi0ATx.data = "Letzte URLs / Verbindungen";
			}
			if (dhUlPiLi1ATx.data == "Blocklists") {
				dhUlPiLi1ATx.data = "Listen / Statistik";
			}
		}
		var dhPCfg = document.getElementById("cfg");
		if (dhPCfg) {
			var dhPCfgTx = dhPCfg.firstChild;
			if (dhPCfgTx.data == "Current Config: ") {
				dhPCfgTx.data = "Aktuelle Konfigurationsdatei: ";
			}
		}
		
		conInjector();
		verInjector();
		
	}
	
	if (window.location.href.indexOf("http://local.ptron/.pinfo/urls/") == 0) {
		obQf.injector();
	}
	
}

function conInjector() {
	var dhConVals = document.getElementById("values");
	if (!dhConVals) { return; }
	
	var obHd = document.createElement("h3");
	obHd.appendChild(document.createTextNode("Verbindungen"));
	
	var obTbl = document.createElement("table");
	var obTbd = document.createElement("tbody");
	var obTrs = [document.createElement("tr"),document.createElement("tr"),document.createElement("tr")];
	var obTds = [document.createElement("td"),document.createElement("td"),document.createElement("td")];
	var obThs = [document.createElement("th"),document.createElement("th"),document.createElement("th")];
	obTrs[0].appendChild(obThs[0]);
	obTrs[0].appendChild(obTds[0]);
	obTrs[1].appendChild(obThs[1]);
	obTrs[1].appendChild(obTds[1]);
	obTrs[2].appendChild(obThs[2]);
	obTrs[2].appendChild(obTds[2]);
	obTbd.appendChild(obTrs[0]);
	obTbd.appendChild(obTrs[1]);
	obTbd.appendChild(obTrs[2]);
	obTbl.appendChild(obTbd);
	
	obTbl.id = "lzdCon";
	obTrs[0].id = "aCon";
	obTrs[1].id = "lCon";
	obTrs[2].id = "rCon";
	
	obThs[0].appendChild(document.createTextNode("Aktive Verbindungen: "));
	obThs[1].appendChild(document.createTextNode("Lokale Verbindungen: "));
	obThs[2].appendChild(document.createTextNode("Remote-Verbindungen: "));
	
	var stConValsACon = dhConVals.childNodes[0].data.replace(/Active Connections: /, "");
	var stConValsLCon = dhConVals.childNodes[2].data.replace(/Open Local connections: /, "");
	var stConValsRCon = dhConVals.childNodes[4].data.replace(/Open Remote connections: /, "");
	
	obTds[0].appendChild(document.createTextNode(stConValsACon));
	obTds[1].appendChild(document.createTextNode(stConValsLCon));
	obTds[2].appendChild(document.createTextNode(stConValsRCon));
	
	document.body.appendChild(obHd);
	document.body.removeChild(dhConVals);
	document.body.appendChild(obTbl);
	
}

function verInjector() {
	var dhEVer = document.getElementById("ver");
	if (!dhEVer) { return; }
	
	var obHd = document.createElement("h3");
	obHd.appendChild(document.createTextNode("Versionsinfo"));
	
	var obTbl = document.createElement("table");
	var obTbd = document.createElement("tbody");
	var obTrs = [document.createElement("tr"),document.createElement("tr"),document.createElement("tr")];
	var obTds = [document.createElement("td"),document.createElement("td"),document.createElement("td")];
	var obThs = [document.createElement("th"),document.createElement("th")];
	obTrs[0].appendChild(obThs[0]);
	obTrs[0].appendChild(obTds[0]);
	obTrs[1].appendChild(obThs[1]);
	obTrs[1].appendChild(obTds[1]);
	obTrs[2].appendChild(obTds[2]);
	obTbd.appendChild(obTrs[0]);
	obTbd.appendChild(obTrs[1]);
	obTbd.appendChild(obTrs[2]);
	obTbl.appendChild(obTbd);
	
	obTbl.id = "lzdVers";
	obTrs[0].id = "eVer";
	obTrs[1].id = "pVer";
	obTrs[2].id = "upd";
	
	obThs[0].appendChild(document.createTextNode("Programmversion: "));
	obThs[1].appendChild(document.createTextNode("Paketversion: "));
	
	var stEVerDsc = dhEVer.childNodes[1].firstChild.data;
	var obPVer = document.createElement("span");
	var obAUpd = document.createElement("a");
	obAUpd.appendChild(document.createTextNode("Nach Updates suchen"));
	obAUpd.href="http://subspace.ptron/.update/index.html";
	
	obTds[0].appendChild(document.createTextNode(stEVerDsc));
	obTds[1].appendChild(obPVer);
	obTds[2].appendChild(obAUpd);
	obTds[2].colSpan = "2";
	
	document.body.appendChild(obHd);
	document.body.removeChild(dhEVer);
	document.body.appendChild(obTbl);
	
	doHttpGet('/.update/PVer.txt', obPVer);
	
}


var obQf = {IEKnoten:null};

obQf.tagrunner = function(knoten) {
	if (!knoten) { var knoten = obQf.IEKnoten; } // <-- IE
	
	var boExcludeEmpty = false;
	var dhSelExclEmpty = document.getElementById("ExcludeEmpty");
	if (dhSelExclEmpty.checked) { boExcludeEmpty = true; }
	
	var stInpText = knoten.value;
	var arDhTr = document.getElementsByTagName("tbody")[0].rows;
	
	for (var i = 2, dhTr; dhTr = arDhTr[i]; i++) {
		var dhTd = dhTr.cells[knoten.col];
		if (knoten.col == 3) {
			var hasData = false;
			if (dhTd.firstChild && dhTd.firstChild.data) { hasData = true;}
			if (stInpText != "" && ( !hasData && boExcludeEmpty || hasData && dhTd.firstChild.data.indexOf(stInpText) == -1 ) ) {
				dhTr.qfCol3Match = 0;
			}
			else{
				dhTr.qfCol3Match = 1;
			}
		}
		else if (knoten.col == 5) {
			var hasData = false;
			if (dhTd.firstChild.firstChild && dhTd.firstChild.firstChild.data) { hasData = true;}
			if (stInpText != "" && ( !hasData && boExcludeEmpty || hasData && dhTd.firstChild.firstChild.data.indexOf(stInpText) == -1 ) ) {
				dhTr.qfCol5Match = 0;
			}
			else{
				dhTr.qfCol5Match = 1;
			}
		}
		if (!dhTr.qfCol3Match || !dhTr.qfCol5Match) { dhTr.style.display = "none"; }
		else                                        { dhTr.style.display = ""; }
	}
	knoten.style.backgroundImage = "";
	
};

obQf.injector = function() {
	var dhTbody = document.getElementsByTagName("tbody")[0];
	var arDhTr = dhTbody.rows;
	var obQfRow = document.createElement("tr");
	var arObQfCells = [document.createElement("td"),document.createElement("td"),document.createElement("td"),document.createElement("td")];
	obQf.arObQfInp = [document.createElement("input"),document.createElement("input")];
	obQf.obSelExcludeEmpty = document.createElement("input");
	obQf.obSelExcludeEmpty.type = "checkbox";
	obQf.obSelExcludeEmpty.name = "ExcludeEmpty";
	obQf.obSelExcludeEmpty.id = "ExcludeEmpty";
	var obSelExclEmptyLabel = document.createElement("label"); obSelExclEmptyLabel.htmlFor = "ExcludeEmpty";
	obSelExclEmptyLabel.appendChild(document.createTextNode("Leerfelder ausschlie\u00DFen: "));
	
	obQf.arObQfInp[0].col = 3;
	obQf.arObQfInp[1].col = 5;
	arObQfCells[0].colSpan = "3";
	arObQfCells[0].appendChild(document.createTextNode("Schnellfilter: "));
	arObQfCells[1].appendChild(obQf.arObQfInp[0]);
	arObQfCells[1].appendChild(document.createElement("br"));
	arObQfCells[1].appendChild(obSelExclEmptyLabel);
	arObQfCells[1].appendChild(obQf.obSelExcludeEmpty);
	arObQfCells[3].appendChild(obQf.arObQfInp[1]);
	obQfRow.className = "quickfilter";
	obQfRow.appendChild(arObQfCells[0]);
	obQfRow.appendChild(arObQfCells[1]);
	obQfRow.appendChild(arObQfCells[2]);
	obQfRow.appendChild(arObQfCells[3]);
	dhTbody.insertBefore(obQfRow,arDhTr[1]);
	
	for (var i = 2, dhTr; dhTr = arDhTr[i]; i++) {
		dhTr.qfCol3Match = 1;
		dhTr.qfCol5Match = 1;
	}
	for (var i = 0, obQfInp; obQfInp = obQf.arObQfInp[i]; i++) {
		if (obQfInp.addEventListener) { obQfInp.addEventListener("keyup",obQf.EH,false); }
		else if (obQfInp.attachEvent) { obQfInp.attachEvent("onkeyup",obQf.EH); }
	}
	if (obQf.obSelExcludeEmpty.addEventListener) { obQf.obSelExcludeEmpty.addEventListener("click",obQf.EH,false); }
	else if (obQf.obSelExcludeEmpty.attachEvent) { obQf.obSelExcludeEmpty.attachEvent("onclick",obQf.EH); }
	
	if (window.location.search) {
		dhTbody.style.display = "none";
		var arStSearch1 = window.location.search.slice(1).split("&");
		var arStSearch2 = new Array();
		for (var i in arStSearch1) {
			arStSearch2[i] = arStSearch1[i].split("=");
		}
		
		for (var i in arStSearch2) {
			if (arStSearch2[i][0] == "ee" && arStSearch2[i][1] && arStSearch2[i][1] == "1") {
				obQf.obSelExcludeEmpty.checked = true;
				break;
			}
		}
		for (var i in arStSearch2) {
			if (arStSearch2[i][0] == "ct" && arStSearch2[i][1]) {
				obQf.arObQfInp[0].value = arStSearch2[i][1];
				obQf.tagrunner(obQf.arObQfInp[0]);
				break;
			}
		}
		for (var i in arStSearch2) {
			if (arStSearch2[i][0] == "url" && arStSearch2[i][1]) {
				obQf.arObQfInp[1].value = arStSearch2[i][1];
				obQf.tagrunner(obQf.arObQfInp[1]);
				break;
			}
		}
		dhTbody.style.display = "";
	}
	
	var img1 = new Image(); img1.src="http://local.ptron/Symb-Busy-Input.gif";
	
};


obQf.EH = function(ereignis) {
	if (!ereignis) { var ereignis = window.event; } // <--IE
	if (ereignis.target) { var knoten = ereignis.target; }
	else if (ereignis.srcElement) { var knoten = ereignis.srcElement; } // <--IE
	else { return; }
	if (obQf.EH.timeout) { window.clearTimeout(obQf.EH.timeout); }
	if (knoten.id == "ExcludeEmpty") {
		knoten = obQf.arObQfInp[0];
	}
	else {
		knoten.style.backgroundImage = "url(http://local.ptron/Symb-Busy-Input.gif)";
	}
	
	if (ProxEnvBrIE) {
		obQf.IEKnoten = knoten; // <-- IE
		obQf.EH.timeout = window.setTimeout(obQf.tagrunner,1000);
	}
	else {
		obQf.EH.timeout = window.setTimeout(obQf.tagrunner,1000,knoten);
	}
};


if (navigator.userAgent.indexOf("MSIE") != -1 && document.createElement("div").addBehavior) {
	var ProxEnvBrIE = true;
}



if (window.addEventListener) {
	window.addEventListener("load",i18n,false);
	window.addEventListener("DOMContentLoaded",i18n,false);
}
else if (window.attachEvent) {
	window.attachEvent("onload",i18n);
}



