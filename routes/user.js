import express from 'express';
const router = express.Router()

import { getAllUser as getAllUser, getUserById as getUserById, createUser as createUser, updateUser as updateUser, deleteUser as deleteUser, searchUser as searchUser } from '../databases/database.js'

/* GET /user */
router.get('/', function (req, res, next) {
    const data = getAllUser()
    res.status(200).json(data)
})

/* GET /user/{id} */
router.get('/:id', (req, res) => {
    let id = Number(req.params.id)
    let result = getUserById(id)

    if (result) {
        res.status(200).json(result)      // 200 OK
    } else {
        res.status(404).end()             // 404 Not found
    }
})

/* POST /user */
router.post('/', (req, res) => {
    if (req.headers["content-type"] !== "application/json") {
        return res.status(415).send("Unsupported Media Type");
    }

    let newItem = req.body

    if (!newItem || typeof newItem.forename !== 'string' || typeof newItem.surname !== 'string') {
        return res.status(422).json({ error: 'Invalid input: forename and surname are required.' })
    }

    const validItem = {
        forename: newItem.forename.trim(),
        surname: newItem.surname.trim()
    };

    try {
        createUser(validItem)
        res.status(201).end()
    } catch (error) {
        res.status(422) // Unprocessable Content
    }
})

/* PUT /user/:id */
router.put('/:id', (req, res) => {
    if (req.headers["content-type"] !== "application/json") {
        return res.status(415).send("Unsupported Media Type");
    }

    const id = Number(req.params.id)
    const newItem = req.body

    if (!newItem || typeof newItem.forename !== 'string' || typeof newItem.surname !== 'string') {
        return res.status(422).json({ error: 'Invalid input: forename and surname are required.' })
    }

    const validItem = {
        forename: newItem.forename.trim(),
        surname: newItem.surname.trim()
    }

    try {
        updateUser(id, validItem)
        res.status(200).json(validItem)
    } catch (err) {
        createUser({ id, ...validItem })
        res.status(201).json(validItem)
    }
})

/* DELETE /user/:id */
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    try {
        deleteUser(id)
        res.status(200).end()
    } catch (err) {
        res.status(404).json({ error: 'User not found to delete.' })
    }
})

/* POST /user/search */
router.post('/search', (req, res) => {
    if (req.headers["content-type"] !== "application/json") {
        return res.status(415).send("Unsupported Media Type");
    }

    const { forename } = req.body;
    if (!forename) {
        return res.status(400).json({ error: 'forename is required' });
    }

    const results = searchUser(forename);

    if (results.length > 0) {
        res.status(200).json(results);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

export default router