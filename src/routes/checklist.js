const router = require('express').Router();
const Checklist = require('../models/checklist');

router.get('/', async (req, res) => {
    try {
        const checklists = await Checklist.find({});
        res.status(200).render('checklists/index', { checklists: checklists });
    } catch (error) {
        res.status(500).render('pages/error/index', { error: 'Erro ao exibir as Listas de tarefas' });
    }
});

router.get('/new', async (req, res) => {
    try {
        const checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao carregar o formulário' });
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao exibir a edição de Listas de tarefas' });
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body.checklist;
    const checklist = new Checklist({ name });

    try {
        await checklist.save();
        res.redirect('/checklists');
    } catch (error) {
        res.status(422).render('checklists/new', { checklists: { ...checklist, error } });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render('checklists/show', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao exibir as Listas de tarefas' });
    }
});

router.put('/:id', async (req, res) => {
    const { name } = req.body.checklist;
    const checklist = await Checklist.findById(req.params.id);

    try {
        await checklist.update({ name });
        res.redirect('/checklists');
    } catch (error) {
        let errors = error.erros;
        res.status(422).render('checklists/edit', { checklist: { ...checklist, errors } });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Checklist.findByIdAndDelete(req.params.id);
        res.redirect('/checklists');
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao deletar a Listas de tarefas' });
    }
});
module.exports = router;
