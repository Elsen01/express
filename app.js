const Joi = require('joi')
const exprees = require('express');
const app = exprees();


app.use(exprees.json());


const courses = [
    {id: 1, name: 'course1', email: 'course1@gmail.com'},
    {id: 2, name: 'course2', email: 'course2@gmail.com'},
    {id: 3, name: 'course3', email: 'course3@gmail.com'},
    {id: 4, name: 'course4', email: 'course4@gmail.com'}
]


app.get('/', (req, res) => {
    res.send('Welcome');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});


app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('BU ID MOVCUD DEYILDIR!!!');

    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;

    }
    course.name = req.body.name;
    course.email = req.body.email;
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({name: Joi.string().min(3).required(),
        email: Joi.string().min(5).required()
    });
    const validation = schema.validate(course);
    return validation;

}


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('BU ID MOVCUD DEYILDIR!!');
    res.send(course);
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...` ));