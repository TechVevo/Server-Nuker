# CHANGELOG

> The list will be from latest version to first version.

Last updated: 29th May, 2021

### v2.2.0 BETA:
- Added:
  - Purge Command
  - Seperate group called `Raid` for all the Raid commands
  - Spam DM Command - Spams a mentioned user with <count> no. of messages
  - Spam Text Channel Command
  - Spam Voice Channel Command
  - Spam Roles Command - It creates roles in Rainbow colours 😉
  - Comments to some necessary place [Haven't commented completely yet]
- Fixed:
  - Commands crashing the bot when sent in DMs
  - Timeouts for some big commands (Like Ban All)
  - Errors while users DMs are turned off during a command that uses DMs
  - Potential laggy code | Improved performance
- Removed:
  - Lot of repeating code
  - Useless embeds and commented code (That I scraped and hence no use)
  - Embed footers

### v2.1.0 BETA:
- Added:
  - Ban Command
  - DMs the user when using ban/kick command
  - **Ban All Command**
  - **Kick All Command**
  - Spam Everyone Command
  - Spam Text Command
  - Spam Owner Command
  - Logging every command ran successfully in the console
- Fixed:
  - `guild.members.fetch()` loading infinitely | You need to have Server Member intent enabled in "Privileged Intent" in your bot settings!
  - Caches not loading
  - Member Presences not loading
  - Invalid arguments crashing the bot
  - Logging showing incorrect time
  - Ban All & Kick All not working on offline members
  - Ban Command crashing the bot when user's DMs are disabled
  - Kick Command crashing the bot when user's DMs are disabled
- Removed:
  - Excess code causing the bot to lag sometimes

### v2.0.0 BETA

\> **EXE Released in the release tab! [Click Here](https://github.com/TechVevo/Server-Nuker/releases/)**.

- Added:
  - Ping Command
  - Add Command
  - Kick Command
- Fixed:
  - Invalid token immediately closing the process - Now it will wait for 10 secs before closing
  - Minor kick command bugs
  - Embeds
- Removed:
  - Ban All
  - Kick All

### v2.0.0 ALPHA
- Added:
  - Discord.js v12
  - Commando framework (discord.js-commando)
  - Ability to import variables from `.env` instead of `config.json` [To prepare for EXE file]
  - Axios [To import funny GIFs and images while raiding]
- Fixed:
  - DotEnv-Flow giving error when importing `.env` variables in multiple scripts
  - Discord.js caching issues

### v2.0.0 PRE-ALPHA
- Reworked the entire project.
- Scraped all the code of v1 to account for the 7 months of library updates.
