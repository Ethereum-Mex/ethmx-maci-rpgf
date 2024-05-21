const fs = require('fs').promises;
 
const loadLocalImage = async () => {
  const imageData = await fs.readFile('/images/so-banner-preview.png');
};
