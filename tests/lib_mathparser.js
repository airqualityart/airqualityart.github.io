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

// Summary of tests -----------------------------------------------------------

DisplayNumberOFPassedTests();
