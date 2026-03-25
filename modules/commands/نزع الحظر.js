const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "نزع الحظر",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "الوكيل",
  description: "رفع الحظر عن شخص عبر الرد على رسالته",
  commandCategory: "المطور",
  usages: "[رد على رسالة الشخص]",
  cooldowns: 3
};

function getBlockedPath() {
  return path.join(__dirname, "cache", "spam_blocked.json");
}

function isPrivileged(senderID) {
  try {
    const config = JSON.parse(fs.readFileSync(path.join(global.client.mainPath, "config.json"), "utf-8"));
    return (config.SUPERADMIN || []).includes(senderID);
  } catch(e) { return false; }
}

module.exports.run = async function({ event, api }) {
  const { threadID, messageID, senderID, type, messageReply } = event;

  if (!isPrivileged(senderID)) return api.sendMessage("عذراً، هذا الأمر مخصص للمطورين فقط ❌", threadID, messageID);

  if (type !== "message_reply" || !messageReply) {
    return api.sendMessage("يرجى الرد على رسالة الشخص المراد رفع الحظر عنه ⚠️", threadID, messageID);
  }

  const targetID = messageReply.senderID;

  const p = getBlockedPath();
  if (!fs.existsSync(p)) fs.writeJsonSync(p, {});
  const blocked = fs.readJsonSync(p);

  if (!blocked[targetID]) return api.sendMessage(`هذا الشخص غير محظور أصلاً ✅`, threadID, messageID);

  delete blocked[targetID];
  fs.writeJsonSync(p, blocked);

  return api.sendMessage(`✅ تم رفع الحظر عن المستخدم ${targetID} بنجاح.`, threadID, messageID);
};
