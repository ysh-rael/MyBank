module.exports = function () {
    return async function (req, res, next) {
        try {

            const ModelReceiver = require(`../../models/${req.body.receiver.type}`);
            const ModelSender = require(`../../models/${req.body.sender.type}`);
            const Model = require(`../../models/${this.model}`);

            const updateSender = await ModelSender.findByIdAndUpdate(req.transition.sender._id, { lockedValue: Number(req.body.value), $inc: { value: - Number(req.body.value) } }, { new: true });

            const updateReceiver = updateSender ? await ModelReceiver.findByIdAndUpdate(
                req.transition.receiver._id,
                { $inc: { value: req.body.value } }, // Usando $inc para incrementar o valor
                { new: true } // Para retornar o documento atualizado
            ) : false;

            const updateSenderFinally = updateReceiver ? await ModelSender.findByIdAndUpdate(req.transition.sender._id, { $inc: { lockedValue: - Number(req.body.value) } }, { new: true }) : false;

            const sucessUpdate = !!(updateSender && updateReceiver && updateSenderFinally);

            const updateTransition = await Model.findByIdAndUpdate(req.transition._id, { status: sucessUpdate, finished: true }, { new: true });

            const [code, mg] = sucessUpdate && updateTransition ? [201, updateTransition] : [404, { err: true, msg: 'Algum envolvido com a transação não foi encontrado e por isso ela foi finalizada sem efetuar a transação.' }];

            res.status(code).send(mg);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        } finally {

            next();
        }
    };
};