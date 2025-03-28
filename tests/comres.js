// JavaScript resources for AQart's web page (tests for common resources).
//
// Copyright (c) 2023-now Air Quality And Related Topics.
//
// This code is licensed under the terms of the 3-clause BSD license (also known as the modified BSD license). The full
// text of this license can be found at https://directory.fsf.org/wiki/License:BSD-3-Clause. It can also be found in
// the file named LICENSE.md located at the root of this repository.

// IndexMatchingCharacter

TestFunction(
    IndexMatchingCharacter,
    ["1 * (2 + 4) / 5", 4],
    10,
    "IndexMatchingCharacter_simple_1");

TestFunction(
    IndexMatchingCharacter,
    ["(2) / 5", 0],
    2,
    "IndexMatchingCharacter_simple_2");

TestFunction(
    IndexMatchingCharacter,
    ["10 * {2 + 4 / 5}", 5],
    15,
    "IndexMatchingCharacter_simple_3");

TestFunction(
    IndexMatchingCharacter,
    ["hello [to the] world", 6],
    13,
    "IndexMatchingCharacter_simple_4");

TestFunction(
    IndexMatchingCharacter,
    ["(1.5 + 5 * {2 + 3 * hello})", 11],
    25,
    "IndexMatchingCharacter_nested_1");

TestFunction(
    IndexMatchingCharacter,
    ["(1.5 + 5 * (2 + 3 * hello))", 11],
    25,
    "IndexMatchingCharacter_nested_2");

TestFunction(
    IndexMatchingCharacter,
    ["(1.5 + 5 * (2 + 3 * hello)) + 10", 0],
    26,
    "IndexMatchingCharacter_nested_3");

TestFunction(
    IndexMatchingCharacter,
    ["((1.5) + (()) + ([5] * (2 + 3 * hello))) + 10", 0],
    39,
    "IndexMatchingCharacter_nested_4");

TestFunction(
    IndexMatchingCharacter,
    ["hello world", 0],
    null,
    "IndexMatchingCharacter_null_1");

TestFunction(
    IndexMatchingCharacter,
    ["hello world", 100],
    null,
    "IndexMatchingCharacter_null_2");

TestFunction(
    IndexMatchingCharacter,
    ["(hello world)", -1],
    null,
    "IndexMatchingCharacter_null_3");

TestFunction(
    IndexMatchingCharacter,
    ["hello( world", 5],
    null,
    "IndexMatchingCharacter_null_4");

// PreprocessMathString

TestFunction(
    PreprocessMathString,
    ["  1  "],
    "1",
    "PreprocessMathString_simple_1");

TestFunction(
    PreprocessMathString,
    ["(1 + 1)"],
    "1+1",
    "PreprocessMathString_simple_2");

TestFunction(
    PreprocessMathString,
    ["( 2   +    2 )"],
    "2+2",
    "PreprocessMathString_simple_3");

TestFunction(
    PreprocessMathString,
    ["( [1 + 2] )"],
    "1+2",
    "PreprocessMathString_complex_1");

TestFunction(
    PreprocessMathString,
    ["3x"],
    "3*x",
    "PreprocessMathString_implicit_1");

TestFunction(
    PreprocessMathString,
    ["{2 + 3 cos(4)}"],
    "2+3*cos(4)",
    "PreprocessMathString_implicit_2");

TestFunction(
    PreprocessMathString,
    [" - x + 4"],
    "-1*x+4",
    "PreprocessMathString_implicit_3");

TestFunction(
    PreprocessMathString,
    ["3.exp(4)"],
    "3.*exp(4)",
    "PreprocessMathString_implicit_4");

TestFunction(
    PreprocessMathString,
    ["cos(1) sin[2]"],
    "cos(1)*sin[2]",
    "PreprocessMathString_implicit_5");

