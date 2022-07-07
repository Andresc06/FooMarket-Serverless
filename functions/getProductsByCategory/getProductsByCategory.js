let connectDB = require('~db');
let { output, log } = require('~utils');

exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters:p
    } = event;

    let client = await connectDB();
    const colProducts = client.db().collection('products');

    if(method == 'GET') {
    
        //Obtiene la información sobre el parámetro
        let {category} = p;

        //Si no hay parámetro, busca todos los productos
            try {
                let res = await colProducts.find({category:category}).toArray();
                return output(res);
                
            } catch (err) {
                log(err);
            }
        

    }

}
