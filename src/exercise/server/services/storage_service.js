const { Items } = require('../storage/models');

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

    changeItemStatus = async (itemId, status) => {
        console.log(status);
        await Items.update(
            { status: status },
            { where: { id: itemId } }
        );
    }
}

module.exports = new StorageService();