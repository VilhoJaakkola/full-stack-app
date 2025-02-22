const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'companyUser', 'driver'], // Vain sallitut roolit
        default: 'driver',
        trim: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

// Esimerkkimenetelmät, kuten tokenien käsittely, salasanojen hashays jne.

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
}

// Hashataan salasana ennen tallennusta
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
