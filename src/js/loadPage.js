const host = window.location.host;

const standarizeAnchor = (anchor) => {
  if (anchor.href.includes(host)) {
    anchor.onclick = () => {
      goto(anchor.pathname);
      return false;
    };
    const pn = window.location.pathname;
    if (pn == "/") {
      if (anchor.pathname == "/") {
        anchor.classList.add("current");
      } else {
        anchor.classList.remove("current");
      }
    } else if (anchor.pathname != "/" && pn.includes(anchor.pathname)) {
      anchor.classList.add("current");
    } else {
      anchor.classList.remove("current");
    }
  }
};

const standarizeAnchors = () => {
  $(() => {
    const anchors = $("a");
    const anchorAmt = anchors.length;
    for (let i = 0; i < anchorAmt; i++) {
      const anchor = anchors[i];
      standarizeAnchor(anchor);
    }
  });
};

const loadContents = (requestedPath) => {
  let finalPath = "";
  if (requestedPath.includes("/reviews/")) {
    const requestedPathSections = requestedPath.split("/");
    finalPath = `https://raw.githubusercontent.com/Kiroto/kswcontent/master/reviews/${requestedPathSections[2]}/review`;
  } else {
    finalPath += "/src/pages";
    if (requestedPath == "/") {
      finalPath += "/home";
    } else {
      finalPath += requestedPath;
    }
  }
  finalPath += ".html";
  $.get({
    url: finalPath,
    success: (data, textStatus, jqXhr) => {
      $(() => {
        $("#contents").html(data);
        standarizeAnchors();
      });
    },
    error: (jqXhr, textStatus, errorThrown) => {
      $(() => {
        $("#contents").load("/src/pages/errorPage.html", undefined, () => {
          $("#errorText").text(`${errorThrown}; ${textStatus}`);
          $("#errorCode").text(jqXhr.status);
          standarizeAnchors();
        });
      });
    },
  });
};

const goto = (path) => {
  history.pushState(undefined, undefined, path);
  loadContents(path);
};

const loadMain = () => {
  const requestedPath = window.location.pathname;
  $(() => {
    $("#main-container").load(`/src/components/main.html`, undefined, () => {
      goto(requestedPath);
    });
  });
};

loadMain();
