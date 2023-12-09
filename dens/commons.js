// Common JavaScript resources for AQart's differential equations numerical solver.
//
// Copyright (c) 2023-now Air Quality And Related Topics.
//
// This code is licensed under the terms of the 3-clause BSD license (also known as the modified BSD license). The full
// text of this license can be found at https://directory.fsf.org/wiki/License:BSD-3-Clause. It can also be found in the
// file named LICENSE.md located at the root of this repository.

function Tagify(s, tag, attributes) {
    // Return string s wrapped around given tag with given attributes.
    let out = "<" + tag;
    for (var name in attributes) out += " " + name + '="' + attributes[name] + '"';
    return out + ">" + s + "</" + tag + ">";
}

function LetterPicker(caller) {
    // Create and show the letter-picking window.
    const current = document.getElementById(caller.id).innerHTML;
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let content = "";
    for (let i = 0; i < 2; i++) {
        if (i == 1) letters = letters.toUpperCase();
        var s = ""
        for (var j = 0; j < letters.length; j++) {
            var attributes = {onclick: "LetterPickerSelected('" + letters[j] + "', '" + caller.id + "')"};
            if (letters[j] == current) attributes["class"] = "active";
            s += Tagify(letters[j], "button", attributes);
        }
        content += Tagify(s, "div")
    }
    let picker = document.getElementById("letterpicker");
    picker.innerHTML = content;
    picker.style.display = "flex";
}

function LetterPickerSelected(letter, id) {
    // Callback for when a letter button is clicked in the letter picker.
    document.getElementById(id).innerHTML = letter;
    document.getElementById("letterpicker").style.display = "none";
}
