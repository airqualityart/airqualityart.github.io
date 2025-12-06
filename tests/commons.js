// Copyright (c) 2023-now Air Quality And Related Topics.
//
// License: BSD 3-clause "new" or "revised" license (BSD-3-clause).
//
// Common JavaScript resources for AQart's web page's test-driven programming.

let n_tests_total = 0;
let n_tests_passed = 0;

function arraysAreEqual(array1, array2) {
    // Test equality between two arrays.
    //
    // Parameters
    // ----------
    // array1: array of anything
    //     First array to compare.
    // array2: array of anything
    //     Second array to compare.
    //
    // Returns
    // -------
    // bool
    //     True if array1 and array2 are equal, false otherwise.
    //
    n = array1.length;
    if (array2.length != n) return false;
    for (i = 0; i < n; i++) {
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            ok = arraysAreEqual(array1[i], array2[i]);
        } else if (typeof array1[i].equals === "function") {
            ok = array1[i].equals(array2[i]);
        } else if (typeof array2[i].equals === "function") {
            ok = array2[i].equals(array1[i]);
        } else {
            ok = array1[i] == array2[i];
        }
        if (! ok) return false;
    }
    return true;
}

function PrettyPrint(obj) {
    // Pretty-print given object.
    //
    // Parameters
    // ----------
    // obj: anything
    //     Object to pretty print.
    //
    // Returns
    // -------
    // str
    //     The pretty-printed version of input object.
    //
    if (typeof obj !== "object")
        out = obj;
    else if (typeof obj.toString === "function")
        out = obj.toString();
    else {
        keys = [];
        for (key in obj)
            keys.push(key);
        strings = keys.sort().map(
            function (value, index, array) {
                return value + ": " + PrettyPrint(obj[value])
            }
        );
        out = "{" + strings.join(", ") + "}";
    }
    return out;
}

function ShowTestResult(args, result, answer, header, id, tol) {
    // Show the result of a test.
    //
    // Argument "tol" is optional and defines a numerical tolerance for comparison of floating-point numbers.
    //
    n_tests_total += 1;
    let content = header;
    if (args.length == 0)
        content += Tagify("No arguments", "div");
    else
        for (let i = 0; i < args.length; i++)
            content += Tagify("Argument " + (i+1) + " (" + (typeof args[i]) + ") = " + PrettyPrint(args[i]), "div");
    content += Tagify("Expected answer (" + (typeof answer) + ") = " + answer, "div");
    if (tol === undefined)
        if (result instanceof Array && answer instanceof Array) {
            var ok = arraysAreEqual(result, answer);
        } else {
            var ok = (result === answer);
        }
    else {
        var ok = (Math.abs(result - answer) <= tol);
        content += Tagify("Tolerance = " + tol, "div");
    }
    if (ok) {
        n_tests_passed += 1;
        content += Tagify("Test passed", "div");
    } else {
        content += Tagify("Got answer (" + (typeof result) + ") = " + result, "div");
        content += Tagify("Test NOT passed", "div");
    }
    const attributes = {class: "testresult " + (ok ? "passed" : "notpassed")};
    document.getElementById(id).innerHTML = Tagify(content, "div", attributes);
}

function TestFunction(f, args, answer, id, tol) {
    // Test function f with given arguments and write results in container that has given id.
    //
    // Argument "tol" is optional and defines a numerical tolerance for comparison of floating-point numbers.
    //
    const result = f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9],
                     args[10], args[11], args[12], args[13], args[14], args[15], args[16], args[17], args[18]);
    ShowTestResult(args, result, answer, "", id, tol);
}

function TestObjectMethod(obj, method, args, answer, id, tol) {
    // Test method of object with given arguments and write results in container that has given id.
    //
    // Argument "tol" is optional and defines a numerical tolerance for comparison of floating-point numbers.
    //
    const header = Tagify("Object: " + obj, "div") + Tagify("Method: " + method, "div");
    const result = obj[method](args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8],
                               args[9], args[10], args[11], args[12], args[13], args[14], args[15], args[16]);
    ShowTestResult(args, result, answer, header, id, tol);
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
