import React, { useState, useContext } from "react";
import Button from "../Button/index";
import { UserContext } from "../../../App.js";

const Modal = ({
  infos,
  onclickYes,
  onclickCancel,
  fisrtNameBefore,
  fisrtNameAfter,
  lastNameBefore,
  lastNameAfter,
  emailBefore,
  emailAfter
}) => {
  const [display, setDisplay] = useState(false);
  const auth = useContext(UserContext); // auth Context

  const displayTuto = () => {
    setDisplay(true);
    auth.user.tuto = false;
  };

  return (
    <div>
      {!infos ? (
        <div className="modal-confirm">
          <h1 className="modal-confirm-title">Modification de votre profil</h1>
          <div className="line-modal"></div>
          <h5 className="modal-confirm-content">
            Vous êtes sur le point de modifier votre profil, êtes vous sur ?
          </h5>
          <div>
            <div className="modal-confirm-before-after row">
              <p className="col-4 modal-confirm-laptop">{fisrtNameBefore}</p>
              <i className="fas fa-arrows-alt-h col-4 modal-confirm-laptop"></i>
              <p className="col-12 col-md-4">{fisrtNameAfter}</p>
            </div>
            <div className="modal-confirm-before-after row">
              <p className="col-4 modal-confirm-laptop">{lastNameBefore}</p>
              <i className="fas fa-arrows-alt-h col-4 modal-confirm-laptop"></i>
              <p className="col-12 col-md-4">{lastNameAfter}</p>
            </div>
            <div className="modal-confirm-before-after row">
              <p className="col-4 modal-confirm-laptop">{emailBefore}</p>
              <i className="col-4 fas fa-arrows-alt-h modal-confirm-laptop"></i>
              <p className="col-12 col-md-4">{emailAfter}</p>
            </div>
          </div>

          <div className="line-modal"></div>

          <div className="modal-confirm-buttons">
            <Button
              disabled=""
              className="btn btn-outline-light"
              value="Oui"
              onClick={onclickYes}
            />
            <Button
              disabled=""
              className="btn btn-outline-light"
              value="Annuler"
              onClick={onclickCancel}
            />
          </div>
        </div>
      ) : (
        <div className={display ? "display" : "modal-infos"}>
          <h1 className="modal-confirm-title">Bienvenue cher modérateur !</h1>
          <div className="line-modal"></div>
          <p className="modal-infos-content">
            Les croix rouges vous permettent de supprimer commentaire, post et
            même utilisateur ! <br />
            Attention, cette action supprimera alors tout ses posts et
            commentaires !
          </p>

          <div className="line-modal"></div>

          <div className="modal-confirm-button">
            <Button
              disabled=""
              className="btn btn-outline-light"
              value="J'ai compris ! "
              // onClick={() => setDisplay(true)}
              onClick={displayTuto}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
