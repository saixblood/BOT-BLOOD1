# Bot Project
## Overview
Facebook bot based on Mirai/FCA.

## Recent Changes
- Added 'المحرك' command: إرسال رسالة تلقائية كل 45 ثانية مع خيار تغيير الرسالة.
- Added 'تكرار' command: تغيير اسم المجموعة كل 45 ثانية بالاسم المحدد.
- Added 'كنيات' command: تغيير كنيات جميع أعضاء المجموعة كل 45 ثانية.
- Added 'اضافة الادمن' command: إضافة مستخدم لقائمة الأدمن من قبل المطور الرئيسي.
- Added 'مضادالسبام' module: حظر السبام تلقائياً + تأخير استجابة عالمي 5 ثواني.
- Added 'القفل' command: قفل أوامر المجموعة للأدمن والمطورين فقط.
- Added SUPERADMIN rank in config.json: رتبة المطور الرئيسي فوق الأدمن.

## Permission System
- hasPermssion 0: الجميع
- hasPermssion 1: أدمن المجموعة
- hasPermssion 2: أدمن البوت (ADMINBOT في config.json)
- SUPERADMIN: المطور الرئيسي (يتجاوز كل الصلاحيات)

## Anti-spam System (مضادالسبام)
- يتتبع الأوامر لكل مستخدم في نافذة 10 ثوانٍ
- بعد 5 أوامر متتالية: تحذير + حذف الأمر
- بعد 6+ أوامر: حظر 10 دقائق
- المحظورون لا يستطيعون استخدام أي أمر
- تأخير عالمي 5 ثواني على جميع ردود البوت

## Lock System (القفل)
- .القفل تشغيل: يفعّل القفل - أدمن ومطورون فقط يستطيعون استخدام الأوامر
- .القفل إيقاف: يلغي القفل للجميع

## Project Architecture
- `modules/commands/`: Command definitions.
- `modules/events/`: Event handlers.
- `main.js`: Main entry point (obfuscated).
- `index.js`: Starter script.
- `config.json`: Bot configuration including ADMINBOT and SUPERADMIN lists.
