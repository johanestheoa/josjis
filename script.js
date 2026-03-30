const kataKata = ["HEBAT", "PEMBERANI", "BERHARGA", "LUAR BIASA", "KUAT", "MAMPU", "TANGGUH", "BERARTI", "ISTIMEWA", "PEMENANG", "INSPIRASI", "UNIK", "CUKUP", "DICINTAI", "BERCAHAYA", "MANDIRI", "BERDAYA", "OPTIMIS", "CERDAS", "TENANG"];
let index = 0;

function gantiTeks() {
    const elementTeks = document.getElementById("changing-text");
    if (elementTeks) {
        elementTeks.innerText = kataKata[index];
        index = (index + 1) % kataKata.length;
    }
}

setInterval(gantiTeks, 200);
window.onload = gantiTeks; // Jalankan saat halaman selesai dimuat