TestFunction(
    PreprocessMathString,
    ["cos(1) sin[2] exp{-1} sqrt(2)"],
    "cos(1)*sin[2]*exp{-1}*sqrt(2)",
    "PreprocessMathString_implicit_6");

TestFunction(
    PreprocessMathString,
    ["cos(pi)3y"],
    "cos(pi)*3*y",
    "PreprocessMathString_implicit_7");

TestFunction(
    PreprocessMathString,
    ["1e5"],
    "1e5",
    "PreprocessMathString_exponent_1");

TestFunction(
    PreprocessMathString,
    ["1e5 + 2000"],
    "1e5+2000",
    "PreprocessMathString_exponent_2");

TestFunction(
    PreprocessMathString,
    ["(2000 - 3E.4)"],
    "2000-3E.4",
    "PreprocessMathString_exponent_3");

TestFunction(
    PreprocessMathString,
    ["(2000 - 3.E.4)"],
    "2000-3.E.4",
    "PreprocessMathString_exponent_4");

TestFunction(
    PreprocessMathString,
    ["3 + 5.2e-1 * 2"],
    "3+5.2e-1*2",
    "PreprocessMathString_exponent_5");

TestFunction(
    PreprocessMathString,
    ["x"],
    "x",
    "PreprocessMathString_nothing_1");

TestFunction(
    PreprocessMathString,
    ["(x+4"],
    "(x+4",
    "PreprocessMathString_nothing_2");

TestFunction(
    PreprocessMathString,
    ["("],
    "(",
    "PreprocessMathString_nothing_3");

TestFunction(
    PreprocessMathString,
    [""],
    "",
    "PreprocessMathString_nothing_4");

TestFunction(
    PreprocessMathString,
    ["abc def"],
    null,
    "PreprocessMathString_null_1");

TestFunction(
    PreprocessMathString,
    ["abc    \t\ndef"],
    null,
    "PreprocessMathString_null_2");

TestFunction(
    PreprocessMathString,
    ["abc_ def"],
    null,
    "PreprocessMathString_null_3");

TestFunction(
    PreprocessMathString,
    ["abc _def"],
    null,
    "PreprocessMathString_null_4");

// MathOperation.unary and MathOperation.binary

TestObjectMethod(
    new MathOperation("number", 125),
    "unary",
    [],
    true,
    "MathOperation.unary_number"
)

TestObjectMethod(
    new MathOperation("number", 125),
    "binary",
    [],
    false,
    "MathOperation.binary_number"
)

TestObjectMethod(
    new MathOperation("+", 2, 5),
    "unary",
    [],
    false,
    "MathOperation.unary_add"
)

TestObjectMethod(
    new MathOperation("+", 2, 5),
    "binary",
    [],
    true,
    "MathOperation.binary_add"
)

TestObjectMethod(
    new MathOperation("-", 2, 5),
    "unary",
    [],
    false,
    "MathOperation.unary_sub"
)

TestObjectMethod(
    new MathOperation("-", 2, 5),
    "binary",
    [],
    true,
    "MathOperation.binary_sub"
)

TestObjectMethod(
    new MathOperation("*", 2, 5),
    "unary",
    [],
    false,
    "MathOperation.unary_mul"
)

TestObjectMethod(
    new MathOperation("*", 2, 5),
    "binary",
    [],
    true,
    "MathOperation.binary_mul"
)

TestObjectMethod(
    new MathOperation("/", 2, 5),
    "unary",
    [],
    false,
    "MathOperation.unary_div"
)

TestObjectMethod(
    new MathOperation("/", 2, 5),
    "binary",
    [],
    true,
    "MathOperation.binary_div"
)

TestObjectMethod(
    new MathOperation("^", 2, 5),
    "unary",
    [],
    false,
    "MathOperation.unary_pow"
)

TestObjectMethod(
    new MathOperation("^", 2, 5),
    "binary",
    [],
    true,
    "MathOperation.binary_pow"
)

