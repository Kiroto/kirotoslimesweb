$(() => {
  const reviewList = $("#review-list");
  const reviewsListUrl =
    "https://api.github.com/repos/Kiroto/kswcontent/contents/reviews";
  const rawInfoUrl =
    "https://raw.githubusercontent.com/Kiroto/kswcontent/master/reviews";
  const contentInfoPath = "contents.json";
  $.getJSON(reviewsListUrl, (data, textStatus, jqXHR) => {
    data.forEach((reviewDir) => {
      const dirName = reviewDir.name;
      $.getJSON(
        `${rawInfoUrl}/${dirName}/${contentInfoPath}`,
        (data, textStatus, jqXHR) => {
          const reviewItem = $("<a />", {
            class: "review-item",
            href: `reviews/${dirName}/review`,
          });
          const reviewItemContents = $("<div />", {
            class: "review-item-container",
          });
          reviewItemContents.append(
            $("<img />", { class: "review-item-img", src: data.thumbnailUrl })
          );
          const reviewItemText = $("<div />", { class: "review-item-text" });
          const titleContainer = $("<div />", {
            class: "review-item-title-container",
          });
          titleContainer.append(
            $("<h2 />", { class: "review-item-title", text: data.title })
          );
          const pubDate = new Date(data.publicationDate);
          let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
            pubDate
          );
          let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(
            pubDate
          );
          let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
            pubDate
          );
          titleContainer.append(
            $("<div />", {
              class: "review-item-publication",
              text: `${da}-${mo}-${ye}`,
            })
          );
          reviewItemText.append(titleContainer);
          reviewItemText.append(
            $("<div />", {
              class: "review-item-author",
              text: `By: ${data.author}`,
            })
          );
          reviewItemText.append(
            $("<div />", {
              class: "review-item-description",
              text: data.description,
            })
          );
          reviewItemContents.append(reviewItemText);
          reviewItem.append(reviewItemContents);
          reviewList.append(reviewItem);
          standarizeAnchor(reviewItem[0]);
        }
      );
    });
  });
});
