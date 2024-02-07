import { UI } from "./ui.module.js";

export class Details {
    constructor() {
        this.ui = new UI();
       
    };

    
    showLoader() {
        const loader = $('.loade');

        if (loader) {
            loader.removeClass('d-none');
            console.log('in')
        }
    }

    hideLoader() {
        const loader = $('.loade');
        if (loader) {
            loader.fadeOut(1700, function () {
                $(this).addClass('d-none');
                console.log('out')
            })
        }
    };
}