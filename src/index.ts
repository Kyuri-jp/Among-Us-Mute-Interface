//libs
import { ActivityType, Client, Colors, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

import { ArgumentsParser } from './core/text/ArgumentsParser';
import { MessageCreated } from './events/textChannel/MessageCreated';
import { CreateRole } from './guild/Role';

//.envファイルを読み込む
dotenv.config()

//core
const prefix = "m!"
export const MarkerRoles = {
  DiedPlayer: "Marker/DiedPlayer"
}

export const ColorRoles = {
  Red: "Color/Red",
  Blue: "Color/Blue",
  Green: "Color/Green",
  Yellow: "Color/Yellow",
  White: "Color/White",
  Black: "Color/Black",
  Gray: "Color/Gray",
  Purple: "Color/Purple",
  Lime: "Color/Lime",
  Pink: "Color/Pink",
  Brown: "Color/Brown",
  Orange: "Color/Orange",
  Cyan: "Color/Cyan",
  Banana: "Color/Banana",
  Coral: "Color/Coral",
  Maroon: "Color/Maroon",
  Tan: "Color/Tan",
  Rose: "Color/Rose",
};

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
  const rolesToCreate = [
    { name: MarkerRoles.DiedPlayer, color: Colors.DarkRed },
    { name: ColorRoles.Red, color: Colors.Red },
    { name: ColorRoles.Blue, color: Colors.Blue },
    { name: ColorRoles.Green, color: Colors.Green },
    { name: ColorRoles.Yellow, color: Colors.Yellow },
    { name: ColorRoles.White, color: Colors.White },
    { name: ColorRoles.Black, color: Colors.NotQuiteBlack },
    { name: ColorRoles.Gray, color: Colors.Grey },
    { name: ColorRoles.Purple, color: Colors.DarkPurple },
    { name: ColorRoles.Lime, color: 0x94FE31 },
    { name: ColorRoles.Pink, color: Colors.LuminousVividPink },
    { name: ColorRoles.Brown, color: 0x3C0000 },
    { name: ColorRoles.Orange, color: Colors.Orange },
    { name: ColorRoles.Cyan, color: Colors.Aqua },
    { name: ColorRoles.Banana, color: 0xFEE360 },
    { name: ColorRoles.Coral, color: 0xFD5E5E },
    { name: ColorRoles.Maroon, color: 0xA13131 },
    { name: ColorRoles.Tan, color: 0x474939 },
    { name: ColorRoles.Rose, color: 0xE04462 },
  ];

  for (const { name, color } of rolesToCreate) {
    await CreateRole(name, color)
    .catch(error =>{
      console.error(error);
    });
  }

  console.log("This bot launched." +
    "Version : 0.2.0"
  );

  client.user?.setPresence({
    activities: [{ name: "待機中...", type: ActivityType.Custom }]
  });
});

client.on("messageCreate", async (message) => {
  if (message.author.id === client.user?.id) return;
  console.info(`Message caught : ${message.content}`);

  const args = ArgumentsParser(message.content, prefix, " ");
  console.info(`Argument is : ${args}`);
  try {
    await MessageCreated(prefix, args, message);
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN)
  .then(() => console.log("Logged in successfully."))
  .catch(error => console.error("Login failed:", error));

export const guild = client.guilds.fetch(process.env.GUILD!)
