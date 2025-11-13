// --- Custom Message Box Functions (to replace alert/confirm) ---
const messageBox = document.getElementById("message-box");
const messageText = document.getElementById("message-text");

function showMessage(text) {
  if (messageText && messageBox) {
    messageText.innerText = text;
    messageBox.style.display = "flex";
  } else {
    console.warn("Message box elements not found. Defaulting to console.");
    console.log(text);
  }
}

function hideMessage() {
  if (messageBox) {
    messageBox.style.display = "none";
  }
}

// --- Part 4.1: JS Events ---

// From 2.pdf, Slide 49 (onload)
function js_pageLoad() {
  // Check if message box elements exist before trying to show a message
  if (document.getElementById("message-box")) {
    showMessage("Page is finished loading! (onload event)");
  } else {
    console.log("Page is finished loading! (onload event)");
  }
}

// From 2.pdf, Slide 38 (onblur)
function js_upperCase(element) {
  element.value = element.value.toUpperCase();
}

// From 2.pdf, Slide 42 (onchange)
function js_selectChange(selectElement) {
  var x = selectElement.value;

  if (x) {
    // Only show if a value is selected
    showMessage("You selected: " + x);
  }
}

// From 2.pdf, Slide 45 (onfocus)
function js_focus(element) {
  element.style.background = "#fef08a"; // yellow-200
}

function js_focusOut(element) {
  element.style.background = "white";
}

// From 2.pdf, Slide 48 (onkeyup)
function js_keyUp(element) {
  element.value = element.value.toUpperCase();
}

// From 2.pdf, Slide 43 (ondblclick)
function js_doubleClick() {
  showMessage("You double-clicked the button! (ondblclick event)");
}

// From 2.pdf, Slide 41 (onmouseover)
function js_mouseOver() {
  showMessage("You hovered over the link! (onmouseover event)");
}

// From 2.pdf, Slide 50 (onmousedown / onmouseup)
function js_mouseDown(element) {
  element.style.color = "#ef4444"; // red-500
}

function js_mouseUp(element) {
  element.style.color = "#22c55e"; // green-500
}

// From 2.pdf, Slide 44 (onerror)
function js_imageError(element) {
  element.style.display = "none"; // Hide broken image
  showMessage("The image could not be loaded. (onerror event)");
}

// From 2.pdf, Slide 40 (onabort)
function js_imageAbort() {
  // This is harder to trigger manually, but the handler is here.
  showMessage("Image loading was aborted. (onabort event)");
}

// From 2.pdf, Slide 46 (onkeydown)
function js_keyDown() {
  console.log("Key down event fired (onkeydown)");
  // showMessage("Key down!"); // This is too annoying, will log to console instead
}

// From 2.pdf, Slide 47 (onkeypress)
function js_keyPress() {
  console.log("Key press event fired (onkeypress)");
  // showMessage("Key press!"); // Also too annoying
}

// --- Part 4.2: addEventListener ---

// From 2.pdf, Slide 53
// We must add the listener after the page loads
document.addEventListener("DOMContentLoaded", (event) => {
  const listenerButton = document.getElementById("js-eventlistener-btn");

  if (listenerButton) {
    listenerButton.addEventListener("click", js_eventListenerFunction);
  }

  // Ensure the messageBox and messageText are defined after DOM load
  // This is a safeguard in case the script runs before the elements are parsed
  if (!messageBox) {
    const messageBox = document.getElementById("message-box");
  }

  if (!messageText) {
    const messageText = document.getElementById("message-text");
  }
});

function js_eventListenerFunction() {
  showMessage("This message was triggered by addEventListener('click', ...)");
}

// --- Part 4.3: Form Validation ---

// From 2.pdf, Slide 55 & 57
function js_validateForm() {
  let name = document.jsFormValidate.name.value;
  let password = document.jsFormValidate.password.value;
  let password2 = document.jsFormValidate.password2.value;
  let num = document.jsFormValidate.num.value;
  let numLoc = document.getElementById("jsv-numloc");

  numLoc.innerHTML = ""; // Clear old error

  if (name == null || name == "") {
    showMessage("Name can't be blank");
    return false;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters long.");
    return false;
  }

  if (password != password2) {
    showMessage("Passwords must be the same!");
    return false;
  }

  if (num != "" && isNaN(num)) {
    numLoc.innerHTML = "Enter Numeric value only";
    return false;
  }

  showMessage("Form is valid! (Submission prevented for demo)");
  return false; // Prevent actual form submission for this demo
}

// --- Part 4.4: DOM Manipulation ---

// From 2.pdf, Slide 58
function js_getElement() {
  var x = document.getElementById("js-dom-header");
  showMessage("I am a " + x.tagName + " element");
}

// From 2.pdf, Slide 59
function js_getElements() {
  var x = document.getElementsByName("myInput");
  showMessage("There are " + x.length + " elements named 'myInput'");
}

// From 2.pdf, Slide 60
function js_getAnchors() {
  let content = "Anchor 0: " + document.anchors[0].innerHTML + "\n";
  content += "Anchor 1: " + document.anchors[1].innerHTML;
  showMessage(content);
}

// From 2.pdf, Slide 61
function js_getForms() {
  let formName = document.forms[1].name; // [0] is form 2.1, [1] is form 2.2
  showMessage("The second form's name is: " + formName);
}

// From 2.pdf, Slide 74
function js_createElement() {
  const para = document.createElement("p");
  para.innerText = "This is a dynamically created paragraph.";
  para.style.color = "#16a34a"; // green-600
  para.style.fontWeight = "500";
  document.getElementById("dom-creation-target").appendChild(para);
}

// From 2.pdf, Slide 71
function js_getActiveElement() {
  const element = document.activeElement.tagName;
  let id = document.activeElement.id;
  showMessage(
    "The active element is a <" +
      element +
      ">" +
      (id ? " with id '" + id + "'" : "")
  );
}

// --- Part 4.5: The Event Object ---

// From 2.pdf, Slide 63
function js_eventObjectCoords(event) {
  let x = event.clientX;
  let y = event.clientY;
  console.log("X coords: " + x + ", Y coords: " + y);
}

// From 2.pdf, Slide 64
function js_eventObjectKey(event) {
  showMessage("Key Unicode: " + event.keyCode);
}

// From 2.pdf, Slide 65
function js_eventObjectElement(event) {
  var targ;
  if (!event) var event = window.event;
  if (event.target) targ = event.target;
  else if (event.srcElement) targ = event.srcElement;
  if (targ.nodeType == 3)
    // defeat Safari bug
    targ = targ.parentNode;
  var tname = targ.tagName;
  showMessage("You clicked on a <" + tname + "> element.");

  // Stop event from bubbling up to the card's onmousedown
  event.stopPropagation();
}

// From 2.pdf, Slide 66
function js_eventObjectType(event) {
  showMessage("The event type was: " + event.type);

  // Stop event from bubbling up to the card's onmousedown
  event.stopPropagation();
}
