const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Arslan_Tech,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function Arslan_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Arslan_Tech = Arslan_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Arslan_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_Arslan_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Arslan_Tech.sendMessage(Qr_Code_By_Arslan_Tech.user.id, { text: 'NEXORA-BOT~' + b64data });
	
				   let Arslan_MD_TEXT = `
╭━━━〔 ⚡ NEXORA-BOT ⚡ 〕━━━╮
┃   ✅ SESSION SUCCESSFULLY CONNECTED
┃   👑 User: Arslan-MD
┃   💎 Mode: OFFICIAL ACTIVE
╰━━━━━━━━━━━━━━━━━━━━━━━╯


╭━━━〔 🚀 BOT ACTIVATION PANEL 〕━━━╮
┃   🔹 Selected Bot: NEXORA-BOT 
┃   🔹 Status: ONLINE & READY
┃   🔹 Setup Required:
┃      ➤ Add SESSION_ID in config 
╰━━━━━━━━━━━━━━━━━━━━━━━╯


╭━━━〔 🌐 SUPPORT & LINKS 〕━━━╮
┃   👤 Owner: +916909950582
┃   📦 Repo: github.com/cutvynx/NEXORA-BOT
┃   💬 WhatsApp Group:
┃      https://chat.whatsapp.com/JfPoJeSWn5E286lr4j6RU7?mode=gi_t
┃   📢 Channel:
┃      https://whatsapp.com/channel/0029Vb8RbTUEwEjyRIgD8M34
╰━━━━━━━━━━━━━━━━━━━━━━━╯


╭━━━〔 ✨ SYSTEM NOTE 〕━━━╮
┃   ⚙️ Powered by NEXORA-BOT Engine
┃   ⚡ Fast • Secure • Reliable
┃   🎯 Enjoy Premium Bot Experience
╰━━━━━━━━━━━━━━━━━━━━━━━╯

            𒂀 𝐄𝐍𝐉𝐎𝐘 𝐓𝐇𝐄 𝐏𝐎𝐖𝐄𝐑 𒂀

---

Don't Forget To Give Star⭐ To My Repo
______________________________`;
	 await Qr_Code_By_Arslan_Tech.sendMessage(Qr_Code_By_Arslan_Tech.user.id,{text:Arslan_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Arslan_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					Arslan_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await Arslan_MD_QR_CODE()
});
module.exports = router
