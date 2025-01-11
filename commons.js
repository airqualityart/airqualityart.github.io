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
    // - returns null if ambiguous white space is found
    //
    ambiguous_white_space = new RegExp(/([a-z]|[A-Z]|_)\s+([a-z]|[A-Z]|_)/)
    if (ambiguous_white_space.test(s)) return null;
    s = s.replace(/\s+/g, "");
    while (s.length >= 2 && "([{".includes(s[0]) && IndexMatchingCharacter(s, 0) == s.length-1)
        s = s.substring(1, s.length-1);
    let letter = new RegExp(/^([a-z]|[A-Z])$/);
    let number = new RegExp(/^([0-9]|\.)$/);
    let exponent = new RegExp(/^(e|E)$/);
    let close = new RegExp(/^(\)|\]|})$/);
    let ok_after_exponent = new RegExp(/^([0-9]|\+|-|\.)$/);
    if (s.length >= 2 && s[0] == "-" && letter.test(s[1])) s = "-1*" + s.substring(1);
    let i = 0;
    while (i < s.length-1)
        if (number.test(s[i]) && letter.test(s[i+1])) {
            if (i+2 < s.length && exponent.test(s[i+1]) && ok_after_exponent.test(s[i+2])) {
                i += 1;
            } else {
                s = s.substring(0, i+1) + "*" + s.substring(i+1);
                i += 2;
            }
        } else if (close.test(s[i]) && (letter.test(s[i+1]) || number.test(s[i+1]))) {
            s = s.substring(0, i+1) + "*" + s.substring(i+1);
            i += 2;
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

function String2Number(s) {
    // Return the number represented by character string s.
    //
    // This function assumes that input s is valid.
    split = s.replace("E", "e").split("e");
    out = Number(split[0]);
    if (split.length > 1) out = out * Math.pow(10, Number(split[1]));
    return out
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
        return this.left.toString();
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
    //
    // This implementation is quite clunky and needs to be cleaned up and split into smaller functions.
    s = PreprocessMathString(s);
    if (s === null) return null;
    let n = s.length;
    if (n == 0 || s == "-" || s[0] == "_") return null;
    // Case where the expression is just a number
    let numstr = NumberSubstring(s, 0);
    if (numstr !== null && numstr.length == n) return new MathOperation("number", String2Number(numstr));
    // Case where the expression is just a named constant
    let s_lower = s.toLowerCase();
    if (s_lower == "pi") return new MathOperation("number", Math.PI);
    // Case where the expression is just a variable name
    let letter = new RegExp(/^([a-z]|[A-Z])$/);
    if (letter.test(s[0])) {
        var i = 1;
        while (i < n && (letter.test(s[i]) || s[i] == "_")) i++;
        if (i == n && s[n-1] == "_") return null;
        if (i == n) return new MathOperation("variable", s);
    }
    // Case where the expression is just a function call
    const functions = ["cos", "sin", "exp", "sqrt"];
    for (i = 0; i < functions.length; i++) {
        var function_call = new RegExp("^" + functions[i] + "(\\(|\\[|{)");
        if (function_call.test(s_lower)) {
            j = IndexMatchingCharacter(s, functions[i].length);
            if (j === null) return null;
            if (j == n-1) {
                let inside = ParseMathExpression(s.substring(functions[i].length+1, n-1));
                if (inside === null) return null;
                return new MathOperation(functions[i], inside);
            }
        }
    }
    // Split around operators in inverse order of precedence
    let number = new RegExp(/^([0-9]|\.)$/);
    let ok_after_first_minus = new RegExp(/^([0-9]|\.)$/);
    const operators = ["+-", "*/", "^"];
    for (var i_op = 0; i_op < operators.length; i_op++) {
        var i = 0;
        if (s[0] == "-" && ok_after_first_minus.test(s[1])) i++;
        while (i < n) {
            var j = operators[i_op].indexOf(s[i])
            if (j >= 0 && (i_op > 0 || !(i > 1 && s_lower[i-1] == "e" && number.test(s[i-2])))) {
                let left = ParseMathExpression(s.substring(0, i));
                if (left == null) return null;
                let right = ParseMathExpression(s.substring(i+1));
                if (right === null) return null;
                return new MathOperation(operators[i_op][j], left, right);
            } else if (s[i] == "(" || s[i] == "[" || s[i] == "{") {
                i = IndexMatchingCharacter(s, i);
                if (i === null) return null;
                i++;
            } else {
                i++;
            }
        }
    }
    // If we reach this point then the expression is not parsable
    return null;
}

function ParseMathExpressionAndEval(s, variables={}) {
    // Parse given expression that represents a mathematical expression and evaluate it.
    parsed = ParseMathExpression(s);
    if (parsed === null) return null;
    return parsed.eval(variables=variables)
}
