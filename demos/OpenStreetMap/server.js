import express from 'express';

const app = express();
app.use(express.static('dist'));
app.get('*', (req, res) => {
 res.sendFile(__dirname + '/dist/index.html');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
