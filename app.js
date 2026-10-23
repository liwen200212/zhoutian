/* ============================================================
   周天 · 二十四节气
   —— 太阳位置与昼长均为实时计算，不查表
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- 数据 ---------------- */
  var ST = [
    {n:"立春",l:315,c:"气温回升，乍暖还寒，华北仍多寒潮",h:"东风解冻 · 蛰虫始振 · 鱼陟负冰",g:"修农具、备春耕，耕牛试犁",s:"咬春：春饼、萝卜",y:"立，始建也。春气始而建立也。"},
    {n:"雨水",l:330,c:"降水渐多，雪转为雨，江南入春",h:"獭祭鱼 · 候雁北 · 草木萌动",g:"兴修水利，筹备春灌",s:"罐罐肉、春笋",y:"东风既解冻，则散而为雨水矣。"},
    {n:"惊蛰",l:345,c:"雷声始鸣，气温快步回升，虫醒草长",h:"桃始华 · 仓庚鸣 · 鹰化为鸠",g:"春耕开始，防病虫害",s:"吃梨润燥、炒虫",y:"万物出乎震，震为雷，故曰惊蛰。"},
    {n:"春分",l:0,c:"昼夜等长，全国普遍回暖，江南多雨",h:"玄鸟至 · 雷乃发声 · 始电",g:"春播春管，南北皆忙",s:"竖蛋、春菜、太阳糕",y:"分者，半也。此当九十日之半，故谓之分。"},
    {n:"清明",l:15,c:"气清景明，雨水增多，南北温差缩小",h:"桐始华 · 田鼠化为鴽 · 虹始见",g:"采茶、植树、插柳",s:"青团、寒食",y:"万物齐乎巽，物至此时，皆以洁齐而清明矣。"},
    {n:"谷雨",l:30,c:"雨量充沛，空气湿度大，南方入雨季",h:"萍始生 · 鸣鸠拂其羽 · 戴胜降于桑",g:"播种移苗，采摘春茶",s:"谷雨茶、香椿",y:"言雨生百谷也。"},
    {n:"立夏",l:45,c:"日照增强，气温显著升高，作物旺长",h:"蝼蝈鸣 · 蚯蚓出 · 王瓜生",g:"夏收作物管理，防旱",s:"立夏蛋、尝三新",y:"夏，假也，物至此时皆假大也。"},
    {n:"小满",l:60,c:"雨水丰沛，江河渐满，华南前汛期",h:"苦菜秀 · 靡草死 · 麦秋至",g:"麦类灌浆，稻田插秧",s:"苦菜、麦仁",y:"小满者，物至于此小得盈满。"},
    {n:"芒种",l:75,c:"高温高湿，梅雨将至，长江中下游入梅",h:"螳螂生 · 鵙始鸣 · 反舌无声",g:"抢收抢种，一年最忙",s:"煮梅、青梅酒",y:"言有芒之谷可稼种矣。"},
    {n:"夏至",l:90,c:"北半球昼最长，太阳最高，对流雨频繁",h:"鹿角解 · 蜩始鸣 · 半夏生",g:"夏管夏种，防涝防旱",s:"夏至面、麦粽",y:"万物于此皆假大而至极也。周代已有祭地之礼。"},
    {n:"小暑",l:105,c:"出梅入伏，高温酷热，雷雨台风增多",h:"温风至 · 蟋蟀居宇 · 鹰始鸷",g:"伏前备耕，防高温热害",s:"食新、吃藕、伏面",y:"暑，热也。月初为小，今则热气犹小也。"},
    {n:"大暑",l:120,c:"一年最热，湿热交蒸，台风暴雨频发",h:"腐草为萤 · 土润溽暑 · 大雨时行",g:"双抢高峰，防台风暴雨",s:"荔枝、仙草、伏茶",y:"月中为大，今则热气犹大也。"},
    {n:"立秋",l:135,c:"暑气未消，秋老虎当令，昼夜温差渐大",h:"凉风至 · 白露降 · 寒蝉鸣",g:"中稻抽穗，追肥",s:"贴秋膘、啃秋",y:"秋，揪也，物于此而揪敛也。"},
    {n:"处暑",l:150,c:"暑气终结，秋高气爽，华西秋雨",h:"鹰乃祭鸟 · 天地始肃 · 禾乃登",g:"防秋旱，准备秋收",s:"吃鸭、煎药茶",y:"处，止也，暑气至此而止矣。"},
    {n:"白露",l:165,c:"昼夜温差加大，露凝为白，秋凉渐显",h:"鸿雁来 · 玄鸟归 · 群鸟养羞",g:"秋收秋种，采摘棉花",s:"白露茶、米酒",y:"水土湿气凝而为露，秋属金，金色白，而气始寒也。"},
    {n:"秋分",l:180,c:"昼夜再等长，秋色平分，北方秋收",h:"雷始收声 · 蛰虫坯户 · 水始涸",g:"秋收、秋耕、秋种三秋",s:"秋菜、桂花糕",y:"分者，平也，阴阳相半也。今为中国农民丰收节。"},
    {n:"寒露",l:195,c:"气温更低，露水将凝，北方初霜",h:"鸿雁来宾 · 雀入大水为蛤 · 菊有黄华",g:"播种小麦，收晚稻",s:"菊花酒、芝麻",y:"露气寒冷，将凝结也。"},
    {n:"霜降",l:210,c:"初霜出现，草木黄落，深秋转冬",h:"豺乃祭兽 · 草木黄落 · 蛰虫咸俯",g:"抢收，防霜冻",s:"柿子、鸭子、萝卜",y:"气肃而凝，露结为霜矣。"},
    {n:"立冬",l:225,c:"气温骤降，北方入冬，水面始冰",h:"水始冰 · 地始冻 · 雉入大水为蜃",g:"冬耕冬灌，储粮收藏",s:"饺子、羊肉汤",y:"冬，终也，万物收藏也。"},
    {n:"小雪",l:240,c:"初雪飘落，天气阴冷，北方封冻",h:"虹藏不见 · 天气上升地气下降 · 闭塞而成冬",g:"积肥、防寒、修水利",s:"腊肉、糍粑",y:"雨下而为寒气所薄，故凝而为雪。小者未盛之辞。"},
    {n:"大雪",l:255,c:"降雪增多，天寒地冻，北方千里冰封",h:"鹖鴠不鸣 · 虎始交 · 荔挺出",g:"大棚保温，牲畜防寒",s:"红薯粥、腌肉",y:"至此而雪盛矣。"},
    {n:"冬至",l:270,c:"昼最短夜最长，数九寒天由此开始",h:"蚯蚓结 · 麋角解 · 水泉动",g:"冬管冬藏，防冻保墒",s:"饺子（北）、汤圆（南）",y:"阴极之至，阳气始生。周人以冬至为岁首，圭表测影定冬至。"},
    {n:"小寒",l:285,c:"进入三九，多为一年最冷时段",h:"雁北乡 · 鹊始巢 · 雉始雊",g:"防冻保墒，检修备耕",s:"腊八粥、糯米饭",y:"月初寒尚小，故云。冷在三九，三九正在小寒。"},
    {n:"大寒",l:300,c:"寒气逆极，冰天雪地，寒潮频繁",h:"鸡始乳 · 征鸟厉疾 · 水泽腹坚",g:"年终积肥，筹备春耕",s:"糯米饭、八宝饭",y:"至此栗烈已极。一年最后一个节气，循环将始。"}
  ];

  var DEG = Math.PI / 180;
  var TILT_DEFAULT = 23.44;
  var LAT_BJ = 39.9 * DEG;

  /* ---------------- 天文 ---------------- */
  function declination(lamDeg, tiltDeg) {
    return Math.asin(Math.sin(tiltDeg * DEG) * Math.sin(lamDeg * DEG));
  }
  function daylight(lamDeg, lat, tiltDeg) {
    var d = declination(lamDeg, tiltDeg);
    var c = -Math.tan(lat) * Math.tan(d);
    if (c <= -1) return 24;
    if (c >= 1) return 0;
    return 2 * Math.acos(c) / DEG / 15;
  }
  function solarLongitude(jd) {
    var T = (jd - 2451545.0) / 36525;
    var L0 = (280.46646 + 36000.76983 * T + 0.0003032 * T * T) % 360;
    var M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) % 360;
    var C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * DEG) +
      (0.019993 - 0.000101 * T) * Math.sin(2 * M * DEG) +
      0.000289 * Math.sin(3 * M * DEG);
    var omega = 125.04 - 1934.136 * T;
    return (L0 + C - 0.00569 - 0.00478 * Math.sin(omega * DEG) + 360) % 360;
  }
  function dateToJulian(d) { return d.getTime() / 86400000 + 2440587.5; }
  function julianToDate(j) { return new Date((j - 2440587.5) * 86400000); }
  var TERM_GUESS = [0,21208,42467,63836,85337,107014,128867,150921,173149,
    195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,
    419210,440795,462224,483532,504758];
  function solarTermTime(year, lam) {
    var idx = ((lam - 285 + 360) % 360) / 15;
    var guess = new Date(Date.UTC(1900, 0, 6, 2, 5) +
      31556925974.7 * (year - 1900) + TERM_GUESS[idx] * 60000);
    var lo = dateToJulian(new Date(guess.getTime() - 5 * 86400000));
    var hi = dateToJulian(new Date(guess.getTime() + 5 * 86400000));
    for (var i = 0; i < 54; i++) {
      var mid = (lo + hi) / 2;
      var delta = (solarLongitude(mid) - lam + 360) % 360;
      if (delta > 180) lo = mid; else hi = mid;
    }
    return julianToDate((lo + hi) / 2);
  }
  function yearSchedule(year) {
    return ST.map(function (st, index) {
      return {name:st.n, lam:st.l, index:index, time:solarTermTime(year, st.l)};
    }).sort(function (a, b) { return a.time - b.time; });
  }
  function pad2(n) { return n < 10 ? "0" + n : String(n); }
  function chinaParts(d) {
    var x = new Date(d.getTime() + 8 * 3600000);
    return {
      year:x.getUTCFullYear(), month:x.getUTCMonth() + 1, day:x.getUTCDate(),
      hour:x.getUTCHours(), minute:x.getUTCMinutes()
    };
  }
  function chinaKey(d) {
    var p = chinaParts(d);
    return p.year + "-" + pad2(p.month) + "-" + pad2(p.day);
  }
  function termDateLabel(d, withYear) {
    var p = chinaParts(d);
    return (withYear ? p.year + "." : "") + pad2(p.month) + "." + pad2(p.day);
  }
  function termClock(d) {
    var p = chinaParts(d);
    return pad2(p.hour) + ":" + pad2(p.minute);
  }

  /* ---------------- 工具 ---------------- */
  function $(id) { return document.getElementById(id); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }

  function hexToRgb(h) {
    h = (h || "").trim();
    if (h.charAt(0) === "#") {
      if (h.length === 4) h = "#" + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
      var n = parseInt(h.slice(1), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    var m = h.match(/(\d+)[^\d]+(\d+)[^\d]+(\d+)/);
    return m ? [+m[1], +m[2], +m[3]] : [200, 200, 200];
  }
  function rgba(c, a) {
    var p = hexToRgb(c);
    return "rgba(" + p[0] + "," + p[1] + "," + p[2] + "," + a + ")";
  }
  function fade(c) {
    var p = hexToRgb(c);
    return "rgba(" + p[0] + "," + p[1] + "," + p[2] + ",0)";
  }
  function mix(a, b, t) {
    var A = hexToRgb(a), B = hexToRgb(b);
    return "rgb(" + Math.round(lerp(A[0], B[0], t)) + "," +
                    Math.round(lerp(A[1], B[1], t)) + "," +
                    Math.round(lerp(A[2], B[2], t)) + ")";
  }
  function rnd(i) {
    var x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  var C = {};
  function refreshColors() {
    var cs = getComputedStyle(document.body);
    ["--bg","--bg2","--ring","--ring2","--ink","--muted","--accent","--sun1","--sun2",
     "--warm","--cool","--mount1","--mount2","--mount3"].forEach(function (k) {
      C[k] = cs.getPropertyValue(k).trim() || "#888";
    });
  }

  /* ---------------- 场景 ---------------- */
  var canvas = $("scene");
  var ctx = canvas.getContext("2d");
  var stage = $("stage");

  var S = {
    w: 0, h: 0, dpr: 1,
    yaw: -0.52, pitch: 0.97, dist: 2.92,
    yawT: -0.52, pitchT: 0.97, distT: 2.92,
    t: 0, tDisp: 0, sel: 0,
    playing: false, entered: false,
    drag: false, lastX: 0, lastY: 0,
    markers: [], time: 0, hover: -1
  };
  var stars = [];

  function buildStars() {
    stars = [];
    for (var i = 0; i < 260; i++) {
      stars.push({x: rnd(i * 3 + 1), y: rnd(i * 7 + 5), r: 0.4 + rnd(i * 11) * 1.5,
                  a: 0.18 + rnd(i * 13) * 0.62, p: rnd(i * 17) * 6.283});
    }
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    S.dpr = Math.min(window.devicePixelRatio || 1, 2);
    S.w = Math.max(240, Math.round(r.width));
    S.h = Math.max(180, Math.round(r.height));
    canvas.width = Math.round(S.w * S.dpr);
    canvas.height = Math.round(S.h * S.dpr);
    if (C["--bg"]) render();
  }

  function project(p) {
    var cy = Math.cos(-S.yaw), sy = Math.sin(-S.yaw);
    var x1 = p.x * cy + p.z * sy;
    var z1 = -p.x * sy + p.z * cy;
    var cx = Math.cos(-S.pitch), sx = Math.sin(-S.pitch);
    var y1 = p.y * cx - z1 * sx;
    var z2 = p.y * sx + z1 * cx;
    var zc = z2 + S.dist;
    var isNarrow = S.w <= 900;
    var panelW = 0;
    if (!isNarrow && panel && !panel.classList.contains("hide")) {
      panelW = clamp(S.w * 0.24, 280, 344) + 56;
    }
    var vw = Math.max(240, S.w - panelW);
    var focal = isNarrow ? Math.min(vw, S.h) * 0.94 : Math.min(vw, S.h) * 1.02;
    var s = focal / Math.max(zc, 0.2);
    return {x: vw * (isNarrow ? 0.5 : 0.62) + x1 * s,
            y: S.h * (isNarrow ? 0.44 : 0.42) - y1 * s, s: s, z: zc};
  }

  // 在黄道环与赤道环的交点处标注 23.44°——节气存在的几何原因
  function drawTiltAnnotation() {
    var eps = TILT_DEFAULT * DEG;
    var r = 0.30, segs = 26, pts = [], i, a, q;
    for (i = 0; i <= segs; i++) {
      a = (i / segs) * eps;
      q = project({x: 1, y: -Math.sin(a) * r, z: Math.cos(a) * r});
      pts.push(q);
    }
    if (pts[segs].z > S.dist) return;
    ctx.save();
    ctx.strokeStyle = C["--accent"];
    ctx.globalAlpha = 0.8;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (i = 0; i < pts.length; i++) {
      if (i === 0) ctx.moveTo(pts[i].x, pts[i].y); else ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();
    var mx = pts[0].x - (pts[0].x - pts[segs].x) * 0.5;
    var my = pts[0].y - (pts[0].y - pts[segs].y) * 0.5;
    ctx.globalAlpha = 1;
    ctx.fillStyle = C["--accent"];
    ctx.font = '400 14px "Baskerville","Iowan Old Style",Georgia,serif';
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("23.44°", mx + 13, my - 8);
    ctx.restore();
  }

  function eclipticPoint(lamDeg, r) {
    var u = lamDeg * DEG;
    return {x: Math.cos(u) * r, y: -Math.sin(u) * Math.sin(TILT_DEFAULT * DEG) * r,
            z: Math.sin(u) * Math.cos(TILT_DEFAULT * DEG) * r};
  }

  function ringPoint(kind, a, r) {
    if (kind === "eq") return {x: Math.cos(a) * r, y: 0, z: Math.sin(a) * r};
    if (kind === "mer") return {x: 0, y: Math.cos(a) * r, z: Math.sin(a) * r};
    return eclipticPoint(a / DEG, r);
  }

  // 前半个环亮、后半个环暗，做出纵深
  function drawRing(kind, color, width, alpha, glow) {
    var n = 200, pts = [], i, q;
    for (i = 0; i <= n; i++) {
      q = project(ringPoint(kind, i / n * Math.PI * 2, 1));
      pts.push({x: q.x, y: q.y, front: q.z <= S.dist});
    }
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(0.6, width * 0.85);
    ctx.globalAlpha = alpha * 0.38;
    ctx.beginPath();
    for (i = 0; i < pts.length; i++) {
      if (i === 0) ctx.moveTo(pts[i].x, pts[i].y); else ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();

    ctx.globalAlpha = alpha;
    ctx.lineWidth = width;
    if (glow) { ctx.shadowColor = color; ctx.shadowBlur = 9; }
    var drawing = false;
    ctx.beginPath();
    for (i = 0; i < pts.length; i++) {
      if (pts[i].front) {
        if (!drawing) { ctx.moveTo(pts[i].x, pts[i].y); drawing = true; }
        else ctx.lineTo(pts[i].x, pts[i].y);
      } else if (drawing) {
        ctx.stroke();
        ctx.beginPath();
        drawing = false;
      }
    }
    if (drawing) ctx.stroke();
    ctx.restore();
  }

  function drawMountains() {
    var layers = [
      {y: 0.80, amp: 0.085, col: C["--mount3"], al: 0.55, f: 0.9},
      {y: 0.87, amp: 0.065, col: C["--mount2"], al: 0.75, f: 1.5},
      {y: 0.94, amp: 0.048, col: C["--mount1"], al: 0.95, f: 2.2}
    ];
    for (var k = 0; k < layers.length; k++) {
      var L = layers[k], base = S.h * L.y, amp = S.h * L.amp;
      ctx.save();
      ctx.globalAlpha = L.al;
      ctx.fillStyle = L.col;
      ctx.beginPath();
      ctx.moveTo(0, S.h);
      for (var x = 0; x <= S.w; x += 6) {
        var u = x / S.w * 6.283;
        var y = base - amp * (0.52 * Math.sin(u * L.f + k * 2.1) +
                              0.30 * Math.sin(u * L.f * 2.3 + k * 1.3) +
                              0.18 * Math.sin(u * L.f * 4.1 + k * 3.7));
        ctx.lineTo(x, y);
      }
      ctx.lineTo(S.w, S.h);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  function currentLam() {
    var t = S.tDisp;
    var fi = Math.floor(t);
    var i = ((fi % 24) + 24) % 24;
    var f = t - fi;
    var a = ST[i].l, b = ST[(i + 1) % 24].l;
    var d = (b - a + 360) % 360;
    return (a + d * f) % 360;
  }

  function render() {
    var w = S.w, h = S.h;
    ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var lam = currentLam();
    var warmth = (Math.sin(lam * DEG) + 1) / 2;

    var g = ctx.createRadialGradient(w * 0.5, h * 0.72, 20, w * 0.5, h * 0.55, Math.max(w, h) * 0.95);
    g.addColorStop(0, mix(C["--bg"], warmth > 0.5 ? C["--warm"] : C["--cool"], 0.30));
    g.addColorStop(0.55, C["--bg"]);
    g.addColorStop(1, C["--bg"]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // 星
    ctx.save();
    for (var i = 0; i < stars.length; i++) {
      var st = stars[i];
      var tw = 0.62 + 0.38 * Math.sin(S.time * 0.7 + st.p);
      ctx.globalAlpha = st.a * tw * (document.body.getAttribute("data-pal") === "paper" ? 0.4 : 1);
      ctx.fillStyle = C["--ink"];
      ctx.beginPath();
      ctx.arc(st.x * w, st.y * h * 0.72, st.r, 0, 6.283);
      ctx.fill();
    }
    ctx.restore();

    // 三环
    drawRing("eq", C["--ring"], 1, 0.42);
    drawRing("mer", C["--ring2"], 1, 0.26);
    drawRing("ec", C["--ring"], 1.7, 0.95, true);
    drawTiltAnnotation();

    // 地轴
    var a1 = project({x: 0, y: -1.18, z: 0});
    var b1 = project({x: 0, y: 1.18, z: 0});
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = C["--ring2"];
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.beginPath(); ctx.moveTo(a1.x, a1.y); ctx.lineTo(b1.x, b1.y); ctx.stroke();
    ctx.restore();

    // 地球
    var e = project({x: 0, y: 0, z: 0});
    var er = Math.max(9, e.s * 0.072);
    var eg = ctx.createRadialGradient(e.x - er * 0.4, e.y - er * 0.4, er * 0.1, e.x, e.y, er);
    eg.addColorStop(0, rgba(C["--ring"], 0.55));
    eg.addColorStop(0.6, rgba(C["--ring2"], 0.22));
    eg.addColorStop(1, fade(C["--ring2"]));
    ctx.fillStyle = eg;
    ctx.beginPath(); ctx.arc(e.x, e.y, er, 0, 6.283); ctx.fill();
    ctx.strokeStyle = rgba(C["--ring"], 0.5);
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(e.x, e.y, er, 0, 6.283); ctx.stroke();

    drawMountains();

    // 太阳
    var sp = eclipticPoint(lam, 1);
    var sq = project(sp);
    var foot = project({x: sp.x, y: 0, z: sp.z});
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.strokeStyle = C["--ring2"];
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 5]);
    ctx.beginPath(); ctx.moveTo(sq.x, sq.y); ctx.lineTo(foot.x, foot.y); ctx.stroke();
    ctx.restore();

    var sr = Math.max(5, sq.s * 0.032);
    var sg = ctx.createRadialGradient(sq.x, sq.y, 0, sq.x, sq.y, sr * 7);
    sg.addColorStop(0, C["--sun1"]);
    sg.addColorStop(0.16, C["--sun2"]);
    sg.addColorStop(1, fade(C["--sun2"]));
    ctx.fillStyle = sg;
    ctx.beginPath(); ctx.arc(sq.x, sq.y, sr * 7, 0, 6.283); ctx.fill();
    ctx.fillStyle = C["--sun1"];
    ctx.beginPath(); ctx.arc(sq.x, sq.y, sr, 0, 6.283); ctx.fill();

    // 节气刻度
    S.markers = [];
    var MAJOR = {0:1, 3:1, 6:1, 9:1, 12:1, 15:1, 18:1, 21:1};
    for (var k = 0; k < 24; k++) {
      var L = ST[k].l;
      var base = eclipticPoint(L, 1);
      var out = eclipticPoint(L, 1.11);
      var q = project(base), qo = project(out);
      S.markers.push({x: q.x, y: q.y, i: k});
      var on = (k === S.sel);
      var hov = (k === S.hover);
      ctx.save();
      ctx.globalAlpha = on ? 1 : hov ? 0.95 : 0.55;
      ctx.strokeStyle = on ? C["--accent"] : C["--ring"];
      ctx.lineWidth = on ? 2 : 1;
      ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(qo.x, qo.y); ctx.stroke();
      if (on) {
        ctx.fillStyle = C["--accent"];
        ctx.beginPath(); ctx.arc(q.x, q.y, 3.6, 0, 6.283); ctx.fill();
      }
      ctx.restore();

      if (on || hov || MAJOR[k]) {
        ctx.save();
        ctx.globalAlpha = on ? 1 : hov ? 0.95 : 0.7;
        ctx.fillStyle = on ? C["--ink"] : C["--muted"];
        ctx.font = (on ? "500 14.5px " : "14px ") +
          '"Songti SC","STSong","Source Han Serif SC",serif';
        ctx.textAlign = qo.x >= q.x ? "left" : "right";
        ctx.textBaseline = "middle";
        ctx.fillText(ST[k].n, qo.x + (qo.x >= q.x ? 5 : -5), qo.y);
        ctx.restore();
      }
    }
  }

  /* ---------------- 面板 ---------------- */
  var elTerm = $("termName"), elIdx = $("idx"), elLam = $("lam"), elGloss = $("gloss");
  var elTermDate = $("termDate"), panelNo = $("panelNo"), panelDate = $("panelDate");
  var mobileCurrent = $("mobileCurrent");
  var mDec = $("mDec"), mDay = $("mDay"), mHou = $("mHou");
  var pOrigin = $("pOrigin"), pWeather = $("pWeather"), pHou = $("pHou");
  var pWork = $("pWork"), pFood = $("pFood"), pSource = $("pSource");
  var activeYear = new Date().getFullYear();
  var schedule = yearSchedule(activeYear);
  var firstPanelUpdate = true;

  function retrigger(el, cls) {
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  function updatePanel() {
    var st = ST[S.sel];
    var d = declination(st.l, TILT_DEFAULT) / DEG;
    var day = daylight(st.l, LAT_BJ, TILT_DEFAULT);
    var hem = d >= 0 ? "北纬 " : "南纬 ";

    elTerm.textContent = st.n;
    elIdx.textContent = pad2(S.sel + 1);
    elLam.textContent = st.l;
    elGloss.textContent = st.y;
    var selectedRecord = schedule.filter(function (item) { return item.index === S.sel; })[0];
    var stTime = selectedRecord ? selectedRecord.time : solarTermTime(activeYear, st.l);
    elTermDate.textContent = termDateLabel(stTime, true) + " · " + termClock(stTime);
    panelNo.textContent = pad2(S.sel + 1);
    panelDate.textContent = termDateLabel(stTime, false) + " / " + st.l + "°";
    mDec.textContent = hem + Math.abs(d).toFixed(1) + "°";
    mDay.textContent = day.toFixed(1) + " 小时";
    mHou.textContent = st.h;

    pOrigin.textContent = "太阳的视黄经到达 " + st.l + "° 时，就是" + st.n +
      "。可以把它理解为太阳走到黄道刻度盘的第 " + (S.sel + 1) + " 格；此刻太阳直射" +
      hem + Math.abs(d).toFixed(1) + "度。";
    pWeather.textContent = st.c + "。";
    pHou.textContent = "三候：" + st.h;
    pWork.textContent = st.g + "。";
    pFood.textContent = "食俗：" + st.s;
    pSource.textContent = "释义与史事：" + st.y;
    mobileCurrent.textContent = st.n;
    mobileCurrent.setAttribute("aria-label", "当前节气" + st.n + "，回到天球");

    if (!firstPanelUpdate) {
      retrigger(elTerm, "swap");
      retrigger(elTermDate, "swap");
      retrigger(elGloss, "swap");
    }
    firstPanelUpdate = false;
    syncTableSelection();
    drawGnomon();
    setTimeout(syncPanelHint, 40);
    drawAtlas();
  }

  function syncTimeline() {
    var btns = document.querySelectorAll(".rl");
    for (var k = 0; k < btns.length; k++) {
      btns[k].setAttribute("aria-pressed", k === S.sel ? "true" : "false");
      btns[k].classList.toggle("on", k === S.sel);
    }
  }

  function select(i, silent) {
    S.sel = ((i % 24) + 24) % 24;
    var tgt = S.sel;
    var d = ((tgt - S.tDisp + 12 + 24) % 24) - 12;
    S.t = S.tDisp + d;
    updatePanel();
    syncTimeline();
    if (!silent) {
      hideGuide(true);
      S.playing = false;
      syncPlay();
      if (history.replaceState) history.replaceState(null, "", "#term-" + (S.sel + 1));
    }
  }

  /* ---------------- 时间轴 ---------------- */
  var timeline = $("timeline");
  (function buildTimeline() {
    var frag = document.createDocumentFragment();
    var MAJOR_IDX = {0:1, 3:1, 6:1, 9:1, 12:1, 15:1, 18:1, 21:1};
    for (var i = 0; i < 24; i++) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "rl" + (MAJOR_IDX[i] ? " major" : "");
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", ST[i].n);
      b.innerHTML = "<b>" + ST[i].n + "</b>";
      b.addEventListener("click", (function (idx) {
        return function () { select(idx); };
      })(i));
      b.addEventListener("mouseenter", (function (idx) {
        return function () { S.hover = idx; };
      })(i));
      b.addEventListener("mouseleave", function () { S.hover = -1; });
      frag.appendChild(b);
    }
    timeline.appendChild(frag);
  })();

  /* ---------------- 岁时与今日 ---------------- */
  var nowBtn = $("nowBtn"), nowTerm = $("nowTerm"), nowNext = $("nowNext");
  var previousYearSchedule = yearSchedule(activeYear - 1);
  var currentTimeline = previousYearSchedule.concat(schedule, yearSchedule(activeYear + 1));
  var nowDate = new Date();
  var currentTerm = currentTimeline[0], nextTerm = currentTimeline[1];
  for (var ti = 0; ti < currentTimeline.length; ti++) {
    if (currentTimeline[ti].time <= nowDate) {
      currentTerm = currentTimeline[ti];
      nextTerm = currentTimeline[ti + 1] || currentTerm;
    } else {
      break;
    }
  }
  var nextDays = Math.max(0, Math.ceil((nextTerm.time - nowDate) / 86400000));
  nowTerm.textContent = currentTerm.name;
  nowNext.textContent = nextTerm === currentTerm ? "岁序正中" :
    "距" + nextTerm.name + " " + (nextDays < 1 ? "不足 1 天" : nextDays + " 天");
  nowBtn.setAttribute("aria-label", "今日" + currentTerm.name + "，查看节气释文");
  requestAnimationFrame(function () { nowBtn.classList.add("ready"); });
  nowBtn.addEventListener("click", function () {
    hideGuide(true);
    select(currentTerm.index);
    stage.scrollIntoView({behavior: reduce ? "auto" : "smooth", block: "start"});
  });

  /* ---------------- 首次体验引导 ---------------- */
  var guide = $("guide"), guideStart = $("guideStart"), guideSkip = $("guideSkip");
  var guideClose = $("guideClose"), guideSeenKey = "zhoutian-guide-seen";

  function guideWasSeen() {
    try { return sessionStorage.getItem(guideSeenKey) === "1"; }
    catch (err) { return false; }
  }
  function rememberGuide() {
    try { sessionStorage.setItem(guideSeenKey, "1"); }
    catch (err) { /* file protocol may restrict storage */ }
  }
  function showGuide() {
    if (guideWasSeen() || location.hash === "#table") return;
    guide.setAttribute("aria-hidden", "false");
    guide.classList.add("show");
    setTimeout(function () { guideStart.focus(); }, 120);
  }
  function hideGuide(remember) {
    var focusInside = guide.contains(document.activeElement);
    guide.classList.remove("show");
    guide.setAttribute("aria-hidden", "true");
    if (focusInside && playBtn) playBtn.focus({preventScroll: true});
    if (remember) rememberGuide();
  }
  guideStart.addEventListener("click", function () {
    hideGuide(true);
    startTour();
  });
  guideSkip.addEventListener("click", function () {
    hideGuide(true);
    $("atlas").scrollIntoView({behavior: reduce ? "auto" : "smooth", block: "start"});
  });
  guideClose.addEventListener("click", function () {
    hideGuide(true);
    playBtn.focus();
  });
  stage.addEventListener("pointerdown", function (e) {
    if (guide.classList.contains("show") && !e.target.closest(".guide")) hideGuide(true);
  });
  stage.addEventListener("wheel", function () {
    if (guide.classList.contains("show")) hideGuide(true);
  }, {passive: true});

  /* ---------------- 手机节气切换 ---------------- */
  $("mobilePrev").addEventListener("click", function () { select((S.sel + 23) % 24); });
  $("mobileNext").addEventListener("click", function () { select((S.sel + 1) % 24); });
  mobileCurrent.addEventListener("click", function () {
    stage.scrollIntoView({behavior: reduce ? "auto" : "smooth", block: "start"});
  });

  /* ---------------- 节气时刻表 ---------------- */
  var termDialog = $("termDialog"), termTable = $("termTable"), tableOpen = $("tableOpen");
  var tableClose = $("tableClose"), tableYear = $("tableYear");
  tableYear.textContent = activeYear;
  document.querySelectorAll(".hko-link").forEach(function (link) {
    link.href = "https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/" + activeYear + "e.pdf";
  });
  document.querySelectorAll(".hko-year").forEach(function (label) {
    label.textContent = activeYear;
  });
  var todayKey = chinaKey(new Date());
  var tableBuilt = false;

  function buildTermTable() {
    if (tableBuilt) return;
    var frag = document.createDocumentFragment();
    schedule.forEach(function (item) {
      var b = document.createElement("button");
      var dayLabel = termDateLabel(item.time, false);
      b.type = "button";
      b.className = "term-cell" + (chinaKey(item.time) === todayKey ? " today" : "");
      b.setAttribute("aria-label", dayLabel + " " + termClock(item.time) + " " + item.name);
      b.innerHTML = '<span class="tc-date">' + dayLabel + '</span>' +
        '<span class="tc-time">' + termClock(item.time) + '</span>' +
        '<span class="tc-name">' + item.name + '</span>' +
        '<span class="tc-lam">λ ' + item.lam + "°</span>";
      b.addEventListener("click", function () {
        select(item.index);
        closeTable();
        stage.scrollIntoView({behavior: reduce ? "auto" : "smooth", block: "start"});
      });
      frag.appendChild(b);
    });
    termTable.appendChild(frag);
    tableBuilt = true;
    syncTableSelection();
  }

  function syncTableSelection() {
    if (!termTable) return;
    var cells = termTable.querySelectorAll(".term-cell");
    for (var n = 0; n < cells.length; n++) {
      var on = n === S.sel;
      cells[n].classList.toggle("on", on);
      cells[n].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  function openTable() {
    if (termDialog.open) return;
    hideGuide(true);
    buildTermTable();
    if (typeof termDialog.showModal === "function") termDialog.showModal();
    else termDialog.setAttribute("open", "");
    tableClose.focus();
  }
  function closeTable() {
    if (typeof termDialog.close === "function" && termDialog.open) termDialog.close();
    else termDialog.removeAttribute("open");
    (window.innerWidth <= 560 ? $("mobileTable") : tableOpen).focus();
  }
  tableOpen.addEventListener("click", openTable);
  $("mobileTable").addEventListener("click", openTable);
  tableClose.addEventListener("click", closeTable);
  termDialog.addEventListener("click", function (e) {
    if (e.target === termDialog) closeTable();
  });
  termDialog.addEventListener("cancel", function (e) {
    e.preventDefault();
    closeTable();
  });

  /* ---------------- 播放 ---------------- */
  var playBtn = $("play"), playText = $("playText");
  function syncPlay() {
    playBtn.setAttribute("aria-pressed", S.playing ? "true" : "false");
    playBtn.setAttribute("aria-label", S.playing ? "暂停岁时流转" : "播放岁时流转");
    playText.textContent = S.playing ? "暂停" : "播放";
  }
  playBtn.addEventListener("click", function () {
    hideGuide(true);
    S.playing = !S.playing;
    if (S.playing) S.t = S.tDisp;
    syncPlay();
  });

  /* ---------------- 60 秒评委导览 ---------------- */
  var tour = $("tour"), tourOpen = $("tourOpen"), mobileTour = $("mobileTour");
  var tourTitle = $("tourTitle"), tourText = $("tourText"), tourStepNo = $("tourStepNo");
  var tourProgress = $("tourProgress"), tourPrev = $("tourPrev"), tourNext = $("tourNext");
  var tourClose = $("tourClose");
  var tourIndex = 0, tourActive = false, tourToken = 0;
  var tourSteps = [
    {
      title:"黄道就是时间轴",
      text:"二十四节气不是一组孤立卡片，而是太阳沿黄道每走 15° 留下的二十四格。",
      duration:8000,
      enter:function () {
        S.playing = false; syncPlay(); setFocusMode(false);
        stage.scrollIntoView({behavior: reduce ? "auto" : "smooth", block:"start"});
        setTourTerm(3);
      }
    },
    {
      title:"太阳移动，时间开始",
      text:"从春分走向夏至，太阳直射点北移，北京昼长由 12 小时增长到约 14.8 小时。",
      duration:9000,
      enter:function (token) {
        stage.scrollIntoView({behavior: reduce ? "auto" : "smooth", block:"start"});
        [3,4,5,6,7,8,9].forEach(function (idx, n) {
          scheduleTour(function () { setTourTerm(idx); }, 400 + n * 1250, token);
        });
      }
    },
    {
      title:"同一节气，三种昼长",
      text:"把视角拉到北纬 45.8°至 23.1°：哈尔滨的周年振幅最大，北京居中，广州最小；三地共享同一太阳赤纬。",
      duration:12000,
      enter:function (token) {
        tiltEl.value = "23.44";
        updateTilt();
        setAtlasLatitudes(true);
        $("atlas").scrollIntoView({behavior: reduce ? "auto" : "smooth", block:"start"});
        [3,9,15,21].forEach(function (idx, n) {
          scheduleTour(function () { setTourTerm(idx); }, 500 + n * 2700, token);
        });
      }
    },
    {
      title:"如果地轴不倾斜",
      text:"把地轴倾角从 23.44° 拉到 0°，太阳直射点不再南北移动，几何昼长曲线也随之被抹平。",
      duration:10000,
      enter:function (token) {
        $("lab").scrollIntoView({behavior: reduce ? "auto" : "smooth", block:"start"});
        tiltEl.value = "23.44";
        updateTilt();
        var startVal = 23.44, steps = 60;
        for (var i = 1; i <= steps; i++) {
          (function (value, delay) {
            scheduleTour(function () {
              tiltEl.value = String(value);
              updateTilt();
            }, delay, token);
          })(startVal * (1 - (i / steps)), 900 + i * 55);
        }
      }
    },
    {
      title:"古法测影，找到至日",
      text:"冬至正午太阳最低，表影最长。古人比较一年中的最长影与最短影，由此定位冬至和夏至。",
      duration:10000,
      enter:function (token) {
        tiltEl.value = "23.44"; updateTilt();
        $(".gnomon-grid").scrollIntoView({behavior: reduce ? "auto" : "smooth", block:"start"});
        setTourTerm(21);
        scheduleTour(function () { setTourTerm(9); }, 5200, token);
        scheduleTour(function () { setTourTerm(21); }, 9000, token);
      }
    },
    {
      title:"从一年，回到今天",
      text:"今日节令连接现实时间；节气日期与香港天文台年表逐项核对，时刻则明确标注为计算值。",
      duration:10000,
      enter:function (token) {
        tiltEl.value = "23.44"; updateTilt();
        stage.scrollIntoView({behavior: reduce ? "auto" : "smooth", block:"start"});
        setTourTerm(currentTerm.index);
        scheduleTour(function () {
          $(".evidence-strip").scrollIntoView({behavior: reduce ? "auto" : "smooth", block:"center"});
        }, 4600, token);
      }
    }
  ];

  function setTourTerm(index) {
    S.sel = index;
    S.t = S.tDisp = index;
    S.hover = -1;
    updatePanel();
    syncTimeline();
    drawLab();
    drawGnomon();
  }
  function scheduleTour(fn, delay, token) {
    setTimeout(function () {
      if (tourActive && token === tourToken) fn();
    }, delay);
  }
  function setTourStep(index) {
    if (!tourActive) return;
    tourIndex = clamp(index, 0, tourSteps.length - 1);
    tourToken += 1;
    var token = tourToken;
    var step = tourSteps[tourIndex];
    tourTitle.textContent = step.title;
    tourText.textContent = step.text;
    tourStepNo.textContent = pad2(tourIndex + 1) + " / " + pad2(tourSteps.length);
    tourPrev.disabled = tourIndex === 0;
    tourNext.textContent = tourIndex === tourSteps.length - 1 ? "完成" : "下一幕";
    tourProgress.style.transition = "none";
    tourProgress.style.width = "0";
    void tourProgress.offsetWidth;
    tourProgress.style.transition = "width " + step.duration + "ms linear";
    tourProgress.style.width = "100%";
    step.enter(token);
    scheduleTour(function () {
      if (tourIndex >= tourSteps.length - 1) finishTour();
      else setTourStep(tourIndex + 1);
    }, step.duration, token);
  }
  function startTour() {
    if (tourActive) {
      setTourStep(0);
      return;
    }
    hideGuide(true);
    if (termDialog.open) termDialog.close();
    setFocusMode(false);
    intro.classList.add("gone");
    intro.style.display = "none";
    S.entered = true;
    S.playing = false;
    syncPlay();
    tourActive = true;
    tourIndex = 0;
    tour.setAttribute("aria-hidden", "false");
    tour.classList.add("show");
    stage.classList.add("tour-mode");
    syncPanelHint();
    setTourStep(0);
    setTimeout(function () { if (tourActive) tourNext.focus({preventScroll: true}); }, 200);
  }
  function finishTour() {
    tourActive = false;
    tourToken += 1;
    tour.setAttribute("aria-hidden", "true");
    tour.classList.remove("show");
    stage.classList.remove("tour-mode");
    syncPanelHint();
    tiltEl.value = "23.44";
    updateTilt();
    var trigger = window.innerWidth <= 560 ? mobileTour : tourOpen;
    setTimeout(function () { trigger.focus({preventScroll: true}); }, 120);
  }
  tourOpen.addEventListener("click", startTour);
  mobileTour.addEventListener("click", startTour);
  tourClose.addEventListener("click", finishTour);
  tourPrev.addEventListener("click", function () { setTourStep(tourIndex - 1); });
  tourNext.addEventListener("click", function () {
    if (tourIndex >= tourSteps.length - 1) finishTour();
    else setTourStep(tourIndex + 1);
  });

  /* ---------------- 色谱 ---------------- */
  var palBtns = document.querySelectorAll(".pal");
  Array.prototype.forEach.call(palBtns, function (b) {
    b.addEventListener("click", function () {
      var p = b.getAttribute("data-pal");
      document.body.setAttribute("data-pal", p);
      Array.prototype.forEach.call(palBtns, function (o) {
        o.setAttribute("aria-pressed", o === b ? "true" : "false");
      });
      refreshColors();
    });
  });

  /* ---------------- 面板开关 ---------------- */
  var panel = $("panel"), toggle = $("togglePanel"), mobilePanel = $("mobilePanel");
  var panelMore = $("panelMore");
  function syncPanelHint() {
    var hasMore = panel.scrollHeight - panel.clientHeight > 18;
    var atEnd = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 12;
    panelMore.classList.toggle("show", hasMore && !atEnd && !panel.classList.contains("hide") && !tourActive);
  }
  toggle.addEventListener("click", function () {
    var hidden = panel.classList.toggle("hide");
    toggle.setAttribute("aria-expanded", hidden ? "false" : "true");
    mobilePanel.setAttribute("aria-expanded", hidden ? "false" : "true");
    mobilePanel.textContent = hidden ? "展开释文" : "释文";
    syncPanelHint();
  });
  mobilePanel.addEventListener("click", function () { toggle.click(); });
  panel.addEventListener("scroll", syncPanelHint, {passive:true});
  panelMore.addEventListener("click", function () {
    panel.scrollBy({top:Math.max(180, panel.clientHeight * 0.66), behavior:reduce ? "auto" : "smooth"});
  });

  /* ---------------- 沉浸模式 ---------------- */
  var immersive = $("immersive"), focusExit = $("focusExit"), focusTimer = 0;
  var mobileFocus = $("mobileFocus");
  function setFocusMode(on) {
    stage.classList.toggle("focus-mode", on);
    focusExit.setAttribute("aria-hidden", on ? "false" : "true");
    immersive.setAttribute("aria-pressed", on ? "true" : "false");
    mobileFocus.textContent = on ? "退出" : "沉浸";
    clearTimeout(focusTimer);
    focusExit.classList.remove("show");
    if (on) {
      focusTimer = setTimeout(function () { focusExit.classList.add("show"); }, 1800);
      stage.scrollIntoView({behavior: reduce ? "auto" : "smooth", block: "start"});
    }
  }
  immersive.addEventListener("click", function () {
    setFocusMode(!stage.classList.contains("focus-mode"));
  });
  focusExit.addEventListener("click", function () { setFocusMode(false); });
  mobileFocus.addEventListener("click", function () { setFocusMode(!stage.classList.contains("focus-mode")); });
  canvas.addEventListener("dblclick", function () {
    setFocusMode(!stage.classList.contains("focus-mode"));
  });

  /* ---------------- 指针 ---------------- */
  var pointers = new Map();
  var lastPinch = 0;

  canvas.addEventListener("pointerdown", function (e) {
    pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});
    if (pointers.size === 1) {
      S.drag = true; S.lastX = e.clientX; S.lastY = e.clientY;
    }
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
  });

  canvas.addEventListener("pointermove", function (e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});

    if (pointers.size === 2) {
      var it = pointers.values();
      var p1 = it.next().value, p2 = it.next().value;
      var d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      if (lastPinch) S.distT = clamp(S.distT * (lastPinch / d), 2.1, 6);
      lastPinch = d;
      return;
    }
    if (!S.drag) {
      hitTest(e.clientX, e.clientY, true);
      return;
    }
    S.yawT += (e.clientX - S.lastX) * 0.008;
    S.pitchT = clamp(S.pitchT + (e.clientY - S.lastY) * 0.006, -0.25, 1.2);
    S.lastX = e.clientX; S.lastY = e.clientY;
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) lastPinch = 0;
    if (pointers.size === 0) S.drag = false;
  }
  canvas.addEventListener("pointerup", endPointer);
  canvas.addEventListener("pointercancel", endPointer);
  canvas.addEventListener("pointerleave", function () { S.drag = false; S.hover = -1; });

  canvas.addEventListener("wheel", function (e) {
    e.preventDefault();
    S.distT = clamp(S.distT + e.deltaY * 0.0016, 2.1, 6);
  }, {passive: false});

  function hitTest(cx, cy, hoverOnly) {
    var r = canvas.getBoundingClientRect();
    var x = cx - r.left, y = cy - r.top;
    var best = -1, bd = 24;
    for (var i = 0; i < S.markers.length; i++) {
      var m = S.markers[i];
      var d = Math.hypot(m.x - x, m.y - y);
      if (d < bd) { bd = d; best = m.i; }
    }
    if (hoverOnly) { S.hover = best; return; }
    if (best >= 0) select(best);
  }
  canvas.addEventListener("click", function (e) { hitTest(e.clientX, e.clientY, false); });

  /* ---------------- 入天 ---------------- */
  var intro = $("intro");
  function skipIntro() {
    intro.classList.add("gone");
    intro.style.display = "none";
    S.entered = true;
  }
  if (/scene|atlas|lab|about|table|term-/.test(location.hash)) skipIntro();

  $("enter").addEventListener("click", function () {
    intro.classList.add("gone");
    S.entered = true;
    S.playing = false;
    S.t = 0;
    syncPlay();
    setTimeout(function () { intro.style.display = "none"; }, 950);
    setTimeout(showGuide, 1100);
  });

  /* ---------------- 问天 ---------------- */
  var labCanvas = $("labCanvas");
  var lctx = labCanvas.getContext("2d");
  var tilt = 23.44;

  function drawLab() {
    var r = labCanvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(220, Math.round(r.width));
    var h = Math.max(160, Math.round(r.height));
    labCanvas.width = Math.round(w * dpr);
    labCanvas.height = Math.round(h * dpr);
    lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lctx.clearRect(0, 0, w, h);

    var padL = 34, padR = 12, padT = 16, padB = 26;
    var iw = w - padL - padR, ih = h - padT - padB;
    var yMin = 0, yMax = 24;

    function X(i) { return padL + (i / 23) * iw; }
    function Y(v) { return padT + ih - ((v - yMin) / (yMax - yMin)) * ih; }

    // 网格
    lctx.save();
    lctx.strokeStyle = rgba(C["--muted"], 0.18);
    lctx.lineWidth = 1;
    [0, 6, 12, 18, 24].forEach(function (v) {
      lctx.beginPath();
      lctx.moveTo(padL, Y(v)); lctx.lineTo(w - padR, Y(v));
      lctx.stroke();
      lctx.fillStyle = rgba(C["--muted"], 0.8);
      lctx.font = '12.5px "Songti SC",serif';
      lctx.textAlign = "right";
      lctx.fillText(v + "h", padL - 6, Y(v) + 3);
    });
    lctx.restore();

    // 12h 参考线
    lctx.save();
    lctx.setLineDash([4, 5]);
    lctx.strokeStyle = rgba(C["--accent"], 0.55);
    lctx.beginPath(); lctx.moveTo(padL, Y(12)); lctx.lineTo(w - padR, Y(12)); lctx.stroke();
    lctx.restore();

    // 曲线
    var pts = [];
    for (var i = 0; i < 24; i++) {
      pts.push({x: X(i), y: Y(daylight(ST[i].l, LAT_BJ, tilt))});
    }
    lctx.save();
    lctx.beginPath();
    lctx.moveTo(pts[0].x, Y(12));
    for (var k = 0; k < pts.length; k++) lctx.lineTo(pts[k].x, pts[k].y);
    lctx.lineTo(pts[pts.length - 1].x, Y(12));
    lctx.closePath();
    var fg = lctx.createLinearGradient(0, padT, 0, padT + ih);
    fg.addColorStop(0, rgba(C["--accent"], 0.22));
    fg.addColorStop(1, rgba(C["--accent"], 0.01));
    lctx.fillStyle = fg;
    lctx.fill();
    lctx.restore();

    lctx.save();
    lctx.strokeStyle = C["--accent"];
    lctx.lineWidth = 1.8;
    lctx.beginPath();
    for (var j = 0; j < pts.length; j++) {
      if (j === 0) lctx.moveTo(pts[j].x, pts[j].y); else lctx.lineTo(pts[j].x, pts[j].y);
    }
    lctx.stroke();
    lctx.restore();

    // 当前选中的节气
    var sx = X(S.sel), sy = Y(daylight(ST[S.sel].l, LAT_BJ, tilt));
    lctx.save();
    lctx.fillStyle = C["--accent"];
    lctx.beginPath(); lctx.arc(sx, sy, 3.4, 0, 6.283); lctx.fill();
    lctx.restore();

    // 轴标
    lctx.save();
    lctx.fillStyle = rgba(C["--muted"], 0.85);
    lctx.font = '12.5px "Songti SC",serif';
    lctx.textAlign = "left";
    lctx.fillText("立春", padL, h - 8);
    lctx.textAlign = "center";
    lctx.fillText("夏至", X(9), h - 8);
    lctx.fillText("秋分", X(15), h - 8);
    lctx.textAlign = "right";
    lctx.fillText("大寒", w - padR, h - 8);
    lctx.restore();
  }

  var gnomonCanvas = $("gnomonCanvas");
  var gctx = gnomonCanvas.getContext("2d");
  var gnomonTerm = $("gnomonTerm"), gnomonAlt = $("gnomonAlt"), gnomonRatio = $("gnomonRatio");

  function drawGnomon() {
    var st = ST[S.sel];
    var dec = declination(st.l, TILT_DEFAULT) / DEG;
    var altitude = 90 - Math.abs(39.9 - dec);
    var ratio = 1 / Math.tan(altitude * DEG);
    var r = gnomonCanvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(240, Math.round(r.width));
    var h = Math.max(170, Math.round(r.height));
    gnomonCanvas.width = Math.round(w * dpr);
    gnomonCanvas.height = Math.round(h * dpr);
    gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gctx.clearRect(0, 0, w, h);

    var pad = Math.max(22, w * 0.055);
    var ground = h * 0.77;
    var poleH = h * 0.42;
    // 太阳位于表杆左侧时，投影必须落在表杆右侧。
    var baseX = w * 0.54;
    var maxShadow = Math.max(56, w - pad - baseX - 18);
    var shadow = clamp(poleH * ratio, 36, maxShadow);
    var sunX = baseX - shadow * 0.46;
    var sunY = ground - poleH - (altitude / 90) * h * 0.30;

    // 地平线与表影
    gctx.save();
    gctx.strokeStyle = rgba(C["--muted"], 0.30);
    gctx.lineWidth = 1;
    gctx.beginPath();
    gctx.moveTo(pad, ground); gctx.lineTo(w - pad, ground);
    gctx.stroke();

    var sg = gctx.createLinearGradient(baseX, 0, baseX + shadow, 0);
    sg.addColorStop(0, rgba(C["--accent"], 0.22));
    sg.addColorStop(1, rgba(C["--accent"], 0.015));
    gctx.fillStyle = sg;
    gctx.beginPath();
    gctx.moveTo(baseX, ground - 3);
    gctx.lineTo(baseX + shadow, ground + 2);
    gctx.lineTo(baseX + shadow - 9, ground + 8);
    gctx.lineTo(baseX - 9, ground + 7);
    gctx.closePath();
    gctx.fill();
    gctx.strokeStyle = rgba(C["--accent"], 0.55);
    gctx.beginPath(); gctx.moveTo(baseX, ground - 3); gctx.lineTo(baseX + shadow, ground + 4); gctx.stroke();
    gctx.restore();

    // 太阳
    var glow = gctx.createRadialGradient(sunX, sunY, 1, sunX, sunY, Math.min(w,h) * 0.13);
    glow.addColorStop(0, C["--sun1"]);
    glow.addColorStop(0.12, C["--sun2"]);
    glow.addColorStop(1, fade(C["--sun2"]));
    gctx.fillStyle = glow;
    gctx.beginPath(); gctx.arc(sunX, sunY, Math.min(w,h) * 0.13, 0, 6.283); gctx.fill();
    gctx.fillStyle = C["--sun1"];
    gctx.beginPath(); gctx.arc(sunX, sunY, Math.max(3.5, Math.min(w,h) * 0.018), 0, 6.283); gctx.fill();

    // 表和高度线
    gctx.save();
    gctx.strokeStyle = C["--ink"];
    gctx.lineWidth = 2;
    gctx.beginPath(); gctx.moveTo(baseX, ground); gctx.lineTo(baseX, ground - poleH); gctx.stroke();
    gctx.fillStyle = C["--ink"];
    gctx.beginPath(); gctx.arc(baseX, ground - poleH, 2.2, 0, 6.283); gctx.fill();
    gctx.setLineDash([3, 5]);
    gctx.strokeStyle = rgba(C["--ring"], 0.36);
    gctx.lineWidth = 1;
    gctx.beginPath(); gctx.moveTo(baseX, ground - poleH); gctx.lineTo(sunX, sunY); gctx.stroke();
    gctx.restore();

    // 标注
    gctx.save();
    gctx.fillStyle = rgba(C["--ink"], 0.78);
    gctx.font = '12px "Songti SC",serif';
    gctx.textAlign = "left";
    gctx.fillText("北京 · 正午", pad, 20);
    gctx.textAlign = "right";
    gctx.fillText(st.n, w - pad, 20);

    // 二分二至参照：四分节点在图中始终可见
    var refTerms = [
      {index:3, name:"春分"},
      {index:9, name:"夏至"},
      {index:15, name:"秋分"},
      {index:21, name:"冬至"}
    ];
    var refY = 46;
    var refStart = pad + Math.min(44, w * 0.045);
    var refEnd = w - pad;
    gctx.strokeStyle = rgba(C["--muted"], 0.24);
    gctx.lineWidth = 1;
    gctx.beginPath();
    gctx.moveTo(refStart, refY);
    gctx.lineTo(refEnd, refY);
    gctx.stroke();
    gctx.font = '11px "Songti SC",serif';
    gctx.textAlign = "center";
    gctx.textBaseline = "bottom";
    refTerms.forEach(function (ref, i) {
      var rx = refStart + (refEnd - refStart) * (i / (refTerms.length - 1));
      var active = S.sel === ref.index;
      gctx.strokeStyle = active ? C["--accent"] : rgba(C["--ring"], 0.58);
      gctx.lineWidth = active ? 1.4 : 1;
      gctx.beginPath();
      gctx.moveTo(rx, refY - 4);
      gctx.lineTo(rx, refY + 4);
      gctx.stroke();
      gctx.fillStyle = active ? C["--accent"] : rgba(C["--muted"], 0.82);
      gctx.beginPath();
      gctx.arc(rx, refY, active ? 2.8 : 2, 0, 6.283);
      gctx.fill();
      gctx.fillText(ref.name, rx, refY - 8);
    });

    gctx.textBaseline = "top";
    gctx.fillStyle = rgba(C["--muted"], 0.8);
    gctx.font = '11px "Songti SC",serif';
    gctx.textAlign = "center";
    gctx.fillText("表", baseX + 13, ground - poleH - 2);
    gctx.fillText("影", baseX + shadow * 0.52, ground + 12);
    gctx.restore();

    gnomonTerm.textContent = st.n;
    gnomonAlt.textContent = altitude.toFixed(1) + "°";
    gnomonRatio.textContent = ratio.toFixed(2);
    gnomonCanvas.setAttribute("aria-label",
      "北京正午圭表测影：" + st.n + "，太阳高度约" + altitude.toFixed(1) +
      "度，表影长度约为表高的" + ratio.toFixed(2) +
      "倍；图中参照春分、夏至、秋分和冬至");
    document.querySelectorAll("[data-gnomon-term]").forEach(function (b) {
      b.classList.toggle("on", parseInt(b.getAttribute("data-gnomon-term"), 10) === S.sel);
    });
  }

  document.querySelectorAll("[data-gnomon-term]").forEach(function (b) {
    b.addEventListener("click", function () {
      select(parseInt(b.getAttribute("data-gnomon-term"), 10));
    });
  });

  var tiltEl = $("tilt"), tiltVal = $("tiltVal"), tiltNote = $("tiltNote");
  function updateTilt() {
    tilt = parseFloat(tiltEl.value);
    tiltVal.textContent = tilt.toFixed(2) + "°";
    if (tilt < 1) {
      tiltNote.textContent = "倾角归零：太阳直射点停在赤道，几何昼长恒为 12 小时；季节差异和节气的天文依据随之消失。";
    } else if (tilt < 12) {
      tiltNote.textContent = "倾角过小：太阳直射点南北移动幅度很小，昼长与季节差异被显著压缩。";
    } else if (tilt > 35) {
      tiltNote.textContent = "倾角过大：极昼极夜范围扩张，季节差异被推向极端；这不是现实地球参数。";
    } else {
      tiltNote.textContent = "当前：" + tilt.toFixed(2) + "°——太阳直射点南北移动，形成明显的周年节律。";
    }
    drawLab();
  }
  tiltEl.addEventListener("input", updateTilt);
  $("tiltReset").addEventListener("click", function () { tiltEl.value = "23.44"; updateTilt(); });
  $("tiltZero").addEventListener("click", function () { tiltEl.value = "0"; updateTilt(); });

  /* ---------------- 节气数据图谱 ---------------- */
  var atlasCanvas = $("atlasCanvas");
  var actx = atlasCanvas.getContext("2d");
  var atlasIndex = $("atlasIndex"), atlasTerm = $("atlasTerm");
  var atlasLam = $("atlasLam"), atlasDec = $("atlasDec");
  var atlasDay = $("atlasDay"), atlasTime = $("atlasTime");
  var glyphCanvas = $("glyphCanvas");
  var glyphGrid = $("glyphGrid");
  var ATLAS_LATS = [
    {name:"哈尔滨", short:"哈", lat:45.8, color:"--accent", on:true},
    {name:"北京", short:"京", lat:39.9, color:"--ring", on:true},
    {name:"广州", short:"穗", lat:23.1, color:"--ring2", on:true}
  ];

  function atlasCurve(points, closeAtBaseline) {
    actx.beginPath();
    if (closeAtBaseline) {
      actx.moveTo(points[0].x, points[0].baseY);
      actx.lineTo(points[0].x, points[0].y);
    } else {
      actx.moveTo(points[0].x, points[0].y);
    }
    for (var i = 1; i < points.length; i++) {
      var prev = points[i - 1], cur = points[i];
      var midX = (prev.x + cur.x) / 2;
      var midY = (prev.y + cur.y) / 2;
      actx.quadraticCurveTo(prev.x, prev.y, midX, midY);
      if (i === points.length - 1) actx.lineTo(cur.x, cur.y);
    }
    if (closeAtBaseline) {
      actx.lineTo(points[points.length - 1].x, points[0].baseY);
      actx.closePath();
    }
  }

  function drawAtlas() {
    var rect = atlasCanvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(300, Math.round(rect.width));
    var h = Math.max(210, Math.round(rect.height));
    atlasCanvas.width = Math.round(w * dpr);
    atlasCanvas.height = Math.round(h * dpr);
    actx.setTransform(dpr, 0, 0, dpr, 0, 0);
    actx.clearRect(0, 0, w, h);

    var compact = w < 560;
    var padL = compact ? 42 : clamp(w * 0.068, 58, 88);
    var padR = compact ? 18 : clamp(w * 0.04, 28, 52);
    var top = compact ? 48 : clamp(h * 0.14, 62, 88);
    var bottom = compact ? 54 : clamp(h * 0.14, 58, 82);
    var plotW = Math.max(180, w - padL - padR);
    var plotH = Math.max(100, h - top - bottom);
    var baseY = top + plotH / 2;
    var selected = S.sel;
    var series = ATLAS_LATS.map(function (place) {
      return {
        place:place,
        hours:ST.map(function (st) {
          return daylight(st.l, place.lat * DEG, TILT_DEFAULT);
        })
      };
    });
    series.forEach(function (item) {
      item.points = item.hours.map(function (v, i) {
        return {
          x: padL + (i / 23) * plotW,
          y: top + ((18 - v) / 12) * plotH,
          baseY: baseY,
          day: v
        };
      });
    });
    var hours = series[1].hours;
    var points = series[1].points;
    var selectedValues = series.map(function (item) {
      return item.hours[selected];
    });
    var selectedVisible = series.filter(function (item) { return item.place.on; });

    function xAt(i) { return padL + (i / 23) * plotW; }
    function yAt(v) { return top + ((18 - v) / 12) * plotH; }

    // 传统四季分区：仅作阅读背景，不表示气象学上的季节边界
    for (var season = 0; season < 4; season++) {
      actx.fillStyle = rgba(C["--ring"], season % 2 ? 0.018 : 0.04);
      var sx = xAt(season * 6);
      var ex = season === 3 ? xAt(23) : xAt(season * 6 + 6);
      actx.fillRect(sx, top, Math.max(0, ex - sx), plotH);
      if (season > 0) {
        actx.save();
        actx.strokeStyle = rgba(C["--muted"], 0.16);
        actx.setLineDash([2, 7]);
        actx.beginPath();
        actx.moveTo(xAt(season * 6), top);
        actx.lineTo(xAt(season * 6), top + plotH);
        actx.stroke();
        actx.restore();
      }
      actx.save();
      actx.fillStyle = rgba(C["--muted"], 0.5);
      actx.font = (compact ? "10.5px " : "12px ") + '"Songti SC","STSong",serif';
      actx.textAlign = "center";
      actx.fillText(["春", "夏", "秋", "冬"][season],
        (sx + ex) / 2, top - (compact ? 17 : 20));
      actx.restore();
    }

    // 昼长刻度
    actx.save();
    actx.font = (compact ? "10px " : "11.5px ") + 'Georgia,serif';
    actx.textAlign = "right";
    actx.textBaseline = "middle";
    [6, 9, 12, 15, 18].forEach(function (hour) {
      var yy = yAt(hour);
      actx.strokeStyle = rgba(C["--muted"], hour === 12 ? 0.38 : 0.15);
      actx.lineWidth = 1;
      actx.setLineDash(hour === 12 ? [4, 7] : [1, 7]);
      actx.beginPath();
      actx.moveTo(padL, yy);
      actx.lineTo(padL + plotW, yy);
      actx.stroke();
      actx.setLineDash([]);
      actx.fillStyle = rgba(C["--muted"], hour === 12 ? 0.9 : 0.65);
      actx.fillText(hour + "h", padL - 10, yy);
    });
    actx.restore();

    // 三束年度光带：同一节气、不同纬度
    selectedVisible.forEach(function (item) {
      var color = C[item.place.color];
      var areaGradient = actx.createLinearGradient(0, top, 0, top + plotH);
      areaGradient.addColorStop(0, rgba(color, 0.12));
      areaGradient.addColorStop(0.54, rgba(color, 0.035));
      areaGradient.addColorStop(1, rgba(color, 0.006));
      atlasCurve(item.points, true);
      actx.fillStyle = areaGradient;
      actx.fill();

      actx.save();
      actx.strokeStyle = color;
      actx.lineWidth = item.place.name === "北京" ? (compact ? 1.5 : 1.8) : (compact ? 1.15 : 1.35);
      atlasCurve(item.points, false);
      actx.stroke();
      actx.restore();
    });

    // 每条纬度光带上的观测节点
    selectedVisible.forEach(function (item) {
      var color = C[item.place.color];
      item.points.forEach(function (p, i) {
        var active = i === selected;
        actx.save();
        actx.strokeStyle = color;
        actx.fillStyle = C["--bg"];
        actx.lineWidth = active ? 2 : 1;
        actx.beginPath();
        actx.arc(p.x, p.y, active ? 4.6 : 1.5, 0, 6.283);
        actx.fill();
        actx.stroke();
        if (active) {
          actx.strokeStyle = rgba(color, 0.34);
          actx.lineWidth = 1;
          actx.beginPath();
          actx.arc(p.x, p.y, 10, 0, 6.283);
          actx.stroke();
        }
        actx.restore();
      });
    });

    // 节气刻度与重点标签
    var major = {0:1, 3:1, 6:1, 9:1, 12:1, 15:1, 18:1, 21:1};
    actx.save();
    actx.textAlign = "center";
    actx.textBaseline = "top";
    for (var tick = 0; tick < 24; tick++) {
      var tx = xAt(tick);
      var isMajor = !!major[tick];
      actx.strokeStyle = rgba(C["--muted"], isMajor ? 0.46 : 0.2);
      actx.lineWidth = 1;
      actx.beginPath();
      actx.moveTo(tx, top + plotH);
      actx.lineTo(tx, top + plotH + (isMajor ? 7 : 4));
      actx.stroke();
      if (isMajor && !compact) {
        actx.fillStyle = rgba(C["--muted"], 0.82);
        actx.font = '12px "Songti SC","STSong",serif';
        actx.fillText(ST[tick].n, tx, top + plotH + 13);
      }
    }
    actx.restore();

    // 当前节点标注
    var selPoint = points[selected];
    actx.save();
    actx.strokeStyle = rgba(C["--accent"], 0.35);
    actx.lineWidth = 1;
    actx.setLineDash([3, 6]);
    actx.beginPath();
    actx.moveTo(selPoint.x, top);
    actx.lineTo(selPoint.x, top + plotH);
    actx.stroke();
    actx.setLineDash([]);

    var label = ST[selected].n + (compact ? "" : " · " +
      selectedValues.map(function (v) { return v.toFixed(1); }).join(" / ") + "h");
    actx.font = (compact ? "500 12.5px " : "500 14px ") + '"Songti SC","STSong",serif';
    var labelW = actx.measureText(label).width + 18;
    var labelX = clamp(selPoint.x - labelW / 2, padL, w - padR - labelW);
    var labelY = clamp(selPoint.y - (selPoint.day >= 12 ? 38 : -18), top + 5, top + plotH - 27);
    actx.fillStyle = rgba(C["--bg"], 0.94);
    actx.fillRect(labelX, labelY, labelW, 23);
    actx.strokeStyle = rgba(C["--accent"], 0.7);
    actx.strokeRect(labelX + 0.5, labelY + 0.5, labelW - 1, 22);
    actx.fillStyle = C["--ink"];
    actx.textAlign = "center";
    actx.textBaseline = "middle";
    actx.fillText(label, labelX + labelW / 2, labelY + 11.5);
    actx.restore();

    var st = ST[selected];
    var dec = declination(st.l, TILT_DEFAULT) / DEG;
    var selectedRecord = schedule.filter(function (item) { return item.index === selected; })[0];
    var recordTime = selectedRecord ? selectedRecord.time : solarTermTime(activeYear, st.l);
    atlasIndex.textContent = pad2(selected + 1) + " / 24";
    atlasTerm.textContent = st.n;
    atlasLam.textContent = st.l + "°";
    atlasDec.textContent = (dec >= 0 ? "北纬 " : "南纬 ") + Math.abs(dec).toFixed(1) + "°";
    atlasDay.textContent = selectedValues.map(function (v) { return v.toFixed(1); }).join(" / ") + " h";
    atlasTime.textContent = termDateLabel(recordTime, false) + " · " + termClock(recordTime);
    atlasCanvas.setAttribute("aria-label",
      "二十四节气三地昼长图谱，当前为" + st.n + "，太阳视黄经" + st.l +
      "度，哈尔滨、北京、广州几何昼长分别为" +
      selectedValues.map(function (v) { return v.toFixed(1); }).join("、") + "小时");
    drawGlyph();
  }

  function paintGlyph(canvas, index) {
    var rect = canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(60, Math.round(rect.width));
    var h = Math.max(54, Math.round(rect.height));
    var ctx = canvas.getContext("2d");
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var st = ST[index];
    var phase = st.l * DEG;
    var dec = declination(st.l, TILT_DEFAULT);
    var day = daylight(st.l, LAT_BJ, TILT_DEFAULT);
    var cx = w / 2, cy = h / 2;
    var r = Math.min(w, h) * 0.43;
    var dayShift = (day - 12) / 6;

    ctx.save();
    ctx.translate(cx, cy);

    ctx.strokeStyle = rgba(C["--muted"], 0.35);
    ctx.setLineDash([1, 4]);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 6.283);
    ctx.stroke();
    ctx.setLineDash([]);

    for (var i = 0; i < 72; i++) {
      var theta = -Math.PI / 2 + i / 72 * Math.PI * 2;
      var wave = 0.50 * Math.sin(theta * 3 + phase) +
        0.29 * Math.sin(theta * 5 - dec * 2.2) +
        0.21 * Math.sin(theta * 8 + phase * 1.6);
      var inner = r * (0.24 + Math.abs(wave) * 0.08);
      var outer = r * (0.51 + Math.abs(wave) * 0.24 +
        dayShift * 0.08 * Math.cos(theta * 4 + dec));
      ctx.strokeStyle = i % 6 === 0 ? rgba(C["--accent"], 0.8) : rgba(C["--ring"], 0.54);
      ctx.lineWidth = i % 6 === 0 ? 1.05 : 0.55;
      ctx.beginPath();
      ctx.moveTo(Math.cos(theta) * inner, Math.sin(theta) * inner);
      ctx.lineTo(Math.cos(theta) * outer, Math.sin(theta) * outer);
      ctx.stroke();
    }

    ctx.strokeStyle = rgba(C["--ring2"], 0.55);
    ctx.lineWidth = 0.8;
    [0.38, 0.61, 0.82].forEach(function (scale, ring) {
      ctx.beginPath();
      ctx.arc(0, 0, r * scale, -Math.PI / 2,
        -Math.PI / 2 + Math.PI * (0.52 + Math.abs(dayShift) * 0.31 + ring * 0.05));
      ctx.stroke();
    });

    ctx.strokeStyle = rgba(C["--muted"], 0.35);
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.moveTo(-r * 0.9, 0);
    ctx.lineTo(r * 0.9, 0);
    ctx.moveTo(0, -r * 0.9);
    ctx.lineTo(0, r * 0.9);
    ctx.stroke();

    ctx.fillStyle = C["--sun1"];
    ctx.shadowColor = rgba(C["--sun2"], 0.55);
    ctx.shadowBlur = Math.max(3, r * 0.25);
    ctx.beginPath();
    ctx.arc(0, 0, 2.1, 0, 6.283);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    canvas.setAttribute("aria-label",
      st.n + "节气光纹：由太阳黄经" + st.l + "度、赤纬" +
      (declination(st.l, TILT_DEFAULT) / DEG).toFixed(1) + "度与北京几何昼长" +
      day.toFixed(1) + "小时共同生成");
  }

  function drawGlyph() {
    paintGlyph(glyphCanvas, S.sel);
    paintGlyphIndex();
  }

  function syncGlyphIndex() {
    Array.prototype.forEach.call(glyphGrid.querySelectorAll(".glyph-item"), function (button, i) {
      var on = i === S.sel;
      button.setAttribute("aria-pressed", on ? "true" : "false");
      button.classList.toggle("on", on);
    });
  }

  function paintGlyphIndex() {
    if (!glyphGrid) return;
    Array.prototype.forEach.call(glyphGrid.querySelectorAll(".glyph-item"), function (button, i) {
      paintGlyph(button.querySelector("canvas"), i);
    });
    syncGlyphIndex();
  }

  function buildGlyphIndex() {
    if (!glyphGrid || glyphGrid.children.length) return;
    var frag = document.createDocumentFragment();
    ST.forEach(function (st, i) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "glyph-item";
      button.setAttribute("aria-pressed", i === S.sel ? "true" : "false");
      button.setAttribute("aria-label", "查看" + st.n + "节气光纹");
      var canvas = document.createElement("canvas");
      canvas.setAttribute("role", "img");
      var label = document.createElement("span");
      label.textContent = st.n;
      button.appendChild(canvas);
      button.appendChild(label);
      button.addEventListener("click", function () { select(i); });
      frag.appendChild(button);
    });
    glyphGrid.appendChild(frag);
    paintGlyphIndex();
  }

  function setAtlasLatitudes(on) {
    ATLAS_LATS.forEach(function (place) { place.on = !!on; });
    document.querySelectorAll(".lat-toggle").forEach(function (button) {
      button.setAttribute("aria-pressed", on ? "true" : "false");
    });
    drawAtlas();
  }

  $("atlasPrev").addEventListener("click", function () { select((S.sel + 23) % 24); });
  $("atlasNext").addEventListener("click", function () { select((S.sel + 1) % 24); });
  document.querySelectorAll(".lat-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      var lat = parseFloat(button.getAttribute("data-lat"));
      var item = ATLAS_LATS.filter(function (place) { return place.lat === lat; })[0];
      var active = ATLAS_LATS.filter(function (place) { return place.on; });
      if (item.on && active.length === 1) return;
      item.on = !item.on;
      button.setAttribute("aria-pressed", item.on ? "true" : "false");
      drawAtlas();
    });
  });
  buildGlyphIndex();
  atlasCanvas.addEventListener("click", function (e) {
    var r = atlasCanvas.getBoundingClientRect();
    var compact = r.width < 560;
    var padL = compact ? 42 : clamp(r.width * 0.068, 58, 88);
    var padR = compact ? 18 : clamp(r.width * 0.04, 28, 52);
    var ratio = clamp((e.clientX - r.left - padL) / Math.max(1, r.width - padL - padR), 0, 1);
    select(Math.round(ratio * 23));
  });

  document.querySelectorAll(".rl").forEach(function (b) {
    b.addEventListener("click", function () { drawLab(); });
  });

  /* ---------------- 主循环 ---------------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) S.playing = false;

  var last = 0;
  var sceneVisible = true;
  function frame(ts) {
    if (!last) last = ts;
    var dt = Math.min((ts - last) / 1000, 0.08);
    last = ts;
    if (!reduce) S.time += dt;

    if (S.playing && S.entered) {
      S.t += dt * 0.62;
      S.tDisp = S.t;
      var idx = ((Math.floor(S.t) % 24) + 24) % 24;
      if (idx !== S.sel) { S.sel = idx; updatePanel(); syncTimeline(); }
    } else {
      var d = ((S.t - S.tDisp + 12 + 24) % 24) - 12;
      S.tDisp += d * Math.min(1, dt * 4.2);
    }

    S.yaw = lerp(S.yaw, S.yawT, Math.min(1, dt * 9));
    S.pitch = lerp(S.pitch, S.pitchT, Math.min(1, dt * 9));
    S.dist = lerp(S.dist, S.distT, Math.min(1, dt * 9));

    if (sceneVisible && document.visibilityState !== "hidden") render();
    requestAnimationFrame(frame);
  }

  /* ---------------- 启动 ---------------- */
  /* ---- 自定义光标 ---- */
  var cur = $("cursor");
  var finePointer = window.matchMedia && window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  if (cur && finePointer) {
    document.addEventListener("pointermove", function (e) {
      cur.classList.add("on");
      cur.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
    });
    document.addEventListener("pointerover", function (e) {
      if (e.target && e.target.closest && e.target.closest("button,a,input,label,.layer")) {
        cur.classList.add("grow");
      }
    });
    document.addEventListener("pointerout", function (e) {
      if (e.target && e.target.closest && e.target.closest("button,a,input,label,.layer")) {
        cur.classList.remove("grow");
      }
    });
  }

  /* ---- 滚动揭示 ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (/^#(atlas|lab|about)$/.test(location.hash)) {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add("in"); });
  }
  if ("IntersectionObserver" in window && !reduce) {
    document.documentElement.classList.add("motion-ready");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add("in"); });
  }

  /* ---- 键盘 ---- */
  document.addEventListener("keydown", function (e) {

    if (!intro.classList.contains("gone") && e.key === "Enter" && !e.target.closest("button,a,input")) {
      e.preventDefault();
      $("enter").click();
      return;
    }
    if (tourActive) {
      if (e.key === "Escape") {
        e.preventDefault();
        finishTour();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (tourIndex >= tourSteps.length - 1) finishTour();
        else setTourStep(tourIndex + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setTourStep(tourIndex - 1);
      }
      return;
    }
    if (termDialog.open) return;
    if (guide.classList.contains("show")) {
      if (e.key === "Escape") {
        e.preventDefault();
        hideGuide(true);
        playBtn.focus();
      }
      return;
    }
    if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
    if (e.target.closest("button,a") && (e.key === " " || e.key === "Enter")) return;
    if (e.key === "ArrowRight") { e.preventDefault(); select((S.sel + 1) % 24); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); select((S.sel + 23) % 24); }
    else if (e.key === " ") { e.preventDefault(); playBtn.click(); }
    else if (e.key.toLowerCase() === "h") { e.preventDefault(); setFocusMode(!stage.classList.contains("focus-mode")); }
    else if (e.key === "Escape" && stage.classList.contains("focus-mode")) setFocusMode(false);
  });

  /* ---- 时间轴拖拽擦洗 ---- */
  var scrubbing = false;
  function scrubAt(clientX) {
    var r = timeline.getBoundingClientRect();
    var t = clamp((clientX - r.left) / r.width, 0, 0.9999);
    var idx = Math.floor(t * 24);
    if (idx !== S.sel) { select(idx, true); drawLab(); }
  }
  timeline.addEventListener("pointerdown", function (e) {
    if (window.innerWidth <= 900) return;
    scrubbing = true;
    if (S.playing) { S.playing = false; syncPlay(); }
    try { timeline.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
    scrubAt(e.clientX);
  });
  timeline.addEventListener("pointermove", function (e) { if (scrubbing) scrubAt(e.clientX); });
  timeline.addEventListener("pointerup", function () { scrubbing = false; });
  timeline.addEventListener("pointercancel", function () { scrubbing = false; });

  refreshColors();
  buildStars();
  var hashTerm = location.hash.match(/^#term-(\d+)$/);
  if (hashTerm) {
    S.sel = (parseInt(hashTerm[1], 10) - 1 + 24) % 24;
    S.t = S.tDisp = S.sel;
    S.playing = false;
    S.entered = true;
  }
  resize();
  updatePanel();
  updateTilt();
  syncPlay();
  syncPanelHint();
  if (location.hash === "#scene") setTimeout(showGuide, 700);

  if (window.ResizeObserver) {
    new ResizeObserver(function () { resize(); drawLab(); drawGnomon(); drawAtlas(); }).observe(stage);
    new ResizeObserver(function () { drawLab(); }).observe(labCanvas);
    new ResizeObserver(function () { drawGnomon(); }).observe(gnomonCanvas);
    new ResizeObserver(function () { drawAtlas(); }).observe(atlasCanvas);
  } else {
    window.addEventListener("resize", function () { resize(); drawLab(); drawGnomon(); drawAtlas(); });
  }
  document.querySelectorAll(".pal").forEach(function (b) {
    b.addEventListener("click", function () { setTimeout(function () { drawLab(); drawGnomon(); drawAtlas(); }, 30); });
  });
  if (location.hash === "#table") openTable();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      sceneVisible = entries[0].isIntersecting;
    }, {rootMargin: "120px"}).observe(stage);
  }

  requestAnimationFrame(frame);
})();
