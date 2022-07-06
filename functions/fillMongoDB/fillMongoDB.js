
//Para conectarse con el API
let axios = require('axios');

//Database and utils
let connectDB = require('~db');
let { output, log } = require('~utils');

const ENDPOINT_PRODUCTS = 'https://fakestoreapi.com/products/'

exports.handler = async (event) => {

    let { httpMethod: method, queryStringParameters:p } = event;

    const response = await axios.get(ENDPOINT_PRODUCTS);
    let item = response.data;

    let client = await connectDB(); 
    const colProducts = client.db().collection('products');

    if (method == "POST") {
        try {
            for(let i = 0; i < 20; i++){
                await colProducts.insertOne({
                    id: item[i].id,
                    name: item[i].title,
                    category: item[i].category,
                    price: item[i].price,
                    description: item[i].description,
                    image: item[i].image
                });
            }

            return output("Added 20 products...")
        } 
        
        catch (error) {
            log(error)
        }
    }

    if (method == "GET") {
        try {
            let r = await colProducts.find({}).toArray();
            return output(r);
        } catch (error) {
            log(error)
        }
    }

    if (method == 'DELETE') {
        try {
            await colProducts.deleteMany({});
            return output('Erased');
        } catch (err) {
            log(err);
        }
    }
    
}