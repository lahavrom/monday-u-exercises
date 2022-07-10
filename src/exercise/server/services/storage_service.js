const { Items } = require("../storage/models");

class StorageService {
  getItems = () => Items.findAll();

  createItem = async (item) => {
    const task = await Items.create(item);
    return { ...task.dataValues, status: false };
  };

  deleteItem = async (itemId) => {
    await Items.destroy({
      where: { id: itemId },
    });
  };

  deleteAll = async () => {
    await Items.destroy({
      where: {},
      truncate: true,
    });
  };

  changeItemStatus = async (itemId, status) => {
    await Items.update({ status: status }, { where: { id: itemId } });
  };
}

module.exports = new StorageService();
