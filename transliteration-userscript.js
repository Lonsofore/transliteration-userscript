// ==UserScript==
// @name            Transliteration script (RU-EN, EN-RU)
// @name:ru         Скрипт для транслитерации (RU-EN, EN-RU)
// @description     Transliterate input field on almost any page with Ctrl+Q (works with russian and english keyboard only)
// @description:ru  С помощью данного скрипта можно транслитирировать поле для ввода почти на любой странице по нажатию Ctrl+Q (работает только с русском и английском раскладкой)
// @author          Lonsofore
// @namespace       https://github.com/lonsofore/transliteration-userscript
// @match           *://*/*
// ==/UserScript==

lang_ru =
    {"`":"ё","q":"й","w":"ц","e":"у","r":"к","t":"е","y":"н","u":"г","i":"ш","o":"щ","p":"з","[":"х","]":"ъ","a":"ф","s":"ы","d":"в","f":"а","g":"п","h":"р","j":"о","k":"л","l":"д",";":"ж","'":"э","z":"я","x":"ч","c":"с","v":"м","b":"и","n":"т","m":"ь",",":"б",".":"ю","/":".","~":"Ё","Q":"Й","W":"Ц","E":"У","R":"К","T":"Е","Y":"Н","U":"Г","I":"Ш","O":"Щ","P":"З","{":"Х","}":"Ъ","A":"Ф","S":"Ы","D":"В","F":"А","G":"П","H":"Р","J":"О","K":"Л","L":"Д",":":"Ж","\"":"Э","Z":"Я","X":"Ч","C":"С","V":"М","B":"И","N":"Т","M":"Ь","<":"Б",">":"Ю","?":",","@":"\"","#":"№","$":";","^":":","&":"?","|":"/"}
;

lang_en = {};
for (var key in lang_ru) {
	lang_en[lang_ru[key]] = key
}

function swap(line) {
	newline = "";
	for (i=0; i<line.length; i++) {
		let = line[i];
		if (lang_ru[let] != undefined)
			newline += lang_ru[let];
		else if (lang_en[let] != undefined)
			newline += lang_en[let];
		else
			newline += let;
	}
	return newline;
}

function trySwap() {
	field = undefined;
	if (document.activeElement != undefined) {
		if (document.activeElement.value != undefined && document.activeElement.value != "") 
			document.activeElement.value = swap(document.activeElement.value)
		else if (document.activeElement.innerText != "")
			document.activeElement.innerText = swap(document.activeElement.innerText);
	}
}

function runOnKeys(func) {
	var codes = [].slice.call(arguments, 1);
	var pressed = {};

	document.onkeydown = function(e) {
		e = e || window.event;
		
		pressed[e.keyCode] = true;

		for (var i = 0; i < codes.length; i++) {
			if (!pressed[codes[i]]) {
				return;
			}
		}

		// protect from alert - it can freeze other way
		pressed = {};

		func();
	};

	document.onkeyup = function(e) {
		e = e || window.event;
		delete pressed[e.keyCode];
	};
}

runOnKeys(
	trySwap,
	"Q".charCodeAt(0),
	17 // Ctrl
);