//libs
import { ActivityType, Client, Colors, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv'
import { MessageCreated } from "./events/textChannel/MessageCreated";
import { CreateRole, RoleExists } from "./guild/Role";
import { ArgumentsParser } from "./core/text/ArgumentsParser";

//.envファイルを読み込む
dotenv.config()

//core
const prefix = "m!"
export const MarkerDiedPlayer = "Marker/DiedPlayer";
export const ColorRed = "Color/Red";
export const ColorBlue = "Color/Blue";
export const ColorYellow = "Color/Yellow";
export const ColorGreen = "Color/Green";
export const ColorCyan = "Color/Cyan";
export const ColorLime = "Color/Lime";
export const ColorOrange = "Color/Orange";
export const ColorWhite = "Color/White";
export const ColorBrown = "Color/Brown";
export const ColorPink = "Color/Pink";
export const ColorBlack = "Color/Black";
export const ColorGray = "Color/Gray";
export const ColorPurple = "Color/Purple";
export const ColorBanana = "Color/Banana";
export const ColorCoral = "Color/Coral";
export const ColorMaroon = "Color/Maroon";
export const ColorTan = "Color/Tan";

// Discord Botの初期化
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", async () => {
  //init
  if (!(await RoleExists(MarkerDiedPlayer))) {
    await CreateRole(MarkerDiedPlayer, Colors.DarkRed)
    await CreateRole(ColorRed,Colors.Red)
    await CreateRole(ColorBlue,Colors.Blue)
    await CreateRole(ColorGreen,Colors.Green)
    await CreateRole(ColorYellow,Colors.Yellow)
    await CreateRole(ColorWhite,Colors.White)
    await CreateRole(ColorBlack,Colors.NotQuiteBlack)
    await CreateRole(ColorGray,Colors.Grey)
    await CreateRole(ColorLime,0x94FE31)
    await CreateRole(ColorPink,Colors.LuminousVividPink)
    await CreateRole(ColorBrown,0x3C0000)
    await CreateRole(ColorOrange,Colors.Orange)
    await CreateRole(ColorCyan,Colors.Aqua)
    await CreateRole(ColorBanana,0xFEE360)
    await CreateRole(ColorCoral,0xFD5E5E)
    await CreateRole(ColorMaroon,0xA13131)
    await CreateRole(ColorTan,0x474939)
  }

  console.log("This bot launched." +
    "Version : 0.0.1b"
  );

  client.user?.setPresence({
    activities: [{ name: "待機中...", type: ActivityType.Custom }]
  });
});

client.on("messageCreate", async (message) => {
  if (message.author.id === client.user?.id) return;
  console.info(`Message caught : ${message.content}`);
  const args = ArgumentsParser(message.content, prefix, "/");
  console.info(`Argument is : ${args}`);
  try {
    await MessageCreated(prefix, args, message);
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN);
console.log("Logined");

export const guild = client.guilds.fetch("1298249409712099378");