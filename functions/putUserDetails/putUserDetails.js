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
                {user_id: userId}, 
                {$set: {
                        "user_details.firstName": bodyParams[0],
                        "user_details.lastName": bodyParams[1],
                        "user_details.email": bodyParams[2],
                        "user_details.location": bodyParams[3],
                        "user_details.payment_method": bodyParams[4],
                    }
                }
            );

            return output(res);

        } catch (err) {
            log(err);
        }
    }

};
