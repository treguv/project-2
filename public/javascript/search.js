async function searchPostHandler(event) {
  event.preventDefault();
  const searchTerm = document.getElementById("query").value;
  console.log("/api/posts/search/" + searchTerm); // grab the search query

  //   const response = await fetch("/api/posts/search", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       tags: searchTerm,
  //     }),
  //   });

  //   const response = await fetch("/api/posts/search/" + searchTerm
  document.location.replace("/api/posts/search/" + searchTerm);
  //   if (response.ok) {
  //     document.location.replace("");
  //   } else {
  //     console.log(response.statusText);
  //   }
}

document
  .querySelector(".search-btn")
  .addEventListener("click", searchPostHandler);
