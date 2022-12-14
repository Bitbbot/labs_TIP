"use strict";

$(document).ready(function () {
    let listItemsContent = $("#moto_models > li:contains('Мотоцикл')").text(); 
    let cellsContent = ''; 
    let imagesContent = ''; 
    $('#moto_table tr:even > td:last-child').each((index, value) => {
        cellsContent += `${ value.innerText }; `;
    });

    $("#for-footer > .image-container > img[title='Производители']").each((index, value) => {
        imagesContent += `${ value.getAttribute('alt') }; `;
    });

    $('#list-items').text(listItemsContent);
    $('#cells').text(cellsContent);
    $('#pictures').text(imagesContent);
});
