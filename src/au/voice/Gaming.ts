import { Role } from 'discord.js';

import { DeafAllUser, UndeafAllUser } from '../../channel/voice/Deaf';
import { UnmuteAllUser } from '../../channel/voice/Mute';

export async function Gaming(channelID: string, diedPlayersRole?: Role) {
    await Promise.all([
        DeafAllUser(channelID, diedPlayersRole, true),
        UnmuteAllUser(channelID, diedPlayersRole),
        UndeafAllUser(channelID, diedPlayersRole)
    ])
} 