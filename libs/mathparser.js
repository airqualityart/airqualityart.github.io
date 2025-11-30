// Copyright (c) 2025-now Air Quality And Related Topics.
//
// License: BSD 3-clause "new" or "revised" license (BSD-3-clause).
//
// MathParser JavaScript library for AQart's diff. equations numerical solver.

(function(exports) {

    // Useful regular expression objects
    var RE_SPACE = new RegExp(/^\s$/);
    var RE_DIGIT = new RegExp(/^[0-9]$/);
    let RE_LETTER = new RegExp(/^([a-z]|[A-Z])$/);
    var RE_EXP = new RegExp(/^(e|E)$/);


    function numberSubstring(s, i, allow_exponent=true) {
        // Return the substring of s that represents a number starting at s[i].
        //
        // Parameters
        // ----------
        // s: str
        //     Character string to analyze.
        // i: int
        //     Index in s where a number is supposed to be starting.
        // allow_exponent: bool
        //     Whether an exponent is allowed in the number.
        //
        // Returns
        // -------
        // str | null
        //     The substring that represents the number, or null if a number
        //     could not be parsed out of the string s.
        //
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
        // Convert a string to the corresponding number.
        //
        // Parameters
        // ----------
        // s: str
        //     A character string that represents a number.
        //
        // Returns
        // -------
        // number | null
        //     The number that corresponds to character string s, or null if
        //     the string could not be converted to a number.
        //
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


    function MathToken(type, value, index) {
        // Constructor for MathToken instances.
        //
        // Parameters
        // ----------
        // type: str
        //     The type of token (cf. the MTK_TYPE_* constants).
        // value: str
        //     The value of the token.
        // index: int
        //     The index at which this token starts in the character string
        //     that it belongs to.
        //
        this.type = type;
        this.value = value;
        this.index = index;
    }


    MathToken.prototype.toString = function() {
        // Return the string representation of self.
        //
        // Returns
        // -------
        // str
        //     The string representation of self.
        //
        return (
            this.value
            + " (type "
            + this.type
            + " at index "
            + this.index.toString()
            + ")"
        );
    }


    MathToken.prototype.equals = function(other) {
        // Test equality to other object.
        //
        // Parameters
        // ----------
        // other: object
        //     The object to compare to self.
        //
        // Returns
        // -------
        // str
        //     Whether given object is equal to self..
        //
        return (
            Object.hasOwn(other, "type")
            && other.type === this.type
            && Object.hasOwn(other, "value")
            && other.value === this.value
            && Object.hasOwn(other, "index")
            && other.index === this.index
        );
    }


    MathToken.prototype.is_opener = function() {
        // Return true iff self is an opening nester.
        //
        // Returns
        // -------
        // bool
        //     Whether self is an opening nester.
        //
        if (this.type == MTK_TYPE_NEST)
            return this.value == "(" || this.value == "[" || this.value == "{";
        else
            return false;
    }


    MathToken.prototype.closes = function(token) {
        // Return true iff if given token closes self.
        //
        // Parameters
        // ----------
        // token: MathToken
        //     Math token to test against self.
        //
        // Returns
        // -------
        // bool | null
        //     True if given token closes self, false otherwise (null if self
        //     is not an opening nesting character).
        //
        // Notes
        // -----
        // This method does not look at the indices of the token, so it can
        // return true even if given token is before self.
        //
        if (! this.is_opener())
            return null;
        else if (token.type != MTK_TYPE_NEST)
            return false;
        else
            return (this.value == "(" && token.value == ")" ||
                    this.value == "[" && token.value == "]" ||
                    this.value == "{" && token.value == "}");
    }


    function lexify(s) {
        // Lexify character string.
        //
        // Parameters
        // ----------
        // s: str
        //     The string to lexify.
        //
        // Returns
        // -------
        // [MathToken] | null
        //     The lexified version of input character string, or null if the
        //     string could not be lexified.
        //
        const operators = "+-*/^";
        const nesting_characters = "()[]{}";

        // Ignore space at the start of the character string
        var i = 0;
        var n = s.length - 1;
        while (i <= n && RE_SPACE.test(s[i])) i += 1;

        // Ignore space at the end of the character string
        while (n >= 0 && RE_SPACE.test(s[n])) n -= 1;

        var out = [];
        while (i <= n) {

            if (s[i] == "." || RE_DIGIT.test(s[i])) {

                sub = numberSubstring(s, i);
                if (sub === null) return null;
                out.push(new MathToken(MTK_TYPE_NUM, sub, i))
                i += sub.length;

            } else if (s[j] == "_" || RE_LETTER.test(s[i])) {

                var j = i + 1;
                while (j <= n && (s[j] == "_" || RE_LETTER.test(s[j]))) j++;
                var name = s.slice(i, j);
                out.push(new MathToken(MTK_TYPE_NAME, name, i))
                i += name.length;

            } else if (operators.indexOf(s[i]) >= 0) {

                out.push(new MathToken(MTK_TYPE_OP, s[i], i))
                i += 1;

            } else if (nesting_characters.indexOf(s[i]) >= 0) {

                out.push(new MathToken(MTK_TYPE_NEST, s[i], i))
                i += 1;

            } else if (RE_SPACE.test(s[i])) {

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

    // Define exports
    exports.numberSubstring = numberSubstring;
    exports.string2Number = string2Number;
    exports.MathToken = MathToken;
    exports.MTK_TYPE_NUM = MTK_TYPE_NUM;
    exports.MTK_TYPE_OP = MTK_TYPE_OP;
    exports.MTK_TYPE_NAME = MTK_TYPE_NAME;
    exports.MTK_TYPE_NEST = MTK_TYPE_NEST;
    exports.lexify = lexify;

})(this.MathParser = Object.create(null));
