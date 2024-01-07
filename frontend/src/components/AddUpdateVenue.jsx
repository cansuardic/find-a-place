import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VenuDataService from "../services/VenueDataService";
import Header from "./Header";
import AdminButton from "./AdminButton";

const AddUpdateVenue = () => {
  const { id } = useParams();
  var navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      VenuDataService.getVenue(id)
        .then((result) => {
          let selectedVenue = result.data;

          selectedVenue.hours.map((h) => {
            h.openClosedHours = h.open + "," + h.close;
          });
          setVenueData(selectedVenue);

          let headerName = selectedVenue.name;
          setMottoText(headerName + " mekanını güncelleyin!");
        })
        .catch();
    }
  }, [id]);

  const [mottoText, setMottoText] = useState("Yeni Mekan Ekle!");
  const [venueData, setVenueData] = useState({
    name: "",
    address: "",
    foodanddrink: [],
    distance: "",
    coordinates: [],
    hours: [
      { days: "", open: "", close: "", closed: false, openClosedHours: "" },
      { days: "", open: "", close: "", closed: false, openClosedHours: "" },
    ],
  });

  const handleNameChange = (value) => {
    setVenueData({
      ...venueData,
      name: value,
    });
  };

  const handleAddressChange = (value) => {
    setVenueData({
      ...venueData,
      address: value,
    });
  };

  const handleFoodAndDrinkChange = (value) => {
    const foodAndDrinkArray = value.split(",").map((item) => item.trim());

    setVenueData({
      ...venueData,
      foodanddrink: foodAndDrinkArray,
    });
  };

  const handleCoordinatesChange = (value) => {
    const coordinatesArray = value.split(",").map((item) => item.trim());

    setVenueData({
      ...venueData,
      coordinates: coordinatesArray,
    });
  };

  const handleDaysChange = (index, value) => {
    const updatedDays = [...venueData.hours];
    updatedDays[index].days = value;
    setVenueData({
      ...venueData,
      hours: updatedDays,
    });
  };

  const handleOpenClosedHoursChange = (index, value) => {
    const updatedHours = [...venueData.hours];

    updatedHours[index].openClosedHours = value;

    // Split ile virgülü ayır, ilki open hour, ikinci closed hour
    const [startHour, endHour] = value.split(",");
    updatedHours[index].open = startHour;
    updatedHours[index].close = endHour;

    setVenueData({
      ...venueData,
      hours: updatedHours,
    });
  };

  const addOrUpdateVenue = () => {
    let venueFormData = {
      name: venueData.name,
      address: venueData.address,
      foodanddrink: venueData.foodanddrink,
      lat: venueData.coordinates[0],
      long: venueData.coordinates[1],
      day1: venueData.hours[0].days,
      open1: venueData.hours[0].open,
      close1: venueData.hours[0].close,
      isClosed1: venueData.hours[0].closed,
      day2: venueData.hours[1].days,
      open2: venueData.hours[1].open,
      close2: venueData.hours[1].close,
      isClosed2: true,
    };

    console.log(venueFormData);

    if (id) {
      // Id varsa venue'yu güncelle
      VenuDataService.updateVenue(id, venueFormData)
        .then(() => {
          navigate(`/admin`);
        })
        .catch((e) => {
          console.log("Hata", e);
        });
    } else {
      VenuDataService.addVenue(venueFormData)
        .then(() => {
          navigate(`/admin`);
        })
        .catch((e) => {
          console.log("Hata", e);
        });
    }
  };

  return (
    <>
      <Header headerText={"Yönetici"} motto={mottoText} />
      <div className="form-group row">
        <label className="col-xs-10 col-sm-2 control-label">Mekan Adı</label>
        <div className="col-xs-12 col-sm-10">
          <input
            className="form-control"
            name="name"
            value={venueData.name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-xs-10 col-sm-2 control-label">Mekan Adresi</label>
        <div className="col-xs-12 col-sm-10">
          <input
            className="form-control"
            name="address"
            value={venueData.address}
            onChange={(e) => handleAddressChange(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-xs-10 col-sm-2 control-label">İmkanlar</label>
        <div className="col-xs-12 col-sm-10">
          <input
            className="form-control"
            name="foodanddrink"
            type=""
            value={venueData.foodanddrink}
            onChange={(e) => handleFoodAndDrinkChange(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-xs-10 col-sm-2 control-label">
          Enlem & Boylam
        </label>
        <div className="col-xs-12 col-sm-10">
          <input
            className="form-control"
            type="text"
            name="coordinates"
            value={venueData.coordinates}
            onChange={(e) => handleCoordinatesChange(e.target.value)}
          />
        </div>
      </div>

      {venueData.hours.map((item, index) => (
        <div key={index}>
          <div className="form-group row">
            <label className="col-xs-10 col-sm-2 control-label">
              Günler-{index + 1}
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                type="text"
                value={item.days}
                onChange={(e) => handleDaysChange(index, e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-xs-10 col-sm-2 control-label">
              Açılış & Kapanış {index + 1}
            </label>
            <div className="col-xs-12 col-sm-10">
              <input
                className="form-control"
                type="text"
                value={item.openClosedHours}
                onChange={(e) =>
                  handleOpenClosedHoursChange(index, e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}
      <br />

      <div className="col-xs-12 col-sm-12">
        <div className="row">
          <div className="column pull-right">
            <AdminButton
              name={id ? "Güncelle" : "Ekle"}
              type="primary"
              onClick={addOrUpdateVenue}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUpdateVenue;
