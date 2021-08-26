const host = window.location.host;

const standarizeAnchors = () => {
  $(() => {
    const anchors = $("a");
    const anchorAmt = anchors.length;
    for (let i = 0; i < anchorAmt; i++) {
      const anchor = anchors[i];
      anchor.rel = "no-refresh"
      anchor.onclick = () => {
        goto(anchor.href);
        return false
      };
      if (window.location.pathname == anchor.pathname) {
        anchor.classList.add("current");
      } else {
        anchor.classList.remove("current");
      }
    }
  });
};

const loadContents = (requestedPath) => {
  let finalPath = "/src/pages";
  console.log(requestedPath);
  if (requestedPath == "/") {
    finalPath += "/home";
  }
  finalPath += ".html";
  $.get({
    url: finalPath,
    success: (data, textStatus, jqXhr) => {
      $(() => {
        $("#contents").html(data);
      });
    },
    error: (jqXhr, textStatus, errorThrown) => {
      $(() => {
        $("#contents").load("/src/pages/errorPage.html", undefined, () => {
          $("#errorText").text(errorThrown);
          $("#errorCode").text(jqXhr.status);
        });
      });
    },
    complete: () => {
      standarizeAnchors();
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
