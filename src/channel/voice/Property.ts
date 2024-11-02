import { VoiceChannel } from 'discord.js';
import { client } from '../..';

export async function GetUsers(channelID: string) {
    const channel = await client.channels.fetch(channelID).catch(error => {
        console.error(error)
    });

    if (!(channel instanceof VoiceChannel)) {
        throw new Error("Channel is not a voice channel.");
    }

    if (!channel.members.size) {
        throw new Error("No members in the voice channel.");
    }

    const promises: Promise<void>[] = []; 
    channel.members.forEach(member => {
        promises.push(
            member.fetch()
            .then(()=>{})
            .catch(err => {
                console.error(`Failed to fetch member ${member.displayName}:`, err);
            })
        );
    });
    await Promise.all(promises)

    return channel.members;
}
