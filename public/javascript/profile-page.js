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

      //Send the put request to update the image in the user model
      let user_id = document.getElementById("session_user").value;
      const splitURL = uploadedImageUrl.split("/");
      console.log(splitURL.length);
      console.log(splitURL);
      let newURL = "http://";
      //add the first part of the url
      for (let i = 2; i <= 5; i++) {
        newURL += splitURL[i] + "/";
      }
      //splice in the edits
      newURL = newURL + `w_200,h_200,r_max,c_fill/fl_cutter/`;
      //Add on the rest of the url
      for (let i = 6; i <= splitURL.length - 1; i++) {
        newURL = newURL + "" + splitURL[i] + "/";
      }
      newURL = newURL.substring(0, newURL.length - 1);
      newURL = newURL.replace(".jpg", ".png");
      console.log(newURL);
      document.getElementById("pfp").src = newURL; //This sets the stock image with the uploaded one
      const editedUrl = fetch("/api/users/" + user_id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          profile_photo: newURL,
        }),
      }).then((response) => {
        document.location.reload();
      });
    }
  }
);
//https://res.cloudinary.com/demo/image/upload/w_173,h_200,c_fill/l_hexagon_sample,fl_cutter/pasta.png
//https://res.cloudinary.com/quarantinepics/image/upload/w_200,h_200,r_20,c_fill/fl_cutter/images/bsmmbgzwmu8flx8m2x2p.jpg

console.log(document.getElementById("session_user").value);
//create post buton
function createPost() {
  document.location.replace("/image");
};

function updatePictureHandler(event) {
  event.preventDefault();
  console.log("click!");
  let data = myCropWidget.open();
  console.log("data object", data);
}
document.querySelector("#create-post").addEventListener("click", createPost);

//Update the profile picture
document.getElementById("pfp").addEventListener("click", updatePictureHandler);
