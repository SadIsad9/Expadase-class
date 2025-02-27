// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4JlOVGma...",
  authDomain: "expadase.firebaseapp.com",
  projectId: "expadase",
  storageBucket: "expadase.appspot.com",
  messagingSenderId: "821898942848",
  appId: "1:821898942848:web:da29997d95551230200965"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi Kirim Komentar
async function submitComment() {
  let name = document.getElementById("name").value;
  let message = document.getElementById("message").value;

  if (name && message) {
    await addDoc(collection(db, "comments"), {
      name: name,
      message: message,
      timestamp: new Date()
    });

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    loadComments();
  }
}

// Fungsi Tampilkan Komentar
async function loadComments() {
  let commentList = document.getElementById("comment-list");
  commentList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "comments"));
  querySnapshot.forEach((doc) => {
    let comment = document.createElement("div");
    comment.classList.add("border", "p-2", "mb-2", "rounded");
    comment.innerHTML = `<strong>${doc.data().name}</strong>: ${doc.data().message}`;
    commentList.appendChild(comment);
  });
}

// Load komentar saat halaman dibuka
document.addEventListener("DOMContentLoaded", loadComments);
alert("Script dimulai!");  
firebase.database().ref("/").once("value")
  .then(snapshot => alert("Data: " + JSON.stringify(snapshot.val())))
  .catch(error => alert("Error: " + error.message));
