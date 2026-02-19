const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "تكرار",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "الوكيل",
  description: "تغيير اسم المجموعة تلقائياً كل 45 ثانية",
  commandCategory: "الخدمات",
  usages: "[تشغيل/إيقاف]",
  cooldowns: 5
};

module.exports.onLoad = function () {
    if (!global.repeat_intervals) global.repeat_intervals = new Map();
}

module.exports.run = async function({ event, api, args }) {
  const { threadID, messageID } = event;
  const pathData = path.join(__dirname, "cache", "repeat_status.json");
  
  if (!fs.existsSync(pathData)) fs.writeJsonSync(pathData, {});
  let data = fs.readJsonSync(pathData);

  if (args[0] == "تشغيل" || args[0] == "on") {
    if (data[threadID] === "on") return api.sendMessage("التكرار مفعل بالفعل في هذه المجموعة ✅", threadID, messageID);
    
    data[threadID] = "on";
    fs.writeJsonSync(pathData, data);
    
    const names = ["𒀷 ▸ 🎴𝐃⃢⃟𝐂🐦‍⬛ ◂ 𒁈", "𝑻𝒉𝒆 𝑪𝒓𝒐𝒘 𝑯𝒂𝒅𝒆𝒔", "𝗔𝗨𝗧𝗢 𝗥𝗘𝗣𝗟𝗬", "𝐃⃢⃟𝐂 🐦‍⬛"];
    let i = 0;
    
    const interval = setInterval(async () => {
      try {
        const currentData = fs.readJsonSync(pathData);
        if (currentData[threadID] !== "on") {
          clearInterval(interval);
          return;
        }
        await api.setTitle(names[i % names.length], threadID);
        i++;
      } catch (e) {
        console.log(e);
        clearInterval(interval);
      }
    }, 45000);
    
    if (!global.repeat_intervals) global.repeat_intervals = new Map();
    global.repeat_intervals.set(threadID, interval);
    
    return api.sendMessage("تم تشغيل تكرار تغيير اسم المجموعة كل 45 ثانية ✅", threadID, messageID);
    
  } else if (args[0] == "إيقاف" || args[0] == "ايقاف" || args[0] == "off") {
    data[threadID] = "off";
    fs.writeJsonSync(pathData, data);
    
    if (global.repeat_intervals && global.repeat_intervals.has(threadID)) {
      clearInterval(global.repeat_intervals.get(threadID));
      global.repeat_intervals.delete(threadID);
    }
    
    return api.sendMessage("تم إيقاف تكرار تغيير اسم المجموعة ❌", threadID, messageID);
  } else {
    return api.sendMessage("يرجى استخدام: تكرار [تشغيل/إيقاف]", threadID, messageID);
  }
};