const glob = require('glob');
const fs = require('fs');
const cwd = process.cwd();
const productionStoryBookUrl = "https://ui-components.alberta.ca";
function getCurrentOutputPath() {
  const workspaceFilePath = `${cwd}/workspace.json`;
  const workspaceContent = JSON.parse(fs.readFileSync(workspaceFilePath, 'utf8').toString());
  return workspaceContent["projects"]["web-components"]["architect"]["build"]["options"]["outputPath"];
}
function getGlobalAttributes() {
  const globalAttributesJsonPath = `${cwd}/libs/web-components/global.html-data.json`;
  return JSON.parse(fs.readFileSync(globalAttributesJsonPath, 'utf8').toString());
}
function report(tags) {
  const outputPath = `${cwd}/${getCurrentOutputPath()}/html.html-data.json`;
  const globalAttributes = getGlobalAttributes();
  if (tags && tags.length > 0) {
    for (let index = 0; index < tags.length; index++) {
      const references = tags[index].references;
      if (references && references.length > 0) {
        for (let j = 0; j < references.length; j++) {
          const oldReferenceUrl = references[j].url;
          if (oldReferenceUrl) {
            const newReferenceUrl = oldReferenceUrl.replace("{{siteUrl}}", productionStoryBookUrl);
            references[j].url = newReferenceUrl;
          }
        }
      }
      tags[index].references = references;
    }
  }
  const content = {
    "tags":tags,
    "valueSets": globalAttributes["valueSets"]
  };
  fs.writeFile(outputPath,
    JSON.stringify(content),
    function (err) {
      if (err) return console.error("[Error] Cannot write the report.");
      console.log("html.html-data.json generated with tags");
    });
}

function getDescription(metadataFilePath) {
  const filePathArray = metadataFilePath.split("/");
  const fileName = metadataFilePath.substring(0, metadataFilePath.length - filePathArray[filePathArray.length - 1].length) + "doc.md";
  try {
    const description = fs.readFileSync(fileName).toString();
    return description;
  } catch (err) {
    return null;
  }
}

glob(`${cwd}/libs/web-components/src/**/*.html-data.json`, (err, files) => {
  if (err) {
    throw err;
  }
  const tags = [];
  files.map(metadataFilePath => {
    getDescription(metadataFilePath);
    try{
      const tag = JSON.parse(fs.readFileSync(metadataFilePath).toString());
      const descriptionFromDoc = getDescription(metadataFilePath);
      const currentTagDescription = tag.description;
      if (!currentTagDescription && descriptionFromDoc != null) {
        tag.description = descriptionFromDoc;
      }
      tags.push(tag);
      // eslint-disable-next-line no-empty
    }catch(e) {
      console.error("[Error] Cannot write tags for " + metadataFilePath + " because " + e);
    }
  });
  report(tags);
});
