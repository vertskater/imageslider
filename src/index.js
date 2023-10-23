"use strict";
import "./style.scss";
//create DOM-Elements
const carouselContainer = document.querySelector("#carousel-container");
const picContainer = document.createElement("div");
picContainer.classList.add("carousel-pics");
picContainer.style.width = "900px";
picContainer.style.margin = "auto";
const divRight = document.createElement("div");
divRight.classList.add("next");
const elements = [];
const divLeft = document.createElement("div");
divLeft.classList.add("prev");
for (let i = 0; i < 4; i++) {
  elements.push(document.createElement("em"));
}
divRight.appendChild(elements[0]);
divRight.appendChild(elements[1]);
divLeft.appendChild(elements[2]);
divLeft.appendChild(elements[3]);

picContainer.appendChild(divLeft);
carouselContainer.appendChild(picContainer);
const pictures = [
  {
    src: "https://images.unsplash.com/photo-1589152608358-0b4d13699140?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isActive: true,
  },
  {
    src: "https://images.unsplash.com/photo-1604183667964-bce80268b39d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isActive: false,
  },
  {
    src: "https://images.unsplash.com/photo-1511174944925-a99f10911d45?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1319&q=80",
    isActive: false,
  },
  {
    src: "https://images.unsplash.com/photo-1628587258882-9964452f2831?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isActive: false,
  },
  {
    src: "https://images.unsplash.com/photo-1628627260268-ef0da5c9c10e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isActive: false,
  },
  {
    src: "https://images.unsplash.com/photo-1629204884772-fe5703498336?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isActive: false,
  },
  {
    src: "https://images.unsplash.com/photo-1532896374032-fdffb11e2b8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    isActive: false,
  },
];

let position = 0;
for (let i = 0; i < pictures.length; i++) {
  const image = document.createElement("img");
  image.style.width = "900px";
  image.dataset.index = i;
  image.src = pictures[i].src;
  image.style.left = position + "%";
  position -= 100;
  picContainer.appendChild(image);
}

picContainer.appendChild(divRight);
const images = document.querySelectorAll("img");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
images.forEach((img) => {
  img.addEventListener("mouseover", () => {
    next.style.opacity = "1";
    prev.style.opacity = "1";
  });
  img.addEventListener("mouseleave", () => {
    next.style.opacity = "0";
    prev.style.opacity = "0";
  });
});
next.addEventListener("mouseover", () => {
  next.style.opacity = "1";
});
next.addEventListener("mouseleave", () => {
  next.style.opacity = "0";
});
prev.addEventListener("mouseover", () => {
  prev.style.opacity = "1";
});
prev.addEventListener("mouseleave", () => {
  prev.style.opacity = "0";
});
next.addEventListener("click", () => {
  const lastPic = images.length - 1;
  if (pictures[lastPic].isActive === false) {
    shiftPic("plus");
    changeNavIndex();
  }
});
prev.addEventListener("click", () => {
  if (pictures[0].isActive === false) {
    shiftPic("minus");
    changeNavIndex();
  }
});

function shiftPic(operator) {
  let index = 0;
  for (let i = 0; i < images.length; i++) {
    if (pictures[i].isActive) {
      pictures[i].isActive = false;
      index = i;
    }
    position = parseInt(images[i].style.left);
    operator === "minus"
      ? (images[i].style.left = position - 100 + "%")
      : (images[i].style.left = position + 100 + "%");
  }
  operator === "minus"
    ? (pictures[index - 1].isActive = true)
    : (pictures[index + 1].isActive = true);
}

//bottom Navigation
const dots = [];
const bottomNav = document.createElement("div");
bottomNav.classList.add("bottom-nav");

for (let i = 0; i < pictures.length; i++) {
  dots.push(document.createElement("div"));
  dots[i].classList.add("navpoint");
  dots[i].dataset.index = i;
  bottomNav.appendChild(dots[i]);
}
carouselContainer.appendChild(bottomNav);

function changeNavIndex() {
  let navIndex = 0;
  for (let i = 0; i < pictures.length; i++) {
    if (pictures[i].isActive) {
      navIndex = i;
    }
    dots[i].style.backgroundColor = "transparent";
  }
  dots[navIndex].style.backgroundColor = "gray";
}
changeNavIndex();
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    let position = 0;
    navToPosition(dot.dataset.index, position);
    changeNavIndex();
  });
});

function navToPosition(index, position) {
  pictures.forEach((pic) => {
    pic.isActive = false;
  });
  pictures[index].isActive = true;
  images[index].style.left = "0%";
  index++;
  for (let i = index; i < images.length; i++) {
    position -= 100;
    images[i].style.left = position + "%";
    console.log(position);
  }
  position = index * 100;
  for (let i = 0; i < index; i++) {
    position -= 100;
    images[i].style.left = position + "%";
  }
}
