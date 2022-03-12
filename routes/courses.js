const express = require('express');
const router = express.Router();
const Joi = require('joi');


const courses = [
    {id: 1, name: 'course1', email: 'course1@gmail.com'},
    {id: 2, name: 'course2', email: 'course2@gmail.com'},
    {id: 3, name: 'course3', email: 'course3@gmail.com'},
    {id: 4, name: 'course4', email: 'course4@gmail.com'}
];

router.get('/', (req, res) => {
    res.send(courses);
});


router.post('/', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const course = {
        id: courses.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return  res.status(404).send('BU ID MOVCUD DEYILDIR!!!');

    const { error } = validateCourse(req.body);
    if (error) return   res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    course.email = req.body.email;
    res.send(course);
});

router.delete('/:id', (req, res) =>{
    const course = courses.find(c =>c.id === parseInt(req.params.id));
    if(!course) return  res.status(404).send('BU ID MOVCUD DEYILDIR');


    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({name: Joi.string().min(3).required(),
        email: Joi.string().min(5).required()
    });
    const validation = schema.validate(course);
    return validation;
}

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return  res.status(404).send('BU ID MOVCUD DEYILDIR!!');
    res.send(course);
});

module.exports = router;