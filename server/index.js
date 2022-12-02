const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const sideMenu = require("./fixture/sideMenu");

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(express.static(path.join(__dirname, "../src")));
app.use(express.json());

const port = process.env.PORT || 5050;

app.get("/api/test", (req, res) => {
    res.send("TEST");
});

app.get("/api/users", (req, res) => {
    res.send({
        params: {
            page: 1,
        },
        pagination: {
            page: 1,
            pageSize: undefined,
            totalCount: 20,
        },
        rowData: [],
    });
});

app.get("/api/sidemenu", (req, res) => {
    res.send(sideMenu);
});

app.listen(port, () => {
    console.log(`서버가 구동되었습니다. http://localhost:${port}`);
});
