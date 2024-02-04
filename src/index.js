import app from './app.js';

const port = process.env.PORT || 8080;

//Starts the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});