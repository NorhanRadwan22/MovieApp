export class UI {
    constructor() {

    };
    movieCard(data) {
        const displayElement = document.getElementById('display');
        if (!displayElement) {
            console.error("Could not find display element in the HTML.");
            return;
        }
        let displayBox = '';
        
        if (data && data.results) {
            for (let i = 0; i < data.results.length; i++) {
                let addBox = '';
                let overview = data.results[i].overview;
                if (data.results[i].vote_average.toFixed(1) >= 7) {
                    let iTag = `<i class="fa-solid fa-star text-warning fs-6"></i>`;
                    let starCount = 3;
                     addBox = iTag.repeat(starCount) +'<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>';
                } else {
                    let iTag = `<i class="fa-solid fa-star text-warning fs-6"></i>`;
                    let starCount = 3;
                    addBox = iTag.repeat(starCount) ;
                }
                
                if (overview.length > 112) {
                    const dotIndex = overview.indexOf('.');
                    if (dotIndex !== -1) {
                        overview = overview.slice(0, dotIndex - 1) + '...'; 
                    }
                    
                }
                displayBox += `
                <div class="col-lg-4 col-md-6 col-sm-12 animate__fadeIn getIdValue" data-id="${data.results[i].id}">
                        <div class="item overflow-hidden position-relative animate__fadeIn ">
                            <div class="cardImage animate__fadeIn ">
                                <img src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" alt="${data.results[i].title}" class="img-fluid card-img">
                            </div>
                            <div class=" overlay overflow-hidden animate__fadeIn" style="opacity: 0; visibility: hidden;">
                                <h1 class="title animate__slideOutLeft">The Beekeeper</h1>
                                <p class="desc animate__slideOutLeft">${overview}</p>
                                <p class="date animate__slideOutLeft"><span class="fst-normal">Release Date<span>
                                ${data.results[i].release_date}</span></span></p>
                                <h3 class="rate animate__animated animate__slideOutLeft">${addBox}</h3>
                                <h3 class="rate vote animate__slideOutLeft fs-6">${parseFloat(data.results[i].vote_average.toFixed(1)) }</h3>
                            </div>
                        </div>
                </div>
            `;
            }
        } else {
            console.error("Invalid data structure from the API:", data);
        }
    
        displayElement.innerHTML = displayBox;
        document.querySelectorAll('.getIdValue').forEach((element) => {
            element.addEventListener('mouseenter', function () {
                const details = this.querySelector('.overlay');
                details.style.opacity = 1;
                details.style.visibility = 'visible';
            });

            element.addEventListener('mouseleave', function () {
                const details = this.querySelector('.overlay');
                details.style.opacity = 0;
                details.style.visibility = 'hidden';
            });
        });
    }
}
