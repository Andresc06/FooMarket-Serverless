let connectDB = require('~db');
let { output } = require('~utils');

exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters:p
    } = event;

    //Se conecta a la colección de carritos
    let client = await connectDB();
    const colCarts = client.db().collection('carts');

    if(method == 'PUT') {

        let {userId} = p;
        userId = Number(userId);

        let {total_amount} = p;
        total_amount = Number(total_amount);

        try {
            let res = await colCarts.updateOne({user_id: userId}, {$set:{total_amount: total_amount}});
            return output(res);
        } catch (err) {
            output(err)
        }
    }
}
