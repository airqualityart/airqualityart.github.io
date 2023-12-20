// Common JavaScript resources for AQart's web page's test-driven programming.
//
// Copyright (c) 2023-now Air Quality And Related Topics.
//
// This code is licensed under the terms of the 3-clause BSD license (also known as the modified BSD license). The full
// text of this license can be found at https://directory.fsf.org/wiki/License:BSD-3-Clause. It can also be found in
// the file named LICENSE.md located at the root of this repository.

let n_tests_total = 0;
let n_tests_passed = 0;

function TestFunction(f, args, answer, id) {
    // Test function f and write results in container that has given id.
    n_tests_total += 1;
    let content = "";
    for (let i = 0; i < args.length; i++)
        content += Tagify("Argument " + (i+1) + " (" + (typeof args[i]) + ") = " + args[i], "div");
    content += Tagify("Expected answer (" + (typeof answer) + ") = " + answer, "div");
    const test = f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10]);
    const ok = (test === answer);
    if (ok) {
        n_tests_passed += 1;
        content += Tagify("Test passed", "div");
    } else {
        content += Tagify("Got answer (" + (typeof test) + ") = " + test, "div");
        content += Tagify("Test NOT passed", "div");
    }
    const attributes = {class: "testresult " + (ok ? "passed" : "notpassed")};
    document.getElementById(id).innerHTML = Tagify(content, "div", attributes);
}

function ToggleShowPassedTests(button) {
    // Toggle showing/hiding tests that passed.
    const hide = (button.innerHTML == "Hide passed tests");
    const display = hide ? "none" : "block";
    const text = (hide ? "Show" : "Hide") + " passed tests";
    for (let test of document.getElementsByClassName("testresult")) {
        if (test.className.split(" ").indexOf("passed") < 0) continue;
        test.style.display = display;
        button.innerHTML = text;
    }
}

function DisplayNumberOFPassedTests() {
    // Display the number of passed and total tests.
    const allgood = (n_tests_passed == n_tests_total);
    const from = allgood ? "notallgood" : "allgood" ;
    const to = allgood ? "allgood" : "notallgood" ;
    const e = document.getElementById("testssummary");
    const classes = e.className.split(" ");
    if (classes.length == 1 && classes[0] == "")
        var i = 0;
    else
        var i = classes.indexOf(from);
    if (i >= 0)
        classes[i] = to;
    else
        classes.push(to);
    e.className = classes.join(" ");
    e.innerHTML = "Summary: " + n_tests_passed + " successful tests out of " + n_tests_total + ".";
}
