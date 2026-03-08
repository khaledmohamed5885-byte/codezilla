const express = require('express');
const ADODB = require('node-adodb');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// التعديل هنا: ضفنا true في الآخر عشان يشغل نسخة الـ 64-بت
const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=./Database.accdb;', true);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // سطر لمراقبة اللي بيحصل في الـ Terminal عندك
    console.log(`محاولة دخول: الاسم (${username}) - الباسورد (${password})`);

    try {
        // التعديل المهم: أسماء الأعمدة (Username, Password) حروف كبيرة زي جدول الأكسس
        // والمتغيرات (username, password) حروف صغيرة زي اللي جاية من الفورم
        const query = `SELECT Role FROM Users WHERE Username='${username}' AND Password='${password}'`;
        
        const data = await connection.query(query);

        if (data.length > 0) {
            console.log("تم بنجاح! الدور هو:", data[0].Role);
            res.json({ success: true, role: data[0].Role });
        } else {
            console.log("البيانات مش مطابقة للي في الجدول.");
            res.json({ success: false });
        }
    } catch (err) {
        console.error("خطأ في الربط:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => console.log('Server is running on port 3000... 🚀'));