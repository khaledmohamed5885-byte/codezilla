const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // عشان يشغل ملفات الـ HTML والـ CSS

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // مستخدمين تجريبيين بدل الأكسس عشان يشتغل أونلاين
    const users = [
        { Username: "admin", Password: "123", Role: "owner" },
        { Username: "saeed", Password: "123", Role: "employee" }
    ];

    const user = users.find(u => u.Username === username && u.Password === password);
    if (user) {
        res.json({ success: true, role: user.Role });
    } else {
        res.json({ success: false });
    }
});

// عشان يفتح صفحة الـ Log أول ما تدخل على اللينك
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'log.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT} 🚀`));