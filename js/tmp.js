document.addEventListener("DOMContentLoaded", () => {
    const consultations = [
        { id: 1, user: "علی محمدی", description: "مشکل فیبروم", topic: "فیبروم" },
        { id: 2, user: "سارا احمدی", description: "ریزش مو", topic: "ریزش مو" },
    ];

    const products = [
        { id: 1, name: "چای سبز" },
        { id: 2, name: "دمنوش نعناع" },
        { id: 3, name: "عسل طبیعی" },
    ];

    const consultationList = document.getElementById("consultation-list");
    const consultationDetails = document.getElementById("consultation-details");
    const chatSection = document.getElementById("chat-section");
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const productList = document.getElementById("product-list");
    const prescriptionTable = document.getElementById("prescription-table");
    const recordButton = document.getElementById("record-button");
    let isRecording = false;
    let mediaRecorder, audioChunks;

    // نمایش مشاوره‌ها
    consultations.forEach((consultation, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${consultation.user}</td>
            <td>${consultation.topic}</td>
            <td><button class="btn btn-info view-details" data-id="${consultation.id}">مشاهده</button></td>
        `;
        consultationList.appendChild(row);
    });

    // نمایش جزئیات مشاوره
    document.querySelectorAll(".view-details").forEach((button) => {
        button.addEventListener("click", () => {
            const id = parseInt(button.dataset.id);
            const consultation = consultations.find((c) => c.id === id);

            consultationDetails.classList.remove("d-none");
            chatSection.classList.remove("d-none");
            document.getElementById("user-name").textContent = consultation.user;
            document.getElementById("user-description").textContent = consultation.description;
            document.getElementById("prescription-section").classList.remove("d-none");
        });
    });

    // ارسال پیام متنی
    document.getElementById("send-message").addEventListener("click", sendMessage);
    chatInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement("div");
            messageElement.className = "chat-message admin";
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
            chatInput.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    // ضبط و ارسال پیام صوتی
    recordButton.addEventListener("mousedown", async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("مرورگر شما قابلیت ضبط صدا را پشتیبانی نمی‌کند.");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            isRecording = true;
            audioChunks = [];
            mediaRecorder.addEventListener("dataavailable", (event) => {
                audioChunks.push(event.data);
            });
        } catch (error) {
            console.error("خطا در دسترسی به میکروفون:", error);
        }
    });

    recordButton.addEventListener("mouseup", () => {
        if (isRecording && mediaRecorder) {
            mediaRecorder.stop();
            isRecording = false;

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
                const audioUrl = URL.createObjectURL(audioBlob);

                const audioElement = document.createElement("audio");
                audioElement.src = audioUrl;
                audioElement.controls = true;

                const messageElement = document.createElement("div");
                messageElement.className = "chat-message admin";
                messageElement.appendChild(audioElement);

                chatBox.appendChild(messageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
            });
        }
    });

    // جستجوی محصولات
    const productSearch = document.getElementById("product-search");
    productSearch.addEventListener("input", () => {
        const query = productSearch.value.toLowerCase();
        const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(query));
        productList.innerHTML = "";
        filteredProducts.forEach((product) => {
            const div = document.createElement("div");
            div.className = "d-flex justify-content-between align-items-center mb-2";
            div.innerHTML = `
                <span>${product.name}</span>
                <button class="btn btn-sm btn-primary add-product" data-id="${product.id}">افزودن</button>
            `;
            productList.appendChild(div);
        });

        document.querySelectorAll(".add-product").forEach((button) => {
            button.addEventListener("click", () => {
                const id = parseInt(button.dataset.id);
                const product = products.find((p) => p.id === id);
                const existingRow = prescriptionTable.querySelector(`tr[data-id="${id}"]`);

                if (existingRow) {
                    const qtyInput = existingRow.querySelector("input");
                    qtyInput.value = parseInt(qtyInput.value) + 1;
                } else {
                    const row = document.createElement("tr");
                    row.setAttribute("data-id", id);
                    row.innerHTML = `
                        <td>${product.name}</td>
                        <td><input type="number" class="form-control" value="1" min="1"></td>
                        <td><button class="btn btn-sm btn-danger remove-product">حذف</button></td>
                    `;
                    prescriptionTable.appendChild(row);

                    row.querySelector(".remove-product").addEventListener("click", () => row.remove());
                }
            });
        });
    });
});
