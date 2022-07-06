let connectDB = require('~db');
let { output } = require('~utils');

exports.handler = async (event) => {

    let { httpMethod: method, queryStringParameters:p } = event;

    //Se conecta a la colección de carritos
    let client = await connectDB();
    const colCarts = client.db().collection('carts');

    if(method == 'POST') {

        //Toma el user id que se le pasó como parámetro
        let {userId} = p;
        userId = Number(userId);

        try {

            //Crea un nuevo objeto que representará el carrito
            await colCarts.insertOne({
                user_id: userId,
                user_details: {
                    firstName: undefined,
                    lastName: undefined,
                    email: undefined,
                    location: undefined,
                    payment_method: undefined
                },
                products: []
            });
            
            return output(`Cart created for the user: ${ userId }`)

        } 
        
        catch (err) {
            return output(err);
        }

    }

}
