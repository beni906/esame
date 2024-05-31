let elListaSpettacoli = document.querySelector("#elListaSpettacoli");
let elListaScaduti = document.querySelector("#elListaScaduti");

function recuperaFilm() {
    const urlFilm = "http://localhost:3000/spettacoli"

    fetch(urlFilm)
        .then(data => { return data.json() })
        .then(response => {
            let films = response;
            console.log(films);

            films.forEach(film => {
                if (film.disponibilità) {
                    elListaSpettacoli.appendChild(creaCardFilm(film));
                } else {
                    elListaScaduti.appendChild(creaCardFilm(film))
                }
            });
        })
}

window.addEventListener("DOMContentLoaded", recuperaFilm);

/**
 * @param {Object} film 
 */
function creaCardFilm(film) {
    let card = document.createElement("div");
    
    if(film.disponibilità){
      card.setAttribute("class", "swiper-slide");
    }else{
        card.setAttribute("class", "card col-lg-2 p-3 mt-5")
    }
  
    let img = document.createElement("img");
    img.setAttribute("src", film.locandina);
    img.setAttribute("class", "w-100");
    img.setAttribute("alt", "titolo del film " + film.titolo);

    let divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");

    card.appendChild(img);
    card.appendChild(divCardBody);

    divCardBody.innerHTML += `<h4 class="card-title"> ${film.titolo} </h4>`;
    divCardBody.innerHTML += `<p class="card-text"> Costo: ${film.prezzo} € </p>`;

    if (film.disponibilità) {
        let dropDown = document.createElement("select");

        dropDown.setAttribute("id", "sceltaFilm" + film.id); //assegno un id dinamico ad ogni select

        dropDown.setAttribute("class", "form-select");
        film.replica.forEach(rep => {
            dropDown.innerHTML += `<option value="${rep.sala} - ${rep.orario}"> ${rep.sala} - ${rep.orario} </option>`
        });

        divCardBody.appendChild(dropDown)

        let buttonAcquista = document.createElement("button");
        buttonAcquista.setAttribute("class", "btn btn-primary mt-3");
        buttonAcquista.textContent = "Acquista";

        buttonAcquista.addEventListener("click", function () {

            let scelta = dropDown.value;

            localStorage.setItem(film.id, film.titolo + " - " + scelta + " - " + film.prezzo)
        })

        divCardBody.appendChild(buttonAcquista);
    } else {
        divCardBody.innerHTML += "<h3> Film non più disponibile </h3>"
    }

    return card;
}
/*
inspiration
https://dribbble.com/shots/4684682-Aquatic-Animals
*/

var swiper = new Swiper(".swiper", {
    // effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    // coverflowEffect: {
    //   rotate: 0,
    //   stretch: 0,
    //   depth: 100,
    //   modifier: 3,
    //   slideShadows: true
    // },
    keyboard: {
      enabled: true
    },
    mousewheel: {
      thresholdDelta: 70
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1560: {
        slidesPerView: 4,
        spaceBetween: 30,
      }
    }
  });
  



// Questo è un commento per vedere come funziona Git