import express from "express";
// import { PrismaClient } from "@prisma/client";

import {productsRouters, productsOnOffer} from "./routes/productsRouters.js";

const app = express();
// const client = new PrismaClient();
app.use(express.json());

app.use("/products", productsRouters);
app.use("/offer", productsOnOffer);

// app.get("/products",productsRouters);
// app.get("/products/:productId",);

// app.get("/offer",productsRouters);

// app.post("/products", );

// app.patch("/products/:productId",);

// app.delete("/products/:productId",
// );

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
