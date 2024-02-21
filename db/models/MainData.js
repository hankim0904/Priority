import mongoose from 'mongoose';

const mainDataSchema = new mongoose.Schema(
  {
    imgUrl: { type: String, default: '' },
    content: { type: String, default: '' },
    email: { type: String, default: '' },
    social: { type: [{ site: String, url: String }], default: [] },
  },
  {
    timestamps: true,
  }
);

const MainData = mongoose.models['MainData'] || mongoose.model('MainData', mainDataSchema);

export default MainData;
