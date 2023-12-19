// Common JavaScript resources for AQart's web page's test-driven programming.
//
// Copyright (c) 2023-now Air Quality And Related Topics.
//
// This code is licensed under the terms of the 3-clause BSD license (also known as the modified BSD license). The full
// text of this license can be found at https://directory.fsf.org/wiki/License:BSD-3-Clause. It can also be found in the
// file named LICENSE.md located at the root of this repository.

function TestFunction(f, args, answer, id) {
    // Test function f and write results in container that has given id.
    let content = "";
    for (let i = 0; i < args.length; i++)
        content += Tagify("Argument " + (i+1) + " (" + (typeof args[i]) + ") = " + args[i], "div");
    content += Tagify("Expected answer (" + (typeof answer) + ") = " + answer, "div");
    const test = f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10]);
    const ok = (test === answer);
    if (ok) {
        content += Tagify("Test passed", "div");
    } else {
        content += Tagify("Got answer (" + (typeof test) + ") = " + test, "div");
        content += Tagify("Test NOT passed", "div");
    }
    const attributes = {class: "testresult " + (ok ? "passed" : "notpassed")};
    document.getElementById(id).innerHTML = Tagify(content, "div", attributes);
}
