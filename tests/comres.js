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

DisplayNumberOFPassedTests();
