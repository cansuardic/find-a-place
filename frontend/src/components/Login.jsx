import { useState } from "react";
import Header from "./Header";
import VenueDataService from "../services/VenueDataService";
import AdminButton from "./AdminButton";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  var navigate = useNavigate();

  const onButtonClick = () => {
    VenueDataService.login({ email: email, password: password })
      .then((response) => {
        if (response.data.token) {
          sessionStorage.setItem("venue-token", response.data.token);

          navigate("/admin");
        }
      })
      .catch((e) => {
        console.log("Hata Oldu", e);
      });
  };

  return (
    <>
      <Header headerText="Giriş Yap" />

      <div className="row">
        <div className="form-group row">
          <label className="col-xs-10 col-sm-2 control-label">Email</label>
          <div className="col-xs-12 col-sm-10">
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-10 col-sm-2 control-label">Şifre</label>
          <div className="col-xs-12 col-sm-10">
            <input
              className="form-control"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="col-xs-12 col-sm-12">
          <div className="row">
            <div className="column pull-right">
              <AdminButton
                name={"Giriş Yap"}
                type="primary"
                onClick={onButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
