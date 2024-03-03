const express = require('express')
const Validator = require('async-validator').default

class BaseRouter {
    constructor(model, service, descriptor = {}) {
        this.service = service
        this.model = model
        this.descriptor = descriptor
        this.router = express.Router()
        this.validator = new Validator(descriptor)

        this.router.get('/', async (req, res) => {

            const result = await service.load()
            res.status(200).send(result)
        });

        this.router.get('/:id', async (req, res) => {
            const result = await service.find(req.params.id)
            if (!result) return res.status(404).send("Cannot find data")
            res.send(result)
        })

        this.router.post('/', async (req, res) => {
            console.log("???")
            try {
                await this.validator.validate(req.body)
            } catch ({ errors }) {
                res.status(400).send(errors)
                return errors
            }

            try {
                const result = await service.insert(req.body)
                res.status(200).send(result)
            } catch (e) {
                return e
            }

        })

        this.router.patch('/:id', async (req, res) => {
            const object = Object.assign({}, this.model, req.body)
            const id = req.params.id
            try {
                await this.validator.validate(req.body)
            } catch ({ errors }) {
                res.status(400).send(errors)
                return errors
            }

            try {
                const result = await service.update(id, object)
                res.status(200).send(result)
            } catch (error) {
                return res.status(500).send(error)
            }
        })

        this.router.delete('/:id', async (req, res) => {
            await service.removeBy('_id', req.params.id)

            res.status(200).send("Data is successfully deleted.")
        })
    }

    getRouter() {
        return this.router;
    }
}

module.exports = BaseRouter