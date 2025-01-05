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

function PreprocessMathString(s) {
    // Return a pre-processed version of string s (which should represent a mathematical expression).
    //
    // This function:
    // - removes white space.
    // - removes global parentheses and brackets (curly and square).
    // - replaces implicit multiplications with explicit multiplications (eg. 3x -> 3*x, leading -x -> -1*x)
    //
    s = s.replace(/\s+/g, "");
    while (s.length >= 2 && "([{".includes(s[0]) && IndexMatchingCharacter(s, 0) == s.length-1)
        s = s.substring(1, s.length-1);
    let letter = new RegExp(/^[a-z]|[A-Z]$/);
    let number = new RegExp(/^[0-9]$/);
    if (s.length >= 2 && s[0] == "-" && letter.test(s[1])) s = "-1*" + s.substring(1);
    let i = 0;
    while (i < s.length-1)
        if (number.test(s[i]) && letter.test(s[i+1])) {
            s = s.substring(0, i+1) + "*" + s.substring(i+1);
            i += 3;
        } else {
            i += 1;
        }
    return s;
}

function NumberSubstring(s, i, allow_exponent=true) {
    // Return the substring of s that represents the number that starts at s[i], return null if problem.
    let n = s.length;
    if (i < 0 || i >= n) return null;
    let number = new RegExp(/^[0-9]$/);
    let exponent = new RegExp(/^(e|E)$/);
    let found_period = false;
    let j = i + (s[i] == "-" ? 1 : 0);
    while (j < n) {
        if (exponent.test(s[j])) {
            if (!allow_exponent) return null;
            let second_part = NumberSubstring(s, j+1, false);
            return second_part === null ? null : s.substring(i, j+1) + second_part;
        } else if (s[j] == ".") {
            if (found_period) return null;
            found_period = true;
            j++;
        } else if (number.test(s[j])) {
            j++;
        } else {
            break;
        }
    }
    return (j == i || j == i+1 && s[i] == "-") ? null : s.substring(i, j);
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
    if (type != "number" && type != "variable") {
        if (typeof left === "number")
            left = new MathOperation("number", left, null);
        else if (typeof left === "string")
            left = new MathOperation("variable", left, null);
        if (typeof right === "number")
            right = new MathOperation("number", right, null);
        else if (typeof right === "string")
            right = new MathOperation("variable", right, null);
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

MathOperation.prototype.eval = function(variables={}) {
    // Return the numerical value of the result of the operation.
    switch (this.type) {
    case "number":
        return this.left;
    case "variable":
        return variables[this.left];
    default:
        var left = this.left.eval(variables=variables);
        if (this.binary())
            var right = this.right.eval(variables=variables);
        return MATH_OPERATIONS[this.type](left, right);
    }
}

MathOperation.prototype.toString_needs_parentheses = function() {
    // Return true if and only if string representation of object needs parentheses.
    return this.type != "number" && this.type != "variable" && this.binary();
}

MathOperation.prototype.toString = function() {
    // Return the string representation of MathOperation instance.
    switch (this.type) {
    case "number":
        return this.left;
    case "variable":
        return this.left;
    default:
        var left = this.left.toString_needs_parentheses() && !this.unary() ? "(" + this.left + ")" : this.left;
        if (this.unary())
            return this.type + "(" + left + ")";
        var right = this.right.toString_needs_parentheses() ? "(" + this.right + ")" : this.right;
        return left + " " + this.type + " " + right;
    }
}

function ParseMathExpression(s) {
    // Return the MathOperation object that corresponds to given character string representing a math expression.
    s = PreprocessMathString(s);
    let n = s.length;
    if (n == 0) return null;
    return "TODO implement this function!"
}