TestObjectMethod(
    new MathOperation("sqrt", 125),
    "unary",
    [],
    true,
    "MathOperation.unary_sqrt"
)

TestObjectMethod(
    new MathOperation("sqrt", 125),
    "binary",
    [],
    false,
    "MathOperation.binary_sqrt"
)

TestObjectMethod(
    new MathOperation("sin", 125),
    "unary",
    [],
    true,
    "MathOperation.unary_sin"
)

TestObjectMethod(
    new MathOperation("sin", 125),
    "binary",
    [],
    false,
    "MathOperation.binary_sin"
)

TestObjectMethod(
    new MathOperation("cos", 125),
    "unary",
    [],
    true,
    "MathOperation.unary_cos"
)

TestObjectMethod(
    new MathOperation("cos", 125),
    "binary",
    [],
    false,
    "MathOperation.binary_cos"
)

TestObjectMethod(
    new MathOperation("exp", 125),
    "unary",
    [],
    true,
    "MathOperation.unary_exp"
)

TestObjectMethod(
    new MathOperation("exp", 125),
    "binary",
    [],
    false,
    "MathOperation.binary_exp"
)

// MathOperation.eval

TestObjectMethod(
    new MathOperation("number", 125),
    "eval",
    [],
    125,
    "MathOperation.eval_number_1"
)

TestObjectMethod(
    new MathOperation("+", 2, 2),
    "eval",
    [],
    4,
    "MathOperation.eval_add_1"
)

TestObjectMethod(
    new MathOperation("-", 2, 5),
    "eval",
    [],
    -3,
    "MathOperation.eval_sub_1"
)

TestObjectMethod(
    new MathOperation("*", 7, 5),
    "eval",
    [],
    35,
    "MathOperation.eval_mul_1"
)

TestObjectMethod(
    new MathOperation("*", 7, -5),
    "eval",
    [],
    -35,
    "MathOperation.eval_mul_2"
)

TestObjectMethod(
    new MathOperation("/", 18, 6),
    "eval",
    [],
    3,
    "MathOperation.eval_div_1"
)

TestObjectMethod(
    new MathOperation("^", 2, 5),
    "eval",
    [],
    32,
    "MathOperation.eval_pow_1"
)

TestObjectMethod(
    new MathOperation("^", 49, 0.5),
    "eval",
    [],
    7,
    "MathOperation.eval_pow_2"
)

TestObjectMethod(
    new MathOperation("sqrt", 49, null),
    "eval",
    [],
    7,
    "MathOperation.eval_sqrt_1"
)

TestObjectMethod(
    new MathOperation("sin", 0, null),
    "eval",
    [],
    0,
    "MathOperation.eval_sin_1"
)

TestObjectMethod(
    new MathOperation("sin", Math.PI/2, null),
    "eval",
    [],
    1,
    "MathOperation.eval_sin_2"
)

TestObjectMethod(
    new MathOperation("sin", Math.PI/6, null),
    "eval",
    [],
    0.5,
    "MathOperation.eval_sin_3",
    1e-15
)

TestObjectMethod(
    new MathOperation("sin", Math.PI/3, null),
    "eval",
    [],
    Math.sqrt(3)/2,
    "MathOperation.eval_sin_4",
)

TestObjectMethod(
    new MathOperation("cos", 0, null),
    "eval",
    [],
    1,
    "MathOperation.eval_cos_1"
)

TestObjectMethod(
    new MathOperation("cos", Math.PI/2, null),
    "eval",
    [],
    0,
    "MathOperation.eval_cos_2",
    1e-15
)

TestObjectMethod(
    new MathOperation("cos", Math.PI/6, null),
    "eval",
    [],
    Math.sqrt(3)/2,
    "MathOperation.eval_cos_3",
    1e-15
)

TestObjectMethod(
    new MathOperation("cos", Math.PI/3, null),
    "eval",
    [],
    0.5,
    "MathOperation.eval_cos_4",
    1e-15
)

