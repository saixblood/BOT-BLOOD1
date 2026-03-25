const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "نزع الادمن",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "الوكيل",
  description: "إزالة مستخدم من قائمة أدمن البوت عبر معرفه أو الرد على رسالته",
  commandCategory: "المطور",
  usages: "[معرف / رد على رسالة]",
  cooldowns: 3
};

function isSuperDev(senderID) {
  try {
    const configPath = path.join(global.client.mainPath, "config.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return (config.SUPERADMIN || []).includes(senderID);
  } catch(e) { return false; }
}

module.exports.run = async function({ event, api, args }) {
  const { threadID, messageID, senderID, type, messageReply } = event;

  if (!isSuperDev(senderID)) return api.sendMessage("عذراً، هذا الأمر مخصص للمطورين الرئيسيين فقط ❌", threadID, messageID);

  let targetID = args[0];
  if (!targetID && type === "message_reply" && messageReply) {
    targetID = messageReply.senderID;
  }

  if (!targetID) return api.sendMessage("يرجى ذكر معرف المستخدم أو الرد على رسالته\nمثال: .نزع الادمن 12345678", threadID, messageID);

  const configPath = path.join(global.client.mainPath, "config.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

  if ((config.SUPERADMIN || []).includes(targetID)) return api.sendMessage("لا يمكن نزع صلاحيات مطور رئيسي ❌", threadID, messageID);

  if (!config.ADMINBOT || !config.ADMINBOT.includes(targetID)) {
    return api.sendMessage(`المستخدم ${targetID} ليس في قائمة الأدمن أصلاً ⚠️`, threadID, messageID);
  }

  config.ADMINBOT = config.ADMINBOT.filter(id => id !== targetID);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 4), "utf-8");

  return api.sendMessage(`✅ تم نزع صلاحيات الأدمن من المستخدم ${targetID} بنجاح.`, threadID, messageID);
};
