/* Proxomitron - Deutsche Distribution
 * 
 * Stand: 21.02.2010
 * 
 * Michael Bürschgens
 * http://www.buerschgens.de/Prox/
 */



var ProxSSRun = false;

if(window.ProxLCO && ProxLCO.Status && ProxLCO.ConfSC !== undefined) {
	if (!ProxLCO.Status.SSRel) {
		ProxLCO.Status.SSRel = "20100221";
		if (ProxLCO.Status.HSRel && ProxLCO.Status.HSRel == ProxLCO.Status.SSRel) {
			ProxSSRun = true;
		}
	}
}





if (ProxSSRun) {
	// Debug-Arrays
	ProxLCO.DebugLog = new Array();
	ProxLCO.DebugLog.push("SS:Anfang");
	
	// Kopien einiger Original-Methoden erzeugen
	window.ProxSK_setTimeout = window.setTimeout;
	window.ProxSK_open = window.open;
	window.ProxSK_alert = window.alert;
	window.ProxSK_confirm = window.confirm;
	window.ProxSK_scrollBy = window.scrollBy;
	window.ProxSK_setInterval = window.setInterval;
	window.ProxSK_clearInterval = window.clearInterval;
	if (window.showModelessDialog) { ProxSK_showModelessDialog = window.showModelessDialog; }
	if (window.showModalDialog) { ProxSK_showModalDialog = window.showModalDialog; }
	if (window.showHelp) { ProxSK_showHelp = window.showHelp; }
	if (window.createPopup) { ProxSK_createPopup = window.createPopup; }
}



