const { Record } = require('../models/Record');
/**
 * Get Records
 * @public
 */
exports.get = async (req, res) => {
  const query = [
    {
      $project: {
        _id: 0,
        key: '$key',
        createdAt: 1,
        totalCount: { $sum: '$counts' },
      },
    },
  ];
  //  console.log(req);
  // Filtering
  if (req?.body) {
    const {
      startDate, endDate, minCount, maxCount,
    } = req.body;

    const createdAt = {};
    const totalCount = {};

    if (startDate) {
      createdAt.$gte = new Date(startDate);
    }
    if (endDate) {
      createdAt.$lte = new Date(endDate);
    }
    if (minCount) {
      totalCount.$gte = Number(minCount);
    }
    if (maxCount) {
      totalCount.$lte = Number(maxCount);
    }

    const matches = [];
    if (Object.keys(createdAt).length > 0) {
      matches.push({ createdAt });
    }
    if (Object.keys(totalCount).length > 0) {
      matches.push({ totalCount });
    }

    if (matches.length) {
      query.push({
        $match: {
          $and: matches,
        },
      });
    }
  }

  try {
    const records = await Record.aggregate(query);
    res.status(200).send({ code: 0, msg: 'Success', records });
  } catch (error) {
    res.status(500).send({ code: 500, msg: 'Internal Server Error' });
  }
};
