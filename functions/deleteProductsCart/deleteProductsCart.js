let connectDB = require('~db');
let { output, log } = require('~utils');

exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters:p,
        body: body
    } = event;

    let client = await connectDB();
    const colCarts = client.db().collection('carts');

    if(method == 'PUT') {

        let {userId} = p;
        userId = Number(userId);
        
        let bodyParams = JSON.parse(body);

        try {
            let res = await colCarts.updateOne(
                { user_id: userId }, {
                    $pull: { 
                        products: {
                            productId: {
                                $in: bodyParams
                            }
                        }
                    }
                }
            );
            return output(res);

        } catch (err) {
            log(err);
        }
    }

};