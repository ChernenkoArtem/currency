import Currency from '../models/currency.js';

class CurrencyController {
  async saveNewCurrency(req, res) {
    try {
      const { name, image, values } = req.body;
      const currency = await Currency.findOne({ name });
      if (currency && !values) {
        return res.status(400).json({ message: 'Currency alredy exist' });
      }

      const newCurrency = new Currency({
        name,
        image,
        values: values || [],
      });
      newCurrency.save();

      return res.json({ message: 'currency saved' });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async getCurrency(req, res) {
    try {
      const name = req.query.name;

      if (!name) {
        return res.status(400).json({ message: 'Param name is not exist' });
      }
      const currency = await Currency.findOne({
        name: { $regex: name, $options: 'i' },
      });

      if (!currency) {
        return res.status(400).json({ message: 'Currency name not found' });
      }

      return res.status(200).json({ data: currency });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async editCurrencyValue(req, res) {
    try {
      const name = req.query.name;
      const value = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Param name is not exist' });
      }
      const currency = await Currency.findOne({ name });

      if (!currency) {
        return res.status(400).json({ message: 'Currency name not found' });
      }

      const updatedCurrency = await Currency.findOneAndUpdate(
        { 'values._id': value._id },
        {
          $set: {
            'values.$.time': value.time,
            'values.$.amount': value.amount,
          },
        }
      );

      return res.status(200).json({ data: updatedCurrency });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async postCurrencyValue(req, res) {
    try {
      const name = req.query.name;
      const value = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Param name is not exist' });
      }
      const currency = await Currency.findOne({ name });

      if (!currency) {
        return res.status(400).json({ message: 'Currency name not found' });
      }

      const updatedCurrency = await Currency.findOneAndUpdate(
        { name },
        {
          $push: {
            values: value,
          },
        }
      );

      return res.status(200).json({ data: updatedCurrency });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async deleteCurrencyValue(req, res) {
    try {
      const name = req.query.name;
      const valueId = req.query.valueId;

      if (!name && !valueId) {
        return res.status(400).json({ message: 'Param name is not exist' });
      }
      const currency = await Currency.findOne({ name });

      if (!currency) {
        return res.status(400).json({ message: 'Currency name not found' });
      }

      const updatedCurrency = await Currency.findOneAndUpdate(
        { name },
        {
          $pull: {
            values: {
              _id: valueId,
            },
          },
        },
        { new: true }
      );
      return res.status(200).json({ data: updatedCurrency });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async getCurrencysNames(req, res) {
    try {
      const namesList = (await Currency.find()).map((data) => data.name);
      return res.status(200).json({ data: namesList });
    } catch (e) {
      return res.status(400).json({ message: error });
    }
  }
}

export default new CurrencyController();
