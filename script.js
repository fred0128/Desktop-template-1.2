document.addEventListener("DOMContentLoaded", function () {
    const batteryBars = document.querySelector("#battery-bars");

    // Pil durumunu kontrol et
    navigator.getBattery().then(function (battery) {
        // İlk durumu güncelle
        updateBatteryBars(battery);

        // Herhangi bir değişiklik olduğunda pil durumunu güncelle
        battery.addEventListener('chargingchange', function () {
            updateBatteryBars(battery);
        });

        battery.addEventListener('levelchange', function () {
            updateBatteryBars(battery);
        });
    });

    function updateBatteryBars(battery) {
        const level = battery.level * 100;

        let numOfBars = Math.floor(level / 10);
        if (numOfBars === 0) numOfBars = 1;
        if (numOfBars > 10) numOfBars = 10;

        let barsHTML = "";

        // Batarya yüzdesi metnini oluştur
        const percentageText = `<span>${Math.round(level)}</span><span class="battery-percentage-item">%</span>`;
        // Batarya yüzdesini gösteren metni battery-percentage içine ekle
        document.querySelector('.battery-percentage').innerHTML = percentageText;

        if (level < 10) {
            // Batarya yüzdesi 10'un altındaysa, yanıp sönen efekt için özel bir div ekleyelim
            barsHTML += '<div class="battery-bar blink"></div>';
        } else {
            for (let i = 0; i < numOfBars; i++) {
                barsHTML += '<div class="battery-bar"></div>';
            }
        }

        batteryBars.innerHTML = barsHTML;
    }

    // Yanıp sönme efekti için CSS animation ekleyelim
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
        }
        .blink {
            animation: blink 1s infinite;
        }
        .battery-percentage {
            font-size: 32px;
        }
    `;
    document.head.appendChild(style);
});

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    document.getElementById('clock').innerHTML = hours + ":" + minutes + ":" + seconds;

    setTimeout(updateClock, 1000);
}

window.onload = function () {
    updateClock();
};

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.search-box');
    const searchInput = document.getElementById('search');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const inputValue = searchInput.value.trim();

        if (inputValue === "" || inputValue === " ") {
            return;
        }

        const url = 'https://www.google.com/search?q=' + encodeURIComponent(inputValue);

        window.location.href = url;
    });
});








function saveSearchTerm(term) {
    const fs = require('fs');
    const path = require('path');
    const os = require('os');

    // Klasör yolunu belirle
    const folderPath = path.join(os.homedir(), 'SearchHistory');

    // Eğer klasör yoksa oluştur
    if (!fs.existsSync(folderPath)) {
        try {
            fs.mkdirSync(folderPath);
        } catch (err) {
            console.error('Klasör oluşturma hatası:', err);
            return;
        }
    }

    // Dosya yolunu ve içeriği belirle
    const filePath = path.join(folderPath, 'search_history.txt');
    const content = new Date().toISOString() + ': ' + term + '\n';

    // Dosyayı oluştur veya ekle
    try {
        fs.appendFileSync(filePath, content, 'utf8');
        console.log('Arama terimi başarıyla kaydedildi.');
    } catch (err) {
        console.error('Dosya oluşturma hatası:', err);
    }
}
