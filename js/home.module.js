import { Details } from "./details.module.js";
import { UI } from "./ui.module.js";
export class Home {
    constructor() {
        $(document).ready(() => {
            this.navSideBar();
            this.ui = new UI();
            this.details = new Details();
            this.getMovies();
            this.arrowUp();
        })};
    
    arrowUp() {
        $(document).ready(function () {
            $('#arrow').hide();
            $(window).scroll(function () {
                if ($(this).scrollTop() > 500) {
                    $('#arrow').fadeIn();
                } else {
                    $('#arrow').fadeOut();
                }
            });
            $('#arrow').click(function () {
                $('html, body').animate({ scrollTop: 0 }, 200);
            });
        });

    }
    navSideBar() {
        const closeBtn = document.getElementById('option');
        let menuWidth = $('#menu').outerWidth();
        const $menu = $('aside');
        const $closeBtn = $('#option');
        const $menuList = $('#menu ul');
        // Initially hide the menu
        $menu.css({ left: `-${menuWidth}px` });
        $(document).ready(() => {
            $($menuList).show();
            closeBtn.addEventListener('click', () => {
                if (menuWidth > 0) {
                    $menuList.animate({ marginTop: '-500px', }, 500);
                    $menu.animate({ left: `-${menuWidth}px` });
                    menuWidth = -menuWidth;
                } else {
                    $menuList.animate({ marginTop: '20px' });
                    $menu.show().animate({ left: '0px' });
                    $closeBtn.show(); // Show the close button
    
                    menuWidth = Math.abs(menuWidth);
                }
            });
        })
    }

    async getMovies() {
        this.showLoader();
        const api = await fetch(`https://api.themoviedb.org/3/movie/popular?&api_key=73669a48780be6be2256e3f9aa539d8e`);
        let response = await api.json();
        this.ui.movieCard(response);
        this.hideLoader();
        this.name = '';
        document.querySelectorAll('.links a').forEach((link) => {
            link.addEventListener('click', async (event) => {
                this.name = event.target.innerHTML.trim().toLowerCase();
                if (this.name === 'now playing') {
                    this.name = 'now_playing';
                    this.showLoader();
                    const api = await fetch(`https://api.themoviedb.org/3/movie/${this.name}?&api_key=73669a48780be6be2256e3f9aa539d8e`);
                    let response = await api.json();
                    this.hideLoader();
                    this.ui.movieCard(response);
                } else if (this.name === 'popular') {
                    this.showLoader()
                    const api = await fetch(`https://api.themoviedb.org/3/movie/${this.name}?&api_key=73669a48780be6be2256e3f9aa539d8e`);
                    let response = await api.json();
                    this.hideLoader();
                    this.ui.movieCard(response);
                }
                else if (this.name === 'top rated') {
                    this.name = 'top_rated';
                    this.showLoader()
                    const api = await fetch(`https://api.themoviedb.org/3/movie/${this.name}?&api_key=73669a48780be6be2256e3f9aa539d8e`);
                    let response = await api.json();
                    this.hideLoader();
                    this.ui.movieCard(response);
                }
                else if (this.name === 'trending') {
                    this.showLoader()
                    const api = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=73669a48780be6be2256e3f9aa539d8e`);
                    let response = await api.json();
                    this.hideLoader();
                    this.ui.movieCard(response);
                }
                else if (this.name === 'upcoming') {
                    this.showLoader()
                    const api = await fetch(`https://api.themoviedb.org/3/movie/${this.name}?&api_key=73669a48780be6be2256e3f9aa539d8e`);
                    let response = await api.json();
                    this.hideLoader();
                    this.ui.movieCard(response);
                }
                else if (this.name === 'contact us') {
                    this.showLoader()
                    this.ui.formCard();
                    this.hideLoader();
                }
            })
        })
        $('#search').on("input", async function () {
            this.details = new Details();
            let text = $(this).val();
            if (text) {
                let api = await fetch(`https://api.themoviedb.org/3/search/movie?query=${text}&include_adult=false&language=en-US&page=1&api_key=73669a48780be6be2256e3f9aa539d8e`);
                this.details.showLoader();
                let response = await api.json();
                if (response.results.length > 0) {
                    
                    this.ui = new UI();
                    this.ui.movieCard(response);
    
                    this.details.hideLoader();
                    console.log(response);
                    let text = $(this).val();
                    console.log(text);
                } else {
                    const displayElement = document.getElementById('display');
                    let displayBox = '<h1 class="bg-danger text-center">No Movies with that name</h1>';
                    displayElement.innerHTML = displayBox;
                    
                }
            }
        });
    }

    showLoader() {
        const loader = $('.loade');

        if (loader) {
            loader.removeClass('d-none');
        }
    }

    hideLoader() {
        const loader = $('.loade');
        const menu = $('aside');
        if (loader) {
            loader.fadeOut(1400, function () {
                $(this).addClass('d-none');
                menu.removeClass('d-none');
            })
        }
    };
    
}
