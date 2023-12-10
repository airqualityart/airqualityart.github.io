// Common JavaScript resources for AQart's differential equations numerical solver.
//
// Copyright (c) 2023-now Air Quality And Related Topics.
//
// This code is licensed under the terms of the 3-clause BSD license (also known as the modified BSD license). The full
// text of this license can be found at https://directory.fsf.org/wiki/License:BSD-3-Clause. It can also be found in the
// file named LICENSE.md located at the root of this repository.

let MAX_ORDER = 9;

function Tagify(s, tag, attributes) {
    // Return string s wrapped around given tag with given attributes.
    let out = "<" + tag;
    for (var name in attributes) out += " " + name + '="' + attributes[name] + '"';
    return out + ">" + s + "</" + tag + ">";
}

function CharacterPicker(characters, caller, callback, current) {
    // Create and show a character-picking window.
    let content = "";
    for (let i = 0; i < characters.length; i++) {
        var s = "";
        for (var j = 0; j < characters[i].length; j++) {
            var c = characters[i][j];
            var attributes = {onclick: callback + "('" + c + "', '" + caller.id + "')"};
            if (c == current) attributes["class"] = "active";
            s += Tagify(c, "button", attributes);
        }
        content += Tagify(s, "div");
    }
    document.getElementById("shadedbackground").style.display = "block";
    document.getElementById("characterpicker").innerHTML = content;
    document.getElementById("characterpicker").style.display = "flex";
}

function LetterPicker(caller) {
    // Create and show the letter-picking window.
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const current = document.getElementById(caller.id).innerHTML;
    CharacterPicker([letters, letters.toUpperCase()], caller, "OnLetterPickerSelected", current);
}

function GetEquationOrder() {
    // Return the current equation order.
    return Number(document.getElementById("orderpicker").innerHTML[0]);
}

function OrderPicker(caller) {
    // Create and show the order-picking window.
    let numbers = "";
    for (let i = 0; i < MAX_ORDER; i++) numbers += (i+1);
    CharacterPicker([numbers], caller, "OnOrderPickerSelected", GetEquationOrder().toString());
}

function OnLetterPickerSelected(letter, id) {
    // Callback for when a letter button is clicked in the letter picker.
    document.getElementById(id).innerHTML = letter;
    document.getElementById("characterpicker").style.display = "none";
    document.getElementById("shadedbackground").style.display = "none";
}

function OnOrderPickerSelected(order, id) {
    // Callback for when a number button is clicked in the order picker.
    let s = "th";
    if (order == "1")
        s = "st";
    else if (order == "2")
        s = "nd";
    else if (order == "3")
        s = "rd";
    document.getElementById(id).innerHTML = order + Tagify(s, "sup") + " order";
    document.getElementById("characterpicker").style.display = "none";
    document.getElementById("shadedbackground").style.display = "none";
}

function OpenForm() {
    // Modify the form according to user choices and display it.
    const ind = document.getElementById("indvarpicker").innerHTML;
    const dep = document.getElementById("depvarpicker").innerHTML;
    const order = GetEquationOrder();
    let primes = [""];
    for (let i = 0; i < MAX_ORDER; i++) primes.push(primes[primes.length-1] + "'");
    document.getElementById("odeform_indmin_label").innerHTML = ind + Tagify("min", "sub") + " =";
    document.getElementById("odeform_indmax_label").innerHTML = ind + Tagify("max", "sub") + " =";
    document.getElementById("odeform_eq_label").innerHTML = dep + primes[order] + " =";
    for (i = 0; i < MAX_ORDER; i++) {
        var id = "odeform_ic" + i + "_label";
        document.getElementById(id).innerHTML = dep + primes[i] + "(" + ind + Tagify("min", "sub") + ") =";
        document.getElementById(id + "input").style.display = (i < order) ? "block" : "none";
    }
    document.getElementById("shadedbackground").style.display = "block";
    document.getElementById("odeform").style.display = "flex";
}

function OnFormSubmit() {
    // Actions taken when the user submits the form.
    document.getElementById("odeform").style.display = "none";
    document.getElementById("shadedbackground").style.display = "none";
}
