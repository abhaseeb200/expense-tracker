import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Label,
  Navbar,
  Spinner,
} from "reactstrap";
import { useEffect, useState } from "react";
import CustomInput from "../../components/input";
import getUserByID from "../../config/service/firebase/getUserByID";
import {
  updateUser,
  updateUserWithImage,
} from "../../config/service/firebase/updateUser";
import { storage } from "../../config/firebaseConfig";
import avatarImg from "../../assets/1.png";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const Account = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [upload, setUpload] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [address, setAddress] = useState("");
  const [docID, setDocID] = useState("");
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [
    currentUserID,
    getUserByIDHanlder,
  ] = useOutletContext();

 
  const getUserByIDHandler = () => {
    getUserByID(currentUserID).then((res) => {
      res.forEach((element) => {
        setDocID(element.id);
        setEmail(element.data().email);
        setUsername({
          value: element.data().username,
          isError: false,
          messageError: "",
        });
        setFirstName(element.data().fname);
        setLastName(element.data().lname);
        setPhone(element.data().phone);
        setAddress(element.data().address);
        setImageURL(element.data().profileURL);
      });
    });
  };

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const usernameHandler = (e) => {
    if (e.target.value.trim() === "") {
      setUsername({
        value: e.target.value,
        isError: true,
        messageError: "Please enter your username",
      });
    } else if (e.target.value.match(/[A-Z]/)) {
      setUsername({
        value: e.target.value,
        isError: true,
        messageError: "Username must be lowercase letters",
      });
    } else if (e.target.value.trim().length <= 3) {
      setUsername({
        value: e.target.value,
        isError: true,
        messageError: "Username should be greater than 3",
      });
    } else if (!e.target.value.trim().match(/^\S*$/)) {
      setUsername({
        value: e.target.value,
        isError: true,
        messageError: "Username should not contain spaces",
      });
    } else {
      setUsername({
        value: e.target.value,
        isError: false,
        messageError: "",
      });
    }
  };

  const phoneHandler = (e) => {
    setPhone(e.target.value);
  };

  const addressHandler = (e) => {
    setAddress(e.target.value);
  };

  const uploadHanlder = (e) => {
    setUpload(e.target.files[0]);
    if (e.target.files[0]) {
      let tempImgURL = URL.createObjectURL(e.target.files[0]);
      setImageURL(tempImgURL);
    }
  };
  const saveChangesHanlder = async () => {
    if (username.value === "") {
      setUsername({
        value: username.value,
        isError: true,
        messageError: "Please enter your username",
      });
      return;
    }
    if (!username.isError) {
      let imageFile = upload;
      if (imageFile) {
        let url = "";
        setLoader(true);
        let storageRef = storage.ref("profile/" + imageFile.name);
        try {
          await storageRef.put(imageFile);
          url = await storageRef.getDownloadURL();
          await updateUserWithImage(
            firstName.trim(),
            lastName.trim(),
            username.value.trim(),
            phone.trim(),
            address.trim(),
            url,
            docID
          );
          getUserByIDHanlder(currentUserID);
          setLoader(false);
          toast.success("Profile update successfully!", {
            autoClose: 1500,
          });
        } catch (err) {
          toast.error(err, {
            autoClose: 1500,
          });
        }
      } else {
        setLoader(true);
        try {
          await updateUser(
            firstName.trim(),
            lastName.trim(),
            username.value.trim(),
            phone.trim(),
            address.trim(),
            docID
          );
          setLoader(false);
          toast.success("Profile update successfully!", {
            autoClose: 1500,
          });
          getUserByIDHanlder(currentUserID);
        } catch (err) {
          toast.error(err, {
            autoClose: 1500,
          });
        }
      }
    }
  };

  useEffect(() => {
    getUserByIDHandler();
  }, [currentUserID]);

  return (
    <>
      <div>
        <Card className="mt-4">
          <CardBody className="pb-0">
            <CardTitle>Profile Details {name}</CardTitle>
            <div className="d-flex align-items-start align-items-sm-center gap-4">
              <img
                src={imageURL || avatarImg}
                className="d-block rounded"
                height="100"
                width="100"
              />
              <div className="button-wrapper">
                <label className="btn btn-primary me-2 mb-4">
                  <CustomInput type="file" onChange={uploadHanlder} />
                  <span className="d-block text-white">Upload new photo</span>
                </label>
                <p className="text-muted mb-0">Allowed JPG, GIF or PNG.</p>
              </div>
            </div>
          </CardBody>
          <CardBody className="pt-3 row">
            <div className="col-md-6 mb-3">
              <Label>First name</Label>
              <CustomInput
                placeholder="John"
                type="text"
                value={firstName}
                onChange={firstNameHandler}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label>last name</Label>
              <CustomInput
                placeholder="Doe"
                type="text"
                value={lastName}
                onChange={lastNameHandler}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label>e-mail</Label>
              <CustomInput
                disabled="disabled"
                placeholder=""
                type="email"
                value={email}
                onChange={emailHandler}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label>username</Label>
              <CustomInput
                placeholder="example"
                type="text"
                value={username.value}
                isError={username.isError}
                messageError={username.messageError}
                onChange={usernameHandler}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label>Phone number</Label>
              <CustomInput
                placeholder="+1 234 456"
                type="number"
                value={phone}
                onChange={phoneHandler}
              />
            </div>
            <div className="col-md-6 mb-3">
              <Label>address</Label>
              <CustomInput
                placeholder="123 Main St, Apt 4B, City"
                type="text"
                value={address}
                onChange={addressHandler}
              />
            </div>
            <div className="col-md-12 w-100">
              <Button
                color="primary"
                className={loader ? "btn-disabled w-100" : "w-100"}
                onClick={saveChangesHanlder}
              >
                {loader ? <Spinner size="sm"></Spinner> : "Save changes"}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Account;
