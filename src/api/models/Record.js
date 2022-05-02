const mongoose = require('mongoose');

const Record = mongoose.model(
  'Records',
  new mongoose.Schema(
    {
      key: {
        type: String,
        required: true,
        unique: true,
      },
      value: {
        type: String,
        required: true,
      },
      counts: [
        {
          type: Number,
        },
      ],
    },
    { timestamps: true },
  ),
);

exports.Record = Record;
