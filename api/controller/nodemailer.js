const nodemailer = require('nodemailer')

enviarMail_aLoa = async (asunto, mensaje, email) => {

    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'loaconcept@gmail.com',
            pass: 'jsovpuucyxnoerma'
        }
    }

    const mensajeArmado = {
        from: email,
        to: 'loaconcept@gmail.com',
        subject: asunto ,
        text: mensaje
    }

    const transport = nodemailer.createTransport(config)

    const info = await transport.sendMail(mensajeArmado)

    console.log(info)
}

module.exports = enviarMail_aLoa