# Copyright (c) 2025, Air Quality and Related Topics (AQArt).
#
# License: BSD 3-clause "new" or "revised" license (BSD-3-clause).

from process_html import indent, relative_path, tag, div


def test_indent():
    """Test function indent."""
    assert indent(level=0, nindent=0) == ""
    assert indent(level=0, nindent=2) == ""
    assert indent(level=0, nindent=4) == ""
    assert indent(level=0, nindent=0) == ""
    assert indent(level=2, nindent=0) == ""
    assert indent(level=4, nindent=0) == ""
    assert indent(level=1, nindent=2) == "  "
    assert indent(level=2, nindent=2) == "    "
    assert indent(level=1, nindent=4) == "    "
    assert indent(level=2, nindent=4) == "        "


def test_relative_path():
    """Test function relative_path."""
    f = relative_path
    assert f("./index.html", "./index.html") == "./index.html"
    assert f("index.html", "index.html") == "./index.html"
    assert f("./dens/index.html", "./index.html") == "./dens/index.html"
    assert f("./index.html", "./dens/index.html") == "../index.html"
    assert f("./index.html", "./dens/1D/index.html") == "../../index.html"
    d1, d2 = "./notes/index.html", "./dens/1D/index.html"
    assert f(d1, d2) == "../../notes/index.html"
    d1, d2 = "./notes/index.html", "./notes/1D/index.html"
    assert f(d1, d2) == "../index.html"
    d1, d2 = "./notes/index.html", "./notes/other-file.html"
    assert f(d1, d2) == "./index.html"


def test_tag():
    """Test function tag."""
    assert tag("div") == "<div></div>"
    assert tag("div", "hello") == "<div>hello</div>"
    assert tag("div", "hello", close=False) == "<div>hello"
    attributes = {"id": "myself", "class": "example"}
    answer = '<div id="myself" class="example"></div>'
    assert tag("div", **attributes) == answer
    answer = '<div id="myself" class="example">hello</div>'
    assert tag("div", "hello", **attributes) == answer
    answer = '<div id="myself" class="example">hello'
    assert tag("div", "hello", close=False, **attributes) == answer


def test_div():
    """Test function div."""
    assert div() == "<div></div>"
    assert div("hello") == "<div>hello</div>"
    assert div("hello", close=False) == "<div>hello"
    attributes = {"id": "myself", "class": "example"}
    answer = '<div id="myself" class="example"></div>'
    assert div(**attributes) == answer
    answer = '<div id="myself" class="example">hello</div>'
    assert div("hello", **attributes) == answer
    answer = '<div id="myself" class="example">hello'
    assert div("hello", close=False, **attributes) == answer
