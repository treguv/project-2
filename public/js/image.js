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
document.querySelector("#upload").addEventListener("click", uploadMenuHandler);
