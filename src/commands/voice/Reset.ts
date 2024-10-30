import { OmitPartialGroupDMChannel, Message } from "discord.js";
import { GetRole } from "../../guild/Role";
import { UndeafAllUser } from "../../channel/voice/Deaf";
import { UnmuteAllUser } from "../../channel/voice/Mute";
import { GetUsers } from "../../channel/voice/Property";

export async function RunResetCommand(args:string[],message: OmitPartialGroupDMChannel<Message<boolean>>,diedPlayerRole:string) {
    if (args.length < 1) {
        console.error("Channel id is incorrect.");
    }
    await UnmuteAllUser((args[1]));
    await UndeafAllUser((args[1]));
    for (const [, member] of await GetUsers((args[1]))) {
        member.roles.remove(await GetRole(diedPlayerRole))
    }
    message.channel.send("Reset roles and more.");
}