let connectDB = require('~db');
let { output } = require('~utils');

exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters:p
    } = event;

    let client = await connectDB();
    const colCarts = client.db().collection('carts');

    if(method == 'DELETE') {

        let {userId} = p;

        userId = Number(userId);

        try {
            await colCarts.deleteOne({user_id: userId}).toArray();
            return output('Carrito borrado');

        } catch (err) {
            return output(err);
        }
    }

};