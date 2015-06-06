var keysToIntercept = [];

keysToIntercept.push(new keyDefinition(9,  ["ctrl", "shift"], "select previous tab"));
keysToIntercept.push(new keyDefinition(87, ["accel", "shift"], "close window"));
keysToIntercept.push(new keyDefinition(84, ["accel", "shift"], "restore tab"));
keysToIntercept.push(new keyDefinition(80, ["accel", "shift"], "open private window (Firefox)"));
keysToIntercept.push(new keyDefinition(78, ["accel", "shift"], "open private window (Chrome)"));
keysToIntercept.push(new keyDefinition(9,  ["ctrl"], "select next tab"));
keysToIntercept.push(new keyDefinition(87, ["accel"], "close tab"));
keysToIntercept.push(new keyDefinition(84, ["accel"], "new tab"));
keysToIntercept.push(new keyDefinition(78, ["accel"], "new window"));
keysToIntercept.push(new keyDefinition(81, ["accel"], "quit"));

// update the table in the page with the keys we are intercepting
var descriptionTable = document.getElementById("descriptions");
for (var i = 0; i < keysToIntercept.length; i++) {
  var keyToIntercept = keysToIntercept[i];
  var tr = document.createElement("tr");

  var td1 = document.createElement("td");
  td1.textContent = keyToIntercept.description;
  tr.appendChild(td1);

  var td2 = document.createElement("td");
  td2.textContent = keysToString(keyToIntercept);
  tr.appendChild(td2);

  descriptionTable.appendChild(tr);
}

document.addEventListener("keydown", handleKeys, true);

function keyDefinition(keyCode, modifiers, description) {
  this.keyCode = keyCode;
  this.modifiers = modifiers;
  this.description = description;
}

function keyPressMatches(keyPress, event) {

  function modifierIsSet(modifier, event) {
    switch (modifier) {
      case "accel":
        return event.metaKey;
      case "shift":
        return event.shiftKey;
      case "ctrl":
        return event.ctrlKey;
    }
  }

  if (event.keyCode != keyPress.keyCode) {
    return false;
  }
  for (var i = 0; i < keyPress.modifiers.length; i++) {
    if (!modifierIsSet(keyPress.modifiers[i], event)) {
      return false;
    }
  }
  return true;
}

function keysToString(keyPress) {
  var result = "";
  for (var i = 0; i < keyPress.modifiers.length; i++) {
    result = result + keyPress.modifiers[i] + " + "
  }
  if (keyPress.keyCode == 9) {
    result = result + "tab";
  }
  else {
    result = result + String.fromCharCode(keyPress.keyCode);
  }
  return result;
}

function handleKeys(event) {

  for (var i = 0; i < keysToIntercept.length; i++) {
    keyPress = keysToIntercept[i];
    if (keyPressMatches(keyPress, event)) {
      var output = document.getElementById("output");
      output.textContent = "intercepted " + keysToString(keyPress);
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }
}
