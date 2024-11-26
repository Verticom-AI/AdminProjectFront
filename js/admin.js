document.addEventListener("DOMContentLoaded", () => {
    const consultations = [
        { id: 1, name: "علی محمدی", phone: "09121234567", type: "فیبروم" },
        { id: 2, name: "سارا احمدی", phone: "09351234567", type: "ریزش مو" },
    ];

    const consultationList = document.getElementById("consultations-list");
    const consultationDetails = document.getElementById("consultation-details");
    const createPrescription = document.getElementById("create-prescription");

    // افزودن مشاوره‌ها به جدول
    consultations.forEach((consultation, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${consultation.name}</td>
            <td>${consultation.phone}</td>
            <td>${consultation.type}</td>
            <td><button class="btn btn-info view-details" data-id="${consultation.id}">مشاهده</button></td>
        `;
        consultationList.appendChild(row);
    });

    // مدیریت کلیک روی دکمه "مشاهده"
    document.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            const consultation = consultations.find(c => c.id == id);

            // نمایش جزئیات مشاوره
            consultationDetails.classList.remove("d-none");
            document.getElementById("user-name").textContent = consultation.name;
            document.getElementById("description").textContent = "این شرح حال کاربر است.";

            // فعال‌سازی بخش ایجاد نسخه
            createPrescription.classList.remove("d-none");
        });
    });

    // ایجاد نسخه
    const prescriptionTable = document.getElementById("prescription-table");

    document.getElementById("search-product").addEventListener("input", (e) => {
        const query = e.target.value;

        // شبیه‌سازی جستجوی محصول
        if (query.length > 2) {
            console.log(`جستجو برای محصول: ${query}`);
        }
    });

    document.getElementById("finalize-prescription").addEventListener("click", () => {
        alert("نسخه ارسال شد!");
    });
});
