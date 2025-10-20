// set-admin.mjs
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';

const key = JSON.parse(fs.readFileSync('./plumeo-475aa-firebase-adminsdk-fbsvc-6eb2e568d7.json', 'utf-8'));
initializeApp({ credential: cert(key) });

const [,, email, role] = process.argv; // ใช้ admin หรือ member
if (!email || !role) {
  console.log('ใช้แบบนี้: node set-admin.mjs <email> <admin|member>');
  process.exit(1);
}

const auth = getAuth();
const run = async () => {
  const user = await auth.getUserByEmail(email);
  await auth.setCustomUserClaims(user.uid, { role });
  console.log(`✅ ตั้งสิทธิ์ ${email} เป็น ${role} แล้ว`);
};
run().catch(console.error);
