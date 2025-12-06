// Copyright (c) 2025-now Air Quality And Related Topics.
//
// License: BSD 3-clause "new" or "revised" license (BSD-3-clause).
//
// Tests for the MathParser JavaScript library.

// numberSubstring ------------------------------------------------------------

TestFunction(
    MathParser.numberSubstring,
    ["3", 0],
    "3",
    "numberSubstring_simple_1");

TestFunction(
    MathParser.numberSubstring,
    ["3.2", 0],
    "3.2",
    "numberSubstring_simple_2");

TestFunction(
    MathParser.numberSubstring,
    ["3.2", 2],
    "2",
    "numberSubstring_simple_3");

TestFunction(
    MathParser.numberSubstring,
    ["3.", 0],
    "3.",
    "numberSubstring_simple_4");

TestFunction(
    MathParser.numberSubstring,
    [".4", 0],
    ".4",
    "numberSubstring_simple_5");

TestFunction(
    MathParser.numberSubstring,
    ["-1", 0],
    "-1",
    "numberSubstring_simple_6");

TestFunction(
    MathParser.numberSubstring,
    ["3e2", 0],
    "3e2",
    "numberSubstring_exponent_1");

TestFunction(
    MathParser.numberSubstring,
    ["3.19e-2.1", 0],
    "3.19e-2.1",
    "numberSubstring_exponent_2");

TestFunction(
    MathParser.numberSubstring,
    ["3.19E-2.1", 0],
    "3.19E-2.1",
    "numberSubstring_exponent_3");

TestFunction(
    MathParser.numberSubstring,
    [".19E-2.1", 0],
    ".19E-2.1",
    "numberSubstring_exponent_4");

TestFunction(
    MathParser.numberSubstring,
    ["3.E-2.1", 0],
    "3.E-2.1",
    "numberSubstring_exponent_5");

TestFunction(
    MathParser.numberSubstring,
    ["3.2E-.1", 0],
    "3.2E-.1",
    "numberSubstring_exponent_6");

TestFunction(
    MathParser.numberSubstring,
    ["3.2E-4.", 0],
    "3.2E-4.",
    "numberSubstring_exponent_7");

TestFunction(
    MathParser.numberSubstring,
    ["E-4.", 0],
    "E-4.",
    "numberSubstring_exponent_8");

TestFunction(
    MathParser.numberSubstring,
    ["3", 1],
    null,
    "numberSubstring_null_1");

TestFunction(
    MathParser.numberSubstring,
    ["3", -1],
    null,
    "numberSubstring_null_2");

TestFunction(
    MathParser.numberSubstring,
    ["a", 0],
    null,
    "numberSubstring_null_3");

TestFunction(
    MathParser.numberSubstring,
    ["3.3.2", 0],
    null,
    "numberSubstring_null_4");

TestFunction(
    MathParser.numberSubstring,
    ["3e3e1.2", 0],
    null,
    "numberSubstring_null_5");

TestFunction(
    MathParser.numberSubstring,
    ["2.2E-4", 0, false],
    null,
    "numberSubstring_null_6");

TestFunction(
    MathParser.numberSubstring,
    ["", 0],
    null,
    "numberSubstring_null_7");

TestFunction(
    MathParser.numberSubstring,
    ["-", 0],
    null,
    "numberSubstring_null_8");

TestFunction(
    MathParser.numberSubstring,
    ["cos(3.14)", 4],
    "3.14",
    "numberSubstring_complex_1");

TestFunction(
    MathParser.numberSubstring,
    ["cos(3.001+2*3.14)", 4],
    "3.001",
    "numberSubstring_complex_2");

TestFunction(
    MathParser.numberSubstring,
    ["cos(3.001+2.21e-3.1*3.14)", 10],
    "2.21e-3.1",
    "numberSubstring_complex_3");

// string2Number --------------------------------------------------------------

TestFunction(
    MathParser.string2Number,
    ["17"],
    17,
    "string2Number_simple_1");

TestFunction(
    MathParser.string2Number,
    ["-17"],
    -17,
    "string2Number_simple_2");

TestFunction(
    MathParser.string2Number,
    ["3.2"],
    3.2,
    "string2Number_simple_3");

TestFunction(
    MathParser.string2Number,
    [".2"],
    0.2,
    "string2Number_simple_4");

TestFunction(
    MathParser.string2Number,
    ["2."],
    2,
    "string2Number_simple_5");

TestFunction(
    MathParser.string2Number,
    ["2e3"],
    2000,
    "string2Number_simple_6");

TestFunction(
    MathParser.string2Number,
    ["-2e-1"],
    -0.2,
    "string2Number_simple_7");

