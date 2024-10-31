import { Role } from 'discord.js';

import { DeafAllUser, UndeafAllUser } from '../../channel/voice/Deaf';
import { UnmuteAllUser } from '../../channel/voice/Mute';

export async function Gaming(channelID: string, diedPlayersRole?: Role) {
    await DeafAllUser(channelID, diedPlayersRole, true);
    await UnmuteAllUser(channelID, diedPlayersRole);
    await UndeafAllUser(channelID, diedPlayersRole);
} 