import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import e from 'express';

const userService = {
  findUser: async (email) => {
    try {
      const user = await User.findOne({ email }).exec(); 
      return user;
    } catch (error) {
        return null;
    }
  },
  validateUser: async (email, password) => {
    try {
      let user = await userService.findUser(email);

      if (!user) { //User does not exist by that email
        return 1;
      }
      const match = await bcrypt.compare(password, user.password);
      return match ? user : 0; //If the password matches, return the user, else return 0

    } catch (error) {
      console.error('Error validando el usuario:', error);
      throw error;
    }
  },
  createUser: async (email, password, name, surname, telephone, role) => {
    // User.deleteOne({ email: "sergiorgvz@gmail.com" }).then((result) => { 
    //   console.log(result); 
    // });
    try { 
      let user = await userService.findUser(email);
      if (user) {
        console.log('User already exists:', user);
        return null;
      }

      const hash = await bcrypt.hash(password, 10);
      user = await User.create({
        email: email,
        password: hash,
        name: name,
        surname: surname,
        telephone: telephone,
        role: role
      });
      
      console.log('User created:', user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
};

export default userService;