TestFunction(
    MathParser.string2Number,
    ["3e-2."],
    0.03,
    "string2Number_simple_8");

TestFunction(
    MathParser.string2Number,
    ["3e-0.2"],
    3 * Math.pow(10, -0.2),
    "string2Number_simple_9");

TestFunction(
    MathParser.string2Number,
    ["3e-.2"],
    3 * Math.pow(10, -0.2),
    "string2Number_simple_10");

// MathToken objects (mehod is_opener) ----------------------------------------

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "(", 0),
    "is_opener",
    [],
    true,
    "MathToken.is_opener_01"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "[", 0),
    "is_opener",
    [],
    true,
    "MathToken.is_opener_02"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "{", 0),
    "is_opener",
    [],
    true,
    "MathToken.is_opener_03"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NEST, ")", 0),
    "is_opener",
    [],
    false,
    "MathToken.is_opener_04"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "]", 0),
    "is_opener",
    [],
    false,
    "MathToken.is_opener_05"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "}", 0),
    "is_opener",
    [],
    false,
    "MathToken.is_opener_06"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NEST, null, 0),
    "is_opener",
    [],
    false,
    "MathToken.is_opener_07"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NUM, "(", 0),
    "is_opener",
    [],
    false,
    "MathToken.is_opener_08"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_OP, "[", 0),
    "is_opener",
    [],
    false,
    "MathToken.is_opener_09"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NAME, "{", 0),
    "is_opener",
    [],
    false,
    "MathToken.is_opener_10"
);

// MathToken objects (mehod closes) -------------------------------------------

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "(", 0),
    "closes",
    [new MathParser.MathToken(MathParser.MTK_TYPE_NEST, ")", 0)],
    true,
    "MathToken.closes_01"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "[", 0),
    "closes",
    [new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "]", 0)],
    true,
    "MathToken.closes_02"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "{", 0),
    "closes",
    [new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "}", 0)],
    true,
    "MathToken.closes_03"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "{", 0),
    "closes",
    [new MathParser.MathToken(MathParser.MTK_TYPE_NEST, ")", 0)],
    false,
    "MathToken.closes_04"
);

TestObjectMethod(
    new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "{", 0),
    "closes",
    [new MathParser.MathToken(MathParser.MTK_TYPE_OP, "}", 0)],
    false,
    "MathToken.closes_05"
);

// lexify ---------------------------------------------------------------------

TestFunction(
    MathParser.lexify,
    ["3.14"],
    [new MathParser.MathToken(MathParser.MTK_TYPE_NUM, "3.14", 0)],
    "lexify_01",
)

TestFunction(
    MathParser.lexify,
    ["3.14 / 4"],
    [
        new MathParser.MathToken(MathParser.MTK_TYPE_NUM, "3.14", 0),
        new MathParser.MathToken(MathParser.MTK_TYPE_OP, "/", 5),
        new MathParser.MathToken(MathParser.MTK_TYPE_NUM, "4", 7),
    ],
    "lexify_02",
)

TestFunction(
    MathParser.lexify,
    ["- 3.14 / my_variable"],
    [
        new MathParser.MathToken(MathParser.MTK_TYPE_OP, "-", 0),
        new MathParser.MathToken(MathParser.MTK_TYPE_NUM, "3.14", 2),
        new MathParser.MathToken(MathParser.MTK_TYPE_OP, "/", 7),
        new MathParser.MathToken(MathParser.MTK_TYPE_NAME, "my_variable", 9),
    ],
    "lexify_03",
)

TestFunction(
    MathParser.lexify,
    ["  .14  "],
    [new MathParser.MathToken(MathParser.MTK_TYPE_NUM, ".14", 2)],
    "lexify_04",
)

TestFunction(
    MathParser.lexify,
    ["3cos(pi/{10+1}) ^ 4"],
    [
        new MathParser.MathToken(MathParser.MTK_TYPE_NUM, "3", 0),
        new MathParser.MathToken(MathParser.MTK_TYPE_NAME, "cos", 1),
        new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "(", 4),
        new MathParser.MathToken(MathParser.MTK_TYPE_NAME, "pi", 5),
        new MathParser.MathToken(MathParser.MTK_TYPE_OP, "/", 7),
        new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "{", 8),
        new MathParser.MathToken(MathParser.MTK_TYPE_NUM, "10", 9),
        new MathParser.MathToken(MathParser.MTK_TYPE_OP, "+", 11),
        new MathParser.MathToken(MathParser.MTK_TYPE_NUM, "1", 12),
        new MathParser.MathToken(MathParser.MTK_TYPE_NEST, "}", 13),
        new MathParser.MathToken(MathParser.MTK_TYPE_NEST, ")", 14),
        new MathParser.MathToken(MathParser.MTK_TYPE_OP, "^", 16),
        new MathParser.MathToken(MathParser.MTK_TYPE_NUM, "4", 18),
    ],
    "lexify_05",
)

