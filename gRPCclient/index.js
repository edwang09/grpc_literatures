
const port = process.env.PORT || 3000;
const server = require('./controllers/maincontroller');
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});