import myExpots from './TridentBFSAlgo.js';

const { tridentBFSAlgo, html } = myExpots;

const convertFdxToJson = (node) => {
  const jsonContent = xmlToJson(node);
  tridentBFSAlgo(jsonContent);
};

const xmlToJson = (node) => {
  if (node.nodeType === 3) { // Text node
    return node.nodeValue.trim();
  }

  let obj = {};
  if (node.attributes) {
    for (let i = 0; i < node.attributes.length; i++) {
      const attr = node.attributes[i];
      obj[`@${attr.nodeName}`] = attr.nodeValue;
    }
  }
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      const childName = child.nodeName;
      const childValue = xmlToJson(child);

      if (obj[childName]) {
        if (!Array.isArray(obj[childName])) {
          obj[childName] = [obj[childName]];
        }
        obj[childName].push(childValue);
      } else {
        obj[childName] = childValue;
      }
    }
  }
  return obj;
};

export default 
{
  convertFdxToJson,
  html
}