// Common JavaScript resources for AQart's web page.
//
// Copyright (c) 2023-now Air Quality And Related Topics.
//
// This code is licensed under the terms of the 3-clause BSD license (also known as the modified BSD license). The full
// text of this license can be found at https://directory.fsf.org/wiki/License:BSD-3-Clause. It can also be found in
// the file named LICENSE.md located at the root of this repository.

function Tagify(s, tag, attributes) {
    // Return string s wrapped around given tag with given attributes.
    let out = "<" + tag;
    for (var name in attributes) out += " " + name + '="' + attributes[name] + '"';
    return out + ">" + s + "</" + tag + ">";
}

function IndexMatchingCharacter(s, i) {
    // Return the index of character (in string s) that matches/closes the one at index i (return null if any problem).
    let open = s[i];
    switch (open) {
    case "(":
        var close = ")"; break;
    case "[":
        var close = "]"; break;
    case "{":
        var close = "}"; break;
    default:
        return null;
    }
    let n = 1;
    i += 1;
    while (n > 0 && i < s.length) {
        n += (s[i] == open) - (s[i] == close);
        i += 1;
    }
    return (n == 0) ? i-1 : null;
}

function SimplifyMathString(s) {
    // Return a simplified version of string s (which should represent a mathematical expression).
    //
    // This function removes heading and leading white space, as well as global parentheses and brackets.
    s = s.trim();
    while (s.length >= 2 && "([{".includes(s[0]) && IndexMatchingCharacter(s, 0) == s.length-1)
        s = s.substring(1, s.length-1).trim();
    return s;
}

let MATH_OPERATIONS = {};
MATH_OPERATIONS["number"] = function (left, right) {return left;};
MATH_OPERATIONS["+"] = function (left, right) {return left + right;};
MATH_OPERATIONS["-"] = function (left, right) {return left - right;};
MATH_OPERATIONS["*"] = function (left, right) {return left * right;};
MATH_OPERATIONS["/"] = function (left, right) {return left / right;};
MATH_OPERATIONS["^"] = function (left, right) {return Math.pow(left, right);};
MATH_OPERATIONS["sqrt"] = function (left, right) {return Math.sqrt(left);};
MATH_OPERATIONS["sin"] = function (left, right) {return Math.sin(left);};
MATH_OPERATIONS["cos"] = function (left, right) {return Math.cos(left);};
MATH_OPERATIONS["exp"] = function (left, right) {return Math.exp(left);};

function MathOperation(type, left, right) {
    // Constructor for MathOperation instances.
    this.type = type;
    this.left = left;
    this.right = right;
}

MathOperation.prototype.eval = function() {
    // Return the numerical value of the result of the operation.
    return MATH_OPERATIONS[this.type](this.left, this.right);
}

MathOperation.prototype.toString = function() {
    // Return the string representation of MathOperation instance.
    let answer = "MathOperation: "
    if (this.type == "number")
        answer += "the number " + this.left;
    else if (["sqrt", "sin", "cos", "exp"].includes(this.type))
        answer += this.type + "(" + this.left + ")";
    else
        answer += this.left + " " + this.type + " " + this.right;
    return answer;
}
