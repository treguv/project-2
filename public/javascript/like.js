async function likePostHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch("/api/posts/like", {
    method: "Post",
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    document.getElementById("already_liked_msg").innerHTML = "hey! you already liked this!"
  }
}

document.querySelector("#like-count").addEventListener("click", likePostHandler);
