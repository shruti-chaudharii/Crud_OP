const express = require("express");
const mongoose = require("mongoose"); 

require("./db/conn"); 
const Student = require("./models/students");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.post("/students", (req,res) => {
    // console.log(req.body);
    const user = new Student(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


// app.get("/students",async(req,res)=>{
//     try{
//        const studentsData = await Student.find();
//        res.send(studentsData);
//        console.log(studentsData);
//     }catch(e){
//         res.send(e);
//     }
// })

app.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id)   
        if (!studentData) {
            return res.status(404).send();
        }
        else {
            res.send(studentData);
        }
    } catch (e) {
        res.send(e);
    }
})

app.patch("/students/:id", (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    Student.findByIdAndUpdate(id, newData, { new: true })
        .then(updatedData => {
            res.status(200).send(updatedData);
        })
        .catch(error => {
            res.status(400).send(error);
        });
});

app.put("/students/:id", (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    Student.findByIdAndUpdate(id, newData, { new: true })
        .then(updatedData => {
            res.status(200).send(updatedData);
        })
        .catch(error => {
            res.status(400).send(error);
        });
});

app.delete("/students/:id", (req, res) => {
    const { id } = req.params;
    Student.findByIdAndDelete(id)
        .then(deletedData => {
            if (!deletedData) {
                return res.status(404).send("Data not found");
            }
            res.status(200).send(deletedData);
        })
        .catch(error => {
            res.status(400).send(error);
        });
});

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
});


