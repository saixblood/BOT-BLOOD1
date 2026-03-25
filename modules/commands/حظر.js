const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "حظر",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "الوكيل",
  description: "حظر شخص من البوت مؤبداً عبر الرد على رسالته",
  commandCategory: "المطور",
  usages: "[رد على رسالة الشخص]",
  cooldowns: 3
};

function getBlockedPath() {
  return path.join(__dirname, "cache", "spam_blocked.json");
}

function isSuperDev(senderID) {
  try {
    const config = JSON.parse(fs.readFileSync(path.join(global.client.mainPath, "config.json"), "utf-8"));
    return (config.SUPERADMIN || []).includes(senderID);
  } catch(e) { return false; }
}

module.exports.run = async function({ event, api, args }) {
  const { threadID, messageID, senderID, type, messageReply } = event;

  if (!isSuperDev(senderID)) return api.sendMessage("عذراً، هذا الأمر مخصص للمطورين الرئيسيين فقط ❌", threadID, messageID);

  if (type !== "message_reply" || !messageReply) {
    return api.sendMessage("يرجى الرد على رسالة الشخص المراد حظره ⚠️", threadID, messageID);
  }

  const targetID = messageReply.senderID;

  if (isSuperDev(targetID)) return api.sendMessage("لا يمكن حظر مطور رئيسي ❌", threadID, messageID);

  const p = getBlockedPath();
  if (!fs.existsSync(p)) fs.writeJsonSync(p, {});
  const blocked = fs.readJsonSync(p);

  if (blocked[targetID]) return api.sendMessage(`هذا الشخص محظور بالفعل 🚫`, threadID, messageID);

  blocked[targetID] = "permanent";
  fs.writeJsonSync(p, blocked);

  return api.sendMessage(`✅ تم حظر المستخدم ${targetID} من البوت نهائياً.`, threadID, messageID);
};
