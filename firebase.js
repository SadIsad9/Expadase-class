        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
        import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

        // Konfigurasi Firebase
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

        // Fungsi mengirim komentar
        function submitComment() {
            const name = document.getElementById("name").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || message === "") {
                alert("Nama dan komentar tidak boleh kosong!");
                return;
            }

            // Simpan ke Firebase Realtime Database
            push(ref(database, "comments"), {
                name: name,
                message: message,
                timestamp: Date.now()
            });

            // Hapus input setelah dikirim
            document.getElementById("name").value = "";
            document.getElementById("message").value = "";
        }

        // Fungsi memuat komentar
        function loadComments() {
            const commentList = document.getElementById("comment-list");

            onValue(ref(database, "comments"), (snapshot) => {
                commentList.innerHTML = "";
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    const commentElement = document.createElement("div");
                    commentElement.classList.add("border", "p-2", "mb-2", "bg-light", "text-dark");
                    commentElement.innerHTML = `<strong>${data.name}:</strong> ${data.message}`;
                    commentList.prepend(commentElement);
                });
            });
        }

        // Panggil fungsi saat halaman dimuat
        loadComments();