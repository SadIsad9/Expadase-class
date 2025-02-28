import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// 🔥 Konfigurasi Firebase
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

// 🔥 Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 📌 Fungsi Login
window.loginUser = function () {
    const username = document.getElementById("username").value.trim();
    const age = document.getElementById("age").value.trim();
    const profilePicInput = document.getElementById("profilePic");
    
    if (username === "" || age === "") {
        alert("Nama dan umur harus diisi!");
        return;
    }

    let profilePicURL = "default.jpg"; // 👉 PP default

    if (profilePicInput.files.length > 0) {
        const file = profilePicInput.files[0];
        profilePicURL = URL.createObjectURL(file); 
    }

    // 📌 Simpan user ke database
    set(ref(database, "users/" + username), {
        name: username,
        age: age,
        profilePic: profilePicURL
    }).then(() => {
        localStorage.setItem("username", username); 
        localStorage.setItem("profilePic", profilePicURL);
        window.location.href = "home.html"; // Redirect ke home
    }).catch((error) => {
        console.error("Gagal menyimpan user:", error);
    });
};

// 📌 Tampilkan user login di home.html
document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username") || "Pengguna";
    const profilePic = localStorage.getItem("profilePic") || "default.jpg";

    if (document.getElementById("displayName")) {
        document.getElementById("displayName").textContent = username;
        document.getElementById("profilePicture").src = profilePic;
    }

    // 🔥 Tambahkan event listener submit komentar setelah halaman siap
    const submitButton = document.getElementById("submit-btn");
    if (submitButton) {
        submitButton.addEventListener("click", submitComment);
    }

    // 🔥 Load komentar setelah halaman siap
    displayComments();
});

// 📌 Fungsi Logout
window.logout = function () {
    localStorage.removeItem("username");
    localStorage.removeItem("profilePic");
    window.location.href = "index.html";
};

// 📌 Fungsi Kirim Komentar
window.submitComment = function () {
    const message = document.getElementById("message").value.trim();
    const username = localStorage.getItem("username") || "Anonim";
    const profilePic = localStorage.getItem("profilePic") || "default.jpg";

    if (message === "") {
        alert("Komentar tidak boleh kosong!");
        return;
    }

    // Simpan ke Firebase
    push(ref(database, "comments"), {
        name: username,
        profilePic: profilePic,
        message: message,
        timestamp: Date.now()
    }).then(() => {
        document.getElementById("message").value = "";
    }).catch((error) => {
        console.error("Gagal mengirim komentar:", error);
    });
};

// 📌 Load Komentar
function displayComments() {
    onValue(ref(database, "comments"), (snapshot) => {
        const commentList = document.getElementById("comment-list");
        if (commentList) {
            commentList.innerHTML = "";

            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                const commentElement = document.createElement("div");
                commentElement.classList.add("border", "p-2", "mb-2", "bg-white", "text-dark");
                commentElement.innerHTML = `
                    <div class="d-flex align-items-center">
                        <img src="${data.profilePic}" alt="PP" width="40" class="rounded-circle me-2">
                        <strong>${data.name}:</strong> ${data.message}
                    </div>
                `;
                commentList.prepend(commentElement);
            });
        }
    });
}