import models from '../models/init-models';

const seedProducts = async () => {
    try {
        if (models.product.count() > 0) {
            console.log('Data Product already seeded');
        } else {
            const products = [
                { prodId: "1c4b8f61-f657-4466-b997-d610752c6c95", name: 'SmaPhon Xaoma', cateId: '72afff4f-20a0-4f28-921c-5a59bcf31818', stock: 10, price: 2000 },
                { prodId: "0264c80c-b873-45d9-b015-8c535467a343", name: 'SmaPhon Sumyang', cateId: '72afff4f-20a0-4f28-921c-5a59bcf31818', stock: 10, price: 2200 },
                { prodId: "3df0073e-7486-49a9-b628-6fcda53d12a3", name: 'SmaPhon Haway', cateId: '72afff4f-20a0-4f28-921c-5a59bcf31818', stock: 10, price: 2100 },
                { prodId: "196ef1fe-49d6-41ec-87e5-185f24c0b032", name: 'Wulang AP', cateId: '803a52d7-9b9d-4ea5-a9f1-76258e841050', stock: 10, price: 20000 },
                { prodId: "a8471ac2-d7be-4ed6-a1f8-259c92385566", name: 'Tyata Ran', cateId: '803a52d7-9b9d-4ea5-a9f1-76258e841050', stock: 10, price: 25000 },
                { prodId: "f2bdb93e-0307-4e1d-a740-526bdceda398", name: 'Mersi BM1', cateId: '803a52d7-9b9d-4ea5-a9f1-76258e841050', stock: 10, price: 30000 },
                { prodId: "624020e9-beb5-4107-a6c2-5750a4e13195", name: 'Moti Chopper', cateId: '0c3a7287-3c09-40ab-a533-79989f97dfd6', stock: 10, price: 1900 },
                { prodId: "0f1f0153-c5d0-45e8-9b3f-e9007f4d3c69", name: 'Moti Air Fryer', cateId: '0c3a7287-3c09-40ab-a533-79989f97dfd6', stock: 10, price: 2300 },
                { prodId: "453f5bbe-e247-461b-bf50-1695d0affb91", name: 'Moti Blender', cateId: '0c3a7287-3c09-40ab-a533-79989f97dfd6', stock: 10, price: 2000 },
            ];

            for (let product of products) {
              await models.product.create(product);
              console.log(`Product ${product.name} created`);
            }
        }

    } catch (error) {
        console.log(error);
    }
}

export default  {
    seedProducts
};
