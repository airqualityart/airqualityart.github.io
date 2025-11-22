# Copyright (c) 2025, Air Quality and Related Topics (AQArt).
#
# License: BSD 3-clause "new" or "revised" license (BSD-3-clause).

"""Process all the HTML files in the current directory.

For each of these files, this script updates the main navigation block.

This script must be called from the root of this repository.

"""

import sys
import os

if (
    sys.version_info.major < 2
    or sys.version_info.minor == 3
    and sys.version_info.minor < 7
):
    raise RuntimeError(
        "This script relies on the fact that key order is preserved in "
        "dictionaries. Please use Python >= 3.7. (You are using %d.%d)"
        % (sys.version_info.major, sys.version_info.minor)
    )


def relative_path(path_of, relative_to):
    """Return given path relative to other, in repository folder.

    Parameters
    ----------
    path_of: str
        Path of the target file.
    path_to: str
        Path to which the relative path must be calculated.

    Returns
    -------
    str
        The path of path_of" relative to relative_to. For example:
        ./index.html relative to ./dens/index.html is ../index.html.
        ./dens/index.html relative to ./index.html is ./dens/index.html.

    """
    ok_of = path_of.lower().endswith(".html")
    ok_to = relative_to.lower().endswith(".html")
    if not ok_of or not ok_to:
        raise ValueError("Expecting HTML files.")
    out_without_prefix = os.path.relpath(path_of, os.path.dirname(relative_to))
    out_with_prefix = os.path.join(".", out_without_prefix)
    if out_with_prefix.startswith(os.path.join(".", "..")):
        out_with_prefix = out_without_prefix
    return out_with_prefix


def indent(level, nindent):
    """Return spaces corresponding to given indent.

    Parameters
    ----------
    level: int
        The level of indentation.
    nindent: int
        The number of spaces to use for each level of indentation.

    Returns
    -------
    str
        A string containing level * nindent spaces.

    """
    return " " * level * nindent


def tag(name, content="", close=True, **attributes):
    """Return the HTML tag corresponding to name, content, and attributes.

    Parameters
    ----------
    name: str
        The name of the tag (eg. "h1", "div").
    content: str
        The content of the tag.
    close: bool
        Whether to close the tag.
    **attributes: dict(str, str)
        Attributes (name, value pairs) to add to the tag.

    Returns
    -------
    str
        The HTML tag, properly formatted.

    """
    if attributes:
        attrs_order = ["class", "href"]
        names = sorted(
            attributes.keys(),
            key=lambda name: attrs_order.index(name)
            if name in attrs_order
            else -1,
        )
        attrs = " " + " ".join('%s="%s"' % (n, attributes[n]) for n in names)
    else:
        attrs = ""
    out = "<%s%s>%s" % (name, attrs, content)
    if close:
        out += "</%s>" % name
    return out


def div(content="", close=True, **attributes):
    """Return the HTML div tag corresponding to content and attributes.

    Parameters
    ----------
    content: str
        The content of the tag.
    close: bool
        Whether to close the tag.
    **attributes: dict(str, str)
        Attributes (name, value pairs) to add to the tag.

    Returns
    -------
    str
        The HTML div tag, properly formatted.

    """
    return tag("div", content, close=close, **attributes)


def main_nav(files, current, level=0, nindent=2):
    """Create the main navigation bar.

    Parameters
    ----------
    files: dict(str, str)
        Files to process (mapping from filepath to nickname).
    current: str
        Filepath for the current file.
    level: int
        Level of indentation of the navigation bar.
    nindent: int
        Number of spaces per level of indentation.

    Returns
    -------
    str
        The text of the navigation bar.

    """
    nav = tag("nav", close=False, **{"class": "main"})
    current_indent = indent(level, nindent)
    nav = ["{0}{1}".format(current_indent, nav)]
    current_indent += indent(1, nindent)

    # Add the main index.html
    filename = "index.html"
    attrs = {"class": "active"} if filename == current else {}
    attrs["href"] = relative_path(filename, current)
    a = tag("a", content=files[filename], **attrs)
    nav.append("{0}{1}".format(current_indent, div(a)))

    # Process each dropdown item
    dropdowns = [os.path.dirname(f) for f in files]
    dropdown_old, close = "", True
    for filepath, nickname in files.items():
        dropdown = os.path.dirname(filepath)

        if dropdown == "":
            continue

        # Are we encountering a new dropdown item?
        if dropdown != dropdown_old:
            # Finalize the previous dropdown menu if needed
            if dropdown_old != "" and not close:
                for _ in range(2):
                    current_indent = current_indent[: -len(indent(1, nindent))]
                    nav.append("{0}</div>".format(current_indent))
            dropdown_old = dropdown

            # Add the index.html for this dropdown menu
            index = os.path.join(dropdown, "index.html")
            attrs = {"class": "active"} if index == current else {}
            attrs["href"] = relative_path(index, current)
            a = tag("a", content=nickname, **attrs)
            close = sum(d == dropdown for d in dropdowns) == 1
            div_ = div(content=a, close=close, **{"class": "dropdown"})
            nav.append("{0}{1}".format(current_indent, div_))

            # Nothing else to do if there is only one item in the dropdown menu
            if close:
                continue

            # Otherwise prepare for adding sub-items
            current_indent += indent(1, nindent)
            nav.append("{0}{1}".format(current_indent, div(close=False)))
            current_indent += indent(1, nindent)

        # Add the dropdown menu item if not already done
        if os.path.basename(filepath).lower() != "index.html":
            attrs = {"class": "active"} if filepath == current else {}
            attrs["href"] = relative_path(filepath, current)
            a = tag("a", content=nickname, **attrs)
            nav.append("{0}{1}".format(current_indent, a))

    # Close the last dropdown menu
    if dropdown_old != "":
        for _ in range(2):
            current_indent = current_indent[: -len(indent(1, nindent))]
            nav.append("{0}</div>".format(current_indent))

    # Close, format, and return the navigation bar
    current_indent = current_indent[: -len(indent(1, nindent))]
    nav.append("{0}</nav>".format(current_indent))
    return "\n".join(nav)


if __name__ == "__main__":
    filepaths = {
        "index.html": "Home",
        "dens/index.html": "Solver",
        "dens/onedim.html": "1D",
        "dens/twodim.html": "2D",
        "notebook/index.html": "Notebook",
        "tests/index.html": "Tests",
        "tests/comres.html": "Commons",
        "tests/lib_mathparser.html": "MathParser",
        "tests/dens.html": "Solver",
    }

    ## Add or replace the main navigation block to all the files

    for filepath in filepaths:
        print("\n\nProcessing %s...\n\n" % filepath)
        print(main_nav(filepaths, filepath, level=3))
