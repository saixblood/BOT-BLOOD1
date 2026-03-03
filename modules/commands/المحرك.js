const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "المحرك",
  version: "1.2.0",
  hasPermssion: 2,
  credits: "الوكيل",
  description: "إرسال رسالة تلقائية كل 45 ثانية للمطورين",
  commandCategory: "المطور",
  usages: "[تشغيل/إيقاف]",
  cooldowns: 5
};

module.exports.onLoad = function () {
    if (!global.engine_intervals) global.engine_intervals = new Map();
}

module.exports.run = async function({ event, api, args }) {
  const { threadID, messageID, senderID } = event;
  const pathData = path.join(__dirname, "cache", "engine_status.json");
  
  // Developer check
  const config = require(path.join(global.client.mainPath, "config.json"));
  if (!config.ADMINBOT.includes(senderID)) return api.sendMessage("عذراً، هذا الأمر مخصص للمطورين فقط ❌", threadID, messageID);

  if (!fs.existsSync(pathData)) fs.writeJsonSync(pathData, {});
  let data = fs.readJsonSync(pathData);
  
  if (args[0] == "تشغيل" || args[0] == "on") {
    if (data[threadID] === "on") return api.sendMessage("المحرك مفعل بالفعل في هذه المجموعة ✅", threadID, messageID);

    data[threadID] = "on";
    fs.writeJsonSync(pathData, data);

    const message = `𝗔𝗨𝗧𝗢 𝗥𝗘𝗣𝗟𝗬.⛔\n\n𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈\n\n\n-  𝑻𝒉𝒆 𝑪𝒓𝒐𝒘 𝑯𝒂𝒅𝒆𝒔 𝑰𝒔 𝑯𝒆𝒓𝒆🐦‍⬛🎴`;

    const interval = setInterval(() => {
      api.sendMessage(message, threadID);
    }, 45000);

    if (!global.engine_intervals) global.engine_intervals = new Map();
    global.engine_intervals.set(threadID, interval);

    return api.sendMessage("تم تشغيل المحرك بنجاح ✅ (سيتم إرسال الرسالة كل 45 ثانية)", threadID, messageID);

  } else if (args[0] == "إيقاف" || args[0] == "ايقاف" || args[0] == "off") {
    data[threadID] = "off";
    fs.writeJsonSync(pathData, data);

    if (global.engine_intervals && global.engine_intervals.has(threadID)) {
      clearInterval(global.engine_intervals.get(threadID));
      global.engine_intervals.delete(threadID);
    }

    return api.sendMessage("تم إيقاف المحرك بنجاح ❌", threadID, messageID);
  } else {
    return api.sendMessage("يرجى استخدام: المحرك [تشغيل/إيقاف]", threadID, messageID);
  }
};