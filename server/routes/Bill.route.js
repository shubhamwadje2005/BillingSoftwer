const bill = require("../controller/Bill.controller")

const routes = require("express").Router()

routes

    .post("/add", bill.addbillProduct)
    .get("/biil", bill.getBillProduct)
    .get("/bill/deleted-product", bill.getDeleteBillProducts)

    .get("/bill/getPagination", bill.getPagination)
    .put("/bill/:id", bill.updateBillProduct)
    .delete("/bill/deleteproduct/:id", bill.deleteBillProduct)
    .patch("/bill/restore/:id", bill.restoreBillProduct)

    .get("/bill/downloadbill/:id", bill.downloadBillProductPdf)


    // dashbord page 
    .get("/bill/lifetime", bill.getDashboardTotals)

module.exports = routes