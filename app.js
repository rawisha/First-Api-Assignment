//REUQEST DATA START HERE //
const filmUrl = "https://swapi.dev/api/films/";
const titles = document.querySelectorAll(".title");
const year = document.querySelectorAll(".year");

/* Empty array holders for infos (result data) and Character urls*/
const infos = [];
const characters = [];

/* Boolens for data and characers if loaded or not*/
let dataLoaded = true;
let charactersLoaded = true;

/* Fetching filmUrl and converting them to json
// Looping over each Movies and pushing the data into Infos above
*/
fetch(filmUrl)
  .then((res) => res.json())
  .then((data) => {
    dataLoaded = false;

    data.results.forEach((info) => {
      infos.push(info);
    });
    /*
    // Looping over each title in the dom and presenting them with corresponding 
    // data fetched from Infos array we put up above
    */
    for (i = 0; i < titles.length; i++) {
      titles[i].innerHTML = infos[i].title;
      year[i].innerHTML = infos[i].release_date;
      document.querySelectorAll(".title")[i].classList.remove("loader");
      /*
      // Creating multiple promises from character urls and converting the response to json
      */
      const promises = infos[i].characters.map((url) =>
        fetch(url)
          .then((res) => res.json())
          .catch((error) => {
            console.log("Something went terrabily wrong...");
          })
      );
      /*
      // Grabbing all the promises data and pushing them into character arrays we put up above
      */
      const setChars = () => {
        Promise.all(promises).then((res) => {
          characters.push(res);
        });
      };
      // Running the setChars function
      setChars();
    }
  });

//REUQEST DATA END HERE //

//ABOUT MODAL START HERE//

//get the modal
const modal = document.querySelector("#aboutModal");
//the function for printing out information, with the sent index from openAboutModal as a parameter
const showStaff = (valueOne) => {
  /*
  // Checking first if characters is empty or not
  // once the value is above 0, then renderes out the data in the modal window
  */
  if (characters.length > 0) {
    charactersLoaded = false;
    document.querySelector("#name").classList.remove("loader");
    // Creating p elements for each data looped over characters array we put up above
    // rendering out each information to the modal window with the help of index (Value one)
    const characterNamesAsHTML = characters[valueOne]
      .map((char) => `<p>${char.name}</p>`)
      .join("");
    document.querySelector("#name").innerHTML = characterNamesAsHTML;
    document.querySelector("#titles").innerHTML = infos[valueOne].title;
  }
};

//function for opening the about modal
const openAboutModal = () => {
  //get the buttons in the about cards, every button with the classname are collected in an array
  const btn = document.querySelectorAll(".about-btn");
  //iterate over every index in the button array
  for (let i = 0; i < btn.length; i++) {
    //listen for clicks on the buttons
    btn[i].addEventListener("click", () => {
      //when clicking, the modal shows up
      modal.style.display = "block";
      //call the showStaff function with the clicked index position as a parameter
      showStaff([i]);
    });
  }
};

//function for closing the about modal - starts with an onclick in the html-doc
const closeAboutModal = () => {
  //hide the modal-div
  modal.style.display = "none";
};
window.addEventListener("click", (event) => {
  if (event.target.id === "aboutModal") {
    closeAboutModal();
  }
});
//when the window load, call the openAboutModal function
window.addEventListener("load", openAboutModal);
