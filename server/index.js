const express = require("express")
const mongoose = require("mongoose")
const cros = require("cors")
const cookieParser = require("cookie-parser")
const { userProtected, ProductBill } = require("./middlware/auth.middleware")
require("dotenv").config()

const app = express()

app.use(express.json())
// app.use(cros({ origin: "http://localhost:5173", credentials: true }))
app.use(cros({ origin: "https://billing-softwer-client.vercel.app", credentials: true }))
app.use(cookieParser())


app.use("/api/auth", require("./routes/auth.route"))
app.use("/api/bills", userProtected, require("./routes/Bill.route"))
app.use("/api/productbill", ProductBill, require("./routes/ProductBill.route"))


// app.use("*", (req, res) => {
//     res.status(404).json({ message: "resource not found" })
// })


app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "server error", error: err.message })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("mongo connected")
    app.listen(process.env.PORT, console.log("server running...", process.env.PORT))
})