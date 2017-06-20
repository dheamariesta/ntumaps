import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
}, { timestamps: true });


/**
 * Password hash middleware.
 */
adminSchema.pre('save', function save(next) {

  console.log('pre save hook');
  const admin = this;
  if (!admin.isModified('password')) { return next(); }
  console.log('password is modified');
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    console.log('salt generated');
    bcrypt.hash(admin.password, salt, (err, hash) => {
      if (err) { return next(err); }
      console.log('saving hash');
      admin.password = hash;
      next();
    });
  });
});

adminSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