TestObjectMethod(
    new MathOperation("exp", 0, null),
    "eval",
    [],
    1,
    "MathOperation.eval_exp_1",
)

TestObjectMethod(
    new MathOperation("exp", 10, null),
    "eval",
    [],
    Math.exp(10),
    "MathOperation.eval_exp_2",
)

TestObjectMethod(
    new MathOperation("exp", -10, null),
    "eval",
    [],
    Math.exp(-10),
    "MathOperation.eval_exp_3",
)

TestObjectMethod(
    new MathOperation("variable", "x"),
    "eval",
    [{x: 5}],
    5,
    "MathOperation.eval_variables_1",
)

TestObjectMethod(
    new MathOperation("-", "x", 3),
    "eval",
    [{x: 10}],
    7,
    "MathOperation.eval_variables_2",
)

TestObjectMethod(
    new MathOperation("+", "x", "y"),
    "eval",
    [{x: 5, y: 20}],
    25,
    "MathOperation.eval_variables_3",
)

TestObjectMethod(
    new MathOperation("cos", "theta"),
    "eval",
    [{theta: Math.PI/6}],
    Math.sqrt(3)/2,
    "MathOperation.eval_variables_4",
    1e-15,
)

TestObjectMethod(
    new MathOperation("+", 2, new MathOperation("-", 10, 4)),
    "eval",
    [],
    8,
    "MathOperation.eval_nested_1",
)

TestObjectMethod(
    new MathOperation("*", new MathOperation("+", -3, 7), new MathOperation("-", 10, 4)),
    "eval",
    [],
    24,
    "MathOperation.eval_nested_2",
)

TestObjectMethod(
    new MathOperation("cos", new MathOperation("/", Math.PI, 3)),
    "eval",
    [],
    0.5,
    "MathOperation.eval_nested_3",
    1e-15
)

TestObjectMethod(
    new MathOperation("+", new MathOperation("*", new MathOperation("cos", Math.PI/3), 10), 4),
    "eval",
    [],
    9,
    "MathOperation.eval_nested_4",
)

TestObjectMethod(
    new MathOperation("+", new MathOperation("*", new MathOperation("cos", "angle"), 10), 4),
    "eval",
    [{angle: Math.PI/3}],
    9,
    "MathOperation.eval_nested_5",
)

// NumberSubstring

TestFunction(
    NumberSubstring,
    ["3", 0],
    "3",
    "NumberSubstring_simple_1");

TestFunction(
    NumberSubstring,
    ["3.2", 0],
    "3.2",
    "NumberSubstring_simple_2");

TestFunction(
    NumberSubstring,
    ["3.2", 2],
    "2",
    "NumberSubstring_simple_3");

TestFunction(
    NumberSubstring,
    ["3.", 0],
    "3.",
    "NumberSubstring_simple_4");

TestFunction(
    NumberSubstring,
    [".4", 0],
    ".4",
    "NumberSubstring_simple_5");

TestFunction(
    NumberSubstring,
    ["-1", 0],
    "-1",
    "NumberSubstring_simple_6");

TestFunction(
    NumberSubstring,
    ["3e2", 0],
    "3e2",
    "NumberSubstring_exponent_1");

TestFunction(
    NumberSubstring,
    ["3.19e-2.1", 0],
    "3.19e-2.1",
    "NumberSubstring_exponent_2");

TestFunction(
    NumberSubstring,
    ["3.19E-2.1", 0],
    "3.19E-2.1",
    "NumberSubstring_exponent_3");

TestFunction(
    NumberSubstring,
    [".19E-2.1", 0],
    ".19E-2.1",
    "NumberSubstring_exponent_4");

TestFunction(
    NumberSubstring,
    ["3.E-2.1", 0],
    "3.E-2.1",
    "NumberSubstring_exponent_5");

