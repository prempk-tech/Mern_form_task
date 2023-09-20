import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const settingSchema = mongoose.Schema(
  {
    siteTitle: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    siteURL: {
      type: String,
      required: true,
      trim: true,
    },
    addressline1: {
      type: String,
      trim: true,
    },
    addressline2: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postcode: {
      type: String,
      required: true,
      trim: true,
    },
    applicationPrefix: {
      type: String,
      required: true,
      trim: true,
    },
    googleApi: {
      type: String,
      trim: true,
    },
    SMTP: {
      developement_smtp_host: { type: String },
      developement_smtp_port: { type: String },
      developement_smtp_username: { type: String },
      developement_smtp_password: { type: String },
      production_smtp_host: { type: String },
      production_smtp_port: { type: String },
      production_smtp_username: { type: String },
      production_smtp_password: { type: String },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

settingSchema.methods.isSMTP_developementPasswordMatch = function (password) {
  const smtp = this.SMTP;
  return bcrypt.compareSync(password, smtp.developement_smtp_password);
};

settingSchema.methods.isSMTP_productionPasswordMatch = function (password) {
  const smtp = this.SMTP;
  return bcrypt.compareSync(password, smtp.production_smtp_password);
};
const Setting = mongoose.model('Setting', settingSchema);

export default Setting;
