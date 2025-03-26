// #region Creating new model
const createModel = (Model) => {
  return async (req, res) => {
    try {
      const userId = req.user.userId;
      const body = { ...req.body, userId };

      const newModel = new Model(body);
      await newModel.save();

      res.status(201).json(newModel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Bir hata oluştu." });
    }
  };
};
//#endregion

// #region Getting all models
const getModel = (Model) => {
  return async (req, res) => {
    try {
      const userId = req.user.userId;
      const data = await Model.find({ userId });

      if (data.length === 0) {
        return res
          .status(404)
          .json({ error: `${Model.modelName} not found for this user.` });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error(`Getting ${Model.modelName} error:`, error);
      res.status(500).json({ error: "Server Error!" });
    }
  };
};
//#endregion

// #region Updating model
const updateModel = (Model) => {
  return async (req, res) => {
    try {
      const id = req.params.id;
      const updateBody = req.body;

      const existingModel = await Model.findById(id);
      if (!existingModel) {
        return res.status(404).json({ error: `${Model.modelName} not found!` });
      }
      const updatedModel = await Model.findByIdAndUpdate(id, updateBody, {
        new: true,
      });

      res.status(200).json(updatedModel);
    } catch (error) {
      console.error(`Updating ${Model.modelName} error:`, error);
      res.status(500).json({ error: "Server Error!" });
    }
  };
};
//#endregion

// #region Deleting model
const deleteModel = (Model) => {
  return async (req, res) => {
    try {
      const id = Model.modelName === "users" ? req.params.email : req.params.id;

      const existingModel =
        Model.modelName === "users"
          ? await Model.findOne({ email: id })
          : await Model.findById(id);

      if (!existingModel) {
        return res.status(404).json({ error: `${Model.modelName} not found!` });
      }

      if (Model.modelName === "users") {
        await Model.findOneAndDelete({ email: id });
      } else {
        await Model.findByIdAndDelete(id);
      }

      res.status(200).json({ message: "Deleting is successful!" });
    } catch (error) {
      console.error(`Deleting ${Model.modelName} error:`, error.message);
      res.status(500).json({ error: "Server Error!" });
    }
  };
};

//#endregion

module.exports = {
  createModel,
  getModel,
  updateModel,
  deleteModel,
};
