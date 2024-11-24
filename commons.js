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
MATH_OPERATIONS["+"] = function (left, right) {return left + right;};
MATH_OPERATIONS["-"] = function (left, right) {return left - right;};
MATH_OPERATIONS["*"] = function (left, right) {return left * right;};
MATH_OPERATIONS["/"] = function (left, right) {return left / right;};
MATH_OPERATIONS["^"] = function (left, right) {return Math.pow(left, right);};
MATH_OPERATIONS["sqrt"] = function (left) {return Math.sqrt(left);};
MATH_OPERATIONS["sin"] = function (left) {return Math.sin(left);};
MATH_OPERATIONS["cos"] = function (left) {return Math.cos(left);};
MATH_OPERATIONS["exp"] = function (left) {return Math.exp(left);};

function MathOperation(type, left, right) {
    // Constructor for MathOperation instances.
    this.type = type;
    if (type != "number") {
        if (typeof left === "number")
            left = new MathOperation("number", left, null);
        if (typeof right === "number")
            right = new MathOperation("number", right, null);
    }
    this.left = left;
    this.right = right;
}

MathOperation.prototype.unary = function() {
    // Return true if and only if this instance represents a unary operation.
    return ((this.type == "number") || (this.type == "sqrt") || (this.type == "sin") ||
            (this.type == "cos") || (this.type == "exp"));
}

MathOperation.prototype.binary = function() {
    // Return true if and only if this instance represents a binary operation.
    return ! this.unary();
}

MathOperation.prototype.eval = function() {
    // Return the numerical value of the result of the operation.
    if (this.type == "number")
        return this.left;
    var left = this.left.eval();
    if (this.binary())
        var right = this.right.eval();
    return MATH_OPERATIONS[this.type](left, right);
}

MathOperation.prototype.toString = function() {
    // Return the string representation of MathOperation instance.
    if (this.type == "number")
        return this.left;
    var left = this.left.type == "number" ? this.left : "(" + this.left + ")";
    if (this.unary())
        return this.type + "(" + left + ")";
    var right = this.right.type == "number" ? this.right : "(" + this.right + ")";
    return left + " " + this.type + " " + right;
}
