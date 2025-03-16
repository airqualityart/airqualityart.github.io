// MathParser JavaScript library for AQart's diff. equations numerical solver.
//
// Copyright (c) 2025-now Air Quality And Related Topics.
//
// This code is licensed under the terms of the 3-clause BSD license (also
// known as the modified BSD license). The full text of this license can be
// found at https://directory.fsf.org/wiki/License:BSD-3-Clause. It can also be
// found in the file named LICENSE.md located at the root of this repository.

(function(exports) {

    // Some useful regular expression objects
    var RE_SPACE = new RegExp(/^\s$/);
    var RE_DIGIT = new RegExp(/^[0-9]$/);
    let RE_LETTER = new RegExp(/^([a-z]|[A-Z])$/);
    var RE_EXP = new RegExp(/^(e|E)$/);


    function numberSubstring(s, i, allow_exponent=true) {
        // Return the substring of s that represents a number starting at s[i].
        var n = s.length;
        if (i < 0 || i >= n) return null;
        var found_period = false;
        var j = i + (s[i] == "-" ? 1 : 0);
        while (j < n) {
            if (RE_EXP.test(s[j])) {
                if (!allow_exponent) return null;
                var value = numberSubstring(s, j+1, false);
                if (value !== null) value = s.substring(i, j+1) + value;
                return value
            } else if (s[j] == ".") {
                if (found_period) return null;
                found_period = true;
                j++;
            } else if (RE_DIGIT.test(s[j])) {
                j++;
            } else {
                break;
            }
        }
        return (j == i || j == i+1 && s[i] == "-") ? null : s.substring(i, j);
    }


    function string2Number(s) {
        // Return the number represented by character string s.
        split = s.replace("E", "e").split("e");
        if (split.length > 2) return null;
        out = Number(split[0]);
        if (split.length > 1) out = out * Math.pow(10, Number(split[1]));
        return out
    }


    // Constants for the implementation of MathToken objects
    const MTK_TYPE_NUM = "math_token_numeric"
    const MTK_TYPE_OP = "math_token_operator"
    const MTK_TYPE_NAME = "math_token_name"
    const MTK_TYPE_NEST = "math_token_nester"


    function MathToken(type, value) {
        // Constructor for MathToken instances.
        this.type = type;
        this.value = value;
    }


    MathToken.prototype.closes = function(token) {
        // Return true iff if given token closes self.
        if (self.type != MTK_TYPE_NEST) return null;
        if (token.type != MTK_TYPE_NEST) return false;
        return (this.value == "(" && token.value == ")" ||
                this.value == "[" && token.value == "]" ||
                this.value == "{" && token.value == "}");
    }


    function lex(s) {
        // Return the array of MathToken corresponding to given expression.
        //
        // TODO this function is completely untested!
        var s = s.trim();
        const n = s.length;
        var out = [];
        var i = 0;
        while (i < n) {

            var numlike = s[i] == "." || RE_DIGIT.test(s[i]);
            numlike = numlike || (
                i == 0 && s[0] == "-" && n > 1 &&
                (s[1] == "." || RE_DIGIT.test(s[1]))
            );

            if (numlike) {

                sub = numberSubstring(s, i);
                value = string2Number(sub);
                if (value === null) return null;
                out.push(new MathToken(MTK_TYPE_NUM, value))
                i += sub.length;

            } else if ("+-*/^".indexOf(s[i]) >= 0) {

                out.push(new MathToken(MTK_TYPE_OP, s[i]))
                i += 1;

            } else if (RE_LETTER.test(s[i])) {

                var j = i + 1;
                while (j < n && RE_LETTER.test(s[j])) j++;
                var name = s.slice(i, j);
                out.push(new MathToken(MTK_TYPE_NAME, name))
                i += name.length;

            } else if ("()[]{}".indexOf(s[i]) >= 0) {

                out.push(new MathToken(MTK_TYPE_NEST, s[i]))
                i += 1;

            } else {

                return null;
            }
        }
        return out;
    }

    // Predefined math operations
    var MATH_OPS = Object.create(null);
    MATH_OPS["+"] = function (left, right) {return left + right;};
    MATH_OPS["-"] = function (left, right) {return left - right;};
    MATH_OPS["*"] = function (left, right) {return left * right;};
    MATH_OPS["/"] = function (left, right) {return left / right;};
    MATH_OPS["^"] = function (left, right) {return Math.pow(left, right);};
    MATH_OPS["sqrt"] = function (left) {return Math.sqrt(left);};
    MATH_OPS["sin"] = function (left) {return Math.sin(left);};
    MATH_OPS["cos"] = function (left) {return Math.cos(left);};
    MATH_OPS["exp"] = function (left) {return Math.exp(left);};


    exports.numberSubstring = numberSubstring;
    exports.string2Number = string2Number;
    exports.MathToken = MathToken;
    exports.MTK_TYPE_NUM = MTK_TYPE_NUM;
    exports.MTK_TYPE_OP = MTK_TYPE_OP;
    exports.MTK_TYPE_NAME = MTK_TYPE_NAME;
    exports.MTK_TYPE_NEST = MTK_TYPE_NEST;
    exports.lex = lex;


})(this.MathParser = Object.create(null));