TestFunction(
    NumberSubstring,
    ["3.2E-.1", 0],
    "3.2E-.1",
    "NumberSubstring_exponent_6");

TestFunction(
    NumberSubstring,
    ["3.2E-4.", 0],
    "3.2E-4.",
    "NumberSubstring_exponent_7");

TestFunction(
    NumberSubstring,
    ["E-4.", 0],
    "E-4.",
    "NumberSubstring_exponent_8");

TestFunction(
    NumberSubstring,
    ["3", 1],
    null,
    "NumberSubstring_null_1");

TestFunction(
    NumberSubstring,
    ["3", -1],
    null,
    "NumberSubstring_null_2");

TestFunction(
    NumberSubstring,
    ["a", 0],
    null,
    "NumberSubstring_null_3");

TestFunction(
    NumberSubstring,
    ["3.3.2", 0],
    null,
    "NumberSubstring_null_4");

TestFunction(
    NumberSubstring,
    ["3e3e1.2", 0],
    null,
    "NumberSubstring_null_5");

TestFunction(
    NumberSubstring,
    ["2.2E-4", 0, false],
    null,
    "NumberSubstring_null_6");

TestFunction(
    NumberSubstring,
    ["", 0],
    null,
    "NumberSubstring_null_7");

TestFunction(
    NumberSubstring,
    ["-", 0],
    null,
    "NumberSubstring_null_8");

TestFunction(
    NumberSubstring,
    ["cos(3.14)", 4],
    "3.14",
    "NumberSubstring_complex_1");

TestFunction(
    NumberSubstring,
    ["cos(3.001+2*3.14)", 4],
    "3.001",
    "NumberSubstring_complex_2");

TestFunction(
    NumberSubstring,
    ["cos(3.001+2.21e-3.1*3.14)", 10],
    "2.21e-3.1",
    "NumberSubstring_complex_3");

// String2Number

TestFunction(
    String2Number,
    ["17"],
    17,
    "String2Number_simple_1");

TestFunction(
    String2Number,
    ["-17"],
    -17,
    "String2Number_simple_2");

TestFunction(
    String2Number,
    ["3.2"],
    3.2,
    "String2Number_simple_3");

TestFunction(
    String2Number,
    [".2"],
    0.2,
    "String2Number_simple_4");

TestFunction(
    String2Number,
    ["2."],
    2,
    "String2Number_simple_5");

TestFunction(
    String2Number,
    ["2e3"],
    2000,
    "String2Number_simple_6");

TestFunction(
    String2Number,
    ["-2e-1"],
    -0.2,
    "String2Number_simple_7");

TestFunction(
    String2Number,
    ["3e-2."],
    0.03,
    "String2Number_simple_8");

TestFunction(
    String2Number,
    ["3e-0.2"],
    3 * Math.pow(10, -0.2),
    "String2Number_simple_9");

TestFunction(
    String2Number,
    ["3e-.2"],
    3 * Math.pow(10, -0.2),
    "String2Number_simple_10");

// ParseMathExpressionAndEval

TestFunction(
    ParseMathExpressionAndEval,
    ["3"],
    3,
    "ParseMathExpressionAndEval_simple_1");

TestFunction(
    ParseMathExpressionAndEval,
    ["-3"],
    -3,
    "ParseMathExpressionAndEval_simple_2");

TestFunction(
    ParseMathExpressionAndEval,
    ["4.7"],
    4.7,
    "ParseMathExpressionAndEval_simple_3");

TestFunction(
    ParseMathExpressionAndEval,
    ["2E3 + 5"],
    2005,
    "ParseMathExpressionAndEval_simple_4");

TestFunction(
    ParseMathExpressionAndEval,
    ["cos(1)"],
    Math.cos(1),
    "ParseMathExpressionAndEval_simple_5");

TestFunction(
    ParseMathExpressionAndEval,
    ["sqrt(16)"],
    4,
    "ParseMathExpressionAndEval_simple_6");