TestFunction(
    MathParser.lexify,
    ["  "],
    [],
    "lexify_06",
)

TestFunction(
    MathParser.lexify,
    ["3.1.2"],
    null,
    "lexify_07",
)

// MathOperation objects (methods unary and binary) ---------------------------

TestObjectMethod(
    new MathParser.MathOperation("number", 125),
    "unary",
    [],
    true,
    "MathOperation.unary_number"
)

TestObjectMethod(
    new MathParser.MathOperation("number", 125),
    "binary",
    [],
    false,
    "MathOperation.binary_number"
)

TestObjectMethod(
    new MathParser.MathOperation("+", 2, 5),
    "unary",
    [],
    false,
    "MathOperation.unary_add"
)

TestObjectMethod(
    new MathParser.MathOperation("+", 2, 5),
    "binary",
    [],
    true,
    "MathOperation.binary_add"
)

TestObjectMethod(
    new MathParser.MathOperation("-", 2, 5),
    "unary",
    [],
    false,
    "MathOperation.unary_sub"
)

TestObjectMethod(
    new MathParser.MathOperation("-", 2, 5),
    "binary",
    [],
    true,
    "MathOperation.binary_sub"
)

TestObjectMethod(
    new MathParser.MathOperation("*", 2, 5),
    "unary",
    [],
    false,
    "MathOperation.unary_mul"
)

TestObjectMethod(
    new MathParser.MathOperation("*", 2, 5),
    "binary",
    [],
    true,
    "MathOperation.binary_mul"
)

TestObjectMethod(
    new MathParser.MathOperation("/", 2, 5),
    "unary",
    [],
    false,
    "MathOperation.unary_div"
)

TestObjectMethod(
    new MathParser.MathOperation("/", 2, 5),
    "binary",
    [],
    true,
    "MathOperation.binary_div"
)

TestObjectMethod(
    new MathParser.MathOperation("^", 2, 5),
    "unary",
    [],
    false,
    "MathOperation.unary_pow"
)

TestObjectMethod(
    new MathParser.MathOperation("^", 2, 5),
    "binary",
    [],
    true,
    "MathOperation.binary_pow"
)

TestObjectMethod(
    new MathParser.MathOperation("sqrt", 125),
    "unary",
    [],
    true,
    "MathOperation.unary_sqrt"
)

TestObjectMethod(
    new MathParser.MathOperation("sqrt", 125),
    "binary",
    [],
    false,
    "MathOperation.binary_sqrt"
)

TestObjectMethod(
    new MathParser.MathOperation("sin", 125),
    "unary",
    [],
    true,
    "MathOperation.unary_sin"
)

TestObjectMethod(
    new MathParser.MathOperation("sin", 125),
    "binary",
    [],
    false,
    "MathOperation.binary_sin"
)

TestObjectMethod(
    new MathParser.MathOperation("cos", 125),
    "unary",
    [],
    true,
    "MathOperation.unary_cos"
)

TestObjectMethod(
    new MathParser.MathOperation("cos", 125),
    "binary",
    [],
    false,
    "MathOperation.binary_cos"
)

TestObjectMethod(
    new MathParser.MathOperation("exp", 125),
    "unary",
    [],
    true,
    "MathOperation.unary_exp"
)

TestObjectMethod(
    new MathParser.MathOperation("exp", 125),
    "binary",
    [],
    false,
    "MathOperation.binary_exp"
)

// MathOperation objects (method eval) ----------------------------------------

TestObjectMethod(
    new MathParser.MathOperation("number", 125),
    "eval",
    [],
    125,
    "MathOperation.eval_number_1"
)

TestObjectMethod(
    new MathParser.MathOperation("+", 2, 2),
    "eval",
    [],
    4,
    "MathOperation.eval_add_1"
)

TestObjectMethod(
    new MathParser.MathOperation("-", 2, 5),
    "eval",
    [],
    -3,
    "MathOperation.eval_sub_1"
)

TestObjectMethod(
    new MathParser.MathOperation("*", 7, 5),
    "eval",
    [],
    35,
    "MathOperation.eval_mul_1"
)

TestObjectMethod(
    new MathParser.MathOperation("*", 7, -5),
    "eval",
    [],
    -35,
    "MathOperation.eval_mul_2"
)

TestObjectMethod(
    new MathParser.MathOperation("/", 18, 6),
    "eval",
    [],
    3,
    "MathOperation.eval_div_1"
)

TestObjectMethod(
    new MathParser.MathOperation("^", 2, 5),
    "eval",
    [],
    32,
    "MathOperation.eval_pow_1"
)

