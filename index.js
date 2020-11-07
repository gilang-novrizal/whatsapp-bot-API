const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const moment = require('moment')
const fs = require('fs')
const client = require('./client')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const SESSION_FILE_PATH = './whatsapp-session.json'

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
            let date = Date.now()
            fs.writeFile(`image/etera-receipt-${moment().format('DD-MM-YYYY')}.png`, attachment.data, {encoding: 'base64'}, function(err){
                if(err){
                    console.error(err)
                }
            })
        }else if(msg.body.toLowerCase() == 'barang sampai'){
            msg.reply(`Hello, Aldo!!\nTerima kasih telah melakukan pemesanan.
            `)
        }
        else if(msg.body.toLowerCase().includes('form alamat')){
            console.log(msg.body)
            msg.reply(`Hello, Aldo !!\nKami akan segera mengirim barang pesanan anda.
            `)
        }else if(msg.body.toLowerCase().includes('pilihan jalur')){
            if(msg.body.includes('1')){
                msg.reply(`Hello, Aldo !!\nAnda telah memilih Jalur Resmi dengan Asuransi, tunggu info kami berikutnya.
                `)
            }else if(msg.body.includes('2')){
                msg.reply(`Hello, Aldo !!\nAnda telah memilih Jalur Resmi tanpa Asuransi, tunggu info kami berikutnya.
                `)
            }
        }
    } catch (error) {
        console.log(error)
    }
    
       
})

app.get('/', (req,res)=>{
    res.status(200).send(Qr)
})
// app.post('/sendMessage',async (req,res)=>{
//     try {
//         console.log(req.body)
//         client.sendMessage(req.body.number, req.body.message)
//         res.status(200).send('Chat berhasil')
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

const {notifRouter} = require('./router')
const { brotliCompress } = require('zlib')
app.use('/sendNotif', notifRouter )

const PORT = 2000
app.listen(PORT, ()=>console.log(`Server is running at port ${PORT}`))
