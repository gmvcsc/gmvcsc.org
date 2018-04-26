function loadContentPage(contentName) {
  contents.load(`content-pages/${contentName}.html`, function(
    responseText,
    textStatus,
    req
  ) {
    if (location.hash.substring(1) == contentName) return;
    if (textStatus === "error") {
      alert(`Content page for "${e.text()}" does not exist.`);
      return;
    }
    contents.hide();
    contents.fadeIn();
    location.hash = contentName;
  });
}

function setupLinks(cb) {
  var navbar = $("#navbar");
  var navbarList = navbar.find("li");

  navbarList.each(function(index, element) {
    var e = $(element);
    e.click(function() {
      loadContentPage(e.attr("data-contents"));
      navbarList.each(function(index, element) {
        var e = $(element);
        setGreen(e);
      });
      document.title = "GMVCSC | " + e.text();
      setGrey(e);
    });
  }, cb);
}

function setGrey(e) {
  e.css("background-color", "#ccc");
}

function setGreen(e) {
  e.css("background-color", "#8fbc8f");
}

function getButton(contentId) {
  var navbar = $("#navbar");
  var navbarList = navbar.find("li");

  var button;

  navbarList.each(function(index, element) {
    var e = $(element);
    var dataContents = e.attr("data-contents");
    if (contentId == dataContents) {
      button = e;
    }
  });

  return button;
}

function handleHash() {
  var hash = location.hash.substring(1);

  var navbar = $("#navbar");
  var navbarList = navbar.find("li");

  navbarList.each(function(index, element) {
    var e = $(element);
    if (hash === e.attr("data-contents")) {
      setGrey(e);
    }
  });

  contents.load(`content-pages/${hash}.html`, function(
    responseText,
    textStatus,
    req
  ) {
    if (textStatus === "error") {
      loadContentPage("home");
      setGrey(getButton("home"));
    }
  });
}

var contents;
$(document).ready(function() {
  $("#navigation").load("templates/nav.html", function() {
    setupLinks();
    handleHash();
  });

  $("#footer").load("templates/footer.html");
  $("#sidebar").load("templates/sidebar.html");

  contents = $("#contents");
});
