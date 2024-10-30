import { Message } from "discord.js";

export function GetUserFromMention(message: Message) {
    // メッセージ内のメンションを取得
    const mentionedUsers = message.mentions.users;

    // メンションが存在するか確認
    if (mentionedUsers.size === 0) {
        console.log("メンションされたユーザーがいません。");
        return null; // メンションがなければnullを返す
    }

    mentionedUsers.forEach(element => {
        console.log(`Mentioned User: ${element.username} (${element.id})`);
    });

    return mentionedUsers;
}
