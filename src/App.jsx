import { useState, useEffect } from "react";

// ── Enhanced Stall Data ───────────────────────────────────────────────────────

const FIXED_STALLS = [
  {
    id: 1, name: "饒河街夜市 A-12號", location: "台北市松山區", market: "饒河街夜市",
    sizeW: 3, sizeD: 2, sizeUnit: "坪", rent: 18000, deposit: 36000, rentUnit: "月",
    available: "即日起", tags: ["熟食", "飲料"], traffic: "高", locked: false,
    owner: "王先生", ownerPhone: "0912-345-678",
    photos: ["🏮","🔆","🛖"],
    desc: "位於夜市入口旁，人流量極大，水電齊全，適合熟食或飲料攤。店面面寬3米、深2米，設備完善。",
    facilities: { water: "included", electricity: "metered", ac: true, gas: true, sink: true, storage: true, wifi: false },
    businessHours: { open: "17:00", close: "23:30", days: ["一","二","三","四","五","六","日"] },
    floorType: "磁磚", ceilingH: "2.8m", nearParking: true, nearMRT: "捷運南京三民站（步行5分）",
    stallType: "室內固定",
  },
  {
    id: 2, name: "士林夜市 B-07號", location: "台北市士林區", market: "士林夜市",
    sizeW: 3, sizeD: 1.5, sizeUnit: "坪", rent: 22000, deposit: 44000, rentUnit: "月",
    available: "05/01", tags: ["服飾", "飾品"], traffic: "極高", locked: true,
    owner: "陳小姐", ownerPhone: "0923-456-789",
    photos: ["🎪","🏬","🛍"],
    desc: "士林核心區，週末人潮可達萬人，適合服飾或精品小物。近主入口，曝光率極高。",
    facilities: { water: "none", electricity: "included", ac: false, gas: false, sink: false, storage: true, wifi: true },
    businessHours: { open: "16:00", close: "00:00", days: ["一","二","三","四","五","六","日"] },
    floorType: "水泥地", ceilingH: "3.0m", nearParking: true, nearMRT: "捷運劍潭站（步行3分）",
    stallType: "半戶外固定",
  },
  {
    id: 3, name: "南機場夜市 C-03號", location: "台北市中正區", market: "南機場夜市",
    sizeW: 2, sizeD: 2, sizeUnit: "坪", rent: 12000, deposit: 24000, rentUnit: "月",
    available: "即日起", tags: ["熟食", "在地小吃"], traffic: "中", locked: true,
    owner: "林老闆", ownerPhone: "0934-567-890",
    photos: ["🍜","🏠","🔦"],
    desc: "以在地熟客為主，租金親民，適合深耕社區型小吃。有獨立廚房水槽，供水電。",
    facilities: { water: "included", electricity: "included", ac: true, gas: true, sink: true, storage: false, wifi: false },
    businessHours: { open: "16:30", close: "23:00", days: ["一","二","四","五","六","日"] },
    floorType: "磁磚", ceilingH: "2.5m", nearParking: false, nearMRT: "捷運古亭站（步行8分）",
    stallType: "室內固定",
  },
  {
    id: 4, name: "逢甲夜市 E-22號", location: "台中市西屯區", market: "逢甲夜市",
    sizeW: 4, sizeD: 2, sizeUnit: "坪", rent: 25000, deposit: 50000, rentUnit: "月",
    available: "06/01", tags: ["熟食", "飲料", "服飾"], traffic: "極高", locked: true,
    owner: "吳小姐", ownerPhone: "0945-678-901",
    photos: ["🔥","🏮","🎠"],
    desc: "台灣最大夜市之一，假日人潮洶湧，大型攤位適合多品項經營。面寬4米空間寬敞。",
    facilities: { water: "metered", electricity: "metered", ac: false, gas: true, sink: true, storage: true, wifi: false },
    businessHours: { open: "17:00", close: "01:00", days: ["一","二","三","四","五","六","日"] },
    floorType: "水泥地", ceilingH: "3.2m", nearParking: true, nearMRT: "無（公車可達）",
    stallType: "半戶外固定",
  },
];

const TEMP_STALLS = [
  {
    id: 101, name: "饒河街夜市 A-08號", location: "台北市松山區", market: "饒河街夜市",
    sizeW: 2, sizeD: 2, sizeUnit: "坪", rent: 800, deposit: 0, rentUnit: "天",
    type: "臨時代租", tempType: "owner_leave", available: "今天 & 明天", urgency: "high",
    tags: ["熟食", "甜點"], traffic: "高", locked: false,
    owner: "王大哥", ownerPhone: "0912-111-222",
    photos: ["🏮","🔆","🍡"],
    desc: "攤主本週出遊，開放代租2天。水電設備完整，可直接入駐，僅限熟食或甜點類。",
    facilities: { water: "included", electricity: "included", ac: false, gas: false, sink: true, storage: false, wifi: false },
    businessHours: { open: "17:00", close: "23:00", days: ["六","日"] },
    floorType: "磁磚", ceilingH: "2.6m", nearParking: false, nearMRT: "捷運南京三民站",
    stallType: "室內固定", duration: "2天", startDate: "04/12", endDate: "04/13", recurringOff: null,
  },
  {
    id: 102, name: "寧夏夜市 D-15號", location: "台北市大同區", market: "寧夏夜市",
    sizeW: 2, sizeD: 1, sizeUnit: "坪", rent: 600, deposit: 0, rentUnit: "天",
    type: "每週固定空檔", tempType: "weekly_off", available: "每週一", urgency: "mid",
    tags: ["飲料", "甜點"], traffic: "高", locked: true,
    owner: "張先生", ownerPhone: "0923-222-333",
    photos: ["🧋","🏬","💡"],
    desc: "攤主每週一固定休息，開放短租。長期可排定，適合想試驗新品或累積客群的業者。",
    facilities: { water: "metered", electricity: "included", ac: true, gas: false, sink: true, storage: true, wifi: true },
    businessHours: { open: "18:00", close: "24:00", days: ["一"] },
    floorType: "磁磚", ceilingH: "2.8m", nearParking: false, nearMRT: "捷運民權西路站",
    stallType: "室內固定", duration: "每週一天", startDate: "長期", endDate: "不限", recurringOff: "每週一",
  },
  {
    id: 103, name: "士林夜市廣場 流動空位", location: "台北市士林區", market: "士林夜市",
    sizeW: 1.5, sizeD: 1, sizeUnit: "坪", rent: 500, deposit: 0, rentUnit: "天",
    type: "流動攤位", tempType: "mobile", available: "週五至週日", urgency: "mid",
    tags: ["飾品", "手作"], traffic: "極高", locked: true,
    owner: "士林夜市管委會", ownerPhone: "02-2881-0762",
    photos: ["🎠","🏕","✨"],
    desc: "夜市廣場空地，假日開放流動攤位申請。適合手作、飾品、文創商品，需自備攤車。",
    facilities: { water: "none", electricity: "included", ac: false, gas: false, sink: false, storage: false, wifi: false },
    businessHours: { open: "17:00", close: "23:30", days: ["五","六","日"] },
    floorType: "廣場地磚", ceilingH: "戶外", nearParking: true, nearMRT: "捷運劍潭站（步行2分）",
    stallType: "戶外流動", duration: "週末限定", startDate: "每週五", endDate: "每週日", recurringOff: null,
  },
  {
    id: 104, name: "南機場夜市 F-02號", location: "台北市中正區", market: "南機場夜市",
    sizeW: 2, sizeD: 1.5, sizeUnit: "坪", rent: 700, deposit: 0, rentUnit: "天",
    type: "臨時代租", tempType: "owner_leave", available: "週四至週六", urgency: "high",
    tags: ["熟食", "在地小吃"], traffic: "中", locked: true,
    owner: "林媽媽", ownerPhone: "0934-333-444",
    photos: ["🍱","🏠","🔦"],
    desc: "攤主因家事暫休三天，誠找臨時業者代租，設備齊全，有固定熟客基礎。",
    facilities: { water: "included", electricity: "included", ac: false, gas: true, sink: true, storage: false, wifi: false },
    businessHours: { open: "16:00", close: "22:30", days: ["四","五","六"] },
    floorType: "磁磚", ceilingH: "2.5m", nearParking: false, nearMRT: "捷運古亭站",
    stallType: "室內固定", duration: "3天", startDate: "04/17", endDate: "04/19", recurringOff: null,
  },
];

const INIT_URGENT = [
  { id: 201, name: "饒河街夜市 B-05號", market: "饒河街夜市", location: "台北市松山區", photo: "🏮", owner: "阿明哥", rent: 600, size: "2×2 坪", tags: ["熟食", "甜點"], traffic: "高", desc: "今晚突然有事，攤位空出來，水電齊全可直接使用，只限今晚。", postedMins: 3, expiresIn: 180, viewers: 12, grabbed: false, locked: false },
  { id: 202, name: "士林夜市 C-11號", market: "士林夜市", location: "台北市士林區", photo: "🎪", owner: "雅婷", rent: 900, size: "1.5×3 坪", tags: ["服飾", "飾品"], traffic: "極高", desc: "週末臨時有急事，今晚及明晚攤位閒置，誠找人頂租兩天！", postedMins: 8, expiresIn: 300, viewers: 27, grabbed: false, locked: true },
  { id: 203, name: "寧夏夜市 A-03號", market: "寧夏夜市", location: "台北市大同區", photo: "🧋", owner: "文哥", rent: 500, size: "1×2 坪", tags: ["飲料", "甜點"], traffic: "高", desc: "下午臨時接到通知出差，今晚空攤，有興趣趕快！", postedMins: 15, expiresIn: 120, viewers: 8, grabbed: false, locked: true },
  { id: 204, name: "逢甲夜市 D-09號", market: "逢甲夜市", location: "台中市西屯區", photo: "🔥", owner: "秀珍", rent: 1200, size: "2×3 坪", tags: ["熟食", "飲料"], traffic: "極高", desc: "本週六日攤主有婚禮，兩天攤位開放。逢甲黃金位置！", postedMins: 22, expiresIn: 600, viewers: 41, grabbed: false, locked: true },
];

// ── Config & helpers ──────────────────────────────────────────────────────────
const tempTypeConfig = {
  owner_leave: { label: "臨時代租", icon: "🔄", color: "#8b5cf6", bg: "#f5f3ff" },
  weekly_off:  { label: "每週空檔", icon: "📅", color: "#0ea5e9", bg: "#f0f9ff" },
  mobile:      { label: "流動攤位", icon: "🚶", color: "#f97316", bg: "#fff7ed" },
};
const urgencyConfig = {
  high: { label: "緊急", color: "#ef4444", bg: "#fef2f2" },
  mid:  { label: "近期", color: "#f97316", bg: "#fff7ed" },
  low:  { label: "長期", color: "#22c55e", bg: "#f0fdf4" },
};
const trafficColor = (t) => t === "極高" ? "#ef4444" : t === "高" ? "#f97316" : "#22c55e";
const fmtTime = (s) => { const m = Math.floor(s/60); const sec = s%60; return `${m}:${String(sec).padStart(2,"0")}`; };
const facilityLabels = { water:"供水", electricity:"供電", ac:"冷氣", gas:"瓦斯", sink:"水槽", storage:"儲物間", wifi:"WiFi" };
const waterLabel = { included:"含水費", metered:"自付水費", none:"無水源" };
const elecLabel  = { included:"含電費", metered:"自付電費", none:"無電源" };

// ── Terms ─────────────────────────────────────────────────────────────────────
const TERMS_SECTIONS = [
  { title:"第一條　服務說明", content:`攤位通（以下稱「本平台」）由攤位通科技有限公司營運，提供攤位出租資訊媒合服務，包含固定攤位刊登、臨時空檔媒合及急單搶租等功能。\n\n本平台僅提供資訊媒合服務，不直接參與租賃交易。所有租賃合約及交易行為，由出租方與租用方雙方自行負責。` },
  { title:"第二條　會員資格與註冊", content:`使用本平台服務，您須年滿 18 歲，且具備完全行為能力。\n\n會員註冊時須提供真實、正確、完整的個人資料。若提供虛假資料，本公司有權立即終止服務並取消會員資格。\n\n每位使用者限註冊一個帳號，禁止共用、轉讓或出售帳號。` },
  { title:"第三條　帳號安全", content:`會員應妥善保管帳號密碼，不得將帳號密碼告知他人。\n\n若發現帳號遭未授權使用，應立即通知本公司。因會員疏失導致帳號被盜用所生之損失，本公司不負賠償責任。` },
  { title:"第四條　服務費用", content:`本平台提供免費瀏覽功能。高級功能（包含查看聯絡資訊、發布攤位、急單搶租等）須付費加入會員方可使用。\n\n會員費用（半年繳）：\n・租用方會員：新台幣 000 元/半年\n・出租方會員：新台幣 000 元/半年\n\n會員費用（年繳）：\n・租用方會員：新台幣 000 元/年\n・出租方會員：新台幣 000 元/年\n\n注意：本平台目前為測試版（Beta），測試期間所有費用暫以 000 元計，正式版上線後將另行公告實際收費標準，並提前 30 日通知現有會員。\n\n本公司保留調整收費標準之權利，調整前將提前30日通知現有會員。` },
  { title:"第五條　禁止行為", content:`使用本平台服務，您同意不得從事下列行為：\n\n（一）刊登虛假、不實或具誤導性之攤位資訊\n（二）以不正當手段操控急單搶租機制\n（三）騷擾、恐嚇或詐騙其他使用者\n（四）未經授權擷取、複製本平台資料\n（五）利用本平台從事任何違法活動\n（六）發布垃圾訊息或未經請求之商業訊息\n\n違反上述規定者，本公司有權立即停權並依法追究責任。` },
  { title:"第六條　個人資料保護", content:`本公司依據中華民國《個人資料保護法》蒐集、處理及利用您的個人資料。\n\n蒐集目的：提供媒合服務、會員管理、客戶服務及改善使用體驗。\n\n蒐集項目：姓名、手機號碼、電子郵件、身分驗證資料及使用紀錄。\n\n資料保存：會員資料保存至帳號註銷後 30 日止，交易紀錄依法保存 5 年。` },
  { title:"第七條　免責聲明", content:`本平台所提供之攤位資訊均由出租方自行填寫，本公司不保證資訊之正確性、完整性或即時性。\n\n租賃交易風險由雙方自行承擔，本公司不介入雙方之租賃糾紛，亦不負連帶賠償責任。` },
  { title:"第八條　條款變更與準據法", content:`本公司保留修改本使用條款之權利。修改後之條款將於平台上公告並通知現有會員。\n\n本使用條款之解釋與適用，以中華民國法律為準據法。因本服務所生之爭議，雙方同意以臺灣臺北地方法院為第一審管轄法院。` },
];
const PRIVACY_CONTENT = `攤位通科技有限公司重視您的隱私權，依個人資料保護法規定說明本公司蒐集、處理及利用個人資料之方式。\n\n【蒐集目的】\n提供攤位媒合服務、處理會員事務、進行身份驗證及改善服務品質。\n\n【蒐集項目】\n姓名、出生年月日、手機號碼、電子郵件信箱、身分證字號（驗證用途）、付款資訊及使用行為記錄。\n\n【資料利用方式】\n您的個人資料僅用於提供本平台服務，不會在未獲您同意之情形下提供予第三方，但法律另有規定者除外。\n\n【Cookie 使用】\n本平台使用 Cookie 技術改善使用體驗。您可透過瀏覽器設定管理 Cookie。\n\n【聯絡方式】\nprivacy@stallhub.com.tw`;

// ── Payment config ────────────────────────────────────────────────────────────
const PLANS = {
  renter: {
    half:  { label:"半年繳", months:6, price:0, perMonth:0, save:0, discount:"測試期間免費" },
    year:  { label:"年繳",   months:12, price:0, perMonth:0, save:0, discount:"測試期間免費" },
  },
  owner: {
    half:  { label:"半年繳", months:6, price:0, perMonth:0, save:0, discount:"測試期間免費" },
    year:  { label:"年繳",   months:12, price:0, perMonth:0, save:0, discount:"測試期間免費" },
  },
};
const PAYMENT_METHODS = [
  { id:"credit",   icon:"💳", label:"信用卡", sub:"Visa / Mastercard / JCB" },
  { id:"epay",     icon:"📱", label:"電子支付", sub:"街口 / 歐付寶 / icash Pay" },
  { id:"linepay",  icon:"💚", label:"Line Pay", sub:"" },
  { id:"twpay",    icon:"🇹🇼", label:"台灣 Pay", sub:"" },
  { id:"allpay",   icon:"🔵", label:"全支付", sub:"" },
];

// ── Map Data ──────────────────────────────────────────────────────────────────
const MAP_PINS = [
  { id:1,  name:"饒河街夜市 A-12號", market:"饒河街夜市", region:"台北東區", sx:218, sy:65, x:62, y:30, rent:18000, rentUnit:"月", tags:["熟食","飲料"], traffic:"高",  photo:"🏮", type:"fixed",  locked:false },
  { id:2,  name:"士林夜市 B-07號",   market:"士林夜市",   region:"台北北區", sx:205, sy:55, x:47, y:20, rent:22000, rentUnit:"月", tags:["服飾","飾品"], traffic:"極高", photo:"🎪", type:"fixed",  locked:true  },
  { id:3,  name:"南機場夜市 C-03號", market:"南機場夜市", region:"台北西區", sx:200, sy:72, x:42, y:38, rent:12000, rentUnit:"月", tags:["熟食","小吃"], traffic:"中",  photo:"🍜", type:"fixed",  locked:true  },
  { id:4,  name:"逢甲夜市 E-22號",   market:"逢甲夜市",   region:"台中",     sx:95,  sy:255, x:40, y:57, rent:25000, rentUnit:"月", tags:["熟食","服飾"], traffic:"極高", photo:"🔥", type:"fixed",  locked:true  },
  { id:101,name:"饒河街夜市 A-08號", market:"饒河街夜市", region:"台北東區", sx:222, sy:67, x:64, y:32, rent:800,   rentUnit:"天", tags:["熟食","甜點"], traffic:"高",  photo:"🏮", type:"temp",   locked:false },
  { id:102,name:"寧夏夜市 D-15號",   market:"寧夏夜市",   region:"台北西區", sx:208, sy:62, x:44, y:33, rent:600,   rentUnit:"天", tags:["飲料","甜點"], traffic:"高",  photo:"🧋", type:"temp",   locked:true  },
  { id:103,name:"士林 流動空位",     market:"士林夜市",   region:"台北北區", sx:203, sy:58, x:48, y:22, rent:500,   rentUnit:"天", tags:["飾品","手作"], traffic:"極高", photo:"🎠", type:"mobile", locked:true  },
  { id:201,name:"饒河街 B-05 急單",  market:"饒河街夜市", region:"台北東區", sx:220, sy:62, x:65, y:29, rent:600,   rentUnit:"天", tags:["熟食"],        traffic:"高",  photo:"🚨", type:"urgent", locked:false },
  { id:202,name:"士林夜市 急單",     market:"士林夜市",   region:"台北北區", sx:202, sy:52, x:46, y:21, rent:900,   rentUnit:"天", tags:["服飾"],        traffic:"極高", photo:"🚨", type:"urgent", locked:true  },
  { id:5,  name:"六合夜市 G-03號",   market:"六合夜市",   region:"高雄",     sx:62,  sy:460, x:46, y:83, rent:16000, rentUnit:"月", tags:["熟食","海鮮"], traffic:"高",  photo:"🦑", type:"fixed",  locked:true  },
  { id:6,  name:"花園夜市 H-11號",   market:"花園夜市",   region:"台南",     sx:50,  sy:398, x:39, y:73, rent:14000, rentUnit:"月", tags:["熟食","甜點"], traffic:"高",  photo:"🌸", type:"fixed",  locked:true  },
  { id:7,  name:"寧夏夜市 A-09號",   market:"寧夏夜市",   region:"台北西區", sx:210, sy:64, x:43, y:36, rent:15000, rentUnit:"月", tags:["熟食"],        traffic:"高",  photo:"🏮", type:"fixed",  locked:true  },
];
const MAP_REGIONS = ["全部","台北北區","台北東區","台北西區","台中","台南","高雄"];
const typePin   = { fixed:"#c0392b", temp:"#8b5cf6", mobile:"#f97316", urgent:"#ef4444" };
const typePinLg = { fixed:"固定攤位", temp:"臨時代租", mobile:"流動攤位", urgent:"🚨急單" };

// ── Messaging Data ─────────────────────────────────────────────────────────────
const INIT_CONVERSATIONS = [
  {
    id:1, stallName:"饒河街夜市 A-12號", ownerName:"王先生", ownerPhoto:"🏮",
    lastMsg:"請問何時可以入駐？", lastTime:"14:32", unread:2,
    messages:[
      { id:1, from:"me",    text:"您好，請問饒河街夜市 A-12號攤位還有空嗎？", time:"14:28" },
      { id:2, from:"other", text:"您好！目前有空，請問您打算何時入駐？", time:"14:30" },
      { id:3, from:"me",    text:"我想從下個月開始，大概租3個月", time:"14:31" },
      { id:4, from:"other", text:"請問何時可以入駐？", time:"14:32" },
    ]
  },
  {
    id:2, stallName:"士林夜市 B-07號", ownerName:"陳小姐", ownerPhoto:"🎪",
    lastMsg:"好的，明天下午2點見！", lastTime:"昨天", unread:0,
    messages:[
      { id:1, from:"other", text:"您好，感謝您對本攤位的興趣！", time:"昨天 10:00" },
      { id:2, from:"me",    text:"請問可以預約看攤位嗎？", time:"昨天 10:05" },
      { id:3, from:"other", text:"當然可以，您方便哪天？", time:"昨天 10:10" },
      { id:4, from:"me",    text:"明天下午方便嗎？", time:"昨天 10:12" },
      { id:5, from:"other", text:"好的，明天下午2點見！", time:"昨天 10:15" },
    ]
  },
  {
    id:3, stallName:"南機場夜市 急詢", ownerName:"林老闆", ownerPhoto:"🍜",
    lastMsg:"租金可以再商量嗎？", lastTime:"週一", unread:1,
    messages:[
      { id:1, from:"other", text:"您好，我對您的攤位很感興趣", time:"週一 09:00" },
      { id:2, from:"me",    text:"歡迎！請問有什麼問題？", time:"週一 09:15" },
      { id:3, from:"other", text:"租金可以再商量嗎？", time:"週一 09:20" },
    ]
  },
];

