const map = L.map('map').setView([-23.5273, -46.6789], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker([-23.5273, -46.6789]).addTo(map).bindPopup('<b>Allianz Parque</b><br>Avenida Francisco Matarazzo, 1705, Água Branca, São Paulo - SP').openPopup();