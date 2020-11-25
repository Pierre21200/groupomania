// Middleware Imports
const jwt = require("jsonwebtoken");
const model = require("../models/users");

// UserID decoder
const decodeUid = authorization => {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return {
    id: decodedToken.userId,
    clearance: decodedToken.account
  };
};

// POST Create comment
exports.createComment = async (req, res) => {
  try {
    const user = await decodeUid(req.headers.authorization);
    if (!user) {
      throw new Error({
        message: "Problème d'autorisation !"
      });
    }
    const { id } = await req.params;
    if (!id) {
      throw new Error({
        message: "Problème id params !"
      });
    }

    const { comm } = await req.body;
    if (!comm) {
      throw new Error({
        message: "Contenu du commentaire inexistant !"
      });
    }

    const newComm = await model.Comment.create({
      postId: id,
      userId: user.id,
      comm: comm
    });

    if (!newComm) {
      throw new Error({
        message: "Le commentaire n'a pas été enregistré !"
      });
    }
    res.status(200).json({ newComm });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// GET All comments from a post
exports.getPostComments = async (req, res) => {
  try {
    const { id } = await req.params;
    if (!id) {
      throw new Error({ message: "Problème id params" });
    }
    const postComments = await model.Comment.findAll({
      where: { postId: id },
      order: [["id", "DESC"]]
    });
    if (!postComments) {
      throw new Error({ message: "Pas de commentaires pour ce post" });
    }
    res.status(200).json({ postComments });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
