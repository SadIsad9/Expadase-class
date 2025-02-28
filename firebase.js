import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// 📌 Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB4JlOVGma4Fjnn5qYx_sM2cvfcIVTkL5c",
    authDomain: "expadase.firebaseapp.com",
    databaseURL: "https://expadase-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expadase",
    storageBucket: "expadase.firebasestorage.app",
    messagingSenderId: "821898942848",
    appId: "1:821898942848:web:05bf16d9fdefccbf200965",
    measurementId: "G-WTH3K9LPDS"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log("firebase");

// 📌 Fungsi Login
window.loginUser = function () {
    const username = document.getElementById("username").value.trim();
    const avatar = localStorage.getItem("avatar") || "Avatar/default.jpg";

    if (username === "") {
        alert("Nama tidak boleh kosong!");
        return;
    }

    set(ref(database, "users/" + username), {
        name: username,
        profilePic: avatar
    }).then(() => {
        localStorage.setItem("username", username);
        localStorage.setItem("profilePic", avatar);
        window.location.href = "home.html";
    }).catch((error) => {
        console.error("Gagal menyimpan user:", error);
    });
};

// 📌 Tampilkan user di home.html
document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username") || "Pengguna";
    const profilePic = localStorage.getItem("profilePic") || "Avatar/default.jpg";

    if (document.getElementById("displayName")) {
        document.getElementById("displayName").textContent = username;
        document.getElementById("profilePicture").src = profilePic;
    }

    // Pasang event listener ke tombol kirim komentar
    const submitBtn = document.getElementById("submit-btn");
    if (submitBtn) {
        submitBtn.addEventListener("click", submitComment);
    }
});

// 📌 Fungsi Logout
window.logout = function () {
    localStorage.removeItem("username");
    localStorage.removeItem("profilePic");
    localStorage.removeItem("avatar");
    window.location.href = "login.html";
};

// 📌 Fungsi Kirim Komentar
window.submitComment = function () {
    const message = document.getElementById("message").value.trim();
    const username = localStorage.getItem("username") || "Anonim";
    const profilePic = localStorage.getItem("profilePic") || "Avatar/default.jpg";

    if (message === "") {
        alert("Komentar tidak boleh kosong!");
        return;
    }

    push(ref(database, "comments"), {
        name: username,
        profilePic: profilePic,
        message: message,
        timestamp: Date.now()
    }).then(() => {
        document.getElementById("message").value = ""; // Bersihkan input setelah komentar terkirim
    }).catch((error) => {
        console.error("Gagal mengirim komentar:", error);
    });
};

// 📌 Load Komentar
onValue(ref(database, "comments"), (snapshot) => {
    const commentList = document.getElementById("comment-list");
    if (commentList) {
        commentList.innerHTML = "";

        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const commentElement = document.createElement("div");
            commentElement.classList.add("border", "p-2", "mb-2", "bg-white", "text-dark");
            commentElement.innerHTML = `
                <img src="${data.profilePic}" width="40" class="rounded-circle">
                <strong>${data.name}:</strong> ${data.message}
            `;
            commentList.prepend(commentElement);
        });
    }
});