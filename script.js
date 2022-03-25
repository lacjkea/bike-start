window.addEventListener("DOMContentLoaded", init);

function init(event) {
  loadBikes();
}

async function loadBikes() {
  const response = await fetch(
    "https://wps22.it-studerende.dk/wp-json/wp/v2/bike?_embed"
  );
  //   console.log("lacj-response", response);
  const thedata = await response.json();
  //   console.log("thedata", thedata);
  displayData(thedata);
}

function displayData(bikes) {
  console.log(bikes);
  bikes.forEach((bike) => {
    console.log(bike.title.rendered);
    const templateEl = document.querySelector("template").content;
    const cloneEl = templateEl.cloneNode(true);

    /*     console.log(
      "hey",
      bike._embedded["wp:featuredmedia"][0].media_details.sizes.medium
        .source_url
    ); */
    cloneEl.querySelector("img").src =
      bike._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.medium_large.source_url;
    /* console.log("catName", bike._embedded["wp:term"][0][1].name); */
    cloneEl.querySelector("h3").textContent =
      bike._embedded["wp:term"][0][1].name;
    cloneEl.querySelector("h2").textContent = bike.title.rendered;
    let priceEl = cloneEl.querySelector(".price span");
    let priceText = bike.price;

    if (bike.price_to > 0) {
      //   alert("hey");
      let appendText = " - $" + bike.price_to;
      priceText += appendText;
      //   priceText += ` - \$${price_to}`;
    }

    priceEl.textContent += priceText;

    // console.log("lacjtags", bike._embedded["wp:term"][1]);

    let colors = bike._embedded["wp:term"][1];
    if (colors.length) {
      //   alert("hey");
      cloneEl.querySelector(".colour span").textContent = "";
      const ulEl = document.createElement("ul");
      colors.forEach((color) => {
        const liEl = document.createElement("li");
        liEl.style.backgroundColor = color.name;
        ulEl.appendChild(liEl);
      });
      cloneEl.querySelector(".colour span").appendChild(ulEl);
    }

    const parentEl = document.querySelector("main");
    parentEl.appendChild(cloneEl);
  });
  //   alert("all done");
}
