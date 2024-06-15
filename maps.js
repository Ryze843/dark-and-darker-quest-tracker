function showMap(mapFileName) {
    const mapImage = document.getElementById('map-image');
    mapImage.src = mapFileName;

    const buttons = document.querySelectorAll('.map-tabs button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.textContent === mapFileName.split('.')[0]) {
            button.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showMap('/images/Crypt-01.png');
});