// ── Consumer Zone Data ────────────────────────────────────────────────────────
const AD_PRODUCTS = [
  { id:1, stallName:"饒河街夜市 A-12號", owner:"王先生", photo:"🏮", market:"饒河街夜市",
    productName:"招牌蚵仔煎", price:80, originalPrice:null, category:"熟食",
    desc:"傳承三代的老味道，蚵仔飽滿鮮嫩，醬汁獨家配方，每天現做限量！",
    tags:["熱銷","限量"], likes:128, views:342, isPromo:false },
  { id:2, stallName:"士林夜市 B-07號", owner:"陳小姐", photo:"🎪", market:"士林夜市",
    productName:"韓系水洗牛仔外套", price:599, originalPrice:899, category:"服飾",
    desc:"今季最夯韓系寬版牛仔外套，多色可選，現場試穿。購買2件再9折！",
    tags:["特惠","新品"], likes:89, views:215, isPromo:true },
  { id:3, stallName:"饒河街夜市 A-08號", owner:"王大哥", photo:"🏮", market:"饒河街夜市",
    productName:"古早味豆花", price:45, originalPrice:null, category:"甜點",
    desc:"使用天然黃豆製作，口感嫩滑，搭配珍珠、湯圓、花生任選！",
    tags:["人氣","古早味"], likes:203, views:580, isPromo:false },
  { id:4, stallName:"寧夏夜市 D-15號", owner:"張先生", photo:"🧋", market:"寧夏夜市",
    productName:"珍珠燒仙草", price:55, originalPrice:65, category:"飲料",
    desc:"嚴選台灣仙草，手工熬煮8小時，加大珍珠Q彈！今日買2送1！",
    tags:["今日特惠","買2送1"], likes:315, views:892, isPromo:true },
  { id:5, stallName:"南機場夜市 C-03號", owner:"林老闆", photo:"🍜", market:"南機場夜市",
    productName:"台南棺材板", price:120, originalPrice:null, category:"熟食",
    desc:"正宗台南傳統美食，酥脆外皮搭配濃郁內餡，來台南必吃小吃！",
    tags:["台南必吃","傳統"], likes:167, views:423, isPromo:false },
  { id:6, stallName:"逢甲夜市 E-22號", owner:"吳小姐", photo:"🔥", market:"逢甲夜市",
    productName:"超爆辣起司薯條", price:99, originalPrice:120, category:"熟食",
    desc:"逢甲排隊名物！現炸薯條淋上濃郁起司醬，辣度可選，超過癮！",
    tags:["排隊必吃","限時優惠"], likes:445, views:1203, isPromo:true },
  { id:7, stallName:"六合夜市 G-03號", owner:"陳大哥", photo:"🦑", market:"六合夜市",
    productName:"現烤大透抽", price:350, originalPrice:null, category:"海鮮",
    desc:"高雄現撈海鮮直送，大透抽現烤現吃，肉質鮮甜無腥味！",
    tags:["高雄必吃","現撈"], likes:298, views:756, isPromo:false },
  { id:8, stallName:"花園夜市 H-11號", owner:"林小姐", photo:"🌸", market:"花園夜市",
    productName:"手工芋圓甜湯", price:65, originalPrice:null, category:"甜點",
    desc:"台南花園夜市人氣甜品，手工現搓芋圓，Q彈有嚼勁，配料豐富！",
    tags:["手工","人氣"], likes:178, views:445, isPromo:false },
];
const CONSUMER_CATS = ["全部","熟食","飲料","甜點","服飾","海鮮","飾品"];
const EVENTS = [
  { id:1, title:"饒河街夜市 週末限定美食節", date:"04/19-04/20", market:"饒河街夜市", desc:"超過50家攤位參與，現場抽獎，消費滿200送點數！", photo:"🎉", attendees:342 },
  { id:2, title:"士林夜市 夏季新品發表", date:"04/26", market:"士林夜市", desc:"全館服飾攤位同步推出夏季新品，首日購買享9折優惠", photo:"👗", attendees:218 },
  { id:3, title:"逢甲夜市 美食挑戰賽", date:"05/03", market:"逢甲夜市", desc:"吃辣挑戰、速食比賽，優勝者贏取夜市消費券500元！", photo:"🏆", attendees:567 },
];

// ══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════════════════

