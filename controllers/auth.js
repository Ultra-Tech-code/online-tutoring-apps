const db = require("../Models/admin");
const Category = db.categories;

//create and save a new Category
exports.create = (req, res) => {
    //validate request
    if (!req.body.title){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    // Create a category
    const category = new Category({
        class: req.body.class,
        subject: req.body.subject, 
    });

    // Save category in the database
    category
     .save(category)
     .then(data => {
      res.send(data);
    })
     .catch(err =>{
         res.status(500).send({
            message:
            err.message || "Some errors occured while creating the category."
        });
    });

};

// Retrieve all category from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: {  $regex: new RegExp(title), $options: "i"}} : {};

    Category.find(condition)
     .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "Some errors occured while retrieveing category."
        });
    });    
};

// find a single tutoriual with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findById(id)
     .then(data =>{
        if(!data)
         res.status(400).send({message: "Cannot find tutorial with id" + id});
        else res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message: "Some errors occured while retrieveing category with id" + id 
        });
    });    
};

// Update a category by id
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;

    Category.findIdAndUpdate(id, req.body, {useFindAndModify: false})
     .then(data =>{
        if(!data)
         res.status(400).send({message: 'Cannot update category with id=' + id});
        else res.send({message: "Catefgory was updated successfully"})
    })
    .catch(err =>{
        res.status(500).send({
            message: "error updating category with id =" + id 
        });
    });    
};

//Delete a category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.findIdAndRemove(id, {useFindAndModify: false})
     .then(data =>{
        if(!data)
         res.status(400).send({message: 'Cannot delete category with id=' + id});
        else res.send({message: "Catefgory was deleted successfully"})
    })
    .catch(err =>{
        res.status(500).send({
            message: "cannot delete category with id =" + id 
        });
    });    
};

//Delete all category from the database
exports.deleteAll = (req, res) => {
    Category.deleteMany({})
     .then(data => {
        res.send({message: "${data.deletedcount} Category was deleted successfully"});
    })
    .catch(err =>{
        res.status(500).send({
            message:  err.message || "Some errors occured while removing category."
        });
    });    
};

// Find all subject in a category
exports.findAllSubject = (req, res) => {
    Category.find({ subject: true })
     .then(data => {
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:  err.message || "Some errors occured while retrieving Subject."
        });
    });    
};




