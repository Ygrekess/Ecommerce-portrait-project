import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
  if (user) {
    res.send({ message: 'Client trouvé.', user: user });
  } else {
    res.status(404).send({ message: 'Impossible de trouver le client.' })
  }
 
})

router.post('/register', async (req, res) => {
    //Hash the password
    const salt = await bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

    //Create new User
    const user = new User({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        isAdmin: false,
        newsletter: req.body.newsletter,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);       
    } catch (err) {
        res.status(400).send(err);
    }    
})

router.post('/login', async (req, res) => {
    //Checking if user is already in DB
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (!user) {
        return res.status(400).send('Email or password is wrong.')
    }
    const validPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid password');
    } 
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET)
    res.send({
        _id: user._id,
        isAdmin: user.isAdmin,
        token: token
    });
    //Create and assign a token
    //res.header('auth-token', token).send(token);
})

router.post('/passwordcheck', async (req, res) => {
    //Checking if user is already in DB
    const user = await User.findById( req.body.userId );
    if (!user) {
        return res.status(400).send('Email or password is wrong.')
    }
    const validPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send({error : 'Mot de passe incorrect'});
    } 
    res.send("Mot de passe valide");
    //Create and assign a token
    //res.header('auth-token', token).send(token);
})

router.put("/:id/updatepassword", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    //Hash the password
    const salt = await bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hashSync(req.body.newPassword, salt);
    
    user.password = hashedPassword;
    const updatedUser = await user.save();
    res.send({ message: 'Password updated', user: updatedUser });
  } else {
    res.status(404).send({ message: 'Impossible to update password' })
  }
});

router.put("/:id/updateusername", async (req, res) => {
    const userNameExist = await User.findOne({ email: req.body.newUserName });
    if (!userNameExist) {
        const user = await User.findById(req.params.id);
        if (user) {
            user.email = req.body.newUserName
            const updatedUser = await user.save();
            res.send({ message: 'Username updated', user: updatedUser });
        } else {
            res.send({ error: 'Utilisateur introuvable.' })
        }
    } else {
        res.status(404).send({ error: 'Utilisateur introuvable.' });
    }
});

router.put("/:id/updateinfos", async (req, res) => {
    console.log(req.body)
    const user = await User.findById(req.params.id);
    if (user) {
        user.lastname = req.body.lastname,
        user.firstname = req.body.firstname,
        user.phone = req.body.phone,
        user.newsletter = req.body.newsletter
        console.log(user)
        const updatedUser = await user.save();
        res.send({ message: 'User infos updated', user: updatedUser });
    } else {
        res.send({ error: 'Impossible de mettre à jour les informations de l\'utilisateur.' })
    }
});

export default router;