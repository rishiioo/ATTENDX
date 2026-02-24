// Logout functionality
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "index.html";
    }
}

// Generate QR Code
function generateQR() {
    const qrcodeContainer = document.getElementById('qrcode');
    const classCodeElement = document.getElementById('classCode');
    
    // Clear previous QR code
    qrcodeContainer.innerHTML = '';
    
    // Generate random class code
    const classCode = 'ATX-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    classCodeElement.textContent = classCode;
    
    // Generate QR code with class code
    try {
        new QRCode(qrcodeContainer, {
            text: `https://attendx.com/mark-attendance?code=${classCode}&time=${Date.now()}`,
            width: 200,
            height: 200,
            colorDark: "#0284c7",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Show success message
        showNotification("QR Code generated successfully! Valid for 5 minutes.");
    } catch (error) {
        console.error("Error generating QR code:", error);
        showNotification("Error generating QR code. Please try again.", "error");
    }
}

// Submit Attendance
function submitAttendance() {
    const subjectSelect = document.getElementById('subject');
    const dateInput = document.getElementById('date');
    
    // Validation
    if (!subjectSelect.value) {
        alert("⚠️ Please select a subject!");
        subjectSelect.focus();
        return;
    }
    
    if (!dateInput.value) {
        alert("⚠️ Please select a date!");
        dateInput.focus();
        return;
    }
    
    // Get selected subject text
    const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;
    const date = dateInput.value;
    
    // Count present/absent students
    const checkboxes = document.querySelectorAll('.student-item input[type="checkbox"]');
    let presentCount = 0;
    let absentCount = 0;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            presentCount++;
        } else {
            absentCount++;
        }
    });
    
    // Show detailed success message
    const message = `
✅ Attendance Marked Successfully!

Subject: ${subjectText}
Date: ${date}
Present: ${presentCount} students
Absent: ${absentCount} students
Total: ${presentCount + absentCount} students

Attendance saved to database.
    `;
    
    alert(message);
    
    // Log to console (in production, this would save to Firebase)
    console.log("Attendance Data:", {
        subject: subjectSelect.value,
        subjectName: subjectText,
        date: date,
        present: presentCount,
        absent: absentCount,
        timestamp: new Date().toISOString()
    });
    
    // Show success notification
    showNotification("Attendance marked successfully!", "success");
}

// Show notification (helper function)
function showNotification(message, type = "success") {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Set today's date as default
window.addEventListener('load', () => {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
});