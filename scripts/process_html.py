# Copyright (c) 2025, Air Quality and Related Topics (AQArt).
#
# License: BSD 3-clause "new" or "revised" license (BSD-3-clause).

"""Process all the HTML files in the current directory.

For each of these files, this script updates the main navigation block.

"""

import os

## Support functions


def list_all_html_files(dirpath, sort_key=None):
    """Return a list of HTML files in given directory and sub-directories.

    Parameters
    ----------
    dirpath: str
        The directory to search recursively.
    sort_keys: function | None
        If not None, the function to use to sort the results.

    Returns
    -------
    [str,]
        A list of the paths to the HTML files, relative to dirpath (and sorted
        if sort_key is not None).

    Notes
    -----
    This function skips files and directories that start with ".".

    """
    out = []
    for name in os.listdir(dirpath):
        path = os.path.join(dirpath, name)
        if name.startswith("."):
            continue
        elif os.path.isfile(path) and name.lower().endswith(".html"):
            out.append(name)
        elif os.path.isdir(path):
            out += [os.path.join(name, f) for f in list_all_html_files(path)]
    if sort_key is not None:
        out = sorted(out, key=sort_key)
    return out


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


def indent(level=0, nindent=2):
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
