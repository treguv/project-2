//variable to hold the image url
let uploadedImageUrl = "";
//init the widget
var myCropWidget = cloudinary.createUploadWidget(
  {
    cloudName: "quarantinepics",
    uploadPreset: "karsgrro",
    folder: "images",
    cropping: false,
  },
  (error, result) => {
    //console.log(error, result);
    console.log("this is what it results ", result);
    if (result.info.url) {
      console.log(result.info.url); // This here will return the image url uploaded onto the webpage
      //replace the stock photo with the one the user uploads
      uploadedImageUrl = result.info.url;
      document.getElementById("post-image").src = uploadedImageUrl; //This sets the stock image with the uploaded one
    }
  }
);

//show the menu
function uploadMenuHandler(event) {
  event.preventDefault();
  let data = myCropWidget.open();
  console.log("data object", data);
  //After this menu the file is uploaded to the server
}

//send request to post api to save as new post
async function makePostHandler(event) {
  console.log("Making post!");
  event.preventDefault();
  const caption = document.querySelector("#caption").value.trim();
  let tags_local = document.getElementById("post_tag").value.trim();
  console.log(tags_local);
  if (tags_local == "Tags Categories") {
    tags_local = "Different";
  }
  console.log(tags_local);

  const user_id = document.getElementById("user_id").value;
  console.log(tags_local);
  const image = document.getElementById("post-image").src;
  // console.log(
  //   `Making new post with ${image} image, ${caption} caption, ${tags} tags`
  // );
  const response = await fetch("/api/posts/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      post_caption: caption,
      user_id: user_id,
      image_url: image,
      tags: tags_local, // this might need to be changed to an array of tags in the future
    }),
  });

  //check if everything worked
  //console.log("Server response", response);
  if (response.ok) {
    document.location.replace("/"); // replace with dashboard after
  } else {
    alert(response.statusText);
  }
}

//Add listener to add image page
document
  .querySelector("#post-image")
  .addEventListener("click", uploadMenuHandler);

//add listener for upload button
document
  .getElementById("upload-image")
  .addEventListener("click", makePostHandler);

// route ---> html ---> javascrip
