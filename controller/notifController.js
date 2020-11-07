const client = require('../client')

module.exports = {
    sendNotifOrder: async(req,res)=>{
        try {
            client.sendMessage(req.body.number, 
                `Hello ${req.body.name} !!\nTerima kasih telah melakukan pengajuan pesanan anda. Pesanan anda sedang kami periksa. Tunggu konfirmasi selanjutnya dari kami.
                `)
            res.status(200).send('Notif Order Terkirim')
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    sendNotifProccess: async(req,res)=>{
        try {
            client.sendMessage(req.body.number,
                `Hello, ${req.body.name} !!\nPesanan packing list mu sedang diproses.\nStatus order : ${req.body.status}
                `)
            res.status(200).send('Notif Proccess Terkirim')
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    sendNotifJalur: async(req,res)=>{
        try {
            client.sendMessage(req.body.number,
                `Hello, ${req.body.name} !!\nOrder packing list mu sudah ada di gudang China kami. Silahkan pilih jalur dan asuransi yang kamu inginkan :\n
                Pilihan Jalur\n1. Jalur Resmi dengan Asuransi\n2. Jalur Resmi tanpa Asuransi\n
                `)
            res.status(200).send('Notif Pilih Jalur Terikirim')
        } catch (error) {
            console.log(error)
            res.status(500).send(error)      
        }
    },
    sendNotifInvoice: async(req,res)=>{
        try {
            client.sendMessage(req.body.number,
                `Hello, ${req.body.name} !!\nBerikut invoice pesanan anda, ${req.body.invoice}
                `)
            res.status(200).send('Notif Invoice Terkirim')
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    sendNotifImport: async(req,res)=>{
        try {
            client.sendMessage(req.body.number,
              `Hello, ${req.body.name} !!\nBarang anda sedang dikirim dari China. Resi : ${req.body.resi}
              `)
            res.status(200).send('Notif Import Terkirim')
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    sendAddressForm: async(req,res)=>{
        try {
            client.sendMessage(req.body.number,
                `Hello, ${req.body.name} !!\n Barang anda telah tiba di gudang Jakarta, silahkan kirimkan alamat pengiriman anda dengan format :\nForm Alamat\nNama :\nNo.HP:\nAlamat:\n
                `)
            res.status(200).send('Form Alamat Terkirim')
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    sendNotifBill: async(req,res)=>{
        try {
            client.sendMessage(req.body.number,
                `Hello, ${req.body.name} !!\n
                Ini merupakan total tagihan anda. Sebesar ${req.body.bill} , silahkan lakukan pembayaran dan kirim bukti transfer.
                `)
            res.status(200).send(`Notif Tagihan Terkirim`)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)   
        }
    },
    sendNotifOnDelivery: async(req,res)=>{
        try {
            client.sendMessage(req.body.number,
                `Hello, ${req.body.name} !!\n
                Barang anda telah dikirim oleh JNE Resi:${req.body.resi}
                `)
            res.status(200).send(`Notif Resi Terkirim`)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)   
        }
    },

}