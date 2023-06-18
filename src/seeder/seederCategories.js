import models from '../models/init-models';

const seedCategories = async () => {
    try {
        if (models.category.count() > 0) {
            console.log('Data Category already seeded');
        } else {
            const categoryProducts = [
                { cateId: '72afff4f-20a0-4f28-921c-5a59bcf31818', cateName: 'Electronics' },
                { cateId: '803a52d7-9b9d-4ea5-a9f1-76258e841050', cateName: 'Automotive' },
                { cateId: '0c3a7287-3c09-40ab-a533-79989f97dfd6', cateName: 'Utensils' }
            ];

            // Menambahkan setiap category ke dalam basis data
            for (let category of categoryProducts) {
                await models.category.create(category);
                console.log(`Category ${category.cateName} created`);
            }
        }

    } catch (error) {
        console.log(error);
    }
}

export default  {
    seedCategories
};