if (ProxSSRun) {
	// Browser und Rendermodus ermitteln.
	ProxLCO.ua = {
		OP: false, OPpre950: false,
		Gecko: false, FF2: false, FF3: false,
		IE8: false, IE7: false, IE6: false, IE: false, IEpre7: false, IEmode: 100,
		CompatBack: false, CompatCss1: false,
		Webkit: false,
		summary: ""
	};
	
	if (document.compatMode == "BackCompat") {
		ProxLCO.ua.CompatBack = true; ProxLCO.ua.summary += "Back ";
	}
	else if (document.compatMode == "CSS1Compat") {
		ProxLCO.ua.CompatCss1 = true; ProxLCO.ua.summary += "CSS1 ";
	}
	if (navigator.userAgent.indexOf("Opera") != -1) {
		ProxLCO.ua.OP = true; ProxLCO.ua.summary += "OP ";
		try {
			if (parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera/")+6).match(/^[0-9.]+/)) < 9.50) { ProxLCO.ua.OPpre950 = true; ProxLCO.ua.summary += "OPpre950 "; }
		}
		catch (e) {
			ProxLCO.DebugLog.push("SS:ExceptionDurchOpBrowserJs");
		}
	}
	else if (navigator.userAgent.indexOf("AppleWebKit/") != -1) {
		ProxLCO.ua.Webkit = true; ProxLCO.ua.summary += "Webkit "; // Chrome und Safari
	}
	else if (navigator.userAgent.indexOf("Gecko/20") != -1) {
		ProxLCO.ua.Gecko = true; ProxLCO.ua.summary += "Gecko ";
		if (navigator.userAgent.indexOf("Firefox/2.") != -1) { ProxLCO.ua.FF2 = true; ProxLCO.ua.summary += "FF2 "; }
		else if (navigator.userAgent.indexOf("Firefox/3.") != -1) { ProxLCO.ua.FF3 = true; ProxLCO.ua.summary += "FF3 "; }
	}
	else if (navigator.userAgent.indexOf("MSIE") != -1) {
		if(ProxLCO.Prox_newElm("div").addBehavior) {
			ProxLCO.ua.IE = true; ProxLCO.ua.summary += "IE ";
		}
		else {
			ProxLCO.DebugLog.push("SS:env:FalscherIE");
		}
		if (navigator.userAgent.indexOf("MSIE 8.") != -1) { ProxLCO.ua.IE8 = true; ProxLCO.ua.summary += "IE8 "; }
		else if (navigator.userAgent.indexOf("MSIE 7.") != -1) { ProxLCO.ua.IE7 = true; ProxLCO.ua.summary += "IE7 "; }
		else if (navigator.userAgent.indexOf("MSIE 6.") != -1) { ProxLCO.ua.IE6 = true; ProxLCO.ua.IEpre7 = true; ProxLCO.ua.summary += "IE6 IEpre7 "; }
		if (document.documentMode) {
			ProxLCO.ua.IEmode = document.documentMode;
		}
		else {
			if (ProxLCO.ua.CompatBack) {
				ProxLCO.ua.IEmode = 5;
			}
			else if (ProxLCO.ua.IE6 && ProxLCO.ua.CompatCss1) {
				ProxLCO.ua.IEmode = 6;
			}
			else if (ProxLCO.ua.IE7 && ProxLCO.ua.CompatCss1) {
				ProxLCO.ua.IEmode = 7;
			}
		}
		ProxLCO.ua.summary += ProxLCO.ua.IEmode;
	}
}




if (ProxSSRun) {
	ProxLCO.env = {};
	ProxLCO.initOCO = function (forceSingle) {
		// Feststellen, ob lokales Fenster ein Frame oder iFrame ist und Handle auf höchstes erreichbares Elternfenster erzeugen.
		ProxLCO.env.domTopwin = window;
		ProxLCO.env.domParwin = window;
		ProxLCO.env.winType = "";
		
		if (window == parent) { ProxLCO.env.winType = "single"; }
		if (forceSingle === false && window != parent) {
			try {
				if (window.frameElement.nodeName == "FRAME") {
					ProxLCO.env.winType = "frame";
				}
				else if (window.frameElement.nodeName == "IFRAME") {
					ProxLCO.env.winType = "iframe";
				}
				if (parent.ProxLCO) { }
				ProxLCO.env.domTopwin = parent;
				ProxLCO.env.domParwin = parent;
			}
			catch (e) { }
			if (top != parent) {
				try {
					if (top.ProxLCO) { }
					ProxLCO.env.domTopwin = top;
				}
				catch (e) { }
			}
		}
		
		// ProxOCO nimmt später die Daten auf, die in Framesets frameübergreifend gehandhabt werden sollen.
		if (ProxLCO.env.domTopwin != window && ProxLCO.env.domTopwin.ProxOCO) {
			ProxOCO = ProxLCO.env.domTopwin.ProxOCO;
			ProxLCO.DebugLog.push("SS:initOCO:Parentales_ProxOCO_gefunden");
		}
		else {
			ProxOCO = new Object();
			ProxLCO.DebugLog.push("SS:initOCO:ProxOCO_erzeugt");
		}
		
		// Zentraler Datenspeicher zur frameübergreifenden Behandlung von PopUps
		if (!ProxOCO.WOC) {
			ProxOCO.WOC = new Object();
			ProxOCO.WOC.WinCount = 0;
			ProxOCO.WOC.WinArray = new Array();
			ProxOCO.WOC.StartDate = new Date(0);
			ProxOCO.WOC.WinCountMAX = 20;
			ProxLCO.DebugLog.push("SS:initOCO:WOC_erzeugt");
		}
		
		// Zentrale Sammlung von Framenamen
		// 1. Teil: Speicherobjekt
		if (!ProxOCO.WN) {
			ProxOCO.WN = new Object();
			ProxOCO.WN.obNames = {
				_new: false,
				_blank: false,
				_parent: true,
				_top: true,
				_self: true
			};
			ProxOCO.WN.stNames = "";
			ProxLCO.DebugLog.push("SS:initOCO:WN_erzeugt");
		}
		
		ProxLCO.DebugLog.push("SS:initOCO:Fertig");
	};
	
	ProxLCO.initOCO(false);
}



if (ProxSSRun) {
	// Wenn Frames nachträglich einer anderen Sicherheitszone zugeordnet werden,
	// können Referenzen auf bis dahin gemeinsam genutzte Objekte plötzlich ungültig werden.
	// Ein Versuch damit umzugehen...
	ProxLCO.rchkOCO = function () {
		try {
			if (ProxOCO && ProxLCO.env.domTopwin.ProxOCO && ProxLCO.env.domParwin.ProxOCO) { }
		}
		catch (e) {
			ProxLCO.DebugLog.push("SS:rchkOCO:ProxOCO_blockiert,_versuche_Neustart");
			try {
				ProxLCO.initOCO(true);
			}
			catch (e2) {
				ProxLCO.DebugLog.push("SS:rchkOCO:Neustart_auch_blockiert");
				return false;
			}
		}
		return true;
	};
	
}




if (ProxSSRun) {
	ProxLCO.EventManager = new Object();
	ProxLCO.EventManager.arDoubleBuffer = [[],[]];
	ProxLCO.EventManager.iActiveBuffer = 0;
	
	ProxLCO.EventManager.addNow = function(dhNode,stEvName,obHandler,boCapture) {
		if (!boCapture) {var boCapture = false;}
		if (dhNode.ProxSK_addEventListener) {
			dhNode.ProxSK_addEventListener(stEvName, obHandler, boCapture);
		}
		else if (dhNode.ProxSK_attachEvent) {
			dhNode.ProxSK_attachEvent("on"+stEvName, obHandler);
		}
		else if (dhNode.addEventListener) {
			dhNode.addEventListener(stEvName, (function(){ obHandler(); }), boCapture);
		}
		else if (dhNode.attachEvent) {
			dhNode.attachEvent("on"+stEvName, obHandler);
		}
	};
	ProxLCO.EventManager.addWhenReady = function(P_dhNode,P_stEvName,P_obHandler,P_boCapture) {
		if (!P_boCapture) {var P_boCapture = false;}
		ProxLCO.EventManager.arDoubleBuffer[ProxLCO.EventManager.iActiveBuffer].push({dhNode:P_dhNode, stEvName:P_stEvName, obHandler:P_obHandler, boCapture:P_boCapture});
	};
	ProxLCO.EventManager.run = function() {
		var iBuffer = ProxLCO.EventManager.iActiveBuffer;
		ProxLCO.EventManager.iActiveBuffer = (iBuffer == 0)? 1 : 0;
		for (var i = 0, item; item = ProxLCO.EventManager.arDoubleBuffer[iBuffer][i]; i++) {
			if(item.dhNode) {
				ProxLCO.EventManager.addNow(item.dhNode,item.stEvName,item.obHandler,item.boCapture);
			}
		}
		ProxLCO.EventManager.arDoubleBuffer[iBuffer] = [];
		if (ProxLCO.EventManager.arDoubleBuffer[ProxLCO.EventManager.iActiveBuffer].length > 0) {
			ProxLCO.EventManager.run();
		}
	};
	ProxLCO.EventManager.removeNow = function(dhNode,stEvName,obHandler,boCapture) {
		if (!boCapture) {var boCapture = false;}
		if (dhNode.removeEventListener) { dhNode.removeEventListener(stEvName, obHandler, boCapture); }
		else if (dhNode.detachEvent) { dhNode.detachEvent("on"+stEvName, obHandler); }
	};
}





               /*----------------------------------------------*\
              /                                                  \
=============<   ANFANG:   Meldefunktionen                        >=============
              \                                                  /
               \*----------------------------------------------*/



if (ProxSSRun) {
	ProxLCO.ProxMeldung_Stack = new Array();
	ProxLCO.ProxMeldung = function (typ,farbe,dauer,eingabeText) {
		// Wenn das lokale Fenster ein iFrame ist und sein Parentalfenster erreichbar ist, dann Meldung an dessen Melder hochreichen.
		if (ProxLCO.env.winType == "iframe" && ProxLCO.env.domParwin.ProxLCO.ProxMeldung) {
			return ProxLCO.env.domParwin.ProxLCO.ProxMeldung(typ,farbe,dauer,eingabeText);
		}
		if (document.body && ProxLCO.ProxMeldung_Stack.length === 0) {
			ProxLCO.ProxMeldung_Haupt(typ,farbe,dauer,eingabeText);
		}
		else if (ProxLCO.ProxMeldung_Stack.length <= 20) {
			var obNeu = new Object(); obNeu.typ = typ; obNeu.farbe = farbe; obNeu.dauer = dauer; obNeu.eingabeText = eingabeText;
			ProxLCO.ProxMeldung_Stack.push(obNeu);
		}
		if (!ProxLCO.ProxMeldung_chkStack.intervall) {
			ProxLCO.ProxMeldung_chkStack();
		}
	};
	ProxLCO.ProxMeldung_chkStack = function () {
		if (ProxLCO.ProxMeldung_Stack.length === 0) {
			if (ProxLCO.ProxMeldung_chkStack.intervall) {
				window.ProxSK_clearInterval(ProxLCO.ProxMeldung_chkStack.intervall);
				ProxLCO.ProxMeldung_chkStack.intervall = null;
			}
		}
		else {
			if (document.body && ProxLCO.Status.NachlaeuferFertig) {
				var obMeld = ProxLCO.ProxMeldung_Stack.shift();
				ProxLCO.ProxMeldung_Haupt(obMeld.typ, obMeld.farbe, obMeld.dauer, obMeld.eingabeText);
			}
			if (!ProxLCO.ProxMeldung_chkStack.intervall && ProxLCO.ProxMeldung_Stack.length > 0) {
				ProxLCO.ProxMeldung_chkStack.intervall = window.ProxSK_setInterval(ProxLCO.ProxMeldung_chkStack, 2000);
			}
		}
	};
	// Funktion zur Erzeugung optischer Meldungen
	ProxLCO.ProxMeldung_Haupt = function (typ,farbe,dauer,eingabeText) {
		if (!typ || !(typ == "LeisteBlink" || typ == "alert" || typ == "SymbolBlink")) { typ = "LeisteBlink"; }
		if (!farbe || !(farbe == "Ro" || farbe == "Ge" || farbe == "Gr")) { farbe = "Ro"; }
		if (!dauer) { dauer = 3000; }
		if (!eingabeText) { eingabeText = "kein Meldungstext \u00FCbergeben"; }
		if (typ == "alert") { return ProxSK_alert("Proxomitron meldet: \n" + eingabeText); }
		var obMeldung = ProxLCO.Prox_newElm("div");
		var meldungID = "ProxMeldungID" + Math.floor(Math.random()*10000);
		obMeldung.id = meldungID;
		var dhViewport = ( ProxLCO.ua.OPpre950 || ProxLCO.ua.CompatBack )? document.body : document.documentElement;
		if (typ == "LeisteBlink") {
			if      (dhViewport.clientHeight >= 50 && dhViewport.clientWidth >= 350) { var subtyp = "normal"; }
			else if (dhViewport.clientHeight >= 30 && dhViewport.clientWidth >= 230) { var subtyp = "klein"; }
			else if (dhViewport.clientHeight >= 50 && dhViewport.clientWidth >= 50) { typ = "SymbolBlink"; }
			else { typ = "RahmenBlink"; }
		}
		if (typ == "RahmenBlink") {
			var rFarbe = (farbe == "Ro")? "#ff0000": (farbe == "Ge")? "#FFEB0B": "#00cc00";
			document.body.style.border = "solid 5px" + rFarbe;
			ProxSK_setTimeout("document.body.style.border = \"\"",dauer);
			return;
		}
		else if (typ == "LeisteBlink") {
			ProxLCO.DomStyle.setTuples4Elm(obMeldung,[
				{name:"borderWidth",val:"3px"},{name:"borderStyle",val:"ridge"},{name:"borderColor",val:(farbe == "Ro")? "#ff0000" : (farbe == "Ge")? "#FFEB0B" : "#00cc00"},
				{name:"textAlign",val:"left"},{name:"color",val:"#000000"},{name:"fontFamily",val:"Arial, sans-serif"},{name:"fontStyle",val:"normal"},{name:"padding",val:"3px"},{name:"zIndex",val:"10000002"},
				{name:"fontWeight",val:"normal"},{name:"backgroundColor",val:(farbe == "Ro")? "#FFFAC1" : (farbe == "Ge")? "#FFFCDF" : "#efffef"}
			]);
			if (ProxLCO.ua.IEmode == 6) {
				obMeldung.style.left = "1px";
				obMeldung.style.width = (document.documentElement.clientWidth - 14) + "px";
				obMeldung.style.top = (document.documentElement.scrollTop + 1) + "px";
				obMeldung.style.position = "absolute";
			}
			else if (ProxLCO.ua.IEmode == 5) {
				obMeldung.style.width = (document.body.clientWidth - 2) + "px";
				obMeldung.style.top = (document.body.scrollTop + 1) + "px";
				obMeldung.style.left = "1px";
				obMeldung.style.position = "absolute";
			}
			else { // Das hier versteht sogar IE. Ab Version 7. Im CSS1-Modus.
				obMeldung.style.position = "fixed";
				obMeldung.style.left = "1px";
				obMeldung.style.right = "1px";
				obMeldung.style.top = "1px";
			}
			
			var obBild = ProxLCO.Prox_newElm("img");
			ProxLCO.DomStyle.setTuples4Elm(obBild,[
				{name:"verticalAlign",val:"middle"},{name:"display",val:"inline"},{name:"backgroundColor",val:"transparent"},
				{name:"margin",val:"0px"},{name:"border",val:"none"},{name:"padding",val:"0px"}
			]);
			var obTextbereich = ProxLCO.Prox_newElm("span");
			obTextbereich.appendChild(document.createTextNode(eingabeText));
			obTextbereich.style.marginLeft = "10px";
			obTextbereich.style.verticalAlign = "middle";
			if (subtyp == "normal") {
				obBild.setAttribute("src","http://local.ptron/ProxIcon32.png");
				obTextbereich.style.fontSize = "19px";
			}
			else if (subtyp == "klein") {
				obBild.setAttribute("src","http://local.ptron/ProxIcon16.png");
				obTextbereich.style.fontSize = "12px";
			}
			obMeldung.appendChild(obBild);
			obMeldung.appendChild(obTextbereich);
		}
		else if (typ == "SymbolBlink") {
			var obBild = ProxLCO.Prox_newElm("img");
			obBild.setAttribute("src","http://local.ptron/ProxIcon64.png");
			obBild.style.position = "absolute";
			obMeldung.appendChild(obBild);
			ProxLCO.DomStyle.setTuples4Elm(obMeldung,[
				{name:"width",val:"80px"},{name:"height",val:"80px"},{name:"borderStyle",val:"ridge"},{name:"borderWidth",val:"3px"},
				{name:"borderColor",val:(farbe == "Ro")? "#ff0000" : (farbe == "Ge")? "#FFEB0B" : "#00cc00"},
				{name:"backgroundImage",val:"url(http://local.ptron/808080a050.png)"}
			]);
			if (ProxLCO.ua.IEmode == 6) {
				obMeldung.style.left = Math.max(0,Math.floor(document.documentElement.clientWidth/2)-43) + "px";
				obMeldung.style.top = (document.documentElement.scrollTop + 1) + "px";
				obMeldung.style.position = "absolute";
				obBild.style.left = "7px";
				obBild.style.top = "7px";
			}
			else if (ProxLCO.ua.IEmode <= 7) { // Zentrierung durch auto-margins kann IE7 noch nicht. Deshalb wie IE6 behandeln.
				obMeldung.style.left = Math.max(0,Math.floor(document.body.clientWidth/2)-43) + "px";
				obMeldung.style.top = (document.body.scrollTop + 1) + "px";
				if (ProxLCO.ua.IEmode == 7) {
					obMeldung.style.position = "fixed";
				}
				else {
					obMeldung.style.position = "absolute";
					obMeldung.style.width = "86px";
					obMeldung.style.height = "86px";
				}
				obBild.style.left = "7px";
				obBild.style.top = "7px";
			}
			else {
				ProxLCO.DomStyle.setTuples4Elm(obMeldung,[
					{name:"position",val:"fixed"},{name:"margin",val:"auto"},{name:"left",val:"0"},{name:"right",val:"0"},
					{name:"top",val:"0"},{name:"bottom",val:"0"}
				]);
				ProxLCO.DomStyle.setTuples4Elm(obBild,[
					{name:"margin",val:"auto"},{name:"left",val:"0"},{name:"right",val:"0"},{name:"top",val:"0"},
					{name:"bottom",val:"0"},{name:"width",val:"64px"},{name:"height",val:"64px"}
				]);
			}
		}
		document.body.appendChild(obMeldung);
		ProxSK_setTimeout("ProxLCO.ProxMeldung_Loesch('"+meldungID+"')",dauer);
	};
	
	ProxLCO.ProxMeldung_Loesch = function (meldungID) {
		var obMeldung = document.getElementById(meldungID);
		document.body.removeChild(obMeldung);
		if (ProxLCO.ua.OP) { // Bei Opera kleben die Pixel ein Bisschen. Schütteln hilft.
			window.ProxSK_scrollBy(0,1);
			window.ProxSK_scrollBy(0,-1);
		}
	};
}

               /*----------------------------------------------*\
              /                                                  \
=============<   ENDE:     Meldefunktionen                        >=============
              \                                                  /
               \*----------------------------------------------*/






               /*----------------------------------------------*\
              /                                                  \
=============<   ANFANG:     Funktionen zur PopUp-Kontrolle       >=============
              \                                                  /
               \*----------------------------------------------*/

if (ProxSSRun && ProxLCO.ConfSC.indexOf("WOCActive") != -1) {
	
	ProxLCO.WOC = new Object();
	
	ProxLCO.WOC.WinTpl = function (typ,input2,input3,input4) {
		function methode() { return; }
		this.blur     = methode;
		this.focus    = methode;
		this.moveTo   = methode;
		this.resizeTo = methode;
		this.moveBy   = methode;
		this.resizeBy = methode;
		this.close    = methode;
		this.document = {
			body    : { innerHTML : "" },
			write   : methode,
			writeln : methode,
			open    : methode,
			close   : methode
		};
		this.closed = false;
		if (typ == "open") {
			this.typ    = typ;
			this.url    = input2;
			this.name   = input3;
			this.attrib = input4;
		}
		else if (typ == "showModelessDialog" || typ == "showModalDialog") {
			this.typ    = typ;
			this.url    = input2;
			this.arg    = input3;
			this.feat   = input4;
		}
		else if (typ == "showHelp") {
			this.typ    = typ;
			this.url    = input2;
			this.contextID = input3;
		}
		else if (typ == "createPopup") {
			this.typ  = typ;
			this.show = methode;
			this.hide = methode;
		}
		else {
			this.typ = "ungueltigerTyp";
		}
	};
	
	ProxLCO.WOC.oMUp = function () {
		if (ProxLCO.rchkOCO()) {
			ProxOCO.WOC.StartDate = new Date();
		}
	};
	
	ProxLCO.WOC.Open_ChkAttrib = function (atr) {
		var arAtr = atr.replace(/\s/g).split(",");
		var input2, input3;
		var arAtrNew = new Array();
		var rxExpPos1 = /(left|screenx|clientx)=((-|)\d+)/i;
		var rxExpPos2 = /(top|screeny|clienty)=((-|)\d+)/i;
		var rxExpSze1 = /(width|innerWidth)=((-|)\d+)/i;
		var rxExpSze2 = /(height|innerHeight)=((-|)\d+)/i;
		var rxExpOpt1 = /(hotkeys|location|menubar|status|toolbar|resizable|scrollbars|fullscreen)(=(yes|no|auto)|)/i;
		var boOpt1 = false;
		var xMax = Math.floor(screen.availWidth*0.8);
		var yMax = Math.floor(screen.availHeight*0.8);
		var wMax = Math.floor(screen.availWidth*0.8);
		var hMax = Math.floor(screen.availHeight*0.8);
		
		if (ProxLCO.ConfSC.indexOf("WOCRestSnP") != -1) {
			for (var i=0, atr; atr=arAtr[i]; i++) {
				if (input2 = rxExpPos1.exec(atr)) {
					if (isFinite(input2[2])) {
						input3 = parseInt(input2[2]);
						if (input3 >= 0 && input3 <= xMax) {
							arAtrNew[arAtrNew.length] = input2[1] + "=" + input3;
						}
					}
				}
				else if (input2 = rxExpPos2.exec(atr)) {
					if (isFinite(input2[2])) {
						input3 = parseInt(input2[2]);
						if (input3 >= 0 && input3 <= yMax) {
							arAtrNew[arAtrNew.length] = input2[1] + "=" + input3;
						}
					}
				}
				else if (input2 = rxExpSze1.exec(atr)) {
					if (isFinite(input2[2])) {
						input3 = parseInt(input2[2]);
						if (input3 >= 50 && input3 <= wMax) {
							arAtrNew[arAtrNew.length] = input2[1] + "=" + input3;
						}
					}
				}
				else if (input2 = rxExpSze2.exec(atr)) {
					if (isFinite(input2[2])) {
						input3 = parseInt(input2[2]);
						if (input3 >= 20 && input3 <= hMax) {
							arAtrNew[arAtrNew.length] = input2[1] + "=" + input3;
						}
					}
				}
			}
		}
		else {
			for (var i=0, atr; atr=arAtr[i]; i++) {
				if (input2 = rxExpPos1.exec(atr)) {
					if (isFinite(input2[2])) {
						input3 = parseInt(input2[2]);
						arAtrNew[arAtrNew.length] = input2[1] + "=" + input3;
					}
				}
				else if (input2 = rxExpPos2.exec(atr)) {
					if (isFinite(input2[2])) {
						input3 = parseInt(input2[2]);
						arAtrNew[arAtrNew.length] = input2[1] + "=" + input3;
					}
				}
				else if (input2 = rxExpSze1.exec(atr)) {
					if (isFinite(input2[2])) {
						input3 = parseInt(input2[2]);
						arAtrNew[arAtrNew.length] = input2[1] + "=" + input3;
					}
				}
				else if (input2 = rxExpSze2.exec(atr)) {
					if (isFinite(input2[2])) {
						input3 = parseInt(input2[2]);
						arAtrNew[arAtrNew.length] = input2[1] + "=" + input3;
					}
				}
			}
		}
		if (ProxLCO.ConfSC.indexOf("WOCForceCon") != -1) {
			for (var i=0, atr; atr=arAtr[i]; i++) {
				if (input2 = rxExpOpt1.exec(atr)) {
					boOpt1 = true;
				}
			}
		}
		else {
			for (var i=0, atr; atr=arAtr[i]; i++) {
				if (input2 = rxExpOpt1.exec(atr)) {
					arAtrNew[arAtrNew.length] = input2[1] + input2[2];
				}
			}
		}
		var stAtrNew = arAtrNew.join(",");
		if (boOpt1) { stAtrNew += ",hotkeys=yes,location=yes,menubar=yes,status=yes,toolbar=yes,resizable=yes,scrollbars=yes"; }
		return stAtrNew;
	};
	
	ProxLCO.WOC.Open_PrepAPI = function (fenster) {
		try {
			fenster.ProxSK_moveTo = fenster.moveTo;
			fenster.ProxSK_resizeTo = fenster.resizeTo;
			fenster.moveTo = function (){};
			fenster.resizeTo = function (){};
		}
		catch (e) {
			ProxLCO.DebugLog.push("SS:WOC.Open_PrepAPI:_Zugriff_verweigert");
		}
	};
	
	ProxLCO.WOC.All_chk = function () {
		var CurrentDate = new Date();
		CurrentDate.setTime(CurrentDate.getTime()-ProxOCO.WOC.StartDate.getTime());
		if(CurrentDate.getTime()<=2000) {
			return true;
		}
		else {
			return false;
		}
	};
	
	ProxLCO.WOC.All_Subst = function (typ,input2,input3,input4) {
		if(ProxLCO.WOC.All_chk()) {
			if (typ == "open") {
				if (ProxLCO.ConfSC.indexOf("WOCRmName") != -1 && input3) { input3 = ""; }
				if (input3 && input3 != "") { ProxLCO.WN.addName(input3); }
				if (input4) {
					var fenster = ProxSK_open(input2,input3,ProxLCO.WOC.Open_ChkAttrib(input4));
					if (ProxLCO.ConfSC.indexOf("WOCRestSnP") != -1) { ProxLCO.WOC.Open_PrepAPI(fenster); }
					return fenster;
				}
				else if (input3 && input3 != ""){
					var fenster = ProxSK_open(input2,input3);
					if (ProxLCO.ConfSC.indexOf("WOCRestSnP") != -1) { ProxLCO.WOC.Open_PrepAPI(fenster); }
					return fenster;
				}
				else {
					var fenster = ProxSK_open(input2);
					if (ProxLCO.ConfSC.indexOf("WOCRestSnP") != -1) { ProxLCO.WOC.Open_PrepAPI(fenster); }
					return fenster;
				}
			}
			if (typ == "showModelessDialog") {
				return(ProxSK_showModelessDialog(input2,input3,input4));
			}
			if (typ == "showModalDialog") {
				return(ProxSK_showModalDialog(input2,input3,input4));
			}
			if (typ == "showHelp") {
				return(ProxSK_showHelp(input2,input3));
			}
			if (typ == "createPopup") {
				return(ProxSK_createPopup());
			}
		}
		ProxOCO.WOC.WinCount++;
		
		var MeldungAnzeigen = false;
		var MeldungFarbe = "Gr";
		if (ProxOCO.WOC.WinCount > ProxOCO.WOC.WinCountMAX) { return null; }
		if (ProxOCO.WOC.WinCount == ProxOCO.WOC.WinCountMAX) {
			MeldungAnzeigen = true;
			MeldungFarbe = "Ro";
		}
		if(ProxLCO.ConfSC.indexOf("WOCNotifOpt") != -1) {
			MeldungAnzeigen = true;
		}
		if (MeldungAnzeigen) {
			ProxLCO.ProxMeldung("LeisteBlink",MeldungFarbe,2500,"PopUp blockiert (" + (ProxOCO.WOC.WinArray.length+1) + ") (Typ: " + typ + ")");
		}
		
		return ProxOCO.WOC.WinArray[ProxOCO.WOC.WinArray.length] = new ProxLCO.WOC.WinTpl(typ,input2,input3,input4);
	};
	
	window.open = function (url,nam,atr,atr2) {
		if (!ProxLCO.rchkOCO()) { return null; }
		if (ProxOCO.WOC.WinCount > ProxOCO.WOC.WinCountMAX) { return null; }
		if (typeof url != "string") { return null; }
		return(ProxLCO.WOC.All_Subst("open",url,nam,atr));
	};
	
	if (window.showModelessDialog) {
		window.showModelessDialog = function (url,arg,feat) {
			if (!ProxLCO.rchkOCO()) { return null; }
			if (ProxOCO.WOC.WinCount > ProxOCO.WOC.WinCountMAX) { return null; }
			if (typeof url != "string") { return null; }
			return(ProxLCO.WOC.All_Subst("showModelessDialog",url,arg,feat));
		};
	}
	
	if (window.showModalDialog) {
		window.showModalDialog = function (url,arg,feat) {
			if (!ProxLCO.rchkOCO()) { return null; }
			if (ProxOCO.WOC.WinCount > ProxOCO.WOC.WinCountMAX) { return null; }
			if (typeof url != "string") { return null; }
			return(ProxLCO.WOC.All_Subst("showModalDialog",url,arg,feat));
		};
	}
	
	if (window.showHelp) {
		window.showHelp = function (url,contextID) {
			if (!ProxLCO.rchkOCO()) { return null; }
			if (ProxOCO.WOC.WinCount > PProxOCO.WOC.WinCountMAX) { return null; }
			if (typeof url != "string") { return null; }
			return(ProxLCO.WOC.All_Subst("showHelp",url,contextID));
		};
	}
	
	if (window.createPopup) {
		window.createPopup = function (arg) {
			if (!ProxLCO.rchkOCO()) { return null; }
			if (ProxOCO.WOC.WinCount > ProxOCO.WOC.WinCountMAX) { return null; }
			return(ProxLCO.WOC.All_Subst("createPopup"));
		};
	}
	
	if (ProxLCO.ConfSC.indexOf("WOCAllowOnClick") != -1) {
		ProxLCO.EventManager.addWhenReady(document,"mousedown",ProxLCO.WOC.oMUp,true);
	}
	
}

               /*----------------------------------------------*\
              /                                                  \
=============<   ENDE:     Funktionen zur PopUp-Kontrolle         >=============
              \                                                  /
               \*----------------------------------------------*/






               /*----------------------------------------------*\
              /                                                  \
=============<   ANFANG:      Methoden umdefinieren               >=============
              \                                                  /
               \*----------------------------------------------*/



if (ProxSSRun) {
	if (ProxLCO.ConfSC.indexOf("NopFktWinMovRes") != -1) {
		(function () {
			function subst () {};
			window.resizeTo = subst;
			window.resizeBy = subst;
			window.moveTo   = subst;
			window.moveBy   = subst;
			if (window.sizeToContent) { window.sizeToContent = subst; }
		})();
	}
	else if (ProxLCO.ConfSC.indexOf("RstrFktWinMovRes") != -1) {
		if (!window.ProxSK_moveTo) {window.ProxSK_moveTo = window.moveTo;}
		if (!window.ProxSK_resizeTo) { window.ProxSK_resizeTo = window.resizeTo;}
		window.moveTo = function (x,y) {
			var xMax = Math.floor(screen.availWidth*0.8);
			var yMax = Math.floor(screen.availHeight*0.8);
			if ((x = parseInt(x)) && (y = parseInt(y)) && x > 0 && x <= xMax && y > 0 && y <= yMax) {
				return window.ProxSK_moveTo(x,y);
			}
		};
		window.resizeTo = function (x,y) {
			var wMax = Math.floor(screen.availWidth*0.8);
			var hMax = Math.floor(screen.availHeight*0.8);
			if ((x = parseInt(x)) && (y = parseInt(y)) && x >= 50 && x <= wMax && y >= 20 && y <= hMax) {
				return window.ProxSK_resizeTo(x,y);
			}
		};
	}
}


if (ProxSSRun) {
	(function () {
		function subvoid () {};
		function subtrue () { return true; };
		function subfalse () { return false; };
		function subint () { return 23; };
		if (ProxLCO.ConfSC.indexOf("FktWinFocBlu") != -1) {
			window.blur  = subvoid;
			window.focus = subvoid;
		}
		if (ProxLCO.ConfSC.indexOf("FktWinClose") != -1) {
			window.close = subvoid;
		}
		if (ProxLCO.ConfSC.indexOf("FktWinLocReload") != -1) {
			window.location.reload = subvoid;
		}
	})();
}


if (ProxSSRun) {
	(function () {
		function ehGlobalErlaubt (eh) {
			switch (eh) {
				case "resize"         : if (ProxLCO.ConfSC.indexOf("EHWinMoveRes")  != -1) return false; break;
				case "resizestart"    : if (ProxLCO.ConfSC.indexOf("EHWinMoveRes")  != -1) return false; break;
				case "resizeend"      : if (ProxLCO.ConfSC.indexOf("EHWinMoveRes")  != -1) return false; break;
				case "unload"         : if (ProxLCO.ConfSC.indexOf("EHPageUnload")  != -1) return false; break;
				case "close"          : if (ProxLCO.ConfSC.indexOf("EHPageUnload")  != -1) return false; break;
				case "beforeunload"   : if (ProxLCO.ConfSC.indexOf("EHPageUnload")  != -1) return false; break;
				case "drag"           : if (ProxLCO.ConfSC.indexOf("EHDragElem")    != -1) return false; break;
				case "dragstart"      : if (ProxLCO.ConfSC.indexOf("EHDragElem")    != -1) return false; break;
				case "dragend"        : if (ProxLCO.ConfSC.indexOf("EHDragElem")    != -1) return false; break;
				case "dragenter"      : if (ProxLCO.ConfSC.indexOf("EHDragElem")    != -1) return false; break;
				case "dragleave"      : if (ProxLCO.ConfSC.indexOf("EHDragElem")    != -1) return false; break;
				case "dragover"       : if (ProxLCO.ConfSC.indexOf("EHDragElem")    != -1) return false; break;
				case "drop"           : if (ProxLCO.ConfSC.indexOf("EHDragElem")    != -1) return false; break;
				case "dragdrop"       : if (ProxLCO.ConfSC.indexOf("EHDragElem")    != -1) return false; break;
				case "copy"           : if (ProxLCO.ConfSC.indexOf("EHClipb")       != -1) return false; break;
				case "cut"            : if (ProxLCO.ConfSC.indexOf("EHClipb")       != -1) return false; break;
				case "beforecopy"     : if (ProxLCO.ConfSC.indexOf("EHClipb")       != -1) return false; break;
				case "beforecut"      : if (ProxLCO.ConfSC.indexOf("EHClipb")       != -1) return false; break;
				case "mousemove"      : if (ProxLCO.ConfSC.indexOf("EHMouseMove")   != -1) return false; break;
				case "beforeprint"    : if (ProxLCO.ConfSC.indexOf("EHPrint")       != -1) return false; break;
				case "afterprint"     : if (ProxLCO.ConfSC.indexOf("EHPrint")       != -1) return false; break;
				default: return true;
			}
			return true;
		}
		if (window.addEventListener) {
			function zwischenhandler (eh, fkt, cpt) {
				if (ehGlobalErlaubt(eh)) { return this.ProxSK_addEventListener(eh, fkt, cpt); } else { return; }
			}
			window.ProxSK_addEventListener = window.addEventListener;
			document.ProxSK_addEventListener = document.addEventListener;
			if (document.body) { document.body.ProxSK_addEventListener = document.body.addEventListener; }
			window.addEventListener = zwischenhandler;
			document.addEventListener = zwischenhandler;
			if (document.body) { document.body.addEventListener = zwischenhandler; }
		}
		if (window.attachEvent) {
			function zwischenhandlerIE (eh, fkt) {
				if (ehGlobalErlaubt(eh.slice(2))) { return this.ProxSK_attachEvent(eh, fkt); } else { return; }
			}
			window.ProxSK_attachEvent = window.attachEvent;
			window.attachEvent = zwischenhandlerIE;
		}
	})();
}


if (ProxSSRun && ProxLCO.ConfJSAdID) {
	(function () {
		document.ProxSK_getElementById = document.getElementById;
		var arJSAdID = ProxLCO.ConfJSAdID.split(",");
		function elmIdVerboten (stId) {
			for (var i=0, stAdId; stAdId=arJSAdID[i]; i++) {
				if (stAdId == stId) return true;
			}
			return false;
		}
		function elmTpl (stTyp, stId) {
			this.innerHTML = "";
			this.style = {};
			this.id = stId;
		}
		document.getElementById = function (stId) {
			if (elmIdVerboten(stId)) {
				var temp = document.ProxSK_getElementById(stId);
				if (temp && temp.style) {
					temp.style.display = "none";
				}
				return new elmTpl("div", stId);
			}
			else {
				return document.ProxSK_getElementById(stId);
			}
		};
	})();
}


               /*----------------------------------------------*\
              /                                                  \
=============<   ENDE:        Methoden umdefinieren               >=============
              \                                                  /
               \*----------------------------------------------*/





if (ProxSSRun) {
	// Funktion zum Zusammenschrumpfen von Werbeframes
	ProxLCO.frameMinimieren = function (knoten) {
		if (!(typeof knoten == "object" && knoten.tagName && knoten.tagName == "FRAME")) { return; }
		var dhParentNode = knoten.parentNode;
		var dhChildNodes = dhParentNode.childNodes;
		if (dhParentNode.rows && dhParentNode.cols && dhParentNode.rows.indexOf(",") != -1 && dhParentNode.cols.indexOf(",") != -1) { return; } // rows + cols ist zu kompliziert
		var framenummer = -1; // Frames zählen:
		for (var i=0; i<dhChildNodes.length; i++) {
			if (dhChildNodes[i].tagName == "FRAME" || dhChildNodes[i].tagName == "FRAMESET") { framenummer++; }
			if (dhChildNodes[i] == knoten) { break; }
		}
		if (framenummer == -1) { return; }
		var stAttributName = null; // Attribut mit den Größenangaben suchen:
		if (dhParentNode.rows && dhParentNode.rows.indexOf(",") != -1) { stAttributName = "rows"; }
		else if (dhParentNode.cols && dhParentNode.cols.indexOf(",") != -1) { stAttributName = "cols"; }
		else { return; }
		var arAttributInhalt = dhParentNode[stAttributName].split(","); // Durch Kommata getrennte Framegrößen in Array aufsplitten
		if (arAttributInhalt[framenummer]) { arAttributInhalt[framenummer] = "0"; } // Größe für betreffenden Frame minimieren
		dhParentNode[stAttributName] = arAttributInhalt.join(","); // Array wieder zu String verbinden und Attributwert aktualisieren
		return;
	};
}


if (ProxSSRun) {
	// Zentrale Sammlung von Framenamen
	// 2. Teil: Funktionen
	ProxLCO.WN = new Object();
	ProxLCO.WN.addName = function (input) {
		if (ProxOCO.WN.obNames[input] == undefined) {
			ProxOCO.WN.stNames += input + ", ";
			ProxOCO.WN.obNames[input] = true;
		}
	};
	ProxLCO.WN.chkName = function (input) {
		if (ProxOCO.WN.obNames[input]) {
			return true;
		}
		else {
			return false;
		}
	};
	ProxLCO.WN.tellNames = function () {
		return ProxOCO.WN.stNames;
	};
	ProxLCO.WN.frameroller = function() {
		ProxLCO.WN.addName(window.name);
		if (window.frames.length) {
			for (var i = 0, dhFrame; dhFrame = window.frames[i]; i++) {
				try {
					ProxLCO.WN.addName(dhFrame.name);
				}
				catch (e) { }
			}
		}
	};
}



/* Funktion zum Hinzufügen von Listeneinträgen */
if (ProxSSRun) {
	ProxLCO.listwriter = function(aufrufer,liste,daten) {
		if(document.images) {
			(new Image()).src="http://listwriter.local/"+liste+"/?"+daten+"/";
			var objektBild = ProxLCO.Prox_newElm("img");
			objektBild.setAttribute("src","http://local.ptron/Symb-ChkGn1-16.png");
			aufrufer.appendChild(objektBild);
			aufrufer.style.color = "gray";
			aufrufer.onclick = null;
			aufrufer.style.cursor = "auto";
		}
		return true;
	};
}



/* Funktion zum Nachladen von Flash-Filmen (Opera/Firefox-Variante)
 * Der zugehörige Seitenfilter umschließt Flash-Objekte mit einem weiteren Objekt.
 * Die Funktion pellt das Original wieder aus und ersetzt damit das Dummy-Objekt.
 */
if (ProxSSRun) {
	ProxLCO.MMFlashLadenOP = function (knoten) {
		if (!(knoten && knoten.tagName && knoten.parentNode && knoten.childNodes)) { return false; }
		var VparentNode = knoten.parentNode;
		var VchildNodes = knoten.childNodes;
		var VchildNode = null;
		for (var i=0; i<VchildNodes.length; i++) {
			if (VchildNodes[i].tagName == "OBJECT" || VchildNodes[i].tagName == "EMBED") {
				VchildNode = VchildNodes[i];
				break;
			}
		}
		if (VchildNode == null) { return false; }
		VparentNode.replaceChild(VchildNode, knoten);
		return true;
	};
}




/* Funktion zum Löschen aller durch die aktuelle Seite gespeicherten Cookies. */
if (ProxSSRun) {
	ProxLCO.CookiesKill = function () {
		// Cookie-Killer aus Bookmarklet von Nontroppo --> http://nontroppo.org/wiki/BookMarklets
		var cookieString = document.cookie.split("; ");
		for(var cookieHost="."+location.host; cookieHost; cookieHost=(""+cookieHost).substr(1).match(/\..*$/)) {
			for(var sl=0; sl<2; ++sl) {
				for(var cookiePath="/"+location.pathname; cookiePath; cookiePath=cookiePath.substring(0,cookiePath.lastIndexOf('/'))) {
					for(var i=0, cookieWert; cookieWert=cookieString[i]; i++) {
						document.cookie = cookieWert + "; domain=" + cookieHost.slice(sl) + "; path=" + cookiePath.slice(1) + "/" + "; expires=" + new Date((new Date).getTime()-1e11).toGMTString();
					}
				}
			}
		}
	};
}




/* Entfernung von EHs, die auf altertümliche Art mit Tag-Attributen gesetzt worden sind.*/
if (ProxSSRun) {
	ProxLCO.legacyEHsBehandeln = function () {
		function ehGlobalEntfernen (eh) {
			eh = "on" + eh;
			if (window[eh] != undefined) { window[eh] = null; }
			if (document[eh] != undefined) { document[eh] = null; }
			if (document.documentElement[eh] != undefined) { document.documentElement[eh] = null; }
			if (document.body[eh] !== undefined) {
				if (ProxLCO.ua.Gecko) { document.body.setAttribute(eh,null); }
				else { document.body[eh] = null; }
			}
		}
		if (ProxLCO.ConfSC.indexOf("EHWinMoveRes") != -1) {
			ehGlobalEntfernen("resize");
			if (ProxLCO.ua.IE) {
				ehGlobalEntfernen("resizestart");
				ehGlobalEntfernen("resizeend");
			}
		}
		if (ProxLCO.ConfSC.indexOf("EHPageUnload") != -1) {
			ehGlobalEntfernen("unload");
			if (ProxLCO.ua.Gecko) {
				ehGlobalEntfernen("close");
			}
			if (ProxLCO.ua.IE) {
				ehGlobalEntfernen("beforeunload");
			}
		}
		if (ProxLCO.ConfSC.indexOf("EHDragElem") != -1) {
			if (ProxLCO.ua.Gecko) {
				ehGlobalEntfernen("dragdrop");
			}
			if (ProxLCO.ua.IE) {
				ehGlobalEntfernen("drag");
				ehGlobalEntfernen("dragstart");
				ehGlobalEntfernen("dragend");
				ehGlobalEntfernen("dragenter");
				ehGlobalEntfernen("dragleave");
				ehGlobalEntfernen("dragover");
				ehGlobalEntfernen("drop");
			}
		}
		if (ProxLCO.ConfSC.indexOf("EHClipb") != -1) {
			if (ProxLCO.ua.IE || ProxLCO.ua.FF3) {
				ehGlobalEntfernen("copy");
				ehGlobalEntfernen("cut");
				ehGlobalEntfernen("beforecopy");
				ehGlobalEntfernen("beforecut");
			}
		}
		if (ProxLCO.ConfSC.indexOf("EHMouseMove") != -1) {
			ehGlobalEntfernen("mousemove");
		}
		if (ProxLCO.ConfSC.indexOf("EHPrint") != -1) {
			if (ProxLCO.ua.IE) {
				ehGlobalEntfernen("beforeprint");
				ehGlobalEntfernen("afterprint");
			}
		}
	};
}


if (ProxSSRun) {
	ProxLCO.tagrollerLink = function () {
		for (var i = 0, doLi; doLi = document.links[i]; i++) {
			if (ProxLCO.ConfSC.indexOf("EHMouseOverLnk") != -1) {
				doLi.onmouseover = null;
				doLi.onmouseout  = null;
				doLi.parentNode.onmouseover = null;
				doLi.parentNode.onmouseout  = null;
			}
			else if (ProxLCO.ConfSC.indexOf("EHMouseOverExtLnk") != -1 && location.ProxIsDummy != true && doLi.getAttribute("href") && doLi.getAttribute("href").indexOf("://") != -1  && doLi.getAttribute("href").indexOf("://" + window.location.hostname) == -1) {
				doLi.onmouseover = null;
				doLi.onmouseout  = null;
				doLi.parentNode.onmouseover = null;
				doLi.parentNode.onmouseout  = null;
			}
			if (ProxLCO.ConfSC.indexOf("EHDragElem") != -1) {
				if (ProxLCO.ua.Gecko) {
					doLi.ondragdrop = null;
				}
				if (ProxLCO.ua.IE) {
					doLi.ondrag      = null;
					doLi.ondragstart = null;
					doLi.ondragend   = null;
					doLi.ondragenter = null;
					doLi.ondragleave = null;
					doLi.ondragover  = null;
					doLi.ondrop      = null;
				}
			}
			if (ProxLCO.ConfSC.indexOf("EHMouseDownUpElem") != -1) {
				doLi.onmousedown = null;
				doLi.onmouseup   = null;
				if (ProxLCO.ua.IE || ProxLCO.ua.Gecko) {
					doLi.oncontextmenu = null;
				}
			}
		}
	};
	
	ProxLCO.tagrollerImg = function() {
		for (var i = 0, doIm; doIm = document.images[i]; i++) {
			if (ProxLCO.ConfSC.indexOf("EHDragElem") != -1) {
				if (ProxLCO.ua.Gecko) {
					doIm.ondragdrop = null;
				}
				if (ProxLCO.ua.IE) {
					doIm.ondrag      = null;
					doIm.ondragstart = null;
					doIm.ondragend   = null;
					doIm.ondragenter = null;
					doIm.ondragleave = null;
					doIm.ondragover  = null;
					doIm.ondrop      = null;
				}
			}
			if (ProxLCO.ConfSC.indexOf("EHMouseDownUpElem") != -1) {
				doIm.onmousedown = null;
				doIm.onmouseup   = null;
				if (ProxLCO.ua.IE || ProxLCO.ua.Gecko) {
					doIm.oncontextmenu = null;
				}
			}
		}
	};
	
	ProxLCO.tagrollerTargets = function() {
		if (ProxLCO.env.winType == "single") {
			var arDoBa = document.getElementsByTagName("BASE");
			for (var i = 0, knoten; knoten = arDoBa[i]; i++) {
				var linkziel = knoten.getAttribute("target");
				if (linkziel && ProxLCO.WN.chkName(linkziel) === false) {
					knoten.removeAttribute("target");
				}
			}
			for (var i = 0, doLi; doLi = document.links[i]; i++) {
				var linkziel = doLi.getAttribute("target");
				if (linkziel && ProxLCO.WN.chkName(linkziel) === false) {
					var skriptaufruf = doLi.getAttribute("onclick");
					if (!skriptaufruf) {
						doLi.removeAttribute("target");
					}
				}
			}
		}
		else if (ProxLCO.env.winType == "frame") {
			var arDoBa = document.getElementsByTagName("BASE");
			for (var i = 0, knoten; knoten = arDoBa[i]; i++) {
				var linkziel = knoten.getAttribute("target");
				if (linkziel && (linkziel == "_new" || linkziel == "_blank")) {
					doLi.target = "_top";
				}
			}
			for (var i = 0, doLi; doLi = document.links[i]; i++) {
				var linkziel = doLi.getAttribute("target");
				if (linkziel && (linkziel == "_new" || linkziel == "_blank")) {
					doLi.target = "_top";
				}
			}
		}
		else {
			var arDoBa = document.getElementsByTagName("BASE");
			for (var i = 0, knoten; knoten = arDoBa[i]; i++) {
				var linkziel = knoten.getAttribute("target");
				if (linkziel && (linkziel == "_new" || linkziel == "_blank")) {
					knoten.removeAttribute("target");
				}
			}
			for (var i = 0, doLi; doLi = document.links[i]; i++) {
				var linkziel = doLi.getAttribute("target");
				if (linkziel && (linkziel == "_new" || linkziel == "_blank")) {
					doLi.removeAttribute("target");
				}
			}
		}
	};
}



if (ProxSSRun) {
	ProxLCO.nachlaeufer = function () {
		if (ProxLCO.nachlaeufer.gestartet) { return; }
		ProxLCO.DebugLog.push("SS:nachlaeufer:Start");
		ProxLCO.nachlaeufer.gestartet = true;
		ProxLCO.WN.frameroller();
		ProxLCO.legacyEHsBehandeln();
		// Bilder und Links erst nach onLoad durcharbeiten, weil viele der zu korrigierenden unerwünschten Änderungen durch onLoad-Skripten verursacht werden.
		window.ProxSK_setTimeout(ProxLCO.tagrollerLink,2000);
		window.ProxSK_setTimeout(ProxLCO.tagrollerImg,4000);
		if (ProxLCO.ConfSC.indexOf("LnkRemTgtIfNoFrmName") != -1) {
			if (ProxLCO.env.winType == "single") {
				window.ProxSK_setTimeout(ProxLCO.tagrollerTargets,2000);
			}
			else {
				window.ProxSK_setTimeout(ProxLCO.tagrollerTargets,4000);
			}
		}
		if (ProxLCO.ConfSC.indexOf("HdrCookiesKill") != -1 && location.ProxDummy != true) {
			window.ProxSK_setTimeout(ProxLCO.CookiesKill,5000);
		}
		if (!ProxLCO.ProxMeldung_chkStack.intervall) {
			ProxLCO.ProxMeldung_chkStack();
		}
		
		ProxLCO.EventManager.run();
		
		ProxLCO.Status.NachlaeuferFertig = true;
		ProxLCO.DebugLog.push("ES:ESnachlaeufer:Fertig");
	};
}


if (ProxSSRun) {
	ProxLCO.EventManager.addNow(window,"load",(function(){window.ProxSK_setTimeout(ProxLCO.nachlaeufer,1000);}));
	ProxLCO.EventManager.addNow(window,"DOMContentLoaded",(function(){window.ProxSK_setTimeout(ProxLCO.nachlaeufer,1000);}));
	
	ProxLCO.endwarter = function() {
		if (document.body) {ProxLCO.nachlaeufer();}
		else {window.ProxSK_setTimeout(ProxLCO.endwarter,2000);}
	};
	window.ProxSK_setTimeout(ProxLCO.endwarter,20000);
	
	ProxLCO.DebugLog.push("SS:Ende");
}




