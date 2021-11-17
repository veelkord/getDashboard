import express from "express";
import { getDashboard } from "./general/getDashboardByUid.js";
const app = express();
app.use(express.json());
app.get("/:uid", async (req, res) => {
  const uid = req.params.uid;
  // Calling function with uid. You can send any dashboard uid used in play.grafana.com

  if (uid) {
    const dashboard = await getDashboard(uid);
    if (dashboard.uid) {
      res.json(dashboard);
    } else {
      res.json("Sorry this is not valid uid");
    }
  }
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
