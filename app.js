// ts-check
const express = require('express')

const {
    CloudAdapter, ConfigurationBotFrameworkAuthentication,
} = require('botbuilder')

const { TeamsConversationBot } = require('./bot')


const adapter = new CloudAdapter(new ConfigurationBotFrameworkAuthentication(process.env));
const myBot = new TeamsConversationBot()

const server = express()
server.use(express.json())

server.post('/api/messages', 
    async (req, res) => {
        console.log('-- BEGIN REQUEST --')
        console.log(req.body)
        console.log('-- END REQUEST --')
        await adapter.process(req, res, (context) => myBot.run(context));
    }
)

const port = process.env.PORT || 3978

server.listen(port, () => {
    console.log(`\n lisenting on ${ port } for bot ${ process.env.MicrosoftAppId }`);
})

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated')
    })
})

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Process interrupted')
    })
})