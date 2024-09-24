const router = require('express').Router();
let Package = require('../Models/Package');

router.route('/create').post((req, res) => {
    
    const packageName = req.body.PackageName;
    const PackageType = req.body.PackageType;
    const PackageDescription = req.body.PackageDescription;
    const Material = req.body.Material;
    const Dimensions = Number(req.body.Dimensions);

    const newPackage = new Package({
        
        PackageName,
        PackageType,
        PackageDescription,
        Material,
        Dimensions,
    });

    newPackage.save().then(() => {
        res.json("Package Added");
    }).catch((err) => {
        console.log(err);
    });
});

router.route('/').get((req, res) => {

    Package.find().then((packages) => {
        res.json(packages);
    }).catch((err) => {
        console.log(err);
    });
});

router.route('/update/:package_id').put(async (req, res) => {
    let packageID = req.params.package_id;
    const { PackageName, PackageType, PackageDescription, Material, Dimensions } = req.body;

    const updatePackage = {
        
        PackageName,
        PackageType,
        PackageDescription,
        Material,
        Dimensions,
    };

    const update = await Package.findByIdAndUpdate(packageID, updatePackage).then(() => {
        res.status(200).send({ status: "Package Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" });
    });
});

router.route('/delete/:package_id').delete(async (req, res) => {
    let packageID = req.params.package_id;

    await Package.findByIdAndDelete(packageID).then(() => {
        res.status(200).send({ status: "Package Deleted" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete package", error: err.message });
    });
});

router.route('/get/:package_id').get(async (req, res) => {
    let packageID = req.params.package_id;
    const package = await Package.findById(packageID).then((package) => {
        res.status(200).send({ status: "Package Fetched", package });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get package", error: err.message });
    });

    
});


module.exports = router;