const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "مضادالسبام",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "الوكيل",
  description: "نظام مراقبة السبام وحظر المزعجين تلقائياً + تأخير استجابة 5 ثواني",
  commandCategory: "النظام",
  usages: "",
  cooldowns: 0
};

const SPAM_LIMIT = 3;
const SPAM_WINDOW = 10000;
const BAN_DURATION = null;
const REPLY_DELAY = 5000;

const userMessages = new Map();

function getBlockedPath() {
  return path.join(__dirname, "cache", "spam_blocked.json");
}

function loadBlocked() {
  const p = getBlockedPath();
  if (!fs.existsSync(p)) fs.writeJsonSync(p, {});
  return fs.readJsonSync(p);
}

function saveBlocked(data) {
  fs.writeJsonSync(getBlockedPath(), data);
}

function isBlocked(senderID) {
  const blocked = loadBlocked();
  if (!blocked[senderID]) return false;
  return true;
}

function blockUser(senderID) {
  const blocked = loadBlocked();
  blocked[senderID] = "permanent";
  saveBlocked(blocked);
}

function isPrivileged(senderID) {
  try {
    const config = JSON.parse(fs.readFileSync(path.join(global.client.mainPath, "config.json"), "utf-8"));
    return (config.SUPERADMIN || []).includes(senderID);
  } catch(e) { return false; }
}

module.exports.onLoad = function () {
  const p = getBlockedPath();
  if (!fs.existsSync(p)) fs.writeJsonSync(p, {});
};

module.exports.handleEvent = async function({ event, api }) {
  const { senderID, threadID, messageID, body } = event;

  // === تطبيق تأخير الاستجابة العالمي (مرة واحدة فقط) ===
  if (!api._responseDelayApplied) {
    const _origSend = api.sendMessage.bind(api);
    api.sendMessage = async function(msg, tid, callbackOrMid, mid) {
      await new Promise(r => setTimeout(r, REPLY_DELAY));
      if (typeof callbackOrMid === "function") {
        return _origSend(msg, tid, callbackOrMid, mid);
      } else {
        return _origSend(msg, tid, callbackOrMid);
      }
    };
    api._responseDelayApplied = true;
  }

  if (!body || !senderID || !threadID) return;
  if (isPrivileged(senderID)) return;

  const config = JSON.parse(fs.readFileSync(path.join(global.client.mainPath, "config.json"), "utf-8"));
  const PREFIX = config.PREFIX || ".";

  // === إذا كان المستخدم محظوراً ===
  if (isBlocked(senderID)) {
    if (body.startsWith(PREFIX)) {
      try { await api.unsendMessage(messageID); } catch(e) {}
    }
    return;
  }

  // === فحص السبام فقط على الأوامر ===
  if (!body.startsWith(PREFIX)) return;

  const now = Date.now();
  const key = `${senderID}_${threadID}`;

  if (!userMessages.has(key)) userMessages.set(key, []);
  const times = userMessages.get(key).filter(t => now - t < SPAM_WINDOW);
  times.push(now);
  userMessages.set(key, times);

  if (times.length >= SPAM_LIMIT) {
    blockUser(senderID);
    try { await api.unsendMessage(messageID); } catch(e) {}
    return api.sendMessage(`🚫 تم حظرك نهائياً من استخدام البوت بسبب السبام!`, threadID, senderID);
  }
};
