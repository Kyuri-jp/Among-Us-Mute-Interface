import { VoiceChannel } from "discord.js";
import { client } from "../..";

export async function GetUsers(channelID: string) {
    const channel = await client.channels.fetch(channelID);

    // チャンネルがボイスチャンネルであるか確認する
    if (!channel || !(channel instanceof VoiceChannel)) {
        console.error("The channel is not voice channel.");
        throw new Error("Not a voice channel.");
    }

    // チャンネルにメンバーがいるか確認する
    if (channel.members.size === 0) {
        console.error("The voice channel is not joined by any users.");
        throw new Error("No members in the channel.");
    }

    return channel.members;
}
