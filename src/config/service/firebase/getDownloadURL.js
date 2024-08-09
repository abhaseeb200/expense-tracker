import { storage } from "../../firebaseConfig";

const getDownloadURL = async (path, file) => {
  let storageRef = storage.ref(`${path}/` + file.name);
  try {
    await storageRef.put(file);
    return await storageRef.getDownloadURL();
  } catch (error) {
    console.error(error?.message);
  }
};

export default getDownloadURL;
