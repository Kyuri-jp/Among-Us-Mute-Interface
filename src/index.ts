//libs
import { Client, Colors, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv'
import { MessageCreated } from "./events/textChannel/MessageCreated";
import { CreateRole, RoleExists } from "./guild/Role";
import { ArgumentsParser } from "./core/text/ArgumentsParser";

//.envファイルを読み込む
dotenv.config()

//core
const prefix = "m!"
export const MarkerDiedPlayer = "Marker/DiedPlayer";

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
    await CreateRole(MarkerDiedPlayer, Colors.Yellow);
  }

  console.log("This bot launched." +
    "Version : 0.0.1a"
  );
});

client.on("messageCreate", async (message) => {
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