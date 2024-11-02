import { Role } from 'discord.js';

import { UndeafAllUser } from '../../channel/voice/Deaf';
import { MuteAllUser } from '../../channel/voice/Mute';

export async function Discussing(channelID: string, diedPlayersRole: Role) {
    await Promise.all([
        MuteAllUser(channelID, diedPlayersRole),
        UndeafAllUser(channelID)
    ])
}