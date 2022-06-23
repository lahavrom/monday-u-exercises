const { Items } = require('../db/models');

class StorageService {
    
    getItems = () => Items.findAll();

    createItem = async (item) => {
        await Items.create(item);
    }

    deleteItem = async (itemId) => {
        await Items.destroy({
            where: { id: itemId }
        });
    }

    changeItemStatus = async (itemId) => {
        const item = await Items.findByPk(itemId, { attributes: ['status'] });
        await Items.update(
            { status: !item.status },
            { where: { id: itemId } }
        );
    }
}

module.exports = new StorageService();