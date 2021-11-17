"use strict";
import fetch from "cross-fetch";
// Import homemade functions from serivce.js
import { writeJsonFile, getUniqueDatascource } from "./service.js";

// Get dashboard
const getDashboard = async (uid) => {
  const urlUid = `http://play.grafana.org/api/dashboards/uid/${uid}/`;
  try {
    const res = await fetch(urlUid);

    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }

    const getDashboard = await res.json();
    // Destructuring
    const { uid, title, panels } = getDashboard.dashboard;
    const { slug, folderUrl } = getDashboard.meta;
    // Getting unique datasources as keys and adding panel id to them as values. These are the panels that use datasources.
    const datasources = getUniqueDatascource(panels);
    // Puting wanted object together
    const dashboard = {
      uid: uid,
      title: title,
      url: urlUid + slug,
      folderUrl: urlUid.slice(0, 27) + folderUrl,
      datasources: datasources,
    };
    // Writing json file
    writeJsonFile(dashboard, slug);
    return dashboard;
  } catch (err) {
    return err;
  }
};

export { getDashboard };
