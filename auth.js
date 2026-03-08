// 1. فحص صارم: لو الـ role مش موجود أو قيمته مش من الـ 3 اللي حددناهم، ارجع للوجن
const savedRole = localStorage.getItem('userRole');
const isLoginPage = window.location.pathname.includes('log.html');

if (!isLoginPage) {
    if (!savedRole || savedRole === "null" || savedRole === "undefined") {
        window.location.href = 'log.html';
    }
}

// 2. قراءة البيانات
const currentUser = {
    name: localStorage.getItem('userName') || "Guest",
    role: savedRole || "visitor" 
};

// 3. دالة الصلاحيات
function checkPermissions() {
    // بنخفي كل حاجة إدارية في الأول كزيادة أمان
    const ownerOnly = document.querySelectorAll('.owner-only');     
    const employeeOnly = document.querySelectorAll('.employee-only'); 
    const adminOnly = document.querySelectorAll('.admin-only');    

    // تنفيذ الإخفاء/الإظهار بناءً على الدور
    if (currentUser.role === 'owner') {
        ownerOnly.forEach(el => el.style.display = 'block');
        employeeOnly.forEach(el => el.style.display = 'block');
        adminOnly.forEach(el => el.style.display = 'block');
    } else if (currentUser.role === 'employee') {
        ownerOnly.forEach(el => el.style.display = 'none');
        employeeOnly.forEach(el => el.style.display = 'block');
        adminOnly.forEach(el => el.style.display = 'block');
    } else {
        // أي حد تاني (Visitor أو غير مسجل)
        ownerOnly.forEach(el => el.style.display = 'none');
        employeeOnly.forEach(el => el.style.display = 'none');
        adminOnly.forEach(el => el.style.display = 'none');
    }
}

// تشغيل الفحص
document.addEventListener('DOMContentLoaded', checkPermissions);

// دالة للخروج اليدوي نستخدمها في زرار Logout
function logout() {
    localStorage.clear();
    window.location.href = 'log.html';
}