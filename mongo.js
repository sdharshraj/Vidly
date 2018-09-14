var mongoose = require('mongoose');
const uri = 'mongodb://sdharshraj:Password123@ds253922.mlab.com:53922/nodedemo';
mongoose.connect(uri, {
                useNewUrlParser: true
        })
        .then(() => console.log('Connected to MongoDB'))
        .catch('some error occured while connecting to mongo.');

const courseSchema = new mongoose.Schema({
        name: {type: String, required: true},
        author: String,
        tags: [String],
        date: {
                type: Date,
                default: Date.now
        },
        isPublished: Boolean,
        price: {
                type: Number,
                validate:{
                        validator: function(v) {
                                return v>10;
                        },
                        message: 'Price should be greater than 10.'
                }
        }
});
const Course = mongoose.model('Course', courseSchema);

async function createCourses() {
        try {
                const course = new Course({
                        author: 'Pradeep Raj',
                        tags: ['Java', 'Programing language'],
                        isPublished: true,
                        price: 3
                });

                const res = await course.save();
                console.log(res);
        } catch (err) {
                for(field in err.errors){
                console.log(err.errors[field].message);
                }
        }
        
}

async function getCourses() {
        const courses = await Course
                .find({
                        price: {
                                $gte: 25
                        }
                })
                .or([{
                        author: 'Harsh Raj'
                }, {
                        isPublished: true
                }])
                .sort({
                        name: 1
                });
        console.log(courses);
}

async function updateCourse(id) {
        const course = await Course.update({_id: id}, )

        if (!course) return console.log('course is not found.');
        // course.isPublished = true;
        // course.author = "Manish Kumar";

        course.set({
                author: 'Aakarsh Raj'
        });
        const res = await course.save();
        console.log(res);
}

async function deleteCourse() {
        Course.deleteMany({
                author: 'Manish Raj'
        }, (err => {
                if (err)
                        console.log('Can not delete', err)
                else
                        console.log('deleted');
        }));
}

//updateCourse('5b9a06320bf9e7425c5c4cd5');
createCourses();