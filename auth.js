// --- KONFIGURASI ID ---
const SERVICE_ID = "service_w4omikj"; // ID dari gambar yang kamu kirim
const TEMPLATE_ID = "template_p6a0nnp"; // GANTI DENGAN TEMPLATE ID KAMU

// --- LOGIKA REGISTER ---
async function handleRegister() {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;

    if (!email || pass.length < 8) {
        alert("Email harus diisi & Password minimal 8 karakter!");
        return;
    }

    // 1. Buat Kode OTP & Waktu Expired
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = new Date(new Date().getTime() + 15 * 60000).toLocaleTimeString();

    // 2. Kirim via EmailJS
    const templateParams = {
        to_email: email,      // Pastikan di dashboard EmailJS 'To Email' diisi {{to_email}}
        passcode: otp,       // Sesuai {{passcode}} di template kamu
        time: expiryTime     // Sesuai {{time}} di template kamu
    };

    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
        alert("OTP terkirim ke " + email);

        // 3. Simpan data sementara (Tanpa Hashing untuk percobaan)
        const pendingUser = { email: email, password: pass, otp: otp };
        localStorage.setItem('pending_user', JSON.stringify(pendingUser));

        window.location.href = "registry.html";
    } catch (error) {
        alert("Gagal kirim: " + JSON.stringify(error));
    }
}

// --- LOGIKA VERIFIKASI ---
function validateOTP() {
    const inputOtp = document.getElementById('otp-input').value;
    const pendingData = JSON.parse(localStorage.getItem('pending_user'));

    if (pendingData && inputOtp === pendingData.otp) {
        // Pindahkan ke User Terdaftar
        localStorage.setItem('registered_user', JSON.stringify(pendingData));
        localStorage.removeItem('pending_user');
        alert("Berhasil! Akun aktif. Silakan Login.");
        window.location.href = "index.html";
    } else {
        alert("Kode OTP salah atau data tidak ditemukan!");
    }
}

// --- LOGIKA LOGIN ---
function handleLogin() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    const userData = JSON.parse(localStorage.getItem('registered_user'));

    if (userData && email === userData.email && pass === userData.password) {
        alert("Login Berhasil! Selamat datang di AI Experience.");
    } else {
        alert("Email atau Password salah!");
    }
}

// Navigasi Form
function toggleForm() {
    const reg = document.getElementById('register-box');
    const log = document.getElementById('login-box');
    reg.style.display = reg.style.display === 'none' ? 'block' : 'none';
    log.style.display = log.style.display === 'none' ? 'block' : 'none';
}