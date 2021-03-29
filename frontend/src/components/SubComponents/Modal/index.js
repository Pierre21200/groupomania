import React, { useState } from "react";
import Button from "../Button/index";

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
              <p className="col-4">{fisrtNameBefore}</p>
              <i className="fas fa-arrows-alt-h col-4"></i>
              <p className="col-4">{fisrtNameAfter}</p>
            </div>
            <div className="modal-confirm-before-after row">
              <p className="col-4">{lastNameBefore}</p>
              <i className="fas fa-arrows-alt-h col-4"></i>
              <p className="col-4">{lastNameAfter}</p>
            </div>
            <div className="modal-confirm-before-after row">
              <p className="col-4">{emailBefore}</p>
              <i className="col-4 fas fa-arrows-alt-h"></i>
              <p className="col-4">{emailAfter}</p>
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
            En tant que modérateur, vous pouvez supprimer n'importe quel post ou
            commentaire.
            <br />
            Pour se faire, il vous suffit de cliquer sur la croix rouge en haut
            à droite du poste que vous souhaitez supprimer, ou à droite du
            commentaire que vous souhaitez supprimer.
            <br />
            En cliquant sur le nom de l'utilisateur en haut à gauche du post,
            vous aurez la possibilité de visualiser tout les posts de cet
            utilisateur, ainsi que de supprimer cet utilisateur. Attention,
            cette action supprimera alors tout ses posts et commentaires !
          </p>

          <div className="line-modal"></div>

          <div className="modal-confirm-button">
            <Button
              disabled=""
              className="btn btn-outline-light"
              value="J'ai compris ! "
              onClick={() => setDisplay(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
  // return (
  //   <div className={infos ? "modal-infos" : "modal-confirm"}>
  //     <h1 className="modal-confirm-title">{title}</h1>
  //     <div className="line-modal"></div>
  //     <h5 className="modal-confirm-content">{content}</h5>
  //     {!infos ? (
  //       <div>
  //         <div className="modal-confirm-before-after row">
  //           <p className="col-4">{fisrtNameBefore}</p>
  //           <i className="fas fa-arrows-alt-h col-4"></i>
  //           <p className="col-4">{fisrtNameAfter}</p>
  //         </div>
  //         <div className="modal-confirm-before-after row">
  //           <p className="col-4">{lastNameBefore}</p>
  //           <i className="fas fa-arrows-alt-h col-4"></i>
  //           <p className="col-4">{lastNameAfter}</p>
  //         </div>
  //         <div className="modal-confirm-before-after row">
  //           <p className="col-4">{emailBefore}</p>
  //           <i className="col-4 fas fa-arrows-alt-h"></i>
  //           <p className="col-4">{emailAfter}</p>
  //         </div>
  //       </div>
  //     ) : null}

  //     {post ? <p className="modal-titlePost">{post}</p> : null}

  //     <div className="line-modal"></div>

  //     <div className="modal-confirm-buttons">
  //       <Button
  //         disabled=""
  //         className="btn btn-outline-light"
  //         value="Oui"
  //         onClick={onclickYes}
  //       />
  //       <Button
  //         disabled=""
  //         className="btn btn-outline-light"
  //         value="Annuler"
  //         onClick={onclickCancel}
  //       />
  //     </div>
  //   </div>
  // );
};

// Modal.defaultProps = {
//   title: "MODAL",
//   content: "Etes vous sur ?"
// };

export default Modal;
