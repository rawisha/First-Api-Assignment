//REUQEST DATA START HERE //
const filmUrl = "https://swapi.dev/api/films/";
const titles = document.querySelectorAll("#title");
const year = document.querySelectorAll("#year");
//GRAB TITLE,RELEASE DATE AND OUTPUT IN THE INNER HTML
const infos = [];
const characters = [];
fetch(filmUrl)
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((info) => {
      infos.push(info);
    });
    for (i = 0; i < titles.length; i++) {
      titles[i].innerHTML = infos[i].title;
      year[i].innerHTML = infos[i].release_date;
      const promises = infos[i].characters.map((url) =>
        fetch(url).then((res) => res.json())
      );

      const setChars = () => {
        Promise.all(promises).then((res) => {
          characters.push(res);
        });
      };
      setChars();
    }
  });

//REUQEST DATA END HERE //

//ABOUT MODAL START HERE//

//get the modal
const modal = document.querySelector("#aboutModal");
//the function for printing out information, with the sent index from openAboutModal as a parameter
const showStaff = (valueOne) => {
  const characterNamesAsHTML = characters[valueOne]
    .map((char) => `<p>${char.name}</p>`)
    .join("");
  document.querySelector("#name").innerHTML = characterNamesAsHTML;
  document.querySelector("#titles").innerHTML = infos[valueOne].title;
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
