const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8622;


// middleware
app.use(express(urlencoded({ extended: false })));
const users = require('./MOCK_DATA.json');
// routes

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    return res.send(html);
});

// REST API routes 

app.get('/api/users', (req, res) => {
    return res.json(users);
});

// app.get('/api/users/:id', (req, res)=>{
//     const id = Number(req.params.id);
//     const user = users.find(u => u.id === id);
//     return res.json(user);
// });

app.post('/api/users', (req, res) => {
    // TODO : create new user 
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) return res.status(500).json({ status: 'error', error: err.message });
        return res.json({ status: 'success', id: users.length });
    });
});


// app.patch('/api/users/:id', (req, res)=>{
//     // TODO : update user 
//     return res.json({status: pending});
// });

// app.delete('/api/users/:id', (req, res)=>{
//     // TODO : delete user 
//     return res.json({status: pending});
// });

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(u => u.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return res.status(404).json({ status: 'error', message: 'User not found' });

        users[index] = { ...users[index], ...req.body };
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) return res.status(500).json({ status: 'error', error: err.message });
            return res.json({ status: 'success', id });
        });
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const index = users.findIndex(u => u.id === id);
        if (index === -1) return res.status(404).json({ status: 'error', message: 'User not found' });

        users.splice(index, 1);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) return res.status(500).json({ status: 'error', error: err.message });
            return res.json({ status: 'success', id });
        });
    });
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });