function playRandomVideo() {
    let videos = [
        "Asset/video1.mp4",
        "Asset/video2.mp4",
        "Asset/video3.mp4",
        "Asset/video4.mp4",
        "Asset/video5.mp4"
    ];

    let randomIndex = Math.floor(Math.random() * videos.length);
    let videoPlayer = document.getElementById("videoPlayer");
    videoPlayer.src = videos[randomIndex];
    videoPlayer.play();
}

const videos = [
    { src: "Asset/video1.mp4", thumbnail: "Asset/4.jpg", title: "Sigma boyy" },
    { src: "Asset/video2.mp4", thumbnail: "Asset/4.jpg", title: "Edit by -Rasya" },
    { src: "Asset/video3.mp4", thumbnail: "Asset/4.jpg", title: "Momen Seru 3" },
    { src: "Asset/video4.mp4", thumbnail: "Asset/4.jpg", title: "Momen Seru 4" }
];

const videoContainer = document.getElementById("videoContainer");

videos.forEach(video => {
    const videoCard = document.createElement("div");
    videoCard.className = "col-md-6 col-lg-4 mb-4";
    videoCard.innerHTML = `
        <div class="card bg-dark text-light shadow">
            <img src="${video.thumbnail}" class="card-img-top" alt="${video.title}">
            <div class="card-body text-center">
                <h5 class="card-title">${video.title}</h5>
                <button class="btn btn-warning" onclick="playVideo('${video.src}')">Tonton</button>
            </div>
        </div>
    `;
    videoContainer.appendChild(videoCard);
});

function playVideo(src) {
    const modalHTML = `
        <div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Tonton Video</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <video controls autoplay class="w-100 rounded shadow">
                            <source src="${src}" type="video/mp4">
                            Browser kamu tidak mendukung video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Hapus modal lama jika ada
    const oldModal = document.getElementById("videoModal");
    if (oldModal) oldModal.remove();

    // Tambahkan modal ke body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Tampilkan modal
    const videoModal = new bootstrap.Modal(document.getElementById("videoModal"));
    videoModal.show();
}