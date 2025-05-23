# Copyright (c) 2025, Air Quality and Related Topics (AQArt).
#
# License: BSD 3-clause "new" or "revised" license (BSD-3-clause).

"""Process all the HTML files in the current directory.

For each of these files, this script updates the navigation bar.

NB: this is work in progress.

"""

import os
from os.path import dirname, join

## Support functions


def list_all_html_files(dirpath):
    """Return a list of all the HTML files in given directory.

    This function searches sub-directories recursively and skips files and
    directories that start with ".".

    The output is a dictionary of the form:

    {
        ".": ["file1.html", "file2.html"],
        "subdir1": {...},
        "subdir2": {...},
    }

    """
    out = {".": []}
    for name in os.listdir(dirpath):
        if name.startswith("."):
            continue
        path = join(dirpath, name)
        if os.path.isfile(path):
            if name.lower().endswith(".html"):
                out["."].append(name)
        elif os.path.isdir(path):
            out[name] = list_all_html_files(path)
            if len(out[name]) == 0:
                out.pop(name)
    if len(out["."]) == 0:
        out.pop(".")
    return out


def indent(level=0, nindent=2):
    """Return spaces corresponding to given indent."""
    return " " * level * nindent


def tag(name, content, close=True, **attributes):
    """Return the HTML tag corresponding to given name and attributes."""
    attrs = " " if attributes else ""
    attrs += " ".join('%s="%s"' % (k, v) for k, v in attributes.items())
    out = "<%s%s>%s" % (name, attrs, content)
    if close:
        out += "</%s>" % name
    return out


def div(content, close=True, **attributes):
    """Return the HTML div tag corresponding to given name and attributes."""
    return tag("div", content, close=close, **attributes)


def main_nav(files, nicknames, level=0, nindent=2):
    """Return HTML code for main navigation bar."""
    out = '%s<nav class="main">' % indent(level, nindent)
    for filename in files["."]:
        filepath = join(".", filename)
        a = tag("a", nicknames[filepath], href=filepath)
        out += "\n%s%s" % (indent(level + 1, nindent), div(a))
    sort_key = lambda d: list(nicknames.keys()).index(
        join(".", d, "index.html")
    )
    for dirname in sorted([k for k in files if k != "."], key=sort_key):
        # Create the dropdown menu with index.html
        try:
            files[dirname]["."].remove("index.html")
        except ValueError:
            raise ValueError('Expecting index.html in "%s."' % dirname)
        filepath = join(".", dirname, "index.html")
        out += "\n%s" % indent(level + 1, nindent)
        a = tag("a", nicknames[filepath], href=filepath)
        if len(files[dirname]["."]) == 0:
            out += div(a)
        else:
            out += div(a, close=False, **{"class": "dropdown"})
            out += "\n%s<div>" % indent(level + 2, nindent)
            filepaths = [join(".", dirname, f) for f in files[dirname]["."]]
            sort_key = lambda p: list(nicknames.keys()).index(p)
            filepaths = sorted(filepaths, key=sort_key)
            for filepath in filepaths:
                a = tag("a", nicknames[filepath], href=filepath)
                out += "\n%s%s" % (indent(level + 3, nindent), a)
            out += "\n%s</div>" % indent(level + 2, nindent)
            out += "\n%s</div>" % indent(level + 1, nindent)
    out += "\n%s</nav>" % indent(level, nindent)
    return out


## Hard-coded parameters

nicknames = {
    "./index.html": "Home",
    "./dens/index.html": "Solver",
    "./dens/onedim.html": "1D",
    "./dens/twodim.html": "2D",
    "./notebook/index.html": "Notebook",
    "./tests/index.html": "Tests",
    "./tests/comres.html": "Commons",
    "./tests/lib_mathparser.html": "MathParser",
    "./tests/dens.html": "Solver",
}


dir_repo = join(dirname(__file__), "..")
files = list_all_html_files(dir_repo)
print(main_nav(files, nicknames, level=2))
