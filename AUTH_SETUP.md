# Store-10: ตั้งค่าผู้ใช้และสิทธิ์

ระบบมี 2 บทบาท:

- admin ใช้งานระบบได้ครบ เพิ่ม/แก้ไข/ลบ/เบิกสินค้า และจัดการรายการแผนกได้
- viewer เข้าดูสต๊อกได้อย่างเดียว

## ตั้งค่าครั้งแรก

1. เปิด Firebase Console ของโปรเจกต์ stock-69302
2. ไปที่ Authentication > Sign-in method แล้วเปิดใช้งาน Email/Password
3. ไปที่ Authentication > Users แล้วสร้างบัญชีผู้ใช้
4. คัดลอก UID ของผู้ใช้ แล้วสร้างเอกสารใน Firestore:

   - Collection: users
   - Document ID: UID ของผู้ใช้
   - Field: role
   - Value: admin หรือ viewer

5. Deploy Rules:

~~~bash
firebase deploy --only firestore:rules,storage
~~~

หรือคัดลอกเนื้อหา firestore.rules และ storage.rules ไปวางใน Firebase Console ตามลำดับ

ผู้ใช้ที่ไม่มีเอกสาร users/{uid} หรือมี role อื่น จะถูกจำกัดเป็น viewer โดยอัตโนมัติ
