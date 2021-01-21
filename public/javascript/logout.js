//get and replace the profile pic on the nav bar
function getPFP() {
  fetch("/api/users/pfp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({
    //   id: "1",
    // }),
  })
    .then((res) => {
      return res.json();
    })
    .then((finalData) => {
      document.getElementById("pfp-nav").src = finalData.profile_photo;
    });
}
getPFP();
async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

//go to profile pge
function profilePageHandler() {
  document.location.replace("/profile");
}

document.querySelector("#logout").addEventListener("click", logout);

//Go to prfile
document
  .querySelector(".lim-width")
  .addEventListener("click", profilePageHandler);
