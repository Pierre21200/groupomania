// Middleware Imports
const jwt = require("jsonwebtoken");
const model = require("../models/comments");

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
    // const user = await decodeUid(req.headers.authorization);
    // if (!user) {
    //   throw new Error("Problème d'autorisation !");
    // }
    // const { id } = await req.params;

    // ou récupérer id du post

    const { commentContent, postId, userId } = await req.body;
    if (!userId) {
      throw new Error("Problème id params !");
    }
    if (!postId) {
      throw new Error("Un problème avec l'id du post est survenu !");
    }
    if (!commentContent) {
      throw new Error("Contenu du commentaire inexistant !");
    }

    const newComm = await model.Comment.create({
      userId: userId,
      postId: postId,
      comm: commentContent
    });

    if (!newComm) {
      throw new Error("Le commentaire n'a pas été enregistré !");
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
      throw new Error("Problème id params");
    }
    const postComments = await model.Comment.findAll({
      where: { postId: id },
      order: [["id", "DESC"]]
    });
    if (!postComments) {
      throw new Error("Pas de commentaires pour ce post");
    }
    res.status(200).json({ postComments });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
