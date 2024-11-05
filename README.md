# Among Us Mute Interface
デスクトップクライアントのみで動作するAmongUs用の簡易DiscordBotです。

# Color Sys
このbotは参加者自身に使用している色のロールを付与することで判別を行っています。

Botを起動した時点でロールが自動的に生成されるのでリアクションBotなどで付与を行ってください。

# Commands
全てのコマンドは``m!``から始まります

|Command|Syntax|Doing|
|----|----|----|
|mute|``m!mute (voice channel id)``|チャンネル内のすべてのユーザーをミュートにします|
|unmute|``m!unmute (voice channel id)``|チャンネル内のすべてのユーザーのミュートを解除します|
|died|``m!mute (voice channel id) (role name)``|チャンネル内にいる色のロールが付いたユーザーに死亡フラグを付与します|
|ongame|``m!mute (voice channel id)``|生存者のスピーカーミュートを解除し、死人をミュートにします|
|ondiscuss|``m!mute (voice channel id)``|生存者をスピーカーミュートし、死人のミュートを解除します|
|reset|``m!mute (voice channel id)``|全員の状態をリセットします|

# .env
```
TOKEN=(bot_token)
GUILD=(your guild id)
```

# Compile
```
tsc -p
```

# License
This project is released under MIT License,