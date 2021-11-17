import { createRequire } from "module";
const requirefs = createRequire(import.meta.url);

// Function is used to write a json file.
const writeJsonFile = function (object, title) {
  const fs = requirefs("fs");
  let data = JSON.stringify(object, null, 2);
  fs.writeFile(`./src/json/${title.replace(/\s/g, '')}.json`, data, (err) => {
    if (err) throw err;
    else {
      console.log(`Great success writing ${title}.json`);
    }
  });
};
/*
This function is used to get an existing unique datascoures from the panels and maping panels that use these datasource with panel Id-s.
*/
const getUniqueDatascource = function (panels) {
  let datasources = [];
  let panelId = [];
  let map = new Map(
    panels.map(({ datasource, id }) => [datasource, { datasource, id: [] }])
  );

  for (let { datasource, id } of panels) {
    map.get(datasource).id.push(...[id].flat());
  }
  map = [...map.values()];

  Object.values(map).forEach((val) =>
    val.datasource !== null
      ? datasources.push(val.datasource) && panelId.push(val.id)
      : null
  );
  const mapPanelsToDatasources = Object.fromEntries(
    datasources.map((key, index) => [key, panelId[index]])
  );
  return [mapPanelsToDatasources];
};

export { writeJsonFile, getUniqueDatascource };
