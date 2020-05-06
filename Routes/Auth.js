module.exports = app=> {
    const categories = require("../controllers/auth");


    const router = require("express").Router();
    //create a new categories
    router.post("/", categories.create);

    //retrieve all categories
    router.get("/", categories.findAll);

    //retrieve all subject
    router.get("/subject", categories.findAllsubject);

    //retrieve a single subject with id
    router.get("/:id", categories.findone);

    //update a categories with id
    router.put("/:id", categories.update);

    //delete a categories with id
    router.delete("/:id", categories.delete );

    //delete all categories with id
    router.delete("/:id", categories.deleteAll);

    app.use("/api/tutorials", router);
}