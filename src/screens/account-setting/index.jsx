import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Form, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input";
import ImageModal from "../../components/ImageModal";
import useUser from "../../hooks/useUser";
import { editUserReducer } from "../../feature/auth/userSlice";
import accountSettingInputs from "../../constant/inputs/accountSettingInputs";
import { storage } from "../../config/firebaseConfig";
import {
  updateUser,
  updateUserWithImage,
} from "../../config/service/firebase/updateUser";
import avatarImg from "../../assets/1.png";

const Account = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [isOpenImage, setIsOpenImage] = useState(false);


  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const { useUpdateUser, loading } = useUser();

  const handleUpload = (e) => {
    // setUpload(e.target.files[0]);
    if (e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
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
          let data = {
            profileURL: url,
            phone: phone,
            email: email,
            lname: lastName,
            userId: userData?.userId,
            username: username.value.trim(),
            fname: firstName,
            address: address,
            docID: docID,
          };
          dispatch(editUserReducer(data));
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
          let data = {
            phone: phone,
            email: email,
            lname: lastName,
            userId: userData?.userId,
            username: username.value.trim(),
            fname: firstName,
            address: address,
            docID: docID,
          };
          setLoader(false);
          dispatch(editUserReducer(data));
          toast.success("Profile update successfully!", {
            autoClose: 1500,
          });
        } catch (err) {
          toast.error(err?.message, {
            autoClose: 1500,
          });
        }
      }
    }
  };

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    // USERNAME VALIDATION
    if (e.target.name !== "username") return;

    if (!e.target.value?.trim()) {
      setErrors({ ...errors, [e.target.name]: true });
    } else {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {};
    let error = {};
    let formData = new FormData(e.target);

    formData.forEach((value, key) => {
      data[key] = value;
      if (key === "username" && !data?.username?.trim()) {
        error[key] = true;
      }
    });
    setErrors(error);

    if (!Object.values(error).includes(true)) {
      // await useUpdateUser(data);
    }
  };

  useEffect(() => {
    setValues(userData);
  }, [userData]);

  const handleOpenImage = (url) => {
    setImageUrl(url);
    setIsOpenImage(true);
  };

  useEffect(() => {
    setPreviewImage(avatarImg);
  }, []);

  return (
    <>
      <Card className="my-4">
        <CardBody>
          <CardTitle>Account Setting</CardTitle>
          <Form className="d-flex gap-4 flex-column" onSubmit={handleSubmit}>
            <div className="profile-upload d-flex align-items-start align-items-sm-center gap-4">
              <img
                src={avatarImg}
                className="d-block rounded object-fit-cover"
                height="100"
                width="100"
                onClick={()=>handleOpenImage(avatarImg)}
              />
              <div className="button-wrapper">
                <label className="btn btn-primary me-2 mb-2">
                  <input type="file" onChange={handleUpload} />
                  <span className="d-block text-white">Upload new photo</span>
                </label>
                <p className="mb-0">Allowed JPG, GIF or PNG.</p>
              </div>
            </div>

            {accountSettingInputs?.map((input) => {
              return (
                <Input
                  {...input}
                  key={input?.id}
                  value={values[input.name] || ""}
                  errors={errors[input.name]}
                  onChange={handleOnChange}
                />
              );
            })}
            <Button color="primary" className="w-100" type="submit">
              {loading ? <Spinner size="sm"></Spinner> : "Update Profile"}
            </Button>
          </Form>
        </CardBody>
      </Card>

      <ImageModal
        imageUrl={imageUrl}
        isOpen={isOpenImage}
        onClose={() => setIsOpenImage(false)}
      />
    </>
  );
};

export default Account;
