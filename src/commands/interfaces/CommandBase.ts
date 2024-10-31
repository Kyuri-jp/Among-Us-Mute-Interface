import { Message, OmitPartialGroupDMChannel } from 'discord.js';

export interface CommandBase{
    Run(args:string[],message: OmitPartialGroupDMChannel<Message<boolean>>):Promise<void>;
}