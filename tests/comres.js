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

// SimplifyMathString

TestFunction(
    SimplifyMathString,
    ["  some white space around  "],
    "some white space around",
    "SimplifyMathString_simple_1");

TestFunction(
    SimplifyMathString,
    ["(1 + 1)"],
    "1 + 1",
    "SimplifyMathString_simple_2");

TestFunction(
    SimplifyMathString,
    ["( 2 + 2 )"],
    "2 + 2",
    "SimplifyMathString_simple_3");

TestFunction(
    SimplifyMathString,
    ["( [1 + 2] )"],
    "1 + 2",
    "SimplifyMathString_complex_1");

TestFunction(
    SimplifyMathString,
    ["nothing to simplify here"],
    "nothing to simplify here",
    "SimplifyMathString_nothing_1");

TestFunction(
    SimplifyMathString,
    ["(nothing to simplify here"],
    "(nothing to simplify here",
    "SimplifyMathString_nothing_2");

TestFunction(
    SimplifyMathString,
    ["("],
    "(",
    "SimplifyMathString_nothing_3");

TestFunction(
    SimplifyMathString,
    [""],
    "",
    "SimplifyMathString_nothing_4");

TestFunction(
    SimplifyMathString,
    ["(1+1) + (2*3)"],
    "(1+1) + (2*3)",
    "SimplifyMathString_nothing_5");

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

DisplayNumberOFPassedTests();
