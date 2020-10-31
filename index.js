const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const {Client} = require("whatsapp-web.js")
const fs = require('fs')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const SESSION_FILE_PATH = './whatsapp-session.json'
let sessionCfg
if(fs.existsSync(SESSION_FILE_PATH)){
    sessionCfg = require(SESSION_FILE_PATH)
}
const client = new Client({puppeteer:{headless: true}, session: sessionCfg} )

let Qr
client.initialize()
client.on('qr',(qr)=>{
    // get QR for login 
   console.log('qr',qr)
   Qr = qr
})

client.on('authenticated', (session) => {
   console.log('AUTHENTICATED', session);
   sessionCfg=session;
   fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
       if (err) {
           console.error(err);
       }
   });
});

client.on('ready', () => {
   console.log('Client is ready!');
});

client.on('message', async msg =>{
    try {
        // get image from chat
        if(msg.hasMedia){
            const attachment = await msg.downloadMedia()
            
            // let buf = await Buffer.from(attachment.data, 'base64').toString('ascii')
            // console.log(buf)
            // fs.writeFile('image.png',attachment.data,function(err){
            //     if(err){
            //         console.error(err)
            //     }
            // })
        }
    } catch (error) {
        console.log(error)
    }
})
app.get('/', (req,res)=>{
    res.status(200).send(Qr)
})
app.post('/sendMessage',async (req,res)=>{
    try {
        console.log(req.body)
        client.sendMessage(req.body.number, req.body.message)
        res.status(200).send('Chat berhasil')
    } catch (error) {
        res.status(500).send(err)
    }
})
const PORT = 2000
app.listen(PORT, ()=>console.log(`Server is running at port ${PORT}`))