TestFunction(
    ParseMathExpressionAndEval,
    ["sqrt{16}"],
    4,
    "ParseMathExpressionAndEval_simple_7");

TestFunction(
    ParseMathExpressionAndEval,
    ["sqrt[16]"],
    4,
    "ParseMathExpressionAndEval_simple_8");

TestFunction(
    ParseMathExpressionAndEval,
    ["2sinvar+1", {sinvar: 7}],
    15,
    "ParseMathExpressionAndEval_simple_9");

TestFunction(
    ParseMathExpressionAndEval,
    ["2sin_var+1", {sin_var: 7}],
    15,
    "ParseMathExpressionAndEval_simple_10");

TestFunction(
    ParseMathExpressionAndEval,
    ["cos(pi)"],
    -1,
    "ParseMathExpressionAndEval_simple_11");

TestFunction(
    ParseMathExpressionAndEval,
    ["4.7 cos(pi)"],
    -4.7,
    "ParseMathExpressionAndEval_simple_12");

TestFunction(
    ParseMathExpressionAndEval,
    ["-4.7 cos(3e0)"],
    -4.7 * Math.cos(3),
    "ParseMathExpressionAndEval_simple_13");

TestFunction(
    ParseMathExpressionAndEval,
    ["-4. cos(3)"],
    -4 * Math.cos(3),
    "ParseMathExpressionAndEval_simple_14");

TestFunction(
    ParseMathExpressionAndEval,
    ["my_variable + 4", {my_variable: 18}],
    22,
    "ParseMathExpressionAndEval_simple_15");

TestFunction(
    ParseMathExpressionAndEval,
    ["3 + 5.2e-1 * 2"],
    4.04,
    "ParseMathExpressionAndEval_priority_1");

TestFunction(
    ParseMathExpressionAndEval,
    ["3 + 5 / 2"],
    5.5,
    "ParseMathExpressionAndEval_priority_2");

TestFunction(
    ParseMathExpressionAndEval,
    ["3 + 5 ^ 2"],
    28,
    "ParseMathExpressionAndEval_priority_3");

TestFunction(
    ParseMathExpressionAndEval,
    ["3 - 5 * 2"],
    -7,
    "ParseMathExpressionAndEval_priority_4");

TestFunction(
    ParseMathExpressionAndEval,
    ["3 - 5 / 2"],
    0.5,
    "ParseMathExpressionAndEval_priority_5");

TestFunction(
    ParseMathExpressionAndEval,
    ["3 - 5 ^ 2"],
    -22,
    "ParseMathExpressionAndEval_priority_6");

TestFunction(
    ParseMathExpressionAndEval,
    ["3 * 5 ^ 2"],
    75,
    "ParseMathExpressionAndEval_priority_7");

TestFunction(
    ParseMathExpressionAndEval,
    ["3 / 5 ^ 2"],
    3 / 25,
    "ParseMathExpressionAndEval_priority_8");

TestFunction(
    ParseMathExpressionAndEval,
    ["5 ^ 2 + 4 * 8 - 5"],
    52,
    "ParseMathExpressionAndEval_priority_9");

TestFunction(
    ParseMathExpressionAndEval,
    ["(3 / 5)"],
    0.6,
    "ParseMathExpressionAndEval_parentheses_1");

TestFunction(
    ParseMathExpressionAndEval,
    ["(3 + 5) * (4 - 2)"],
    16,
    "ParseMathExpressionAndEval_parentheses_2");

TestFunction(
    ParseMathExpressionAndEval,
    ["(3.8 ^ 5) - ([91 + 9] * 2)"],
    3.8*3.8*3.8*3.8*3.8 - 200,
    "ParseMathExpressionAndEval_parentheses_3",
    1e-10);

TestFunction(
    ParseMathExpressionAndEval,
    ["abc def"],
    null,
    "ParseMathExpressionAndEval_null_1");

DisplayNumberOFPassedTests();