export default function App() {
  const [authScreen, setAuthScreen] = useState("splash");
  const [user, setUser]             = useState(null);
  const [regForm, setRegForm]       = useState({ name:"", phone:"", email:"", password:"", confirmPw:"", role:"renter", accountType:"regular", trialDays:30, agreeTerms:false, agreePrivacy:false, agreeMarketing:false, invoiceBarcode:"" });
  const [regErrors, setRegErrors]   = useState({});
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneSending, setPhoneSending]   = useState(false);
  const [phoneCode, setPhoneCode]         = useState("");
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);
  const [phoneCodeTimer, setPhoneCodeTimer] = useState(0);
  const [otpValue, setOtpValue]     = useState(["","","","","",""]);
  const [otpTimer, setOtpTimer]     = useState(60);
  const [otpRunning, setOtpRunning] = useState(false);
  const [loginForm, setLoginForm]   = useState({ phone:"", password:"" });
  const [loginError, setLoginError] = useState("");

  const [screen, setScreen]           = useState("home");
  const [selected, setSelected]       = useState(null);
  const [photoIdx, setPhotoIdx]       = useState(0);
  const [mainTab, setMainTab]         = useState("fixed");
  const [navTab, setNavTab]           = useState("rent");
  const [filterFixed, setFilterFixed] = useState("全部");
  const [filterTemp, setFilterTemp]   = useState("全部");
  const [isMember, setIsMember]       = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [payRole, setPayRole]         = useState("renter");
  const [payPeriod, setPayPeriod]     = useState("half");
  const [payMethod, setPayMethod]     = useState("credit");
  const [payStep, setPayStep]         = useState(1); // 1=plan 2=method 3=confirm 4=success
  const [cardForm, setCardForm]       = useState({ num:"", name:"", exp:"", cvv:"" });
  const [urgentList, setUrgentList]   = useState(INIT_URGENT);
  const [showPostForm, setShowPostForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [urgentTimers, setUrgentTimers] = useState(Object.fromEntries(INIT_URGENT.map(u=>[u.id,u.expiresIn])));
  const [showTermsModal, setShowTermsModal]     = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Listing form state
  // Consumer zone
  const [consumerCat, setConsumerCat]   = useState("全部");
  const [likedAds, setLikedAds]         = useState([]);
  const [showAdDetail, setShowAdDetail] = useState(null);
  const [showQR, setShowQR]             = useState(false);
  // Map
  const [mapView, setMapView]           = useState(false);
  const [mapRegion, setMapRegion]       = useState("全部");
  const [mapSelected, setMapSelected]   = useState(null);
  // Messaging
  const [msgConvId, setMsgConvId]       = useState(null);
  const [msgInput, setMsgInput]         = useState("");
  const [conversations, setConversations] = useState(INIT_CONVERSATIONS);

  const [showListForm, setShowListForm]     = useState(false);
  const [listFormType, setListFormType]     = useState("fixed"); // fixed | temp
  const [listForm, setListForm]             = useState({
    name:"", market:"", location:"", sizeW:"", sizeD:"",
    rent:"", deposit:"", stallType:"室內固定",
    openTime:"17:00", closeTime:"23:00",
    days:["一","二","三","四","五","六","日"],
    water:"included", electricity:"metered",
    ac:false, gas:false, sink:false, storage:false, wifi:false,
    floorType:"磁磚", ceilingH:"", nearMRT:"",
    desc:"", tags:[], photos:[],
    tempType:"owner_leave", startDate:"", endDate:"", recurringOff:"",
  });

  useEffect(() => {
    if (authScreen==="splash") { const t=setTimeout(()=>setAuthScreen("login"),2200); return ()=>clearTimeout(t); }
  },[authScreen]);
  useEffect(() => {
    if (authScreen==="main") {
      const i=setInterval(()=>setUrgentTimers(p=>{const n={...p};Object.keys(n).forEach(k=>{if(n[k]>0)n[k]-=1;});return n;}),1000);
      return ()=>clearInterval(i);
    }
  },[authScreen]);
  useEffect(() => {
    if (otpRunning&&otpTimer>0) { const t=setTimeout(()=>setOtpTimer(v=>v-1),1000); return ()=>clearTimeout(t); }
    if (otpTimer===0) setOtpRunning(false);
  },[otpRunning,otpTimer]);
  useEffect(()=>{
    if (phoneCodeTimer>0){ const t=setTimeout(()=>setPhoneCodeTimer(v=>v-1),1000); return()=>clearTimeout(t); }
  },[phoneCodeTimer]);
  useEffect(()=>{
    if(user){ const t=setTimeout(()=>{showToast("🚨 新急單：基隆廟口夜市 E-07號 剛剛發出今晚急單！");},8000); return()=>clearTimeout(t); }
  },[user]);

  const showToast = (msg) => { setNotification(msg); setTimeout(()=>setNotification(null),3500); };
  const setReg = (k,v) => setRegForm(p=>({...p,[k]:v}));

  const handleSendPhoneCode = () => {
    if (!/^09\d{8}$/.test(regForm.phone)) { setRegErrors(p=>({...p,phone:"請輸入正確手機號碼（09開頭，10碼）"})); return; }
    setPhoneSending(true);
    setTimeout(()=>{ setPhoneSending(false); setPhoneCodeSent(true); setPhoneCodeTimer(60); showToast("📱 驗證碼已傳送至 "+regForm.phone); },1200);
  };
  const handleVerifyPhoneCode = () => {
    if (phoneCode.length!==6){ setRegErrors(p=>({...p,phoneCode:"請輸入6位數驗證碼"})); return; }
    setPhoneVerified(true); setRegErrors(p=>({...p,phoneCode:undefined})); showToast("✅ 手機號碼驗證成功！");
  };
  const validateReg = () => {
    const e={};
    if (!regForm.name.trim()) e.name="請輸入姓名";
    if (!/^09\d{8}$/.test(regForm.phone)) e.phone="請輸入正確手機號碼（09開頭，10碼）";
    if (!phoneVerified) e.phone="請先完成手機號碼驗證";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email)) e.email="請輸入正確電子郵件格式";
    if (regForm.accountType==="regular"){
      if (regForm.password.length<8) e.password="密碼至少需要 8 個字元";
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(regForm.password)) e.password="密碼需包含大寫、小寫字母及數字";
      if (regForm.password!==regForm.confirmPw) e.confirmPw="兩次密碼輸入不一致";
    }
    if (!regForm.agreeTerms) e.agreeTerms="請閱讀並同意使用條款";
    if (!regForm.agreePrivacy) e.agreePrivacy="請閱讀並同意隱私權政策";
    if (regForm.invoiceBarcode && !/^\/[A-Z0-9+\-.]{7}$/.test(regForm.invoiceBarcode)) e.invoiceBarcode="手機條碼格式錯誤（/ 開頭共8碼）";
    setRegErrors(e); return Object.keys(e).length===0;
  };
  const handleRegSubmit = () => {
    if (!validateReg()) return;
    const expiry = new Date(); expiry.setDate(expiry.getDate()+30);
    const isTrial = regForm.accountType==="trial";
    setUser({
      name:regForm.name, phone:regForm.phone, email:regForm.email,
      role:regForm.role, accountType:isTrial?"trial":"regular",
      trialExpiry:isTrial?expiry.toLocaleDateString("zh-TW"):null,
      joinDate:new Date().toLocaleDateString("zh-TW"),
      invoiceBarcode:regForm.invoiceBarcode,
      betaUser:true,
    });
    // BETA: all registered users get full access free
    setIsMember(true);
    if (isTrial) { setAuthScreen("done"); return; }
    setOtpTimer(60);setOtpRunning(true);setOtpValue(["","","","","",""]);setAuthScreen("otp");
  };
  const handleOtpConfirm = () => {
    if (otpValue.join("").length<6){showToast("請輸入完整驗證碼");return;}
    setIsMember(true);
    setAuthScreen("done");
  };
  const handleLogin = () => {
    if (!loginForm.phone||!loginForm.password){setLoginError("請填寫手機號碼與密碼");return;}
    if (loginForm.password.length<3){setLoginError("帳號或密碼錯誤，請重新輸入");return;}
    setUser({name:"示範用戶",phone:loginForm.phone,email:"demo@stallhub.com",role:"renter",joinDate:"2026/04/13"});
    setLoginError(""); setAuthScreen("done");
  };
  const handleLogout = () => { setUser(null);setIsMember(false);setAuthScreen("login"); };

  const handlePayConfirm = () => {
    setPayStep(4);
    setTimeout(()=>{ setIsMember(true);setShowPayment(false);setPayStep(1);showToast("✅ 付款成功！歡迎成為攤位通會員"); },1800);
  };

  const handleGrab = (id) => {
    if (!isMember){setShowUpgrade(true);return;}
    setUrgentList(p=>p.map(u=>u.id===id?{...u,grabbed:true}:u));
    showToast("✅ 搶租成功！攤主將在 5 分鐘內聯繫你");
  };

  const sendMessage = (convId) => {
    if (!msgInput.trim()) return;
    setConversations(prev => prev.map(c => c.id !== convId ? c : {
      ...c,
      lastMsg: msgInput,
      lastTime: "方才",
      messages: [...c.messages, { id: Date.now(), from:"me", text: msgInput, time:"方才" }]
    }));
    setMsgInput("");
  };

  const totalUnread = conversations.reduce((s,c)=>s+c.unread,0);

  const filteredFixed = filterFixed==="全部"?FIXED_STALLS:FIXED_STALLS.filter(s=>s.tags.includes(filterFixed));
  const filteredTemp  = filterTemp==="全部"?TEMP_STALLS:TEMP_STALLS.filter(s=>s.type===filterTemp);
  const urgentCount   = urgentList.filter(u=>!u.grabbed).length;
  const currentPlan   = PLANS[payRole][payPeriod];

  // ── SPLASH ──────────────────────────────────────────────────────────────────
  if (authScreen==="splash") return (
    <div style={{...c.root,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"linear-gradient(160deg,#c0392b,#e74c3c,#c0392b)"}}>
      <style>{css}</style>
      <div className="fadeUp">
        <div style={{fontSize:72,textAlign:"center",marginBottom:16}}>🏮</div>
        <div style={{color:"#fff",fontSize:36,fontWeight:900,letterSpacing:3,textAlign:"center"}}>攤位通</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:8}}>
          <div style={{color:"rgba(255,255,255,0.7)",fontSize:14}}>Taiwan Stall Hub</div>
          <div style={{background:"rgba(255,255,255,0.25)",color:"#fff",fontSize:11,fontWeight:800,padding:"3px 10px",borderRadius:20,letterSpacing:1}}>BETA</div>
        </div>
        <div style={{color:"rgba(255,255,255,0.55)",fontSize:12,textAlign:"center",marginTop:6}}>測試版 · 歡迎試用回饋</div>
      </div>
      <div style={{position:"absolute",bottom:50,display:"flex",gap:6}}>{[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:4,background:i===0?"#fff":"rgba(255,255,255,0.4)"}}/>)}</div>
    </div>
  );

  // ── LOGIN ────────────────────────────────────────────────────────────────────
  if (authScreen==="login") return (
    <div style={c.root}><style>{css}</style>
      <div style={c.authHeader}>
        <div style={{fontSize:40,marginBottom:8}}>🏮</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          <div style={c.authTitle}>攤位通</div>
          <div style={{background:"rgba(255,255,255,0.25)",color:"#fff",fontSize:11,fontWeight:800,padding:"3px 10px",borderRadius:20,letterSpacing:1}}>BETA</div>
        </div>
        <div style={c.authSub}>測試版 · 全台最大攤位媒合平台</div>
      </div>
      <div style={c.authBody}>
        <div style={c.authCard}>
          <div style={c.authCardTitle}>登入帳號</div>
          <div style={c.fieldLabel}>手機號碼</div>
          <input style={c.input} placeholder="09XX-XXX-XXX" value={loginForm.phone} onChange={e=>setLoginForm(p=>({...p,phone:e.target.value}))}/>
          <div style={c.fieldLabel}>密碼</div>
          <input style={c.input} type="password" placeholder="請輸入密碼" value={loginForm.password} onChange={e=>setLoginForm(p=>({...p,password:e.target.value}))}/>
          {loginError&&<div style={c.errText}>{loginError}</div>}
          <button style={c.primaryBtn} onClick={handleLogin}>登入</button>
          <div style={{textAlign:"center",marginTop:12}}><button style={c.linkBtn}>忘記密碼？</button></div>
        </div>
        <div style={c.divider}><span style={c.dividerText}>或</span></div>
        <button style={c.secondaryBtn} onClick={()=>setAuthScreen("register")}>📝 建立新帳號</button>
        <div style={{textAlign:"center",marginTop:14}}><button style={c.guestBtn} onClick={()=>{setUser({name:"訪客",phone:"",email:"",role:"guest",joinDate:""});setAuthScreen("done");}}>以訪客身分瀏覽（功能受限）</button></div>
      </div>
    </div>
  );

  // ── REGISTER ─────────────────────────────────────────────────────────────────
  if (authScreen==="register") return (
    <div style={c.root}><style>{css}</style>
      <div style={c.pageHeader}><button style={c.pageBackBtn} onClick={()=>setAuthScreen("login")}>←</button><div style={c.pageHeaderTitle}>建立帳號</div><div style={{width:36}}/></div>
      <div style={{...c.authBody,paddingTop:16}}>
        <div style={c.stepRow}>{["基本資料","身份選擇","同意條款"].map((s,i)=><div key={i} style={c.stepItem}><div style={{...c.stepDot,background:"#c0392b",color:"#fff"}}>{i+1}</div><div style={{...c.stepLabel,color:"#c0392b"}}>{s}</div></div>)}</div>

        {/* Account type selection */}
        <div style={c.authCard}>
          <div style={c.sectionTitle}>🎫 選擇帳號類型</div>
          <div style={c.acctTypeRow}>
            <div style={{...c.acctTypeCard,...(regForm.accountType==="regular"?c.acctTypeActive:{})}} onClick={()=>setReg("accountType","regular")}>
              <div style={{fontSize:26,marginBottom:6}}>👑</div>
              <div style={c.acctTypeLabel}>正式帳號</div>
              <div style={c.acctTypeDesc}>完整功能，付費升級會員</div>
            </div>
            <div style={{...c.acctTypeCard,...(regForm.accountType==="trial"?c.acctTypeActiveTrial:{})}} onClick={()=>setReg("accountType","trial")}>
              <div style={{fontSize:26,marginBottom:6}}>🧪</div>
              <div style={c.acctTypeLabel}>試用帳號</div>
              <div style={{...c.acctTypeDesc,color:"#0ea5e9"}}>免費試用 30 天</div>
              <div style={c.trialBadge}>到期自動停用</div>
            </div>
          </div>
          {regForm.accountType==="trial"&&(
            <div style={c.trialInfoBox}>
              <div style={{fontSize:13,fontWeight:700,color:"#0ea5e9",marginBottom:4}}>🧪 試用帳號說明</div>
              <div style={{fontSize:12,color:"#555",lineHeight:1.6}}>
                ・免費體驗所有功能 <strong>30 天</strong><br/>
                ・到期日：<strong>{(()=>{const d=new Date();d.setDate(d.getDate()+30);return d.toLocaleDateString("zh-TW");})()}</strong><br/>
                ・到期後帳號自動停用，可升級為正式會員<br/>
                ・試用期間刊登資料保留 7 天
              </div>
            </div>
          )}
        </div>

        <div style={c.authCard}>
          <div style={c.sectionTitle}>📋 基本資料</div>
          <div style={c.fieldLabel}>姓名 <span style={c.required}>*</span></div>
          <input style={{...c.input,...(regErrors.name?c.inputErr:{})}} placeholder="請輸入真實姓名" value={regForm.name} onChange={e=>setReg("name",e.target.value)}/>
          {regErrors.name&&<div style={c.errText}>{regErrors.name}</div>}

          {/* Phone with verify button */}
          <div style={c.fieldLabel}>手機號碼 <span style={c.required}>*</span></div>
          <div style={{display:"flex",gap:8}}>
            <input style={{...c.input,flex:1,...(regErrors.phone?c.inputErr:{}),...(phoneVerified?{borderColor:"#22c55e",background:"#f0fdf4"}:{})}} placeholder="09XX-XXX-XXX" type="tel" value={regForm.phone} onChange={e=>{setReg("phone",e.target.value);setPhoneVerified(false);setPhoneCodeSent(false);}} disabled={phoneVerified}/>
            {!phoneVerified&&(
              <button style={{...c.sendCodeBtn,...(phoneSending?{opacity:0.6}:{})}} disabled={phoneSending||phoneCodeTimer>0} onClick={handleSendPhoneCode}>
                {phoneSending?"傳送中...":phoneCodeTimer>0?`${phoneCodeTimer}s`:"傳送驗證碼"}
              </button>
            )}
            {phoneVerified&&<div style={c.verifiedBadge}>✅ 已驗證</div>}
          </div>
          {regErrors.phone&&<div style={c.errText}>{regErrors.phone}</div>}

          {/* Phone code input */}
          {phoneCodeSent&&!phoneVerified&&(
            <div style={c.phoneCodeBox}>
              <div style={{fontSize:13,color:"#555",marginBottom:8}}>請輸入收到的 6 位數驗證碼：</div>
              <div style={{display:"flex",gap:8}}>
                <input style={{...c.input,flex:1,textAlign:"center",letterSpacing:6,fontSize:18,fontWeight:800}} placeholder="------" maxLength={6} value={phoneCode} onChange={e=>setPhoneCode(e.target.value.replace(/\D/g,""))}/>
                <button style={c.verifyCodeBtn} onClick={handleVerifyPhoneCode}>確認</button>
              </div>
              {regErrors.phoneCode&&<div style={c.errText}>{regErrors.phoneCode}</div>}
              <div style={{fontSize:11,color:"#aaa",marginTop:6}}>
                {phoneCodeTimer>0?`驗證碼將在 ${phoneCodeTimer} 秒後失效`:"驗證碼已過期，請重新傳送"}
              </div>
            </div>
          )}

          <div style={c.fieldLabel}>電子郵件 <span style={c.required}>*</span></div>
          <input style={{...c.input,...(regErrors.email?c.inputErr:{})}} placeholder="example@email.com" type="email" value={regForm.email} onChange={e=>setReg("email",e.target.value)}/>
          {regErrors.email&&<div style={c.errText}>{regErrors.email}</div>}

          {regForm.accountType==="regular"&&<>
            <div style={c.fieldLabel}>密碼 <span style={c.required}>*</span></div>
            <input style={{...c.input,...(regErrors.password?c.inputErr:{})}} type="password" placeholder="至少8碼，含大小寫及數字" value={regForm.password} onChange={e=>setReg("password",e.target.value)}/>
            {regErrors.password&&<div style={c.errText}>{regErrors.password}</div>}
            {regForm.password.length>0&&<div style={c.pwStrengthRow}>{["長度8+","含大寫","含數字"].map((label,i)=>{const ok=[regForm.password.length>=8,/[A-Z]/.test(regForm.password),/\d/.test(regForm.password)][i];return<div key={i} style={{...c.pwCheck,color:ok?"#22c55e":"#aaa"}}>{ok?"✓":"○"} {label}</div>;})}</div>}
            <div style={c.fieldLabel}>確認密碼 <span style={c.required}>*</span></div>
            <input style={{...c.input,...(regErrors.confirmPw?c.inputErr:{})}} type="password" placeholder="再次輸入密碼" value={regForm.confirmPw} onChange={e=>setReg("confirmPw",e.target.value)}/>
            {regErrors.confirmPw&&<div style={c.errText}>{regErrors.confirmPw}</div>}
          </>}
        </div>

        <div style={c.authCard}>
          <div style={c.sectionTitle}>🏷 身份選擇</div>
          <div style={c.roleRow}>
            {[["renter","🔍","租用方","我想找攤位租用","$000/月起"],["owner","🏪","出租方","我有攤位想出租","$000/月起"]].map(([role,icon,label,desc,price])=>(
              <div key={role} style={{...c.roleCard,...(regForm.role===role?c.roleActive:{})}} onClick={()=>setReg("role",role)}>
                <div style={{fontSize:28,marginBottom:6}}>{icon}</div>
                <div style={c.roleLabel}>{label}</div><div style={c.roleDesc}>{desc}</div><div style={c.rolePriceTag}>{price}</div>
              </div>
            ))}
          </div>
          <div style={c.roleNote}>✦ 加入後可免費瀏覽，升級會員解鎖全功能</div>
        </div>

        {/* Invoice Barcode */}
        <div style={c.authCard}>
          <div style={c.sectionTitle}>🧾 財政部電子發票</div>
          <div style={c.invoiceInfoBox}>
            <div style={{fontSize:13,color:"#555",lineHeight:1.6}}>
              付費會員費用可開立電子發票。填寫手機條碼後，發票將自動歸戶至您的手機載具。
            </div>
          </div>
          <div style={c.fieldLabel}>手機條碼 <span style={{color:"#aaa",fontSize:11,fontWeight:400}}>（選填）</span></div>
          <div style={{position:"relative"}}>
            <input style={{...c.input,...(regErrors.invoiceBarcode?c.inputErr:{}),...(regForm.invoiceBarcode&&!regErrors.invoiceBarcode?{borderColor:"#22c55e"}:{})}} placeholder="/XXXXXXX（/ 開頭共8碼）" maxLength={8} value={regForm.invoiceBarcode} onChange={e=>setReg("invoiceBarcode",e.target.value.toUpperCase())}/>
            {regForm.invoiceBarcode&&!regErrors.invoiceBarcode&&regForm.invoiceBarcode.length===8&&<div style={c.barcodeOkBadge}>✓ 格式正確</div>}
          </div>
          {regErrors.invoiceBarcode&&<div style={c.errText}>{regErrors.invoiceBarcode}</div>}
          <div style={c.invoiceHint}>
            <div style={{fontSize:11,color:"#aaa",marginTop:8}}>
              📱 手機條碼查詢方式：<br/>
              1. 前往「電子發票整合服務平台」(einvoice.nat.gov.tw)<br/>
              2. 登入後於「載具管理」查詢手機條碼
            </div>
          </div>
        </div>

        <div style={c.authCard}>
          <div style={c.sectionTitle}>📜 條款同意</div>
          {[["agreeTerms","我已閱讀並同意",true,"showTerms"],["agreePrivacy","我已閱讀並同意",true,"showPrivacy"]].map(([key,prefix,req,action])=>(
            <div key={key}><div style={c.checkRow}><div style={{...c.checkbox,...(regForm[key]?c.checkboxOn:{})}} onClick={()=>setReg(key,!regForm[key])}>{regForm[key]&&"✓"}</div>
            <div style={c.checkLabel}>{prefix} <button style={c.termLink} onClick={()=>action==="showTerms"?setShowTermsModal(true):setShowPrivacyModal(true)}>{key==="agreeTerms"?"《使用條款》":"《隱私權政策》"}</button>{req&&<span style={c.required}> *</span>}</div></div>
            {regErrors[key]&&<div style={{...c.errText,marginLeft:32}}>{regErrors[key]}</div>}</div>
          ))}
          <div style={c.checkRow}><div style={{...c.checkbox,...(regForm.agreeMarketing?c.checkboxOn:{})}} onClick={()=>setReg("agreeMarketing",!regForm.agreeMarketing)}>{regForm.agreeMarketing&&"✓"}</div><div style={c.checkLabel}>我同意接收攤位通優惠資訊及急單推播通知（選填）</div></div>
        </div>

        <button style={c.primaryBtn} onClick={handleRegSubmit}>
          {regForm.accountType==="trial"?"🧪 建立試用帳號（免費30天）":"📱 送出申請並驗證手機"}
        </button>
        <div style={{textAlign:"center",marginTop:16,fontSize:13,color:"#888"}}>已有帳號？<button style={c.linkBtn} onClick={()=>setAuthScreen("login")}>返回登入</button></div>
      </div>
      {showTermsModal&&<TermsModal sections={TERMS_SECTIONS} onClose={()=>setShowTermsModal(false)} onAgree={()=>{setReg("agreeTerms",true);setShowTermsModal(false);}}/>}
      {showPrivacyModal&&<PrivacyModal content={PRIVACY_CONTENT} onClose={()=>setShowPrivacyModal(false)} onAgree={()=>{setReg("agreePrivacy",true);setShowPrivacyModal(false);}}/>}
    </div>
  );

  // ── OTP ───────────────────────────────────────────────────────────────────────
  if (authScreen==="otp") return (
    <div style={c.root}><style>{css}</style>
      <div style={c.pageHeader}><button style={c.pageBackBtn} onClick={()=>setAuthScreen("register")}>←</button><div style={c.pageHeaderTitle}>手機驗證</div><div style={{width:36}}/></div>
      <div style={c.authBody}>
        <div style={{textAlign:"center",padding:"30px 0 20px"}}><div style={{fontSize:52,marginBottom:16}}>📱</div><div style={{fontSize:18,fontWeight:800,color:"#222",marginBottom:8}}>輸入驗證碼</div><div style={{fontSize:14,color:"#888"}}>已傳送簡訊至 <span style={{color:"#c0392b",fontWeight:700}}>{regForm.phone}</span></div></div>
        <div style={c.otpRow}>{otpValue.map((v,i)=><input key={i} id={`otp-${i}`} style={c.otpBox} maxLength={1} value={v} onChange={e=>{const val=e.target.value.replace(/\D/g,"");const next=[...otpValue];next[i]=val;setOtpValue(next);if(val&&i<5)document.getElementById(`otp-${i+1}`)?.focus();}} onKeyDown={e=>{if(e.key==="Backspace"&&!v&&i>0)document.getElementById(`otp-${i-1}`)?.focus();}}/>)}</div>
        <div style={c.otpTimerRow}>{otpRunning?<span style={{color:"#888",fontSize:13}}>驗證碼有效時間 <span style={{color:"#c0392b",fontWeight:700}}>{otpTimer}</span> 秒</span>:<button style={c.linkBtn} onClick={()=>{setOtpTimer(60);setOtpRunning(true);showToast("已重新傳送驗證碼");}}>重新傳送驗證碼</button>}</div>
        <button style={c.primaryBtn} onClick={handleOtpConfirm}>確認驗證</button>
      </div>
    </div>
  );

  // ── DONE ──────────────────────────────────────────────────────────────────────
  if (authScreen==="done") return (
    <div style={c.root}><style>{css}</style>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",padding:"40px 24px"}}>
        <div style={{fontSize:64,marginBottom:20}} className="fadeUp">{user?.accountType==="trial"?"🧪":"🎉"}</div>
        <div style={{fontSize:22,fontWeight:900,color:"#222",marginBottom:8}}>{user?.name || ""}，歡迎加入！</div>
        {/* BETA notice */}
        <div style={{background:"linear-gradient(135deg,#fff7ed,#fef3c7)",border:"1.5px solid #fde68a",borderRadius:12,padding:"12px 16px",textAlign:"center",marginBottom:16,fontSize:13,color:"#92400e",lineHeight:1.7,width:"100%"}}>
          🎊 <strong>測試版限時福利</strong><br/>
          注冊即享全功能免費使用<br/>
          <span style={{fontSize:11,color:"#b45309"}}>正式版上線後另行公告會費標準</span>
        </div>
        {user?.accountType==="trial"&&(
          <div style={{background:"#eff6ff",border:"1.5px solid #bfdbfe",borderRadius:12,padding:"12px 16px",textAlign:"center",marginBottom:16,fontSize:13,color:"#1e40af",lineHeight:1.7,width:"100%"}}>
            🧪 <strong>試用帳號啟用中</strong><br/>試用期限至 <strong>{user?.trialExpiry}</strong>
          </div>
        )}
        <div style={c.welcomeCard}>
          {[["👤",user?.name],["📱",user?.phone||"訪客模式"],["🏷",user?.role==="owner"?"出租方":user?.role==="guest"?"訪客":"租用方"],["📅",`加入日期：${user?.joinDate||"—"}`]].map(([icon,val])=><div key={icon} style={c.welcomeRow}><span>{icon}</span><span style={{fontSize:13,color:"#555"}}>{val}</span></div>)}
          {user?.invoiceBarcode&&<div style={c.welcomeRow}><span>🧾</span><span style={{fontSize:13,color:"#555"}}>發票條碼：{user.invoiceBarcode}</span></div>}
        </div>
        <button style={c.primaryBtn} onClick={()=>setAuthScreen("main")}>開始使用攤位通 →</button>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // MAIN APP
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div style={c.root}><style>{css}</style>

      {/* Header */}
      <div style={c.header}>
        <div style={c.logo}>
          <span style={c.logoIcon}>攤</span>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={c.logoText}>攤位通</div>
              <div style={{background:"rgba(255,255,255,0.25)",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:10,letterSpacing:0.5}}>BETA</div>
            </div>
            <div style={c.logoSub}>測試版 · Taiwan Stall Hub</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {isMember
            ? <div style={{...c.memberBadge,background:"rgba(255,215,0,0.25)"}}>⭐ BETA會員</div>
            : <button style={c.joinBtn} onClick={()=>{setPayRole(user?.role||"renter");setPayStep(1);setShowPayment(true);}}>升級會員</button>
          }
          <button style={c.avatarBtn} onClick={()=>{setNavTab("profile");setScreen("profile");setMsgConvId(null);}}>{user?.name?.[0]||"我"}</button>
        </div>
      </div>

      {/* Nav */}
      <div style={c.navBar}>
        {[
          ["rent","🔍 找攤","home"],
          ["consumer","🛍 逛攤","consumer"],
          ["map","📍 地圖","map"],
          ["urgent","🚨 急單","urgent"],
          ["list","🏪 出租","mylist"],
        ].map(([tab,label,scr])=>(
          <button key={tab} style={{...c.navTab,...(navTab===tab?(tab==="urgent"?c.navActiveUrgent:c.navActive):{})}} onClick={()=>{setNavTab(tab);setScreen(scr);setMapView(false);}}>
            {label}
            {tab==="urgent"&&urgentCount>0&&<span style={c.navBadge}>{urgentCount}</span>}
          </button>
        ))}
      </div>

      {/* HOME */}
      {screen==="home"&&(
        <div style={c.body}>
          <div style={c.searchBar}><span style={{fontSize:18}}>🔍</span><input style={c.searchInput} placeholder="搜尋夜市、地區..."/></div>
          <div style={c.urgentBanner} onClick={()=>{setNavTab("urgent");setScreen("urgent");}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:22}}>🚨</span><div><div style={{fontWeight:800,fontSize:14}}>急單搶租</div><div style={{fontSize:12,opacity:0.85}}>現在有 {urgentCount} 個攤位急找人</div></div></div>
            <div style={c.urgentBannerArrow}>搶 →</div>
          </div>
          {/* BETA banner */}
          <div style={c.betaBanner}>
            <span style={{fontSize:16}}>🎊</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:13}}>測試版限時開放中</div>
              <div style={{fontSize:11,opacity:0.85}}>注冊即享全功能・正式版上線前免費使用</div>
            </div>
            <div style={{fontSize:10,background:"rgba(255,255,255,0.2)",padding:"3px 8px",borderRadius:10,fontWeight:700}}>BETA</div>
          </div>
          <div style={c.toggleRow}>
            <button style={{...c.toggleBtn,...(mainTab==="fixed"?c.toggleFixed:{})}} onClick={()=>setMainTab("fixed")}>🏪 固定攤位</button>
            <button style={{...c.toggleBtn,...(mainTab==="temp"?c.toggleTemp:{})}} onClick={()=>setMainTab("temp")}>⚡ 臨時攤位<span style={c.newBadge}>NEW</span></button>
          </div>
          {mainTab==="fixed"&&<>
            <div style={c.filterRow}>{["全部","熟食","飲料","服飾","甜點","飾品"].map(f=><button key={f} style={{...c.chip,...(filterFixed===f?c.chipRed:{})}} onClick={()=>setFilterFixed(f)}>{f}</button>)}</div>
            <div style={c.statsRow}><Stat n="128" l="待租攤位"/><Stat n="43" l="夜市市集"/><Stat n="6" l="縣市"/></div>
            <div style={c.sectionTitle}>長期固定攤位</div>
            {filteredFixed.map(s=><EnhancedCard key={s.id} stall={s} onClick={()=>{setSelected(s);setPhotoIdx(0);setScreen("detail");}}/>)}
          </>}
          {mainTab==="temp"&&<>
            <div style={c.filterRow}>{["全部","臨時代租","每週固定空檔","流動攤位"].map(f=><button key={f} style={{...c.chip,...(filterTemp===f?c.chipPurple:{})}} onClick={()=>setFilterTemp(f)}>{f}</button>)}</div>
            <div style={c.tempTypeRow}>{Object.entries(tempTypeConfig).map(([k,v])=><div key={k} style={{...c.tempTypePill,background:v.bg,color:v.color}}><span style={{fontSize:20}}>{v.icon}</span><span style={{fontSize:11,fontWeight:700}}>{v.label}</span></div>)}</div>
            <div style={c.sectionTitle}>臨時・短期攤位</div>
            {filteredTemp.map(s=><TempEnhancedCard key={s.id} stall={s} onClick={()=>{setSelected(s);setPhotoIdx(0);setScreen("detail");}}/>)}
          </>}
        </div>
      )}

      {/* MAP SCREEN */}
      {/* MAP SCREEN */}
      {screen==="map"&&(
        <div style={{...c.body,paddingLeft:0,paddingRight:0,paddingTop:0}}>
          <div style={c.mapRegionBar}>
            {MAP_REGIONS.map(r=>(
              <button key={r} style={{...c.mapRegionBtn,...(mapRegion===r?c.mapRegionActive:{})}} onClick={()=>{setMapRegion(r);setMapSelected(null);}}>{r}</button>
            ))}
          </div>
          <div style={c.mapLegendRow}>
            {Object.entries(typePinLg).map(([k,v])=>(
              <div key={k} style={c.mapLegendItem}>
                <div style={{...c.mapLegendDot,background:typePin[k]}}/>
                <span style={{fontSize:11,color:"#555"}}>{v}</span>
              </div>
            ))}
          </div>

          {/* ── Detailed County-Coloured SVG Taiwan Map ── */}
          <div style={c.mapWrapper} onClick={()=>setMapSelected(null)}>
            <svg viewBox="0 0 320 625" style={{width:"100%",height:"100%",display:"block"}} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="og2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c8e8f5"/><stop offset="100%" stopColor="#8fc8e0"/>
                </linearGradient>
                <filter id="ds2" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.2)"/>
                </filter>
                <filter id="pg2">
                  <feGaussianBlur stdDeviation="2" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Ocean */}
              <rect width="320" height="625" fill="url(#og2)"/>
              {[70,110,150,190,230,270,310,350,390,430,470,510,555,595].map(y=>(
                <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="10,14"/>
              ))}

              {/* ══ COUNTY POLYGONS — south to north (each county its own color) ══ */}

              {/* 屏東縣 – salmon */}
              <path d="M 105,532 L 138,525 L 160,532 L 168,555 L 164,580 L 148,598 L 128,604 L 108,598 L 92,578 L 90,556 L 96,540 Z" fill="#f5c0a0" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 高雄市 – pink-lavender */}
              <path d="M 36,462 L 56,452 L 88,448 L 120,448 L 148,455 L 167,468 L 170,492 L 165,520 L 150,532 L 128,536 L 105,532 L 90,518 L 68,504 L 48,485 L 36,470 Z" fill="#e5afca" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 臺東縣 – light salmon east */}
              <path d="M 180,378 L 210,372 L 233,378 L 250,396 L 256,422 L 255,452 L 248,480 L 235,510 L 218,536 L 198,552 L 178,556 L 160,544 L 157,520 L 164,494 L 172,466 L 177,438 L 180,412 Z" fill="#f5c8a8" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 臺南市 – yellow */}
              <path d="M 18,400 L 48,394 L 73,392 L 100,394 L 120,402 L 133,418 L 128,440 L 112,455 L 88,462 L 58,462 L 38,450 L 23,432 L 17,414 Z" fill="#f2e048" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 嘉義縣 – salmon */}
              <path d="M 52,355 L 83,348 L 109,352 L 130,364 L 138,382 L 132,402 L 108,412 L 82,414 L 58,406 L 44,390 L 44,372 L 52,360 Z" fill="#f5c8a8" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 嘉義市 – tiny salmon */}
              <path d="M 34,358 L 52,354 L 56,372 L 44,378 L 30,372 Z" fill="#f5b898" stroke="white" strokeWidth="1"/>

              {/* 雲林縣 – salmon */}
              <path d="M 20,318 L 50,312 L 74,314 L 97,320 L 111,333 L 114,350 L 106,362 L 80,365 L 53,360 L 32,350 L 19,336 Z" fill="#f5c8a8" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 彰化縣 – salmon */}
              <path d="M 22,282 L 53,276 L 77,278 L 98,286 L 111,299 L 112,318 L 97,326 L 68,326 L 41,318 L 25,305 L 20,292 Z" fill="#f5c8a8" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 花蓮縣 – large east, salmon */}
              <path d="M 206,128 L 232,122 L 254,130 L 265,156 L 268,184 L 268,214 L 264,246 L 260,278 L 255,309 L 248,342 L 240,368 L 228,388 L 212,394 L 194,386 L 180,368 L 178,340 L 182,310 L 187,282 L 192,252 L 197,222 L 201,194 L 206,168 L 206,146 Z" fill="#f5c8a8" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 南投縣 – central, salmon */}
              <path d="M 104,212 L 128,206 L 150,212 L 163,226 L 172,248 L 178,274 L 178,302 L 172,328 L 158,346 L 138,353 L 116,347 L 103,330 L 97,305 L 95,278 L 98,252 L 104,233 Z" fill="#f5c8a8" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 臺中市 – green */}
              <path d="M 26,230 L 53,224 L 79,224 L 104,224 L 124,230 L 140,243 L 148,259 L 145,278 L 130,291 L 108,295 L 82,293 L 58,285 L 38,272 L 25,256 L 22,240 Z" fill="#88cc88" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 苗栗縣 – salmon */}
              <path d="M 40,178 L 66,172 L 93,172 L 117,175 L 138,185 L 151,201 L 147,219 L 128,229 L 104,231 L 79,227 L 55,219 L 37,205 L 35,190 Z" fill="#f5c8a8" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 新竹縣 – light peach */}
              <path d="M 60,145 L 89,140 L 116,140 L 136,147 L 150,160 L 154,175 L 147,188 L 127,195 L 104,196 L 79,194 L 60,187 L 52,173 L 55,158 Z" fill="#f5d0b0" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 新竹市 – small west coast */}
              <path d="M 38,168 L 60,162 L 63,179 L 53,185 L 36,183 Z" fill="#f5a880" stroke="white" strokeWidth="1"/>

              {/* 宜蘭縣 – east north, salmon-orange */}
              <path d="M 218,75 L 239,68 L 256,77 L 266,98 L 268,123 L 266,152 L 257,172 L 240,181 L 222,180 L 206,170 L 203,150 L 204,126 L 208,103 L 213,87 Z" fill="#f5a880" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 桃園市 – purple */}
              <path d="M 115,96 L 145,88 L 168,87 L 186,93 L 196,108 L 191,125 L 177,135 L 157,143 L 136,147 L 116,141 L 98,133 L 93,119 L 96,107 Z" fill="#b897cc" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 新北市 – orange (base, Taipei drawn on top) */}
              <path d="M 150,34 L 171,28 L 191,28 L 208,35 L 218,51 L 225,69 L 229,87 L 227,100 L 217,107 L 204,109 L 191,109 L 179,111 L 166,119 L 152,126 L 135,129 L 118,125 L 106,117 L 96,106 L 93,93 L 97,79 L 107,64 L 119,52 L 133,42 Z" fill="#f5a060" stroke="white" strokeWidth="1" filter="url(#ds2)"/>

              {/* 臺北市 – yellow */}
              <path d="M 192,72 L 210,68 L 222,79 L 220,97 L 205,104 L 188,104 L 182,91 Z" fill="#f2e448" stroke="white" strokeWidth="1.5"/>

              {/* 基隆市 – teal */}
              <path d="M 208,42 L 226,38 L 240,48 L 241,67 L 228,76 L 214,76 L 207,62 Z" fill="#7bbfaa" stroke="white" strokeWidth="1.5"/>

              {/* ── Offshore islands ── */}
              {/* 澎湖群島 west */}
              <ellipse cx="27" cy="326" rx="10" ry="6" fill="#f5c0a0" stroke="white" strokeWidth="1"/>
              <ellipse cx="18" cy="316" rx="5" ry="3.5" fill="#f5c0a0" stroke="white" strokeWidth="0.8"/>
              <ellipse cx="35" cy="315" rx="4" ry="3" fill="#f5c0a0" stroke="white" strokeWidth="0.8"/>
              <ellipse cx="14" cy="332" rx="3" ry="2" fill="#f5c0a0" stroke="white" strokeWidth="0.8"/>
              <text x="27" y="340" textAnchor="middle" fontSize="7" fill="#444" fontWeight="600">澎湖</text>
              {/* 綠島 */}
              <ellipse cx="272" cy="482" rx="5" ry="4" fill="#f5c0a0" stroke="white" strokeWidth="0.8"/>
              {/* 蘭嶼 */}
              <ellipse cx="280" cy="526" rx="6.5" ry="5.5" fill="#f5c0a0" stroke="white" strokeWidth="0.8"/>
              <text x="280" y="538" textAnchor="middle" fontSize="7" fill="#444" fontWeight="600">蘭嶼</text>
              {/* 小琉球 */}
              <ellipse cx="63" cy="540" rx="4" ry="3" fill="#f5c0a0" stroke="white" strokeWidth="0.8"/>

              {/* ── County / City Labels ── */}
              <text x="226" y="61" textAnchor="middle" fontSize="7.5" fill="#1a5a3a" fontWeight="800">基隆市</text>
              <text x="204" y="89" textAnchor="middle" fontSize="8.5" fill="#5a4400" fontWeight="800">臺北市</text>
              <text x="160" y="76" textAnchor="middle" fontSize="7.5" fill="#5a2800" fontWeight="700">新北市</text>
              <text x="148" y="115" textAnchor="middle" fontSize="7.5" fill="#3a1060" fontWeight="700">桃園市</text>
              <text x="242" y="138" textAnchor="middle" fontSize="7.5" fill="#5a2800" fontWeight="600">宜蘭縣</text>
              <text x="50" y="177" textAnchor="middle" fontSize="7" fill="#444">新竹市</text>
              <text x="112" y="168" textAnchor="middle" fontSize="7.5" fill="#444" fontWeight="600">新竹縣</text>
              <text x="97" y="202" textAnchor="middle" fontSize="7.5" fill="#444" fontWeight="600">苗栗縣</text>
              <text x="87" y="260" textAnchor="middle" fontSize="9" fill="#1a5a1a" fontWeight="800">臺中市</text>
              <text x="136" y="283" textAnchor="middle" fontSize="7.5" fill="#444" fontWeight="600">南投縣</text>
              <text x="232" y="270" textAnchor="middle" fontSize="7.5" fill="#444" fontWeight="600">花蓮縣</text>
              <text x="66" y="304" textAnchor="middle" fontSize="7.5" fill="#444" fontWeight="600">彰化縣</text>
              <text x="63" y="340" textAnchor="middle" fontSize="7.5" fill="#444" fontWeight="600">雲林縣</text>
              <text x="32" y="368" textAnchor="middle" fontSize="6.5" fill="#444">嘉義市</text>
              <text x="97" y="382" textAnchor="middle" fontSize="7.5" fill="#444" fontWeight="600">嘉義縣</text>
              <text x="73" y="430" textAnchor="middle" fontSize="8.5" fill="#4a3600" fontWeight="800">臺南市</text>
              <text x="108" y="492" textAnchor="middle" fontSize="8" fill="#3a1840" fontWeight="800">高雄市</text>
              <text x="210" y="460" textAnchor="middle" fontSize="7.5" fill="#444" fontWeight="600">臺東縣</text>
              <text x="128" y="568" textAnchor="middle" fontSize="7.5" fill="#444" fontWeight="600">屏東縣</text>

              {/* ── Compass Rose ── */}
              <g transform="translate(287,47)">
                <circle cx="0" cy="0" r="15" fill="rgba(255,255,255,0.86)" stroke="rgba(90,140,180,0.45)" strokeWidth="1"/>
                <polygon points="0,-12 2.5,-3 -2.5,-3" fill="#c0392b"/>
                <polygon points="0,12 2.5,3 -2.5,3" fill="#aaa"/>
                <line x1="-11" y1="0" x2="11" y2="0" stroke="#bbb" strokeWidth="0.8"/>
                <text x="0" y="-4" textAnchor="middle" fontSize="9" fill="#c0392b" fontWeight="900">N</text>
                <text x="0" y="13.5" textAnchor="middle" fontSize="6.5" fill="#999">S</text>
              </g>
              {/* Scale bar */}
              <g transform="translate(18,613)">
                <line x1="0" y1="0" x2="50" y2="0" stroke="#555" strokeWidth="1.5"/>
                <line x1="0" y1="-4" x2="0" y2="3" stroke="#555" strokeWidth="1.5"/>
                <line x1="50" y1="-4" x2="50" y2="3" stroke="#555" strokeWidth="1.5"/>
                <text x="25" y="-6" textAnchor="middle" fontSize="7" fill="#555" fontWeight="600">100 km</text>
              </g>

              {/* ── MAP PINS ── */}
              {MAP_PINS.filter(p=>mapRegion==="全部"||p.region===mapRegion).map(pin=>{
                const isSel=mapSelected?.id===pin.id;
                const col=typePin[pin.type];
                return(
                  <g key={pin.id} style={{cursor:"pointer"}} onClick={e=>{e.stopPropagation();setMapSelected(isSel?null:pin);}}>
                    {pin.type==="urgent"&&<circle cx={pin.sx} cy={pin.sy} r="14" fill={col} opacity="0.15" className="mapPulse"/>}
                    {isSel&&<circle cx={pin.sx} cy={pin.sy} r="17" fill="none" stroke={col} strokeWidth="2" opacity="0.6"/>}
                    <circle cx={pin.sx} cy={pin.sy} r="11" fill={isSel?"#fff":col} stroke={isSel?col:"rgba(255,255,255,0.88)"} strokeWidth={isSel?2:1.5} filter={isSel?"url(#pg2)":"url(#ds2)"}/>
                    <polygon points={`${pin.sx-4},${pin.sy+9} ${pin.sx+4},${pin.sy+9} ${pin.sx},${pin.sy+16}`} fill={col}/>
                    <text x={pin.sx} y={pin.sy+4} textAnchor="middle" fontSize="10" dominantBaseline="middle" style={{pointerEvents:"none"}}>{pin.photo}</text>
                  </g>
                );
              })}

              {/* ── SELECTED PIN POPUP ── */}
              {mapSelected&&(()=>{
                const px=Math.min(Math.max(mapSelected.sx,78),248);
                const py=Math.max(mapSelected.sy-18,8);
                return(
                  <foreignObject x={px-82} y={py-120} width="168" height="120" onClick={e=>e.stopPropagation()}>
                    <div style={c.mapPopup}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                        <div style={{fontSize:11,fontWeight:800,color:"#222",lineHeight:1.3,maxWidth:132}}>{mapSelected.name}</div>
                        <button style={{background:"none",border:"none",fontSize:13,color:"#ccc",cursor:"pointer",padding:"0 0 0 4px"}} onClick={()=>setMapSelected(null)}>✕</button>
                      </div>
                      <div style={{display:"flex",gap:4,marginBottom:6,flexWrap:"wrap"}}>
                        <span style={{...c.mapPinBadge,background:typePin[mapSelected.type]+"22",color:typePin[mapSelected.type],fontSize:9}}>{typePinLg[mapSelected.type]}</span>
                        <span style={{...c.trafficBadge,background:trafficColor(mapSelected.traffic)+"22",color:trafficColor(mapSelected.traffic),fontSize:9}}>{mapSelected.traffic}人流</span>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{fontSize:14,fontWeight:900,color:"#c0392b"}}>${mapSelected.rent.toLocaleString()}<span style={{fontSize:9,color:"#aaa",fontWeight:400}}>/{mapSelected.rentUnit}</span></div>
                        <button style={c.mapPopupBtn} onClick={()=>{
                          const full=[...FIXED_STALLS,...TEMP_STALLS].find(s=>s.id===mapSelected.id)||mapSelected;
                          setSelected({...full,...mapSelected,photos:full.photos||[mapSelected.photo]});
                          setPhotoIdx(0);setScreen("detail");
                        }}>詳情→</button>
                      </div>
                    </div>
                  </foreignObject>
                );
              })()}
            </svg>
          </div>

          {/* Stats bar */}
          <div style={c.mapStatsRow}>
            <div style={c.mapStatItem}><div style={{...c.mapStatDot,background:"#c0392b"}}/><span>{MAP_PINS.filter(p=>p.type==="fixed").length} 固定</span></div>
            <div style={c.mapStatItem}><div style={{...c.mapStatDot,background:"#8b5cf6"}}/><span>{MAP_PINS.filter(p=>p.type==="temp").length} 臨時</span></div>
            <div style={c.mapStatItem}><div style={{...c.mapStatDot,background:"#f97316"}}/><span>{MAP_PINS.filter(p=>p.type==="mobile").length} 流動</span></div>
            <div style={c.mapStatItem}><div style={{...c.mapStatDot,background:"#ef4444"}}/><span>{MAP_PINS.filter(p=>p.type==="urgent").length} 急單</span></div>
            <div style={c.mapStatItem}><span style={{fontSize:11,color:"#aaa"}}>共 {MAP_PINS.filter(p=>mapRegion==="全部"||p.region===mapRegion).length} 個</span></div>
          </div>

          {/* List */}
          <div style={{padding:"0 16px 40px"}}>
            <div style={{...c.sectionTitle,marginTop:14}}>
              {mapRegion==="全部"?"全台攤位列表":mapRegion+" 攤位"}（{MAP_PINS.filter(p=>mapRegion==="全部"||p.region===mapRegion).length}個）
            </div>
            {MAP_PINS.filter(p=>mapRegion==="全部"||p.region===mapRegion).map(pin=>(
              <div key={pin.id} style={{...c.card,cursor:"pointer"}} className="card-hover"
                onClick={()=>{
                  const full=[...FIXED_STALLS,...TEMP_STALLS].find(s=>s.id===pin.id)||pin;
                  setSelected({...full,...pin,photos:full.photos||[pin.photo]});
                  setPhotoIdx(0);setScreen("detail");
                }}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{...c.cardIcon,background:typePin[pin.type]+"18",fontSize:22}}>{pin.photo}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                      <span style={{fontSize:14,fontWeight:700,color:"#222"}}>{pin.name}</span>
                      <span style={{...c.mapPinBadge,background:typePin[pin.type]+"22",color:typePin[pin.type]}}>{typePinLg[pin.type]}</span>
                    </div>
                    <div style={{fontSize:12,color:"#888"}}>📍 {pin.market} ・ {pin.region}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={c.cardRent}>${pin.rent.toLocaleString()}<span style={c.rentUnit}>/{pin.rentUnit}</span></div>
                    <div style={{...c.trafficBadge,background:trafficColor(pin.traffic)+"22",color:trafficColor(pin.traffic),marginTop:4}}>{pin.traffic}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* ── CONSUMER ZONE ── */}
      {screen==="consumer"&&(
        <div style={{...c.body,paddingTop:0,paddingLeft:0,paddingRight:0}}>
          <div style={c.consumerHero}>
            <div style={{fontSize:36,marginBottom:6}}>🛍️</div>
            <div style={{fontSize:20,fontWeight:900,color:"#fff",letterSpacing:0.5}}>消費者專區</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",marginTop:4}}>逛攤位・找美食・享優惠</div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              {[[AD_PRODUCTS.length,"攤位上架"],[3,"近期活動"],[6,"縣市夜市"]].map(([n,l])=>(
                <div key={l} style={c.consumerStat}><div style={{fontSize:18,fontWeight:900}}>{n}</div><div style={{fontSize:10}}>{l}</div></div>
              ))}
            </div>
          </div>

          <div style={{padding:"14px 16px 40px"}}>
            <div style={c.searchBar}><span style={{fontSize:18}}>🔍</span><input style={c.searchInput} placeholder="搜尋美食、商品、攤位..."/></div>

            {/* Today's promos horizontal scroll */}
            <div style={{...c.sectionTitle,marginBottom:10}}>🔥 今日特惠</div>
            <div style={c.promoScroll}>
              {AD_PRODUCTS.filter(p=>p.isPromo).map(p=>(
                <div key={p.id} style={c.promoCard} onClick={()=>setShowAdDetail(p)}>
                  <div style={{fontSize:32,marginBottom:6}}>{p.photo}</div>
                  <div style={{fontSize:12,fontWeight:800,color:"#fff",lineHeight:1.3}}>{p.productName}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.8)",marginTop:2}}>{p.stallName}</div>
                  <div style={{display:"flex",gap:4,marginTop:5,flexWrap:"wrap"}}>
                    {p.tags.map(t=><span key={t} style={c.promoTag}>{t}</span>)}
                  </div>
                  <div style={{fontSize:15,fontWeight:900,color:"#ffe066",marginTop:6}}>
                    ${p.price}
                    {p.originalPrice&&<span style={{fontSize:10,textDecoration:"line-through",color:"rgba(255,255,255,0.55)",marginLeft:4}}>${p.originalPrice}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Category + grid */}
            <div style={c.sectionTitle}>🍽 全部商品</div>
            <div style={c.filterRow}>
              {CONSUMER_CATS.map(cat=>(
                <button key={cat} style={{...c.chip,...(consumerCat===cat?c.chipConsumer:{})}} onClick={()=>setConsumerCat(cat)}>{cat}</button>
              ))}
            </div>
            <div style={c.adGrid}>
              {AD_PRODUCTS.filter(p=>consumerCat==="全部"||p.category===consumerCat).map(ad=>{
                const liked=likedAds.includes(ad.id);
                return(
                  <div key={ad.id} style={c.adCard} onClick={()=>setShowAdDetail(ad)}>
                    {ad.isPromo&&<div style={c.adPromoBadge}>特惠</div>}
                    <div style={c.adPhoto}>{ad.photo}</div>
                    <div style={{padding:"10px"}}>
                      <div style={{fontSize:13,fontWeight:800,color:"#222",marginBottom:2,lineHeight:1.3}}>{ad.productName}</div>
                      <div style={{fontSize:11,color:"#c0392b",marginBottom:5}}>{ad.stallName}</div>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <div>
                          <span style={{fontSize:15,fontWeight:900,color:"#c0392b"}}>${ad.price}</span>
                          {ad.originalPrice&&<span style={{fontSize:10,color:"#ccc",textDecoration:"line-through",marginLeft:4}}>${ad.originalPrice}</span>}
                        </div>
                        <button style={{...c.adLikeBtn,...(liked?c.adLikeBtnOn:{})}} onClick={e=>{e.stopPropagation();setLikedAds(p=>liked?p.filter(x=>x!==ad.id):[...p,ad.id]);}}>
                          {liked?"❤️":"🤍"} {ad.likes+(liked?1:0)}
                        </button>
                      </div>
                      <div style={{display:"flex",gap:4,marginTop:6,flexWrap:"wrap"}}>
                        {ad.tags.slice(0,2).map(t=><span key={t} style={{...c.tag,fontSize:10,padding:"2px 7px"}}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Events */}
            <div style={{...c.sectionTitle,marginTop:4}}>🎉 近期夜市活動</div>
            {EVENTS.map(ev=>(
              <div key={ev.id} style={c.eventCard}>
                <div style={c.eventPhoto}>{ev.photo}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:800,color:"#222",marginBottom:3}}>{ev.title}</div>
                  <div style={{fontSize:11,color:"#c0392b",marginBottom:2}}>📍 {ev.market} ・ 🗓 {ev.date}</div>
                  <div style={{fontSize:12,color:"#555",lineHeight:1.5,marginBottom:4}}>{ev.desc}</div>
                  <div style={{fontSize:11,color:"#aaa"}}>👥 {ev.attendees} 人感興趣</div>
                </div>
                <button style={c.eventJoinBtn}>參加</button>
              </div>
            ))}

            {/* QR CTA */}
            <div style={c.qrCtaBox} onClick={()=>setShowQR(true)}>
              <div style={{fontSize:28,marginBottom:6}}>📲</div>
              <div style={{fontSize:15,fontWeight:800,color:"#222",marginBottom:4}}>分享攤位通給朋友</div>
              <div style={{fontSize:12,color:"#888",marginBottom:12}}>掃描 QR Code 下載 APP，一起逛夜市！</div>
              <QRCodeSVG size={80}/>
              <div style={{fontSize:12,color:"#c0392b",marginTop:8,fontWeight:700}}>點擊查看完整 QR Code →</div>
            </div>
          </div>

          {/* Ad Detail Modal */}
          {showAdDetail&&(
            <div style={c.overlay} onClick={()=>setShowAdDetail(null)}>
              <div style={{...c.modal,maxHeight:"85vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
                <div style={{textAlign:"center",padding:"10px 0 16px"}}>
                  <div style={{fontSize:64,marginBottom:8}}>{showAdDetail.photo}</div>
                  <div style={{fontSize:18,fontWeight:900,color:"#222"}}>{showAdDetail.productName}</div>
                  <div style={{fontSize:13,color:"#c0392b",marginTop:4}}>📍 {showAdDetail.stallName}</div>
                </div>
                <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
                  {showAdDetail.tags.map(t=><span key={t} style={c.tag}>{t}</span>)}
                  <span style={{...c.tag,background:"#f0fdf4",color:"#16a34a"}}>👁 {showAdDetail.views} 人看過</span>
                </div>
                <div style={{fontSize:14,color:"#555",lineHeight:1.7,marginBottom:16}}>{showAdDetail.desc}</div>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                  <div style={{fontSize:28,fontWeight:900,color:"#c0392b"}}>${showAdDetail.price}</div>
                  {showAdDetail.originalPrice&&<><div style={{fontSize:16,color:"#ccc",textDecoration:"line-through"}}>${showAdDetail.originalPrice}</div><div style={{background:"#fef2f2",color:"#ef4444",fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:20}}>省 ${showAdDetail.originalPrice-showAdDetail.price}</div></>}
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button style={{...c.primaryBtn,flex:1,marginTop:0}} onClick={()=>{setShowAdDetail(null);setNavTab("msg");setScreen("messages");}}>💬 聯絡攤主</button>
                  <button style={{...c.primaryBtn,flex:1,marginTop:0,background:"#fff",color:"#c0392b",border:"1.5px solid #c0392b"}} onClick={()=>{const l=likedAds.includes(showAdDetail.id);setLikedAds(p=>l?p.filter(x=>x!==showAdDetail.id):[...p,showAdDetail.id]);}}>
                    {likedAds.includes(showAdDetail.id)?"❤️ 已收藏":"🤍 收藏"}
                  </button>
                </div>
                <button style={{width:"100%",background:"none",border:"none",color:"#aaa",fontSize:13,padding:"12px",cursor:"pointer"}} onClick={()=>setShowAdDetail(null)}>關閉</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── QR CODE MODAL ── */}
      {showQR&&(
        <div style={c.overlay} onClick={()=>setShowQR(false)}>
          <div style={{...c.modal,paddingBottom:40}} onClick={e=>e.stopPropagation()}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:18,fontWeight:900,color:"#222",marginBottom:4}}>📲 攤位通 App 下載</div>
              <div style={{fontSize:13,color:"#888",marginBottom:20}}>掃描 QR Code 或分享連結</div>
              <div style={{display:"inline-block",padding:16,background:"#fff",borderRadius:16,boxShadow:"0 4px 20px rgba(0,0,0,0.12)",marginBottom:12}}>
                <QRCodeSVG size={200}/>
              </div>
              <div style={{fontSize:12,color:"#aaa",marginBottom:16}}>攤位通 Beta 版 · 免費下載</div>
              <div style={{display:"flex",alignItems:"center",gap:12,background:"#f9f9f9",borderRadius:12,padding:"14px",marginBottom:16,textAlign:"left"}}>
                <div style={{fontSize:36}}>🏮</div>
                <div>
                  <div style={{fontWeight:800,fontSize:15}}>攤位通 TaiwanStallHub</div>
                  <div style={{fontSize:12,color:"#888"}}>全台最大攤位媒合平台</div>
                  <div style={{fontSize:11,color:"#22c55e",marginTop:2}}>✅ 注冊即享全功能 · 測試版免費</div>
                </div>
              </div>
              <div style={{fontSize:13,fontWeight:700,color:"#333",marginBottom:10,textAlign:"left"}}>一鍵分享</div>
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                {[["💚","LINE","#00c300"],["💙","FB","#1877f2"],["🐦","Twitter","#1da1f2"],["🔗","複製","#555"]].map(([icon,label,color])=>(
                  <button key={label} style={{flex:1,background:"#f9f9f9",border:"1.5px solid #e8ddd5",borderRadius:12,padding:"10px 4px",fontSize:11,fontWeight:700,color,cursor:"pointer"}}>
                    <div style={{fontSize:18,marginBottom:2}}>{icon}</div>{label}
                  </button>
                ))}
              </div>
              <div style={{background:"#fef9e7",border:"1.5px solid #fde68a",borderRadius:12,padding:"12px",fontSize:12,color:"#92400e",textAlign:"left",lineHeight:1.7,marginBottom:16}}>
                📧 <strong>Email 寄送說明</strong><br/>
                請截圖此 QR Code，自行寄送至：<br/>
                <strong style={{color:"#c0392b"}}>a0976775683@gmail.com</strong><br/>
                <span style={{fontSize:11,color:"#b45309"}}>（系統無法直接代寄，請手動截圖儲存）</span>
              </div>
              <button style={c.primaryBtn} onClick={()=>setShowQR(false)}>關閉</button>
            </div>
          </div>
        </div>
      )}

      {/* MESSAGES SCREEN */}
      {screen==="messages"&&!msgConvId&&(
        <div style={c.body}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={c.sectionTitle}>💬 站內訊息</div>
            {totalUnread>0&&<div style={c.unreadBadgeLg}>{totalUnread} 則未讀</div>}
          </div>
          {conversations.map(conv=>(
            <div key={conv.id} style={c.convCard} className="card-hover" onClick={()=>{
              setMsgConvId(conv.id);
              setConversations(p=>p.map(c=>c.id===conv.id?{...c,unread:0}:c));
            }}>
              <div style={c.convAvatar}>{conv.ownerPhoto}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                  <div style={c.convName}>{conv.ownerName}</div>
                  <div style={c.convTime}>{conv.lastTime}</div>
                </div>
                <div style={c.convStall}>{conv.stallName}</div>
                <div style={c.convLast}>{conv.lastMsg}</div>
              </div>
              {conv.unread>0&&<div style={c.unreadDot}>{conv.unread}</div>}
            </div>
          ))}
          {conversations.length===0&&(
            <div style={{textAlign:"center",padding:"60px 20px",color:"#aaa"}}>
              <div style={{fontSize:48,marginBottom:12}}>💬</div>
              <div style={{fontSize:15,fontWeight:700,marginBottom:6}}>尚無訊息</div>
              <div style={{fontSize:13}}>查看攤位詳情後即可聯絡出租方</div>
            </div>
          )}
        </div>
      )}

      {/* CHAT SCREEN */}
      {screen==="messages"&&msgConvId&&(()=>{
        const conv = conversations.find(c=>c.id===msgConvId);
        if (!conv) return null;
        return (
          <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 116px)"}}>
            {/* Chat header */}
            <div style={c.chatHeader}>
              <button style={c.chatBackBtn} onClick={()=>setMsgConvId(null)}>←</button>
              <div style={c.chatAvatar}>{conv.ownerPhoto}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:800,color:"#222"}}>{conv.ownerName}</div>
                <div style={{fontSize:11,color:"#888"}}>{conv.stallName}</div>
              </div>
              <div style={c.chatOnline}>● 在線</div>
            </div>

            {/* Messages */}
            <div style={c.chatBody}>
              {/* Date separator */}
              <div style={c.chatDateSep}>今天</div>

              {conv.messages.map(msg=>(
                <div key={msg.id} style={{...c.msgRow,...(msg.from==="me"?c.msgRowMe:{})}}>
                  {msg.from==="other"&&<div style={c.msgAvatar}>{conv.ownerPhoto}</div>}
                  <div style={{maxWidth:"72%"}}>
                    <div style={{...c.msgBubble,...(msg.from==="me"?c.msgBubbleMe:c.msgBubbleOther)}}>
                      {msg.text}
                    </div>
                    <div style={{...c.msgTime,...(msg.from==="me"?{textAlign:"right"}:{})}}>{msg.time}</div>
                  </div>
                </div>
              ))}

              {/* Quick reply suggestions */}
              <div style={c.quickReplyRow}>
                {["好的，我有興趣","請問什麼時候可以看攤？","謝謝，我再考慮一下"].map(q=>(
                  <button key={q} style={c.quickReplyBtn} onClick={()=>{setMsgInput(q);}}>{q}</button>
                ))}
              </div>
            </div>

            {/* Input bar */}
            <div style={c.chatInputBar}>
              <button style={c.chatInputExtra}>＋</button>
              <input
                style={c.chatInput}
                placeholder="輸入訊息..."
                value={msgInput}
                onChange={e=>setMsgInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&sendMessage(conv.id)}
              />
              <button style={{...c.chatSendBtn,...(msgInput.trim()?c.chatSendBtnActive:{})}} onClick={()=>sendMessage(conv.id)}>
                ➤
              </button>
            </div>
          </div>
        );
      })()}

        <div style={c.body}>
          <div style={c.urgentHeader}><div><div style={c.urgentTitle}>🚨 急單搶租</div><div style={c.urgentSub}>攤主臨時有事，空出攤位急找人！</div></div>{isMember&&<button style={c.postBtn} onClick={()=>setShowPostForm(true)}>＋ 發急單</button>}</div>
          <div style={c.howRow}>{[["📢","攤主發急單"],["🔔","系統推播"],["⚡","業者搶租"],["✅","立即媒合"]].map(([icon,label])=><div key={label} style={c.howItem}><div style={{fontSize:20}}>{icon}</div><div style={{fontSize:10,color:"#666",marginTop:3,textAlign:"center"}}>{label}</div></div>)}</div>
          <div style={c.sectionTitle}>目前急單 <span style={{color:"#ef4444"}}>({urgentCount})</span></div>
          {urgentList.map(u=>{
            const t=urgentTimers[u.id]||0,pct=t/u.expiresIn,expired=t<=0;
            return(<div key={u.id} style={{...c.urgentCard,...(expired||u.grabbed?c.urgentCardDim:{})}} onClick={()=>!expired&&!u.grabbed&&(setSelected({...u,isUrgent:true,rentUnit:"天",photos:[u.photo]}),setPhotoIdx(0),setScreen("detail"))}>
              {u.grabbed&&<div style={c.grabbedRibbon}>已被搶租</div>}
              {expired&&!u.grabbed&&<div style={{...c.grabbedRibbon,background:"#6b7280"}}>已結束</div>}
              <div style={c.urgentCardTop}><div style={c.urgentIcon}>{u.photo}</div>
                <div style={{flex:1}}><div style={c.cardName}>{u.name}</div><div style={c.cardLoc}>📍 {u.location}</div><div style={{display:"flex",gap:5,marginTop:4}}>{u.tags.map(t2=><span key={t2} style={c.tag}>{t2}</span>)}</div></div>
                <div style={{textAlign:"right"}}><div style={{...c.cardRent,color:"#dc2626"}}>${u.rent}<span style={c.rentUnit}>/天</span></div><div style={{...c.trafficBadge,background:trafficColor(u.traffic)+"22",color:trafficColor(u.traffic)}}>{u.traffic}人流</div></div>
              </div>
              <div style={c.countdownRow}><div style={c.countdownBarWrap}><div style={{...c.countdownBar,width:`${Math.max(0,pct*100)}%`,background:pct>.4?"#22c55e":pct>.15?"#f97316":"#ef4444"}}/></div><div style={{...c.countdownText,color:pct>.4?"#22c55e":pct>.15?"#f97316":"#ef4444"}}>{expired?"已到期":`⏱ ${fmtTime(t)}`}</div></div>
              <div style={c.urgentMeta}><span style={{fontSize:12,color:"#aaa"}}>👁 {u.viewers} 人正在看</span><span style={{fontSize:12,color:"#aaa"}}>{u.postedMins} 分鐘前</span>{!expired&&!u.grabbed&&<button style={{...c.grabBtn,...(u.locked&&!isMember?c.grabBtnLocked:{})}} onClick={e=>{e.stopPropagation();handleGrab(u.id);}}>{u.locked&&!isMember?"🔒 解鎖搶租":"⚡ 立即搶租"}</button>}</div>
            </div>);
          })}
          {!isMember&&<div style={c.urgentGateBanner}><div style={{fontSize:14,fontWeight:700,color:"#92400e"}}>🔔 成為會員，第一時間收到急單推播通知</div><button style={{...c.grabBtn,marginTop:8}} onClick={()=>{setPayRole("renter");setPayStep(1);setShowPayment(true);}}>立即加入</button></div>}
        </div>
      )}

      {/* DETAIL ─ enhanced */}
      {screen==="detail"&&selected&&(
        <div style={{...c.body,paddingTop:0,paddingLeft:0,paddingRight:0}}>
          {/* Photo gallery */}
          <div style={c.galleryBox}>
            <div style={c.galleryMain}>{(selected.photos||[selected.photo||"🏮"])[photoIdx]}</div>
            <button style={c.galBackBtn} onClick={()=>setScreen(selected.isUrgent?"urgent":"home")}>← 返回</button>
            <div style={c.galleryDots}>{(selected.photos||[selected.photo||"🏮"]).map((_,i)=><div key={i} style={{...c.galDot,...(i===photoIdx?c.galDotActive:{})}} onClick={()=>setPhotoIdx(i)}/>)}</div>
            {(selected.photos||[]).length>1&&<>
              <button style={{...c.galArrow,left:12}} onClick={()=>setPhotoIdx(p=>Math.max(0,p-1))}>‹</button>
              <button style={{...c.galArrow,right:12}} onClick={()=>setPhotoIdx(p=>Math.min((selected.photos||[]).length-1,p+1))}>›</button>
            </>}
            <div style={c.galleryThumbRow}>{(selected.photos||[selected.photo||"🏮"]).map((ph,i)=><div key={i} style={{...c.galleryThumb,...(i===photoIdx?c.galleryThumbActive:{})}} onClick={()=>setPhotoIdx(i)}>{ph}</div>)}</div>
          </div>

          <div style={{padding:"16px 16px 40px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div><div style={c.detailName}>{selected.name}</div><div style={{color:"#888",fontSize:13,marginTop:2}}>{selected.market} ・ {selected.location}</div></div>
              {selected.isUrgent&&<div style={c.urgentDetailBadge}>🚨 急單</div>}
              {selected.tempType&&<div style={{...c.miniBadge,background:tempTypeConfig[selected.tempType].bg,color:tempTypeConfig[selected.tempType].color,padding:"4px 10px",fontSize:12}}>{tempTypeConfig[selected.tempType].icon} {tempTypeConfig[selected.tempType].label}</div>}
            </div>

            {/* Core specs grid */}
            <div style={c.specsGrid}>
              <SpecBox icon="📐" label="面積" val={`${selected.sizeW||"—"}×${selected.sizeD||"—"} 坪`}/>
              <SpecBox icon="💰" label="租金" val={`$${(selected.rent||0).toLocaleString()}/${selected.rentUnit||"月"}`} color="#c0392b"/>
              <SpecBox icon="🔑" label="押金" val={selected.deposit?`$${selected.deposit.toLocaleString()}`:"免押金"} />
              <SpecBox icon="👣" label="人流" val={selected.traffic||"—"} color={trafficColor(selected.traffic||"中")}/>
              {selected.stallType&&<SpecBox icon="🏠" label="攤型" val={selected.stallType}/>}
              {selected.ceilingH&&<SpecBox icon="📏" label="淨高" val={selected.ceilingH}/>}
              {selected.floorType&&<SpecBox icon="🪵" label="地板" val={selected.floorType}/>}
              {selected.nearMRT&&<SpecBox icon="🚇" label="交通" val={selected.nearMRT} wide/>}
            </div>

            {/* Business hours */}
            {selected.businessHours&&(
              <div style={c.infoCard}>
                <div style={c.infoCardTitle}>🕐 營業時段</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{fontSize:20,fontWeight:800,color:"#c0392b"}}>{selected.businessHours.open} – {selected.businessHours.close}</div>
                  <div style={{display:"flex",gap:4}}>{["日","一","二","三","四","五","六"].map(d=><div key={d} style={{width:28,height:28,borderRadius:14,background:selected.businessHours.days.includes(d)?"#c0392b":"#f3f4f6",color:selected.businessHours.days.includes(d)?"#fff":"#aaa",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{d}</div>)}</div>
                </div>
              </div>
            )}

            {/* Facilities */}
            {selected.facilities&&(
              <div style={c.infoCard}>
                <div style={c.infoCardTitle}>⚙️ 設施配備</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
                  {selected.facilities.water&&<div style={{...c.facilityTag,background:"#eff6ff",color:"#2563eb"}}><span>💧</span> {waterLabel[selected.facilities.water]}</div>}
                  {selected.facilities.electricity&&<div style={{...c.facilityTag,background:"#fefce8",color:"#ca8a04"}}><span>⚡</span> {elecLabel[selected.facilities.electricity]}</div>}
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {Object.entries(facilityLabels).filter(([k])=>k!=="water"&&k!=="electricity").map(([k,label])=>(
                    <div key={k} style={{...c.facilityChip,...(selected.facilities[k]?c.facilityChipOn:c.facilityChipOff)}}>
                      {selected.facilities[k]?"✓":"✗"} {label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Temp info */}
            {selected.tempType&&(
              <div style={{...c.infoCard,borderLeft:"4px solid "+tempTypeConfig[selected.tempType].color}}>
                <div style={c.infoCardTitle}>📅 出租期間</div>
                <div style={c.availRow}><span>⏱</span><span style={c.aLabel}>可用時間</span><span style={c.aVal}>{selected.available}</span></div>
                {selected.recurringOff&&<div style={c.availRow}><span>🔁</span><span style={c.aLabel}>固定週期</span><span style={c.aVal}>{selected.recurringOff}</span></div>}
                {selected.startDate&&selected.startDate!=="長期"&&<div style={c.availRow}><span>🗓</span><span style={c.aLabel}>日期</span><span style={c.aVal}>{selected.startDate} ～ {selected.endDate}</span></div>}
                <div style={{...c.urgBar,background:urgencyConfig[selected.urgency]?.bg,color:urgencyConfig[selected.urgency]?.color}}>● {urgencyConfig[selected.urgency]?.label}刊登</div>
              </div>
            )}

            <div style={{marginBottom:14}}><div style={c.sectionTitle}>攤位描述</div><div style={c.descBox}>{selected.desc}</div></div>
            <div style={{marginBottom:14}}><div style={c.sectionTitle}>適合類型</div><div style={c.tagRow}>{selected.tags?.map(t=><span key={t} style={c.tag}>{t}</span>)}</div></div>

            <div style={c.contactBox}>
              <div style={{fontSize:15,fontWeight:700,marginBottom:14}}>聯絡出租方</div>
              {isMember||!selected.locked?(
                <div>
                  <div style={c.ownerRow}><div style={c.ownerAva}>👤</div><div><div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{selected.owner}</div><div style={{fontSize:13,color:"#666"}}>📞 {selected.ownerPhone||"0912-***-456"}</div><div style={{fontSize:13,color:"#666"}}>✉️ owner@stallhub.com</div></div></div>
                  <button style={{...c.contactBtn,...(selected.isUrgent?{background:"linear-gradient(135deg,#dc2626,#ef4444)"}:{})}} onClick={()=>{
                    if (!selected.isUrgent){
                      const existing = conversations.find(c=>c.stallName===selected.name);
                      if (!existing){
                        setConversations(p=>[{id:Date.now(),stallName:selected.name,ownerName:selected.owner,ownerPhoto:selected.photos?.[0]||"🏮",lastMsg:"",lastTime:"方才",unread:0,messages:[]}, ...p]);
                      }
                      setMsgConvId(existing?.id || null);
                      setNavTab("msg"); setScreen("messages");
                      setTimeout(()=>{ if (!existing) setMsgConvId(c=>c||conversations[0]?.id); },100);
                    }
                  }}>{selected.isUrgent?"⚡ 立即搶租":"💬 傳送訊息聯絡"}</button>
                </div>
              ):(
                <div style={{textAlign:"center",padding:"10px 0"}}>
                  <div style={{fontSize:38,marginBottom:8}}>🔒</div>
                  <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>加入會員即可查看聯絡資訊</div>
                  <div style={{color:"#aaa",fontSize:13,marginBottom:14}}>租用方會員 $000/月（測試版免費）</div>
                  <button style={c.upgradeBtn} onClick={()=>{setPayRole("renter");setPayStep(1);setShowPayment(true);}}>立即解鎖</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MY LIST */}
      {screen==="mylist"&&(
        <div style={c.body}>
          {!isMember?(
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div style={{fontSize:48,marginBottom:12}}>🏪</div>
              <div style={{fontSize:20,fontWeight:800,marginBottom:8}}>出租方會員專區</div>
              <div style={{fontSize:14,color:"#777",lineHeight:1.6,marginBottom:20}}>刊登固定攤位、臨時空檔，或發急單讓業者搶租。</div>
              <div style={c.planCard}>
                <div style={{fontSize:16,fontWeight:700,marginBottom:6}}>出租方會員</div>
                <div style={{fontSize:32,fontWeight:900,color:"#c0392b",marginBottom:12}}>$000<span style={{fontSize:14,fontWeight:400,color:"#aaa"}}>/月（測試版免費）</span></div>
                {["刊登固定攤位（最多5個）","刊登臨時空檔・流動攤位","🚨 發急單・即時媒合","設定每週固定休息日","優先曝光排序"].map(f=><div key={f} style={{fontSize:13,color:"#555",marginBottom:6}}>✅ {f}</div>)}
              </div>
              <button style={c.upgradeBtn} onClick={()=>{setPayRole("owner");setPayStep(1);setShowPayment(true);}}>加入出租方會員</button>
            </div>
          ):(
            <div>
              <div style={c.sectionTitle}>固定攤位</div>
              <div style={c.myCard}><span style={{fontSize:24}}>🏮</span><div style={{flex:1,marginLeft:12}}><div style={c.cardName}>饒河街夜市 A-12號</div><div style={{color:"#22c55e",fontSize:12}}>● 刊登中</div></div><div style={c.cardRent}>$18,000</div></div>
              <button style={{...c.myCard,background:"#fff",border:"1.5px dashed #c0392b",cursor:"pointer",justifyContent:"center",gap:8,color:"#c0392b",fontWeight:700}} onClick={()=>{setListFormType("fixed");setShowListForm(true);}}>＋ 新增固定攤位</button>
              <div style={{marginTop:16,...{}}}/><div style={c.sectionTitle}>臨時空檔</div>
              <div style={{...c.myCard,border:"1.5px dashed #8b5cf6",cursor:"pointer"}} onClick={()=>{setListFormType("temp");setShowListForm(true);}}>
                <span style={{fontSize:24}}>⚡</span><div style={{flex:1,marginLeft:12}}><div style={c.cardName}>新增臨時空檔或流動攤位</div><div style={{color:"#8b5cf6",fontSize:12}}>設定代租、每週空檔或流動攤位</div></div><span style={{color:"#8b5cf6",fontSize:22,fontWeight:700}}>＋</span>
              </div>
              <div style={c.sectionTitle}>急單管理</div>
              <div style={{...c.myCard,border:"1.5px dashed #ef4444",cursor:"pointer"}} onClick={()=>setShowPostForm(true)}>
                <span style={{fontSize:24}}>🚨</span><div style={{flex:1,marginLeft:12}}><div style={c.cardName}>發出急單</div><div style={{color:"#ef4444",fontSize:12}}>臨時空出攤位，立刻廣播給附近業者</div></div><span style={{color:"#ef4444",fontSize:22,fontWeight:700}}>＋</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PROFILE */}
      {screen==="profile"&&(
        <div style={c.body}>
          <div style={c.profileHero}>
            <div style={c.profileAvatar}>{user?.name?.[0]||"我"}</div>
            <div style={c.profileName}>{user?.name}</div>
            <div style={c.profileRole}>{user?.role==="owner"?"🏪 出租方":user?.role==="guest"?"👤 訪客":"🔍 租用方"}</div>
            {isMember&&<div style={c.memberBadge2}>⭐ 付費會員</div>}
            {user?.accountType==="trial"&&<div style={{...c.memberBadge2,background:"#eff6ff",color:"#1d4ed8",marginTop:6}}>🧪 試用中・到期：{user?.trialExpiry}</div>}
          </div>
          {user?.accountType==="trial"&&(
            <div style={c.trialWarningBox}>
              <div style={{fontSize:13,fontWeight:700,color:"#1d4ed8",marginBottom:4}}>🧪 試用帳號狀態</div>
              <div style={{fontSize:12,color:"#555",lineHeight:1.6}}>試用期限至 <strong>{user?.trialExpiry}</strong> 到期<br/>到期後帳號自動停用，升級可保留所有資料</div>
              <button style={{...c.primaryBtn,marginTop:10,padding:"10px",fontSize:13}} onClick={()=>{setPayRole(user?.role||"renter");setPayStep(1);setShowPayment(true);}}>立即升級正式會員</button>
            </div>
          )}
          <div style={c.profileCard}>
            {[["📱","手機號碼",user?.phone||"—"],["✉️","電子郵件",user?.email||"—"],["📅","加入日期",user?.joinDate||"—"],["🏷","帳號類型",user?.accountType==="trial"?"試用帳號（30天）":"正式帳號"]].map(([icon,label,val])=><div key={label} style={c.profileRow}><span style={c.profileIcon}>{icon}</span><span style={c.profileLabel}>{label}</span><span style={c.profileVal}>{val}</span></div>)}
            {user?.invoiceBarcode&&<div style={c.profileRow}><span style={c.profileIcon}>🧾</span><span style={c.profileLabel}>發票手機條碼</span><span style={c.profileVal}>{user.invoiceBarcode}</span></div>}
          </div>
          <div style={c.sectionTitle}>帳號設定</div>
          <div style={c.profileCard}>
            {[["🔔","推播通知設定"],["🔒","變更密碼"],["📋","查看我的租賃紀錄"]].map(([icon,label])=><div key={label} style={c.menuRow}><span style={c.profileIcon}>{icon}</span><span style={{flex:1,fontSize:14,color:"#333"}}>{label}</span><span style={{color:"#aaa"}}>›</span></div>)}
          </div>
          <div style={c.sectionTitle}>法律文件</div>
          <div style={c.profileCard}>
            <div style={c.menuRow} onClick={()=>setShowTermsModal(true)}><span style={c.profileIcon}>📜</span><span style={{flex:1,fontSize:14,color:"#333"}}>使用條款</span><span style={{color:"#aaa"}}>›</span></div>
            <div style={c.menuRow} onClick={()=>setShowPrivacyModal(true)}><span style={c.profileIcon}>🔐</span><span style={{flex:1,fontSize:14,color:"#333"}}>隱私權政策</span><span style={{color:"#aaa"}}>›</span></div>
          </div>
          <div style={{...c.profileCard,marginBottom:8}} onClick={()=>setShowQR(true)}>
            <div style={{...c.menuRow,borderBottom:"none"}}>
              <span style={c.profileIcon}>📲</span>
              <div style={{flex:1}}>
                <div style={{fontSize:14,color:"#333",fontWeight:700}}>下載 QR Code</div>
                <div style={{fontSize:11,color:"#aaa"}}>分享給朋友一起使用攤位通</div>
              </div>
              <span style={{color:"#c0392b",fontSize:13,fontWeight:700}}>掃碼 →</span>
            </div>
          </div>
          <button style={c.logoutBtn} onClick={handleLogout}>登出帳號</button>
        </div>
      )}

      {/* ── PAYMENT MODAL ─────────────────────────────────────────────── */}
      {showPayment&&(
        <div style={c.overlay} onClick={()=>setShowPayment(false)}>
          <div style={{...c.modal,maxHeight:"92vh",overflowY:"auto",paddingBottom:40}} onClick={e=>e.stopPropagation()}>

            {/* Step 1: Plan selection */}
            {payStep===1&&<>
              <div style={c.payStepHeader}><div style={c.payTitle}>選擇方案</div><div style={c.paySub}>選擇身份與付費週期</div></div>
              <div style={c.roleToggle}>
                {[["renter","🔍 租用方"],["owner","🏪 出租方"]].map(([role,label])=><button key={role} style={{...c.roleToggleBtn,...(payRole===role?c.roleToggleBtnActive:{})}} onClick={()=>setPayRole(role)}>{label}</button>)}
              </div>
              <div style={c.periodRow}>
                {["half","year"].map(period=>{
                  const plan=PLANS[payRole][period];
                  return(
                    <div key={period} style={{...c.periodCard,...(payPeriod===period?c.periodCardActive:{})}} onClick={()=>setPayPeriod(period)}>
                      {period==="year"&&<div style={c.saveBadge}>最划算</div>}
                      <div style={c.periodLabel}>{plan.label}</div>
                      <div style={c.periodPrice}>$<span style={{letterSpacing:2}}>000</span><span style={{fontSize:12,fontWeight:400,color:"#aaa"}}>/月</span></div>
                      <div style={c.periodTotal}>測試期間暫定</div>
                      <div style={{fontSize:11,color:"#22c55e",fontWeight:700,marginTop:4}}>{plan.discount}</div>
                    </div>
                  );
                })}
              </div>
              <div style={c.planFeatureBox}>
                {(payRole==="renter"?["解鎖所有攤位聯絡資訊","急單推播通知","優先搶租資格","無限次查看攤位"]:["刊登固定攤位（最多5個）","刊登臨時空檔・流動攤位","🚨 發急單廣播","管理工具・統計數據","優先曝光排序"]).map(f=><div key={f} style={{fontSize:13,color:"#555",marginBottom:6}}>✅ {f}</div>)}
              </div>
              <button style={c.primaryBtn} onClick={()=>setPayStep(2)}>下一步：選擇付款方式 →</button>
              <button style={c.cancelPayBtn} onClick={()=>setShowPayment(false)}>稍後再說</button>
            </>}

            {/* Step 2: Payment method */}
            {payStep===2&&<>
              <div style={c.payStepHeader}>
                <button style={c.payBackBtn} onClick={()=>setPayStep(1)}>← 返回</button>
                <div style={c.payTitle}>選擇付款方式</div>
                <div style={c.paySub}>請選擇您偏好的付款工具</div>
              </div>
              <div style={c.payMethodList}>
                {PAYMENT_METHODS.map(pm=>(
                  <div key={pm.id} style={{...c.payMethodCard,...(payMethod===pm.id?c.payMethodActive:{})}} onClick={()=>setPayMethod(pm.id)}>
                    <div style={c.payMethodIcon}>{pm.icon}</div>
                    <div style={{flex:1}}><div style={c.payMethodLabel}>{pm.label}</div>{pm.sub&&<div style={c.payMethodSub}>{pm.sub}</div>}</div>
                    <div style={{...c.payMethodRadio,...(payMethod===pm.id?c.payMethodRadioOn:{})}}>{payMethod===pm.id&&"●"}</div>
                  </div>
                ))}
              </div>
              {payMethod==="credit"&&(
                <div style={c.cardFormBox}>
                  <div style={{fontSize:14,fontWeight:700,marginBottom:12,color:"#333"}}>💳 信用卡資料</div>
                  <div style={c.fieldLabel}>卡號</div>
                  <input style={c.input} placeholder="1234 5678 9012 3456" maxLength={19} value={cardForm.num} onChange={e=>setCardForm(p=>({...p,num:e.target.value.replace(/\D/g,"").replace(/(.{4})/g,"$1 ").trim()}))}/>
                  <div style={c.fieldLabel}>持卡人姓名</div>
                  <input style={c.input} placeholder="WANG DA MING" value={cardForm.name} onChange={e=>setCardForm(p=>({...p,name:e.target.value.toUpperCase()}))}/>
                  <div style={{display:"flex",gap:10}}>
                    <div style={{flex:1}}><div style={c.fieldLabel}>有效日期</div><input style={c.input} placeholder="MM/YY" maxLength={5} value={cardForm.exp} onChange={e=>setCardForm(p=>({...p,exp:e.target.value}))}/></div>
                    <div style={{width:90}}><div style={c.fieldLabel}>CVV</div><input style={c.input} placeholder="●●●" maxLength={3} type="password" value={cardForm.cvv} onChange={e=>setCardForm(p=>({...p,cvv:e.target.value}))}/></div>
                  </div>
                  <div style={{fontSize:11,color:"#aaa",marginTop:8}}>🔒 您的付款資訊以 SSL 加密傳輸，安全有保障</div>
                </div>
              )}
              {["linepay","twpay","allpay"].includes(payMethod)&&(
                <div style={{background:"#f8fafc",borderRadius:12,padding:"16px",textAlign:"center",marginTop:12}}>
                  <div style={{fontSize:32,marginBottom:8}}>{PAYMENT_METHODS.find(p=>p.id===payMethod)?.icon}</div>
                  <div style={{fontSize:14,fontWeight:700,color:"#333"}}>點擊確認後將跳轉至</div>
                  <div style={{fontSize:15,fontWeight:800,color:"#c0392b",marginTop:4}}>{PAYMENT_METHODS.find(p=>p.id===payMethod)?.label} 付款頁面</div>
                </div>
              )}
              {payMethod==="epay"&&(
                <div style={{background:"#f8fafc",borderRadius:12,padding:"16px",textAlign:"center",marginTop:12}}>
                  <div style={{fontSize:32,marginBottom:8}}>📱</div>
                  <div style={{fontSize:14,color:"#555"}}>支援：街口支付 / 歐付寶 / icash Pay</div>
                  <div style={{fontSize:13,color:"#aaa",marginTop:4}}>點擊確認後選擇電子支付工具</div>
                </div>
              )}
              <button style={{...c.primaryBtn,marginTop:16}} onClick={()=>setPayStep(3)}>下一步：確認付款 →</button>
              <button style={c.cancelPayBtn} onClick={()=>setShowPayment(false)}>取消</button>
            </>}

            {/* Step 3: Confirm */}
            {payStep===3&&<>
              <div style={c.payStepHeader}>
                <button style={c.payBackBtn} onClick={()=>setPayStep(2)}>← 返回</button>
                <div style={c.payTitle}>確認訂單</div>
              </div>
              <div style={c.orderSummary}>
                <div style={c.orderRow}><span style={c.orderLabel}>方案</span><span style={c.orderVal}>{payRole==="owner"?"出租方":"租用方"}會員</span></div>
                <div style={c.orderRow}><span style={c.orderLabel}>付費週期</span><span style={c.orderVal}>{PLANS[payRole][payPeriod].label}（{PLANS[payRole][payPeriod].months}個月）</span></div>
                <div style={c.orderRow}><span style={c.orderLabel}>付款方式</span><span style={c.orderVal}>{PAYMENT_METHODS.find(p=>p.id===payMethod)?.icon} {PAYMENT_METHODS.find(p=>p.id===payMethod)?.label}</span></div>
                <div style={c.orderDivider}/>
                <div style={{...c.orderRow,marginTop:4}}><span style={{...c.orderLabel,fontWeight:800,fontSize:15,color:"#222"}}>應付金額</span><span style={{...c.orderVal,fontSize:20,fontWeight:900,color:"#c0392b"}}>$000 元（測試版免費）</span></div>
                <div style={{fontSize:11,color:"#22c55e",marginTop:4,textAlign:"right"}}>測試期間全功能免費開放</div>
              </div>
              {/* Invoice barcode in confirm */}
              <div style={c.invoiceConfirmBox}>
                <div style={{fontSize:13,fontWeight:700,color:"#333",marginBottom:8}}>🧾 電子發票設定</div>
                {user?.invoiceBarcode?(
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:20}}>✅</span>
                    <div><div style={{fontSize:13,fontWeight:700,color:"#16a34a"}}>發票將歸戶至手機載具</div><div style={{fontSize:12,color:"#aaa"}}>{user.invoiceBarcode}</div></div>
                  </div>
                ):(
                  <div>
                    <div style={{fontSize:12,color:"#777",marginBottom:8}}>填寫手機條碼，發票自動歸戶（可跳過）</div>
                    <input style={c.input} placeholder="/XXXXXXX" maxLength={8} />
                    <div style={{fontSize:11,color:"#aaa",marginTop:4}}>格式：/ 開頭共 8 碼，至財政部平台查詢</div>
                  </div>
                )}
              </div>
              <div style={{fontSize:12,color:"#aaa",textAlign:"center",margin:"12px 0"}}>點擊「確認付款」即表示同意攤位通服務條款</div>
              <button style={{...c.primaryBtn,background:"linear-gradient(135deg,#16a34a,#22c55e)"}} onClick={handlePayConfirm}>✅ 確認（測試版 $000 免費）</button>
              <button style={c.cancelPayBtn} onClick={()=>setShowPayment(false)}>取消</button>
            </>}

            {/* Step 4: Success */}
            {payStep===4&&(
              <div style={{textAlign:"center",padding:"20px 0"}}>
                <div style={{fontSize:60,marginBottom:16}}>🎉</div>
                <div style={{fontSize:20,fontWeight:800,color:"#16a34a",marginBottom:8}}>付款成功！</div>
                <div style={{fontSize:14,color:"#666"}}>正在啟用會員資格...</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── LISTING FORM MODAL ─────────────────────────────────────── */}
      {showListForm&&(
        <div style={c.overlay} onClick={()=>setShowListForm(false)}>
          <div style={{...c.modal,maxHeight:"92vh",overflowY:"auto",paddingBottom:40}} onClick={e=>e.stopPropagation()}>
            <div style={c.payStepHeader}>
              <div style={c.payTitle}>{listFormType==="fixed"?"🏪 刊登固定攤位":"⚡ 刊登臨時攤位"}</div>
              <button style={c.modalCloseBtn} onClick={()=>setShowListForm(false)}>✕</button>
            </div>

            {/* Photos */}
            <div style={{marginBottom:16}}>
              <div style={c.sectionTitle}>📸 攤位照片</div>
              <div style={c.photoUploadRow}>
                {["主要照片","內部空間","設備照片"].map((label,i)=>(
                  <div key={i} style={c.photoUploadBox}>
                    <div style={{fontSize:28,marginBottom:4}}>📷</div>
                    <div style={{fontSize:11,color:"#aaa"}}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,color:"#aaa",marginTop:6}}>建議上傳 3–5 張清晰照片，可提升曝光率 ↑60%</div>
            </div>

            {/* Basic info */}
            <div style={c.sectionTitle}>📋 基本資訊</div>
            {[["攤位名稱","name","例：士林夜市 B-05號"],["所屬夜市/市集","market","例：士林夜市"],["地址/位置","location","例：台北市士林區"]].map(([label,key,ph])=>(
              <div key={key}><div style={c.fieldLabel}>{label} <span style={c.required}>*</span></div><input style={c.input} placeholder={ph} value={listForm[key]} onChange={e=>setListForm(p=>({...p,[key]:e.target.value}))}/></div>
            ))}

            {/* Size */}
            <div style={c.fieldLabel}>攤位坪數 <span style={c.required}>*</span></div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input style={{...c.input,flex:1}} placeholder="寬（公尺）" value={listForm.sizeW} onChange={e=>setListForm(p=>({...p,sizeW:e.target.value}))}/>
              <span style={{color:"#aaa"}}>×</span>
              <input style={{...c.input,flex:1}} placeholder="深（公尺）" value={listForm.sizeD} onChange={e=>setListForm(p=>({...p,sizeD:e.target.value}))}/>
              <span style={{color:"#aaa",fontSize:13}}>公尺</span>
            </div>

            {/* Rent & Deposit */}
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1}}><div style={c.fieldLabel}>租金 <span style={c.required}>*</span></div><input style={c.input} placeholder="例：18000" value={listForm.rent} onChange={e=>setListForm(p=>({...p,rent:e.target.value}))}/></div>
              <div style={{flex:1}}><div style={c.fieldLabel}>押金</div><input style={c.input} placeholder="例：36000" value={listForm.deposit} onChange={e=>setListForm(p=>({...p,deposit:e.target.value}))}/></div>
            </div>

            {/* Stall type */}
            <div style={c.fieldLabel}>攤位類型</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
              {["室內固定","半戶外固定","戶外流動","攤車"].map(t=><button key={t} style={{...c.chip,...(listForm.stallType===t?c.chipRed:{})}} onClick={()=>setListForm(p=>({...p,stallType:t}))}>{t}</button>)}
            </div>

            {/* Business hours */}
            <div style={c.sectionTitle}>🕐 營業時段</div>
            <div style={{display:"flex",gap:10,marginBottom:10}}>
              <div style={{flex:1}}><div style={c.fieldLabel}>開始時間</div><input style={c.input} type="time" value={listForm.openTime} onChange={e=>setListForm(p=>({...p,openTime:e.target.value}))}/></div>
              <div style={{flex:1}}><div style={c.fieldLabel}>結束時間</div><input style={c.input} type="time" value={listForm.closeTime} onChange={e=>setListForm(p=>({...p,closeTime:e.target.value}))}/></div>
            </div>
            <div style={c.fieldLabel}>營業日</div>
            <div style={{display:"flex",gap:6,marginBottom:14}}>
              {["日","一","二","三","四","五","六"].map(d=>{
                const on=listForm.days.includes(d);
                return <div key={d} style={{width:36,height:36,borderRadius:18,background:on?"#c0392b":"#f3f4f6",color:on?"#fff":"#aaa",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={()=>setListForm(p=>({...p,days:on?p.days.filter(x=>x!==d):[...p.days,d]}))}>{d}</div>;
              })}
            </div>

            {/* Facilities */}
            <div style={c.sectionTitle}>⚙️ 設施配備</div>
            <div style={{display:"flex",gap:8,marginBottom:10}}>
              <div style={{flex:1}}><div style={c.fieldLabel}>供水</div>
                <select style={{...c.input,padding:"10px"}} value={listForm.water} onChange={e=>setListForm(p=>({...p,water:e.target.value}))}>
                  <option value="included">含水費</option><option value="metered">自付水費</option><option value="none">無水源</option>
                </select>
              </div>
              <div style={{flex:1}}><div style={c.fieldLabel}>供電</div>
                <select style={{...c.input,padding:"10px"}} value={listForm.electricity} onChange={e=>setListForm(p=>({...p,electricity:e.target.value}))}>
                  <option value="included">含電費</option><option value="metered">自付電費</option><option value="none">無電源</option>
                </select>
              </div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
              {[["ac","冷氣"],["gas","瓦斯"],["sink","水槽"],["storage","儲物間"],["wifi","WiFi"]].map(([key,label])=>(
                <div key={key} style={{...c.facilityToggle,...(listForm[key]?c.facilityToggleOn:{})}} onClick={()=>setListForm(p=>({...p,[key]:!p[key]}))}>
                  {listForm[key]?"✓":"+"} {label}
                </div>
              ))}
            </div>

            {/* Floor & height */}
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1}}><div style={c.fieldLabel}>地板材質</div>
                <select style={{...c.input,padding:"10px"}} value={listForm.floorType} onChange={e=>setListForm(p=>({...p,floorType:e.target.value}))}>
                  {["磁磚","水泥地","廣場地磚","木地板","其他"].map(f=><option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div style={{flex:1}}><div style={c.fieldLabel}>淨高（如3.0m）</div><input style={c.input} placeholder="例：2.8m" value={listForm.ceilingH} onChange={e=>setListForm(p=>({...p,ceilingH:e.target.value}))}/></div>
            </div>
            <div style={c.fieldLabel}>鄰近捷運/交通</div>
            <input style={c.input} placeholder="例：捷運士林站步行5分" value={listForm.nearMRT} onChange={e=>setListForm(p=>({...p,nearMRT:e.target.value}))}/>

            {/* Temp fields */}
            {listFormType==="temp"&&<>
              <div style={c.sectionTitle}>⚡ 臨時出租設定</div>
              <div style={c.fieldLabel}>出租類型</div>
              <div style={{display:"flex",gap:8,marginBottom:10}}>
                {Object.entries(tempTypeConfig).map(([k,v])=><div key={k} style={{...c.facilityToggle,...(listForm.tempType===k?{background:v.bg,color:v.color,border:`1.5px solid ${v.color}`}:{})}} onClick={()=>setListForm(p=>({...p,tempType:k}))}>{v.icon} {v.label}</div>)}
              </div>
              {listForm.tempType==="owner_leave"&&<>
                <div style={{display:"flex",gap:10}}>
                  <div style={{flex:1}}><div style={c.fieldLabel}>開始日期</div><input style={c.input} type="date" value={listForm.startDate} onChange={e=>setListForm(p=>({...p,startDate:e.target.value}))}/></div>
                  <div style={{flex:1}}><div style={c.fieldLabel}>結束日期</div><input style={c.input} type="date" value={listForm.endDate} onChange={e=>setListForm(p=>({...p,endDate:e.target.value}))}/></div>
                </div>
              </>}
              {listForm.tempType==="weekly_off"&&<>
                <div style={c.fieldLabel}>每週固定休息日</div>
                <div style={{display:"flex",gap:6,marginBottom:14}}>
                  {["日","一","二","三","四","五","六"].map(d=><div key={d} style={{width:36,height:36,borderRadius:18,background:listForm.recurringOff===d?"#0ea5e9":"#f3f4f6",color:listForm.recurringOff===d?"#fff":"#aaa",fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}} onClick={()=>setListForm(p=>({...p,recurringOff:d}))}>{d}</div>)}
                </div>
              </>}
            </>}

            {/* Description */}
            <div style={c.sectionTitle}>✍️ 攤位描述</div>
            <textarea style={{...c.input,height:100,resize:"none"}} placeholder="詳細描述攤位特色、設備狀況、業種限制等..." value={listForm.desc} onChange={e=>setListForm(p=>({...p,desc:e.target.value}))}/>

            <button style={{...c.primaryBtn,marginTop:16}} onClick={()=>{setShowListForm(false);showToast("✅ 攤位刊登成功！審核後將於 24 小時內上架");}}>📤 提交刊登</button>
            <button style={c.cancelPayBtn} onClick={()=>setShowListForm(false)}>取消</button>
          </div>
        </div>
      )}

      {/* Urgent Post Form */}
      {showPostForm&&(
        <div style={c.overlay} onClick={()=>setShowPostForm(false)}>
          <div style={{...c.modal,maxHeight:"85vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:20,fontWeight:800,textAlign:"center",marginBottom:4}}>🚨 發出急單</div>
            <div style={{fontSize:13,color:"#aaa",textAlign:"center",marginBottom:20}}>填寫後系統立即廣播給附近的業者</div>
            {[["攤位名稱","例：士林夜市 B-05號"],["地點","例：台北市士林區"],["今日租金（元/天）","例：800"],["可使用時段","例：今晚 18:00–23:00"],["備註說明","設備狀況、業種限制等"]].map(([label,ph])=>(
              <div key={label} style={{marginBottom:14}}><div style={{fontSize:13,fontWeight:700,marginBottom:6}}>{label}</div><input style={c.input} placeholder={ph}/></div>
            ))}
            <div style={{marginBottom:14}}><div style={{fontSize:13,fontWeight:700,marginBottom:6}}>急單有效時間</div><div style={{display:"flex",gap:8}}>{["1小時","2小時","3小時","今晚"].map(t=><button key={t} style={c.timeChip}>{t}</button>)}</div></div>
            <button style={{...c.upgradeBtn,background:"linear-gradient(135deg,#dc2626,#ef4444)"}} onClick={()=>{setShowPostForm(false);showToast("🚨 急單已發出！正在廣播給附近業者...");}}>🚨 立即廣播</button>
            <button style={c.cancelPayBtn} onClick={()=>setShowPostForm(false)}>取消</button>
          </div>
        </div>
      )}

      {/* Upgrade quick-link modal */}
      {showUpgrade&&(
        <div style={c.overlay} onClick={()=>setShowUpgrade(false)}>
          <div style={c.modal} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:20,fontWeight:800,textAlign:"center",marginBottom:20}}>🎉 加入攤位通會員</div>
            <div style={c.planRow}>
              {[["renter","🔍 租用方","$000/月","測試版免費"],["owner","🏪 出租方","$000/月","測試版免費"]].map(([role,label,price,total])=>(
                <div key={role} style={{...c.planOpt,...(payRole===role?{border:"2px solid #c0392b",background:"#fff0ee"}:{}),position:"relative"}} onClick={()=>setPayRole(role)}>
                  {role==="owner"&&<div style={c.bestBadge}>最熱門</div>}
                  <div style={{fontSize:14,fontWeight:700,marginBottom:6}}>{label}</div>
                  <div style={{fontSize:22,fontWeight:900,color:"#c0392b",marginBottom:4}}>{price}</div>
                  <div style={{fontSize:11,color:"#aaa"}}>{total}</div>
                </div>
              ))}
            </div>
            <button style={c.upgradeBtn} onClick={()=>{setShowUpgrade(false);setPayStep(1);setShowPayment(true);}}>選擇付款方式 →</button>
            <button style={c.cancelPayBtn} onClick={()=>setShowUpgrade(false)}>稍後再說</button>
          </div>
        </div>
      )}

      {showTermsModal&&<TermsModal sections={TERMS_SECTIONS} onClose={()=>setShowTermsModal(false)}/>}
      {showPrivacyModal&&<PrivacyModal content={PRIVACY_CONTENT} onClose={()=>setShowPrivacyModal(false)}/>}
      {notification&&<div style={{...c.toast,background:notification.startsWith("✅")?"#22c55e":notification.startsWith("🚨")?"#dc2626":"#1d4ed8"}}>{notification}</div>}
    </div>
  );
}

// ── Reusable components ───────────────────────────────────────────────────────

// ── QR Code SVG Component ────────────────────────────────────────────────────
function QRCodeSVG({ size=120 }) {
  const D = 21;
  const cell = size / D;
  // Finder patterns + data pattern
  const grid = [
    [1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,1,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,0,1,1,0],
    [0,1,0,0,1,0,0,0,1,0,1,1,0,1,0,1,0,1,0,0,1],
    [1,1,1,0,1,1,1,0,1,1,0,1,1,0,1,0,1,0,1,1,0],
    [0,0,1,1,0,0,0,1,0,0,1,0,0,1,0,1,0,1,1,0,1],
    [1,0,0,1,1,0,1,0,1,1,0,1,1,0,1,1,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,1,0,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,0,0,1,0,1,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,1,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,0,1,0,1,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,0,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,1,1,1,0,1,0,1,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,1,0,1,0,0],
    [1,1,1,1,1,1,1,0,0,1,1,0,1,1,1,1,0,1,0,1,1],
  ];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{display:"block",borderRadius:8}}>
      <rect width={size} height={size} fill="white"/>
      {grid.map((row,y)=>row.map((v,x)=>v?(
        <rect key={`${x}-${y}`} x={x*cell+0.3} y={y*cell+0.3} width={cell-0.3} height={cell-0.3} fill="#111" rx="0.5"/>
      ):null))}
      {/* Center logo overlay */}
      <rect x={size*0.38} y={size*0.38} width={size*0.24} height={size*0.24} fill="white" rx={size*0.03}/>
      <rect x={size*0.4} y={size*0.4} width={size*0.2} height={size*0.2} fill="#c0392b" rx={size*0.025}/>
      <text x={size*0.5} y={size*0.538} textAnchor="middle" fontSize={size*0.095} fontWeight="900" fill="white">攤</text>
    </svg>
  );
}

function SpecBox({icon,label,val,color,wide}){
  return(
    <div style={{...c.specBox,...(wide?{gridColumn:"1/-1"}:{})}}>
      <div style={{fontSize:16,marginBottom:2}}>{icon}</div>
      <div style={c.specLabel}>{label}</div>
      <div style={{...c.specVal,...(color?{color}:{})}}>{val}</div>
    </div>
  );
}

function EnhancedCard({stall,onClick}){
  return(
    <div style={c.card} className="card-hover" onClick={onClick}>
      <div style={c.cardPhotoRow}>
        <div style={c.cardPhotoBig}>{stall.photos[0]}</div>
        <div style={c.cardPhotoSmall}>{stall.photos[1]||"📷"}</div>
        <div style={c.cardPhotoSmall}>{stall.photos[2]||"📷"}</div>
        <div style={c.cardPhotoCount}>📸 {stall.photos.length}</div>
      </div>
      <div style={{padding:"10px 0 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
          <div><div style={c.cardName}>{stall.name}</div><div style={c.cardLoc}>📍 {stall.location}</div></div>
          <div style={{textAlign:"right"}}><div style={c.cardRent}>${stall.rent.toLocaleString()}<span style={c.rentUnit}>/月</span></div><div style={{...c.trafficBadge,background:trafficColor(stall.traffic)+"22",color:trafficColor(stall.traffic)}}>{stall.traffic}人流</div></div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
          <div style={c.infoChip}>📐 {stall.sizeW}×{stall.sizeD}坪</div>
          <div style={c.infoChip}>🕐 {stall.businessHours.open}–{stall.businessHours.close}</div>
          {stall.facilities.ac&&<div style={{...c.infoChip,color:"#0ea5e9"}}>❄️ 有冷氣</div>}
          {stall.facilities.water==="included"&&<div style={{...c.infoChip,color:"#2563eb"}}>💧 含水</div>}
          {stall.facilities.electricity==="included"&&<div style={{...c.infoChip,color:"#ca8a04"}}>⚡ 含電</div>}
        </div>
        <div style={c.tagRow}>{stall.tags.map(t=><span key={t} style={c.tag}>{t}</span>)}<span style={c.avail}>📅 {stall.available}</span></div>
      </div>
    </div>
  );
}

function TempEnhancedCard({stall,onClick}){
  const tc=tempTypeConfig[stall.tempType],uc=urgencyConfig[stall.urgency];
  return(
    <div style={{...c.card,borderLeft:`4px solid ${tc.color}`}} className="card-hover" onClick={onClick}>
      <div style={c.cardPhotoRow}>
        <div style={c.cardPhotoBig}>{stall.photos[0]}</div>
        <div style={c.cardPhotoSmall}>{stall.photos[1]||"📷"}</div>
        <div style={c.cardPhotoSmall}>{stall.photos[2]||"📷"}</div>
      </div>
      <div style={{padding:"10px 0 0"}}>
        <div style={{display:"flex",gap:5,marginBottom:6}}>
          <span style={{...c.miniBadge,background:tc.bg,color:tc.color}}>{tc.icon} {tc.label}</span>
          <span style={{...c.miniBadge,background:uc.bg,color:uc.color}}>● {uc.label}</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
          <div><div style={c.cardName}>{stall.name}</div><div style={c.cardLoc}>📍 {stall.location}</div></div>
          <div style={{textAlign:"right"}}><div style={c.cardRent}>${stall.rent}<span style={c.rentUnit}>/{stall.rentUnit}</span></div><div style={{...c.trafficBadge,background:trafficColor(stall.traffic)+"22",color:trafficColor(stall.traffic)}}>{stall.traffic}人流</div></div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
          <div style={c.infoChip}>📐 {stall.sizeW}×{stall.sizeD}坪</div>
          <div style={c.infoChip}>🕐 {stall.businessHours.open}–{stall.businessHours.close}</div>
          {stall.facilities.ac&&<div style={{...c.infoChip,color:"#0ea5e9"}}>❄️ 冷氣</div>}
          {stall.facilities.sink&&<div style={{...c.infoChip,color:"#2563eb"}}>🚿 水槽</div>}
        </div>
        <div style={c.tagRow}>{stall.tags.map(t=><span key={t} style={c.tag}>{t}</span>)}<span style={{...c.avail,color:tc.color}}>⏱ {stall.available}</span></div>
      </div>
    </div>
  );
}

function Stat({n,l}){ return <div style={c.statBox}><div style={c.statNum}>{n}</div><div style={c.statLabel}>{l}</div></div>; }

function TermsModal({sections,onClose,onAgree}){
  const [readToEnd,setReadToEnd]=useState(false);
  const [activeSection,setActiveSection]=useState(0);
  return(
    <div style={c.overlay} onClick={onClose}>
      <div style={{...c.modal,maxHeight:"90vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        <div style={c.modalHeaderRow}><div style={{fontSize:17,fontWeight:800}}>📜 使用條款</div><button style={c.modalCloseBtn} onClick={onClose}>✕</button></div>
        <div style={c.termsUpdated}>最後更新：2026年4月13日 ・ 版本 2.1</div>
        <div style={c.termsSectionNav}>{sections.map((_,i)=><button key={i} style={{...c.termsSectionBtn,...(activeSection===i?c.termsSectionActive:{})}} onClick={()=>setActiveSection(i)}>{i+1}</button>)}</div>
        <div style={{flex:1,overflowY:"auto",padding:"0 4px"}} onScroll={e=>{const el=e.target;if(el.scrollTop+el.clientHeight>=el.scrollHeight-20)setReadToEnd(true);}}>
          <div style={c.termsSectionTitle}>{sections[activeSection].title}</div>
          <div style={c.termsContent}>{sections[activeSection].content}</div>
          <div style={c.termsNavRow}>
            <button style={{...c.termsNavBtn,visibility:activeSection>0?"visible":"hidden"}} onClick={()=>setActiveSection(p=>p-1)}>← 上一條</button>
            <span style={{fontSize:12,color:"#aaa"}}>{activeSection+1}/{sections.length}</span>
            {activeSection<sections.length-1?<button style={c.termsNavBtn} onClick={()=>setActiveSection(p=>p+1)}>下一條 →</button>:<button style={{...c.termsNavBtn,color:"#22c55e"}} onClick={()=>setReadToEnd(true)}>已讀完 ✓</button>}
          </div>
        </div>
        {onAgree&&<div style={{paddingTop:12}}>{!readToEnd&&<div style={{fontSize:12,color:"#aaa",textAlign:"center",marginBottom:8}}>請閱讀完所有條款後才可同意</div>}<button style={{...c.upgradeBtn,opacity:readToEnd?1:0.4,cursor:readToEnd?"pointer":"not-allowed"}} onClick={readToEnd?onAgree:undefined}>✅ 我已閱讀並同意使用條款</button></div>}
        <button style={{width:"100%",background:"none",border:"none",color:"#aaa",fontSize:13,padding:"8px",cursor:"pointer",marginTop:4}} onClick={onClose}>關閉</button>
      </div>
    </div>
  );
}

function PrivacyModal({content,onClose,onAgree}){
  const [readToEnd,setReadToEnd]=useState(false);
  return(
    <div style={c.overlay} onClick={onClose}>
      <div style={{...c.modal,maxHeight:"90vh",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        <div style={c.modalHeaderRow}><div style={{fontSize:17,fontWeight:800}}>🔐 隱私權政策</div><button style={c.modalCloseBtn} onClick={onClose}>✕</button></div>
        <div style={c.termsUpdated}>最後更新：2026年4月13日</div>
        <div style={{flex:1,overflowY:"auto"}} onScroll={e=>{const el=e.target;if(el.scrollTop+el.clientHeight>=el.scrollHeight-20)setReadToEnd(true);}}>
          <div style={{...c.termsContent,whiteSpace:"pre-line"}}>{content}</div>
        </div>
        {onAgree&&<div style={{paddingTop:12}}>{!readToEnd&&<div style={{fontSize:12,color:"#aaa",textAlign:"center",marginBottom:8}}>請滑動閱讀完畢後才可同意</div>}<button style={{...c.upgradeBtn,opacity:readToEnd?1:0.4,cursor:readToEnd?"pointer":"not-allowed"}} onClick={readToEnd?onAgree:undefined}>✅ 我已閱讀並同意隱私權政策</button></div>}
        <button style={{width:"100%",background:"none",border:"none",color:"#aaa",fontSize:13,padding:"8px",cursor:"pointer",marginTop:4}} onClick={onClose}>關閉</button>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const c = {
  root:{fontFamily:"'Noto Sans TC','PingFang TC',sans-serif",background:"#fdf6ee",minHeight:"100vh",maxWidth:430,margin:"0 auto",boxShadow:"0 0 40px rgba(0,0,0,0.12)"},
  authHeader:{background:"linear-gradient(160deg,#c0392b,#e74c3c)",textAlign:"center",padding:"48px 24px 32px"},
  authTitle:{color:"#fff",fontSize:28,fontWeight:900,letterSpacing:2},
  authSub:{color:"rgba(255,255,255,0.75)",fontSize:13,marginTop:4},
  authBody:{padding:"20px 20px 40px"},
  authCard:{background:"#fff",borderRadius:16,padding:"20px",marginBottom:16,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"},
  authCardTitle:{fontSize:18,fontWeight:800,color:"#222",marginBottom:18},
  pageHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:"#fff",borderBottom:"1px solid #f0e8df"},
  pageBackBtn:{background:"none",border:"none",fontSize:22,color:"#c0392b",cursor:"pointer",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center"},
  pageHeaderTitle:{fontSize:17,fontWeight:800,color:"#222"},
  stepRow:{display:"flex",justifyContent:"center",gap:4,marginBottom:20},
  stepItem:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},
  stepDot:{width:26,height:26,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700},
  stepLabel:{fontSize:10,marginTop:4,textAlign:"center"},
  fieldLabel:{fontSize:13,fontWeight:700,color:"#444",marginBottom:6,marginTop:14},
  required:{color:"#ef4444"},
  input:{width:"100%",border:"1.5px solid #e8ddd5",borderRadius:10,padding:"12px 14px",fontSize:14,outline:"none",boxSizing:"border-box",background:"#fff"},
  inputErr:{borderColor:"#ef4444",background:"#fef2f2"},
  errText:{fontSize:12,color:"#ef4444",marginTop:4},
  pwStrengthRow:{display:"flex",gap:12,marginTop:6},
  pwCheck:{fontSize:11,fontWeight:600},
  roleRow:{display:"flex",gap:12},
  roleCard:{flex:1,border:"2px solid #e8ddd5",borderRadius:14,padding:"16px 10px",textAlign:"center",cursor:"pointer",background:"#fafafa"},
  roleActive:{border:"2px solid #c0392b",background:"#fff5f0"},
  roleLabel:{fontSize:15,fontWeight:800,color:"#222",marginBottom:4},
  roleDesc:{fontSize:12,color:"#888",marginBottom:6},
  rolePriceTag:{fontSize:13,fontWeight:700,color:"#c0392b"},
  roleNote:{fontSize:12,color:"#aaa",textAlign:"center",marginTop:12},
  checkRow:{display:"flex",alignItems:"flex-start",gap:10,marginBottom:12},
  checkbox:{width:22,height:22,borderRadius:6,border:"2px solid #ddd",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,cursor:"pointer",flexShrink:0,marginTop:1,color:"#fff"},
  checkboxOn:{background:"#c0392b",borderColor:"#c0392b"},
  checkLabel:{fontSize:13,color:"#444",lineHeight:1.5},
  termLink:{background:"none",border:"none",color:"#c0392b",fontSize:13,fontWeight:700,cursor:"pointer",padding:0,textDecoration:"underline"},
  primaryBtn:{width:"100%",background:"linear-gradient(135deg,#c0392b,#e74c3c)",color:"#fff",border:"none",borderRadius:12,padding:"14px",fontSize:15,fontWeight:700,cursor:"pointer",marginTop:8},
  secondaryBtn:{width:"100%",background:"#fff",color:"#c0392b",border:"2px solid #c0392b",borderRadius:12,padding:"13px",fontSize:15,fontWeight:700,cursor:"pointer"},
  linkBtn:{background:"none",border:"none",color:"#c0392b",fontSize:13,fontWeight:700,cursor:"pointer",padding:0},
  guestBtn:{background:"none",border:"none",color:"#aaa",fontSize:13,cursor:"pointer",textDecoration:"underline"},
  divider:{display:"flex",alignItems:"center",margin:"16px 0",gap:10},
  dividerText:{background:"#fdf6ee",padding:"0 8px",color:"#bbb",fontSize:13},
  otpRow:{display:"flex",gap:8,justifyContent:"center",marginBottom:20},
  otpBox:{width:44,height:52,border:"2px solid #e8ddd5",borderRadius:10,fontSize:22,fontWeight:800,textAlign:"center",outline:"none",color:"#c0392b"},
  otpTimerRow:{textAlign:"center",marginBottom:20},
  welcomeCard:{background:"#fff",borderRadius:14,padding:"16px",width:"100%",marginBottom:20,boxShadow:"0 2px 8px rgba(0,0,0,0.06)"},
  welcomeRow:{display:"flex",gap:10,fontSize:13,color:"#555",marginBottom:8},
  header:{background:"linear-gradient(135deg,#c0392b,#e74c3c)",padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"},
  logo:{display:"flex",alignItems:"center",gap:10},
  logoIcon:{background:"rgba(255,255,255,0.2)",color:"#fff",width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900},
  logoText:{color:"#fff",fontSize:18,fontWeight:800,letterSpacing:1},
  logoSub:{color:"rgba(255,255,255,0.7)",fontSize:10},
  memberBadge:{background:"rgba(255,255,255,0.2)",color:"#fff",padding:"5px 12px",borderRadius:20,fontSize:12,fontWeight:700},
  memberBadge2:{display:"inline-block",background:"#fef3c7",color:"#92400e",padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:700,marginTop:6},
  joinBtn:{background:"#fff",color:"#c0392b",border:"none",padding:"7px 14px",borderRadius:20,fontSize:12,fontWeight:700,cursor:"pointer"},
  avatarBtn:{width:34,height:34,borderRadius:17,background:"rgba(255,255,255,0.25)",color:"#fff",border:"none",fontSize:14,fontWeight:800,cursor:"pointer"},
  navBar:{display:"flex",background:"#fff",borderBottom:"2px solid #f0e8df"},
  navTab:{flex:1,padding:"12px 0",border:"none",background:"transparent",fontSize:12,fontWeight:600,color:"#999",cursor:"pointer",position:"relative"},
  navActive:{color:"#c0392b",borderBottom:"3px solid #c0392b",marginBottom:-2},
  navActiveUrgent:{color:"#dc2626",borderBottom:"3px solid #dc2626",marginBottom:-2},
  navBadge:{position:"absolute",top:6,right:8,background:"#ef4444",color:"#fff",fontSize:9,fontWeight:800,width:14,height:14,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center"},
  body:{padding:"16px",paddingBottom:40},
  searchBar:{display:"flex",alignItems:"center",background:"#fff",borderRadius:14,padding:"10px 16px",gap:10,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",marginBottom:14},
  searchInput:{border:"none",outline:"none",fontSize:14,flex:1,background:"transparent"},
  urgentBanner:{background:"linear-gradient(135deg,#dc2626,#ef4444)",borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,cursor:"pointer",color:"#fff"},
  betaBanner:{background:"linear-gradient(135deg,#f59e0b,#d97706)",borderRadius:14,padding:"12px 16px",display:"flex",alignItems:"center",gap:10,marginBottom:14,color:"#fff"},
  // ── Consumer Zone ──
  consumerHero:{background:"linear-gradient(135deg,#e91e8c,#c0392b,#f39c12)",padding:"28px 20px 24px",textAlign:"center",color:"#fff"},
  consumerStat:{background:"rgba(255,255,255,0.2)",borderRadius:12,padding:"8px 14px",textAlign:"center",color:"#fff"},
  promoScroll:{display:"flex",gap:12,overflowX:"auto",paddingBottom:8,marginBottom:18},
  promoCard:{flexShrink:0,width:150,background:"linear-gradient(135deg,#c0392b,#e91e8c)",borderRadius:16,padding:"14px",cursor:"pointer"},
  promoTag:{background:"rgba(255,255,255,0.25)",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:8},
  chipConsumer:{background:"#e91e8c",color:"#fff",borderColor:"#e91e8c"},
  adGrid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20},
  adCard:{background:"#fff",borderRadius:14,overflow:"hidden",boxShadow:"0 2px 10px rgba(0,0,0,0.07)",cursor:"pointer",position:"relative"},
  adPhoto:{height:100,background:"linear-gradient(135deg,#fff5f0,#fde8e8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:44},
  adPromoBadge:{position:"absolute",top:8,right:8,background:"#ef4444",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:8,zIndex:1},
  adLikeBtn:{background:"none",border:"none",fontSize:12,cursor:"pointer",color:"#aaa",fontWeight:600},
  adLikeBtnOn:{color:"#ef4444"},
  eventCard:{background:"#fff",borderRadius:14,padding:"14px",marginBottom:12,boxShadow:"0 2px 8px rgba(0,0,0,0.06)",display:"flex",gap:12,alignItems:"flex-start"},
  eventPhoto:{fontSize:30,width:50,height:50,background:"linear-gradient(135deg,#fef3c7,#fde68a)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  eventJoinBtn:{background:"#c0392b",color:"#fff",border:"none",borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0},
  qrCtaBox:{background:"linear-gradient(135deg,#1a1a2e,#16213e)",borderRadius:16,padding:"20px",textAlign:"center",cursor:"pointer",marginTop:8},
  qrLargeBox:{textAlign:"center",marginBottom:8},
  toggleRow:{display:"flex",gap:10,marginBottom:14},
  toggleBtn:{flex:1,padding:"11px 0",border:"2px solid #e8ddd5",borderRadius:12,background:"#fff",fontSize:13,fontWeight:700,color:"#888",cursor:"pointer",position:"relative"},
  toggleFixed:{background:"#c0392b",color:"#fff",border:"2px solid #c0392b"},
  toggleTemp:{background:"#7c3aed",color:"#fff",border:"2px solid #7c3aed"},
  newBadge:{position:"absolute",top:-8,right:8,background:"#ef4444",color:"#fff",fontSize:9,fontWeight:800,padding:"2px 6px",borderRadius:8},
  filterRow:{display:"flex",gap:8,overflowX:"auto",marginBottom:14,paddingBottom:2},
  chip:{padding:"6px 14px",borderRadius:20,border:"1.5px solid #e8ddd5",background:"#fff",fontSize:12,whiteSpace:"nowrap",cursor:"pointer",color:"#666",fontWeight:500},
  chipRed:{background:"#c0392b",color:"#fff",borderColor:"#c0392b"},
  chipPurple:{background:"#7c3aed",color:"#fff",borderColor:"#7c3aed"},
  tempTypeRow:{display:"flex",gap:8,marginBottom:16},
  tempTypePill:{flex:1,borderRadius:12,padding:"10px 6px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:3},
  statsRow:{display:"flex",gap:10,marginBottom:18},
  statBox:{flex:1,background:"#fff",borderRadius:12,padding:"12px 8px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},
  statNum:{fontSize:22,fontWeight:800,color:"#c0392b"},
  statLabel:{fontSize:11,color:"#999",marginTop:2},
  sectionTitle:{fontSize:15,fontWeight:800,color:"#333",marginBottom:12},
  // Enhanced card
  card:{background:"#fff",borderRadius:16,padding:"14px",marginBottom:12,boxShadow:"0 2px 12px rgba(0,0,0,0.06)",cursor:"pointer"},
  cardPhotoRow:{display:"flex",gap:4,marginBottom:0,height:90,borderRadius:"10px 10px 0 0",overflow:"hidden",margin:"0 -14px"},
  cardPhotoBig:{flex:2,background:"linear-gradient(135deg,#fff5f0,#fde8e8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40},
  cardPhotoSmall:{flex:1,background:"linear-gradient(135deg,#fff8f5,#fef0ee)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,borderLeft:"2px solid #fdf6ee"},
  cardPhotoCount:{position:"absolute",bottom:4,right:8,background:"rgba(0,0,0,0.5)",color:"#fff",fontSize:10,padding:"2px 6px",borderRadius:8},
  cardName:{fontSize:14,fontWeight:700,color:"#222",marginBottom:3},
  cardLoc:{fontSize:12,color:"#888",marginBottom:3},
  cardRent:{fontSize:16,fontWeight:800,color:"#c0392b"},
  rentUnit:{fontSize:11,fontWeight:400,color:"#aaa"},
  trafficBadge:{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:8,marginTop:4,display:"inline-block"},
  infoChip:{fontSize:11,background:"#f8fafc",color:"#64748b",padding:"3px 8px",borderRadius:8,border:"1px solid #e2e8f0"},
  tagRow:{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"},
  tag:{background:"#fff5f0",color:"#c0392b",fontSize:11,padding:"3px 10px",borderRadius:8,fontWeight:600},
  avail:{fontSize:11,color:"#aaa",marginLeft:"auto"},
  miniBadge:{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:8},
  // Gallery
  galleryBox:{position:"relative",background:"#f5f0eb",height:240,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"},
  galleryMain:{fontSize:90,lineHeight:1},
  galBackBtn:{position:"absolute",top:12,left:12,background:"rgba(0,0,0,0.4)",color:"#fff",border:"none",borderRadius:20,padding:"6px 14px",fontSize:13,fontWeight:700,cursor:"pointer"},
  galleryDots:{position:"absolute",top:12,right:12,display:"flex",gap:4},
  galDot:{width:8,height:8,borderRadius:4,background:"rgba(255,255,255,0.4)",cursor:"pointer"},
  galDotActive:{background:"#fff"},
  galArrow:{position:"absolute",top:"50%",transform:"translateY(-50%)",background:"rgba(0,0,0,0.4)",color:"#fff",border:"none",borderRadius:20,width:32,height:32,fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},
  galleryThumbRow:{position:"absolute",bottom:8,left:0,right:0,display:"flex",gap:6,justifyContent:"center"},
  galleryThumb:{width:44,height:44,borderRadius:8,background:"rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,cursor:"pointer",border:"2px solid transparent"},
  galleryThumbActive:{border:"2px solid #fff"},
  // Specs
  specsGrid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14},
  specBox:{background:"#fff",borderRadius:12,padding:"12px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},
  specLabel:{fontSize:11,color:"#aaa",marginBottom:2},
  specVal:{fontSize:14,fontWeight:700,color:"#222"},
  // Info cards
  infoCard:{background:"#fff",borderRadius:14,padding:"14px",marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},
  infoCardTitle:{fontSize:14,fontWeight:800,color:"#333",marginBottom:10},
  facilityTag:{display:"flex",alignItems:"center",gap:5,fontSize:12,fontWeight:700,padding:"5px 12px",borderRadius:20},
  facilityChip:{fontSize:12,fontWeight:600,padding:"4px 10px",borderRadius:8},
  facilityChipOn:{background:"#f0fdf4",color:"#16a34a",border:"1px solid #bbf7d0"},
  facilityChipOff:{background:"#fafafa",color:"#d1d5db",border:"1px solid #e5e7eb"},
  facilityToggle:{padding:"7px 14px",borderRadius:20,border:"1.5px solid #e8ddd5",background:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",color:"#666"},
  availRow:{display:"flex",alignItems:"center",gap:8,marginBottom:8},
  aLabel:{fontSize:13,color:"#888",flex:1},
  aVal:{fontSize:13,fontWeight:700,color:"#333"},
  urgBar:{borderRadius:10,padding:"7px 12px",fontSize:12,fontWeight:700,textAlign:"center",marginTop:4},
  descBox:{background:"#fff",borderRadius:12,padding:"14px",fontSize:13,lineHeight:1.7,color:"#555",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},
  detailName:{fontSize:17,fontWeight:800,color:"#222"},
  urgentDetailBadge:{display:"inline-block",background:"#fef2f2",color:"#dc2626",fontSize:12,fontWeight:800,padding:"3px 12px",borderRadius:20},
  contactBox:{background:"#fff",borderRadius:16,padding:"16px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"},
  ownerRow:{display:"flex",alignItems:"center",gap:12,marginBottom:14},
  ownerAva:{fontSize:28,background:"#fff5f0",width:46,height:46,borderRadius:23,display:"flex",alignItems:"center",justifyContent:"center"},
  contactBtn:{width:"100%",background:"#c0392b",color:"#fff",border:"none",borderRadius:12,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer"},
  upgradeBtn:{width:"100%",background:"linear-gradient(135deg,#c0392b,#e74c3c)",color:"#fff",border:"none",borderRadius:12,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",marginTop:8},
  // Urgent
  urgentHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14},
  urgentTitle:{fontSize:20,fontWeight:900,color:"#dc2626"},
  urgentSub:{fontSize:12,color:"#888",marginTop:2},
  postBtn:{background:"linear-gradient(135deg,#dc2626,#ef4444)",color:"#fff",border:"none",padding:"8px 14px",borderRadius:20,fontSize:12,fontWeight:700,cursor:"pointer"},
  howRow:{display:"flex",gap:6,marginBottom:18,background:"#fff",borderRadius:12,padding:"12px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},
  howItem:{flex:1,display:"flex",flexDirection:"column",alignItems:"center"},
  urgentCard:{background:"#fff",borderRadius:16,padding:"14px",marginBottom:12,boxShadow:"0 2px 12px rgba(0,0,0,0.06)",cursor:"pointer",position:"relative",overflow:"hidden"},
  urgentCardDim:{opacity:0.55},
  urgentCardTop:{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10},
  urgentIcon:{fontSize:26,width:48,height:48,background:"#fff5f0",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center"},
  countdownRow:{display:"flex",alignItems:"center",gap:10,marginBottom:10},
  countdownBarWrap:{flex:1,height:6,background:"#f3f4f6",borderRadius:3,overflow:"hidden"},
  countdownBar:{height:"100%",borderRadius:3,transition:"width 1s linear"},
  countdownText:{fontSize:12,fontWeight:800,minWidth:50,textAlign:"right"},
  urgentMeta:{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},
  grabBtn:{marginLeft:"auto",background:"linear-gradient(135deg,#dc2626,#ef4444)",color:"#fff",border:"none",padding:"7px 14px",borderRadius:20,fontSize:12,fontWeight:800,cursor:"pointer"},
  grabBtnLocked:{background:"#9ca3af"},
  grabbedRibbon:{position:"absolute",top:12,right:-20,background:"#22c55e",color:"#fff",fontSize:10,fontWeight:700,padding:"4px 28px",transform:"rotate(30deg)"},
  urgentGateBanner:{background:"#fef3c7",borderRadius:14,padding:"16px",textAlign:"center",marginTop:8},
  // My list
  planCard:{background:"#fff",borderRadius:16,padding:"20px",marginBottom:16,boxShadow:"0 2px 12px rgba(0,0,0,0.08)",textAlign:"left"},
  myCard:{background:"#fff",borderRadius:14,padding:"14px",display:"flex",alignItems:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)",marginBottom:12},
  // Profile
  profileHero:{textAlign:"center",background:"#fff",borderRadius:16,padding:"24px 0",marginBottom:16,boxShadow:"0 2px 12px rgba(0,0,0,0.06)"},
  profileAvatar:{width:64,height:64,borderRadius:32,background:"linear-gradient(135deg,#c0392b,#e74c3c)",color:"#fff",fontSize:26,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px"},
  profileName:{fontSize:18,fontWeight:800,color:"#222"},
  profileRole:{fontSize:13,color:"#888",marginTop:4},
  profileCard:{background:"#fff",borderRadius:14,padding:"4px 16px",marginBottom:16,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},
  profileRow:{display:"flex",alignItems:"center",gap:10,padding:"12px 0",borderBottom:"1px solid #f5f5f5"},
  profileIcon:{fontSize:16,width:24,textAlign:"center"},
  profileLabel:{fontSize:13,color:"#888",flex:1},
  profileVal:{fontSize:13,color:"#333",fontWeight:600},
  menuRow:{display:"flex",alignItems:"center",gap:10,padding:"14px 0",borderBottom:"1px solid #f5f5f5",cursor:"pointer"},
  logoutBtn:{width:"100%",background:"#fff",color:"#ef4444",border:"1.5px solid #fecaca",borderRadius:12,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",marginTop:8},
  // Account type
  acctTypeRow:{display:"flex",gap:12,marginBottom:10},
  acctTypeCard:{flex:1,border:"2px solid #e8ddd5",borderRadius:14,padding:"16px 10px",textAlign:"center",cursor:"pointer",background:"#fafafa"},
  acctTypeActive:{border:"2px solid #c0392b",background:"#fff5f0"},
  acctTypeActiveTrial:{border:"2px solid #0ea5e9",background:"#eff6ff"},
  acctTypeLabel:{fontSize:14,fontWeight:800,color:"#222",marginBottom:4},
  acctTypeDesc:{fontSize:12,color:"#888",marginBottom:6},
  trialBadge:{display:"inline-block",background:"#dbeafe",color:"#1d4ed8",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:8},
  trialInfoBox:{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:10,padding:"12px",marginTop:8},
  trialWarningBox:{background:"#eff6ff",border:"1.5px solid #bfdbfe",borderRadius:12,padding:"14px",marginBottom:14},
  // Phone verify
  sendCodeBtn:{background:"#c0392b",color:"#fff",border:"none",borderRadius:10,padding:"0 14px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0},
  verifiedBadge:{background:"#f0fdf4",color:"#16a34a",border:"1.5px solid #bbf7d0",borderRadius:10,padding:"0 12px",fontSize:12,fontWeight:700,display:"flex",alignItems:"center"},
  phoneCodeBox:{background:"#f8fafc",borderRadius:10,padding:"12px",marginTop:8,border:"1px solid #e2e8f0"},
  verifyCodeBtn:{background:"#0ea5e9",color:"#fff",border:"none",borderRadius:10,padding:"0 16px",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0},
  // Invoice
  invoiceInfoBox:{background:"#fefce8",border:"1px solid #fde68a",borderRadius:10,padding:"10px 12px",marginBottom:10},
  invoiceHint:{},
  barcodeOkBadge:{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",fontSize:12,color:"#16a34a",fontWeight:700},
  invoiceConfirmBox:{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:12,padding:"14px",marginBottom:12},
  // Payment
  payStepHeader:{marginBottom:16},
  payTitle:{fontSize:20,fontWeight:800,color:"#222"},
  paySub:{fontSize:13,color:"#888",marginTop:2},
  payBackBtn:{background:"none",border:"none",color:"#c0392b",fontSize:14,fontWeight:700,cursor:"pointer",padding:"0 0 8px 0",display:"block"},
  roleToggle:{display:"flex",background:"#f5f5f5",borderRadius:12,padding:4,marginBottom:16,gap:4},
  roleToggleBtn:{flex:1,padding:"10px 0",border:"none",borderRadius:10,background:"transparent",fontSize:13,fontWeight:700,color:"#888",cursor:"pointer"},
  roleToggleBtnActive:{background:"#fff",color:"#c0392b",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"},
  periodRow:{display:"flex",gap:12,marginBottom:16},
  periodCard:{flex:1,background:"#fff",border:"2px solid #e8ddd5",borderRadius:16,padding:"16px 12px",textAlign:"center",cursor:"pointer",position:"relative"},
  periodCardActive:{border:"2px solid #c0392b",background:"#fff5f0"},
  saveBadge:{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:"#22c55e",color:"#fff",fontSize:10,fontWeight:700,padding:"2px 10px",borderRadius:10,whiteSpace:"nowrap"},
  periodLabel:{fontSize:13,fontWeight:700,color:"#555",marginBottom:6},
  periodPrice:{fontSize:24,fontWeight:900,color:"#c0392b"},
  periodTotal:{fontSize:12,color:"#aaa",marginTop:2},
  planFeatureBox:{background:"#f9f9f9",borderRadius:12,padding:"14px",marginBottom:16},
  payMethodList:{display:"flex",flexDirection:"column",gap:8,marginBottom:14},
  payMethodCard:{display:"flex",alignItems:"center",gap:12,background:"#fff",border:"1.5px solid #e8ddd5",borderRadius:14,padding:"14px",cursor:"pointer"},
  payMethodActive:{border:"1.5px solid #c0392b",background:"#fff5f0"},
  payMethodIcon:{fontSize:26,width:42,height:42,background:"#f8fafc",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"},
  payMethodLabel:{fontSize:14,fontWeight:700,color:"#222"},
  payMethodSub:{fontSize:11,color:"#aaa",marginTop:2},
  payMethodRadio:{width:20,height:20,borderRadius:10,border:"2px solid #ddd",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#c0392b",fontWeight:900},
  payMethodRadioOn:{border:"2px solid #c0392b",background:"#fff5f0"},
  cardFormBox:{background:"#f9f9f9",borderRadius:12,padding:"16px",marginTop:8},
  orderSummary:{background:"#fff",borderRadius:14,padding:"16px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)",marginBottom:12},
  orderRow:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10},
  orderLabel:{fontSize:13,color:"#888"},
  orderVal:{fontSize:14,fontWeight:700,color:"#333"},
  orderDivider:{height:1,background:"#f0e8df",margin:"8px 0"},
  cancelPayBtn:{width:"100%",background:"none",border:"none",color:"#aaa",fontSize:13,padding:"10px",cursor:"pointer",marginTop:4},
  // Photo upload
  photoUploadRow:{display:"flex",gap:8},
  photoUploadBox:{flex:1,border:"2px dashed #e8ddd5",borderRadius:12,padding:"16px 8px",textAlign:"center",cursor:"pointer",background:"#fafafa"},
  // Modal
  overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100},
  modal:{background:"#fff",borderRadius:"24px 24px 0 0",padding:"24px 20px 36px",width:"100%",maxWidth:430},
  modalHeaderRow:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4},
  modalCloseBtn:{background:"none",border:"none",fontSize:18,color:"#aaa",cursor:"pointer",padding:"4px 8px"},
  planRow:{display:"flex",gap:12,marginBottom:16},
  planOpt:{flex:1,background:"#fdf6ee",borderRadius:14,padding:"16px 12px",textAlign:"center",border:"2px solid transparent"},
  bestBadge:{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:"#c0392b",color:"#fff",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:10,whiteSpace:"nowrap"},
  timeChip:{flex:1,padding:"8px 0",border:"1.5px solid #e8ddd5",borderRadius:20,background:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",color:"#555"},
  termsUpdated:{fontSize:11,color:"#aaa",marginBottom:12},
  termsSectionNav:{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"},
  termsSectionBtn:{width:28,height:28,borderRadius:14,border:"1.5px solid #e8ddd5",background:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",color:"#888"},
  termsSectionActive:{background:"#c0392b",color:"#fff",borderColor:"#c0392b"},
  termsSectionTitle:{fontSize:15,fontWeight:800,color:"#c0392b",marginBottom:12},
  termsContent:{fontSize:13,color:"#555",lineHeight:1.8,whiteSpace:"pre-line"},
  termsNavRow:{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:16,paddingTop:12,borderTop:"1px solid #f0e8df"},
  termsNavBtn:{background:"none",border:"none",color:"#c0392b",fontSize:13,fontWeight:700,cursor:"pointer"},
  // ── Map styles ──
  mapRegionBar:{display:"flex",gap:6,overflowX:"auto",padding:"10px 16px",background:"#fff",borderBottom:"1px solid #f0e8df"},
  mapRegionBtn:{padding:"5px 12px",borderRadius:20,border:"1.5px solid #e8ddd5",background:"#fff",fontSize:12,whiteSpace:"nowrap",cursor:"pointer",color:"#666",fontWeight:500},
  mapRegionActive:{background:"#c0392b",color:"#fff",borderColor:"#c0392b"},
  mapLegendRow:{display:"flex",gap:12,padding:"8px 16px",background:"#fff",borderBottom:"1px solid #f0e8df"},
  mapLegendItem:{display:"flex",alignItems:"center",gap:4},
  mapLegendDot:{width:10,height:10,borderRadius:5},
  mapWrapper:{width:"100%",height:420,overflow:"hidden",background:"#a8d8ed",position:"relative"},
  mapPopup:{background:"#fff",borderRadius:12,padding:"10px",boxShadow:"0 8px 24px rgba(0,0,0,0.18)",border:"1px solid #f0e8df"},
  mapPopupTail:{width:0,height:0,borderLeft:"7px solid transparent",borderRight:"7px solid transparent",borderTop:"9px solid #fff",margin:"0 auto",filter:"drop-shadow(0 2px 2px rgba(0,0,0,0.08))"},
  mapPopupBtn:{background:"#c0392b",color:"#fff",border:"none",borderRadius:16,padding:"5px 10px",fontSize:11,fontWeight:700,cursor:"pointer"},
  mapPinBadge:{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:8},
  mapStatsRow:{display:"flex",background:"#fff",borderTop:"1px solid #f0e8df",padding:"10px 16px",gap:16},
  mapStatItem:{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#555"},
  mapStatDot:{width:8,height:8,borderRadius:4},
  // ── Messaging styles ──
  convCard:{background:"#fff",borderRadius:14,padding:"14px",marginBottom:10,boxShadow:"0 2px 8px rgba(0,0,0,0.05)",cursor:"pointer",display:"flex",alignItems:"center",gap:12},
  convAvatar:{fontSize:28,width:48,height:48,background:"#fff5f0",borderRadius:24,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  convName:{fontSize:14,fontWeight:800,color:"#222"},
  convStall:{fontSize:11,color:"#c0392b",marginBottom:3},
  convLast:{fontSize:12,color:"#888",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:200},
  convTime:{fontSize:11,color:"#aaa"},
  unreadDot:{width:20,height:20,borderRadius:10,background:"#ef4444",color:"#fff",fontSize:11,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  unreadBadgeLg:{background:"#fef2f2",color:"#ef4444",fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20},
  // Chat
  chatHeader:{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",background:"#fff",borderBottom:"1px solid #f0e8df"},
  chatBackBtn:{background:"none",border:"none",fontSize:20,color:"#c0392b",cursor:"pointer",padding:"0 8px 0 0"},
  chatAvatar:{fontSize:22,width:38,height:38,background:"#fff5f0",borderRadius:19,display:"flex",alignItems:"center",justifyContent:"center"},
  chatOnline:{fontSize:11,color:"#22c55e",fontWeight:700,whiteSpace:"nowrap"},
  chatBody:{flex:1,overflowY:"auto",padding:"16px",background:"#f8f4ef"},
  chatDateSep:{textAlign:"center",fontSize:11,color:"#aaa",margin:"0 0 14px",position:"relative"},
  msgRow:{display:"flex",gap:8,marginBottom:12,alignItems:"flex-end"},
  msgRowMe:{flexDirection:"row-reverse"},
  msgAvatar:{fontSize:18,width:30,height:30,background:"#fff5f0",borderRadius:15,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  msgBubble:{padding:"10px 14px",borderRadius:18,fontSize:13,lineHeight:1.5,maxWidth:"100%",wordBreak:"break-word"},
  msgBubbleOther:{background:"#fff",color:"#222",borderBottomLeftRadius:4,boxShadow:"0 1px 4px rgba(0,0,0,0.06)"},
  msgBubbleMe:{background:"#c0392b",color:"#fff",borderBottomRightRadius:4},
  msgTime:{fontSize:10,color:"#aaa",marginTop:4,paddingLeft:4,paddingRight:4},
  quickReplyRow:{display:"flex",gap:6,flexWrap:"wrap",marginTop:8},
  quickReplyBtn:{background:"#fff",border:"1.5px solid #e8ddd5",borderRadius:20,padding:"6px 12px",fontSize:11,color:"#555",cursor:"pointer",fontWeight:500},
  chatInputBar:{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"#fff",borderTop:"1px solid #f0e8df"},
  chatInputExtra:{width:34,height:34,borderRadius:17,background:"#f3f4f6",border:"none",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  chatInput:{flex:1,border:"1.5px solid #e8ddd5",borderRadius:20,padding:"8px 14px",fontSize:13,outline:"none",background:"#f9f9f9"},
  chatSendBtn:{width:36,height:36,borderRadius:18,background:"#e5e7eb",color:"#aaa",border:"none",fontSize:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  chatSendBtnActive:{background:"#c0392b",color:"#fff"},
  toast:{position:"fixed",top:70,left:"50%",transform:"translateX(-50%)",background:"#22c55e",color:"#fff",padding:"11px 22px",borderRadius:30,fontSize:13,fontWeight:700,zIndex:200,boxShadow:"0 4px 20px rgba(0,0,0,0.15)",whiteSpace:"nowrap",maxWidth:"90vw"},
};

const css=`
  .card-hover:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.1)!important;}
  *{box-sizing:border-box;}
  ::-webkit-scrollbar{display:none;}
  .fadeUp{animation:fadeUp 0.8s ease forwards;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
  .mapPulse{animation:mapPulseAnim 1.8s ease-in-out infinite;}
  @keyframes mapPulseAnim{0%,100%{r:12;opacity:0.3;}50%{r:18;opacity:0.1;}}
`;
