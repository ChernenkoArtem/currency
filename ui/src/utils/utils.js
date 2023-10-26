export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (validateFileImage(file)) {
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    } else {
      reject('Invalid file type');
    }
  });
};

export const validateFileImage = (file) => {
  const fileName = file.name,
    idxDot = fileName.lastIndexOf('.') + 1,
    extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
  const fileTypes = ['jpg', 'jpeg', 'png', 'gif'];

  return fileTypes.includes(extFile);
};
