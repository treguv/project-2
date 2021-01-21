


async function tagsPostHandler(event) {
  event.preventDefault();

  // To modify current URL and add / inject it (the new modified URL) as a new URL entry to history list, use pushState:
  // this clears the url and prevents the new url to be added to the existing url :
  // http://localhost:3001/api/posts/search/Memes/api/posts/search/Memes/
  // this line will momentarily take you to the homepage and then add the new url 
  window.history.pushState({}, document.title, "/");

  const searchTag = document.getElementById("search_tag").value.trim();
  console.log(searchTag)


  const response = await fetch(`api/posts/search/${searchTag}`, {
    method: 'GET',
    headers: {
      "content-type": "application/json",
    },

  });
  if (response.ok) {

    document.location.replace(`api/posts/search/${searchTag}`);
  } else {
    alert(response.statusText);
  }
}


document.getElementById("searchicon").addEventListener("click", tagsPostHandler);