TestObjectMethod(
    new MathParser.MathOperation("^", 49, 0.5),
    "eval",
    [],
    7,
    "MathOperation.eval_pow_2"
)

TestObjectMethod(
    new MathParser.MathOperation("sqrt", 49, null),
    "eval",
    [],
    7,
    "MathOperation.eval_sqrt_1"
)

TestObjectMethod(
    new MathParser.MathOperation("sin", 0, null),
    "eval",
    [],
    0,
    "MathOperation.eval_sin_1"
)

TestObjectMethod(
    new MathParser.MathOperation("sin", Math.PI/2, null),
    "eval",
    [],
    1,
    "MathOperation.eval_sin_2"
)

TestObjectMethod(
    new MathParser.MathOperation("sin", Math.PI/6, null),
    "eval",
    [],
    0.5,
    "MathOperation.eval_sin_3",
    1e-15
)

TestObjectMethod(
    new MathParser.MathOperation("sin", Math.PI/3, null),
    "eval",
    [],
    Math.sqrt(3)/2,
    "MathOperation.eval_sin_4",
)

TestObjectMethod(
    new MathParser.MathOperation("cos", 0, null),
    "eval",
    [],
    1,
    "MathOperation.eval_cos_1"
)

TestObjectMethod(
    new MathParser.MathOperation("cos", Math.PI/2, null),
    "eval",
    [],
    0,
    "MathOperation.eval_cos_2",
    1e-15
)

TestObjectMethod(
    new MathParser.MathOperation("cos", Math.PI/6, null),
    "eval",
    [],
    Math.sqrt(3)/2,
    "MathOperation.eval_cos_3",
    1e-15
)

TestObjectMethod(
    new MathParser.MathOperation("cos", Math.PI/3, null),
    "eval",
    [],
    0.5,
    "MathOperation.eval_cos_4",
    1e-15
)

TestObjectMethod(
    new MathParser.MathOperation("exp", 0, null),
    "eval",
    [],
    1,
    "MathOperation.eval_exp_1",
)

TestObjectMethod(
    new MathParser.MathOperation("exp", 10, null),
    "eval",
    [],
    Math.exp(10),
    "MathOperation.eval_exp_2",
)

TestObjectMethod(
    new MathParser.MathOperation("exp", -10, null),
    "eval",
    [],
    Math.exp(-10),
    "MathOperation.eval_exp_3",
)

TestObjectMethod(
    new MathParser.MathOperation("variable", "x"),
    "eval",
    [{x: 5}],
    5,
    "MathOperation.eval_variables_1",
)

TestObjectMethod(
    new MathParser.MathOperation("-", "x", 3),
    "eval",
    [{x: 10}],
    7,
    "MathOperation.eval_variables_2",
)

TestObjectMethod(
    new MathParser.MathOperation("+", "x", "y"),
    "eval",
    [{x: 5, y: 20}],
    25,
    "MathOperation.eval_variables_3",
)

TestObjectMethod(
    new MathParser.MathOperation("cos", "theta"),
    "eval",
    [{theta: Math.PI/6}],
    Math.sqrt(3)/2,
    "MathOperation.eval_variables_4",
    1e-15,
)

TestObjectMethod(
    new MathParser.MathOperation(
        "+",
        2,
        new MathParser.MathOperation("-", 10, 4),
    ),
    "eval",
    [],
    8,
    "MathOperation.eval_nested_1",
)

TestObjectMethod(
    new MathParser.MathOperation(
        "*",
        new MathParser.MathOperation("+", -3, 7),
        new MathParser.MathOperation("-", 10, 4),
    ),
    "eval",
    [],
    24,
    "MathOperation.eval_nested_2",
)

TestObjectMethod(
    new MathParser.MathOperation(
        "cos",
        new MathParser.MathOperation("/", Math.PI, 3),
    ),
    "eval",
    [],
    0.5,
    "MathOperation.eval_nested_3",
    1e-15
)

TestObjectMethod(
    new MathParser.MathOperation(
        "+",
        new MathParser.MathOperation(
            "*",
            new MathParser.MathOperation("cos", Math.PI/3),
            10,
        ),
        4,
    ),
    "eval",
    [],
    9,
    "MathOperation.eval_nested_4",
)

TestObjectMethod(
    new MathParser.MathOperation(
        "+",
        new MathParser.MathOperation(
            "*",
            new MathParser.MathOperation("cos", "angle"),
            10,
        ),
        4,
    ),
    "eval",
    [{angle: Math.PI/3}],
    9,
    "MathOperation.eval_nested_5",
)

// Summary of tests -----------------------------------------------------------

DisplayNumberOFPassedTests();
