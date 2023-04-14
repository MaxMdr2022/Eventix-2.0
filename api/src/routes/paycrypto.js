const {Router} = require("express");
require('dotenv').config();
const {COINBASE_API_KEY, DOMAIN, COINBASE_WEBHOOK_SECRET} = process.env;
const {Client, resources, Webhook} = require("coinbase-commerce-node"); // resources son los servicios que ofrece coinbase. Si queremos crear una orden de pago, lo inficamos en resources
const {Ticket} = require("../db");
const { Op } = require("sequelize");
const {v4: uuidv4} = require("uuid");


Client.init(COINBASE_API_KEY);  // conectamos a coinbase

const {Charge} = resources;  // charge: Crear ordende pago (le indicamos a coinbase cuanto queremos cobrar y por que producto ). checkout: un producto a un precio definido. Event: 

const route = Router();



route.post("/create-charge", async(req,res)=>{   // ruta de pago http://localhost:3001/paycrypto/create-charge

    const {total,name,description, typeTicket, price, cantidad, id_user} = await req.body;
    
    console.log("data ::: total: ", total, " name: ", name, " descr:", description, " TTIC: ", typeTicket, " price: ", price, " can: ", cantidad, " useid:", id_user )
    // creo el ticket y lo guardo en la BD ---------------------------

    let ticketId = [];

    for(let i = 0; i< cantidad; i++){

        let uuid = uuidv4();

        ticketId.push(uuid);

        await Ticket.create({
            event: name,
            price: price,
            typeTicket: typeTicket,
            // usersId: 01,
            paymentMade:false,
            pendingPayment:false,
            invoiceTicketId: uuid
        })
    };
    
    console.log("tikcetid", ticketId);  
    
    //------------------------------------------------------------------------------------------------------

    // console.log(total,name, description);

    const chargeData = {                    //  datos del pago
        name: name,
        description: description, 
        local_price: {
            amount: total,
            currency: 'USD'
        },
        pricing_type: 'fixed_price',
        metadata: {                        // info del comprador. para guardar en la base de datos.
            customer_id: id_user,
            // customer_name: "Maxi Meder",
            customer_id_ticket: ticketId  //guardo el id de cada ticket
        },
        redirect_url: `${DOMAIN}`, // ${DOMAIN}/perfilusuario/pago   cuando el pago se finaliza le sale un boton para continuar. Esa url es donde lo va a redirigir el boton. NOTA: tiene que ser un dominio https. Si no coinbase no redirecciona. 
        cancel_url: `${DOMAIN}`,  // cuando se calcele el pago, va a redireccionar a esta ruta.
    };
    console.log("dominio:", DOMAIN)
    const charge = await Charge.create(chargeData);  // le pasamos los datos para que cree la orden de pago. charge es un json con toda la info. donde vamos a tomar el parametro hosted_url que contiene la url que nos manda a la pasarela de pago
    
    // res.send(charge); //  podemos ver el json con todos los parametros entrando en http://localhost:3001/paycrypto/create-charge

    const url = charge.hosted_url;  // guardamos la url de la pasarela

    console.log("url::::",url);

    res.send(url)
    // res.redirect(url); // redireccionamos a la url de la pasarela de pago. 
   
});


//---------------esto creo que no se va a usar.-----------------------------------

// route.get("/succes-payment", async (req,res)=>{ // que redireccione a una pag cuando el pago se confirme

//     // res.send("payment succesfull");

//     res.redirect("https://eventix-prueba.vercel.app"); // que redireccione al perfil del usuario dnde va a poder ver los tickets comprados.
// });

// route.get("/cancel-payment", async(req,res)=>{ // lo mismo pero cuando el pago se cancele. 
 
//     // res.send("cancel payment");
//     console.log("DOMINIO",DOMAIN);
//     return res.redirect(DOMAIN);
// });

//-------------------------------------------------------------------------------------------

route.post("/payment-handler", async(req,res)=>{   /// trae los estados del pago

    const rawBody = req.rawBody;  // coinbase envia el estado de la transaccion en formato binario. 

    const signature = req.headers['x-cc-webhook-signature'];

    const webhookSecret = COINBASE_WEBHOOK_SECRET;

    let event;  // el estadoo de la transaccion
    
    try {
        
        event = Webhook.verifyEventBody(rawBody, signature, webhookSecret);  // esta clase recibe por el metodo verifyEventBody: el rewBody (la data que envia coinbase) asignatur y webhooksecret. Es para validar si lo que me envia es valido  
        // console.log("event",event);
        //comprobamos el tipo de evento, los estados del pago que manda coinbase


        if(event.type === "charge:confirmed"){  // se confirmo el pago

            
            console.log("pago realizado");  

            // const tickets = await Ticket.findAll();

            // const ticketsIds = tickets.filter(e => e.);

            // const usersIds = tickets.map(e => e.id)


            for(let i=0; i<event.customer_id_ticket.length; i++){

                await Ticket.update({paymentMade: true},{ where: {[Op.and]: [{userId :event.customer_id },{id:event.customer_id_ticket[i]}]}});
            };
        
            //PARA HACER LA PRUEBA BUSCAR POR EL ID DEL USER Y MODIFICAR EN TRUE 

            // await Ticket.update({paymentMade: true},{ where: {usersId: 01}})  // <----Prueba 
        };

        if(event.type === "charge:pending"){


            for(let i=0; i<event.customer_id_ticket.length; i++){

                await Ticket.update({pendingPayment: true},{ where: {[Op.and]: [{userId :event.customer_id },{id:event.customer_id_ticket[i]}]}});
            };

            // await Ticket.update({pendingPayment: true},{ where: {usersId: 01}}) // <---------prueba

            console.log("pago pendiente");

        };

        if(event.type === "charge:failed"){ // si el pago se cancela, busco los tickets por id de usuario y id de ticket y los elimino de la BD
            
            console.log("pago fallido");
     

            console.log("id ticket pafo fallido: ", event.customer_id_ticket)
            console.log("id user pago fall: ", event.customer_id)
            // for(let i=0; i<event.customer_id_ticket.length; i++){

            //     await Ticket.destroy ({ where: {[Op.and]: [{userId :event.customer_id },{id:event.customer_id_ticket[i]}]}})
            // }

            //    userId: event.metadata.customer_id


            // await Ticket.destroy ({ where: {usersId: 01}}) // <-------------- prueba
        };

        res.status(200).send("ok");

    } catch (error) {
        console.log("fail",error);
        res.status(500).send(error.message);
    }
});


module.exports = route;


//DOCUMENTACION: 
//https://docs.cloud.coinbase.com/sign-in-with-coinbase/docs/client-libraries
//https://www.npmjs.com/package/coinbase-commerce-node
//https://www.youtube.com/watch?v=MmSzVCrP3U8