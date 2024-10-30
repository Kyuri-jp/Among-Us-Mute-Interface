import { VoiceChannel } from "discord.js";
import { client } from "../..";

export async function GetUsers(channelID: string) {
    const channel = await client.channels.fetch(channelID);

    // チャンネルがボイスチャンネルであるか確認する
    if (!channel || !(channel instanceof VoiceChannel)) {
        console.error("指定されたチャンネルはボイスチャンネルではありません。");
        throw new Error("Not a voice channel.");
    }

    // チャンネルにメンバーがいるか確認する
    if (channel.members.size === 0) {
        console.error("このチャンネルには誰も参加していません");
        throw new Error("No members in the channel.");
    }

    return channel.members;
}
