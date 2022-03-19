const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/pomp', (req, res)=> res.sendFile(path.join(__dirname, 'pomp.html')));
app.get('/legs', (req, res)=> res.sendFile(path.join(__dirname, 'legs.html')));
app.get('/head', (req, res)=> res.sendFile(path.join(__dirname, 'head.html')));
app.get('/patch', (req, res)=> res.sendFile(path.join(__dirname, 'patch.html')));
app.get('/mismatch', (req, res)=> res.sendFile(path.join(__dirname, 'mismatch.html')));
app.get('/hairmakeup', (req, res)=> res.sendFile(path.join(__dirname, 'hairmakeup.html')));
app.get('/hat', (req, res)=> res.sendFile(path.join(__dirname, 'hat.html')));

app.post('/api/things', async(req, res, next)=>{
    try{
        await Things.findAll()
        res.send(await Things.findAll())
    }catch(err){
        next(err)
    }
})

app.delete('/api/things/:id', async(req, res, next)=>{
    try{
        const destroyed = await Things.findByPk(req.params.id)
        await destroyed.destroy()
        res.sendStatus(204)
    }catch(err){
        next(err)
    }
})

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));
